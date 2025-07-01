import os
import sys
import json
import time
import smtplib
from email.mime.text import MIMEText
from pathlib import Path

from supabase import create_client, Client
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from google.oauth2 import service_account

# --- CONFIG ---

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
BUCKET = "panel-profits-core"  # adjust if needed

GDRIVE_FOLDER_ID = os.environ.get("FOLDER_ID")
GOOGLE_SECRETS_FILE = "client_secrets.json"

EMAIL_USER = os.environ.get("EMAIL_USER")
EMAIL_PASS = os.environ.get("EMAIL_PASS")
EMAIL_ALERT = os.environ.get("EMAIL_ALERT")

TEMP_DOWNLOAD = Path("tmp_download")
TEMP_DOWNLOAD.mkdir(exist_ok=True)

# --- SETUP CLIENTS ---

def get_gdrive_service():
    creds = service_account.Credentials.from_service_account_file(
        GOOGLE_SECRETS_FILE,
        scopes=['https://www.googleapis.com/auth/drive']
    )
    return build('drive', 'v3', credentials=creds)

def get_supabase():
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# --- DOWNLOAD FROM GOOGLE DRIVE ---

def list_gdrive_files(service, folder_id):
    results = service.files().list(
        q=f"'{folder_id}' in parents and trashed = false",
        pageSize=1000,
        fields="files(id, name, mimeType)"
    ).execute()
    return results.get('files', [])

def download_file(service, file_id, filename):
    request = service.files().get_media(fileId=file_id)
    filepath = TEMP_DOWNLOAD / filename
    with open(filepath, "wb") as fh:
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
    return filepath

# --- UPLOAD TO SUPABASE ---

def upload_to_supabase(supabase: Client, filepath: Path, bucket: str):
    with open(filepath, "rb") as f:
        res = supabase.storage.from_(bucket).upload(
            str(filepath.name),
            f,
            file_options={"content-type": "application/octet-stream"}
        )
    return res

# --- EMAIL NOTIFICATION ---

def send_email(subject, body):
    if not (EMAIL_USER and EMAIL_PASS and EMAIL_ALERT):
        print("Email config not set, skipping email.")
        return
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = EMAIL_USER
    msg['To'] = EMAIL_ALERT
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)

# --- MAIN WORKFLOW ---

def main():
    try:
        print("Authenticating to Google Drive...")
        drive_service = get_gdrive_service()
        print("Connecting to Supabase...")
        supabase = get_supabase()
        print(f"Listing files in Google Drive folder: {GDRIVE_FOLDER_ID}")
        files = list_gdrive_files(drive_service, GDRIVE_FOLDER_ID)
        print(f"Found {len(files)} files to sync.")

        uploaded = []
        for f in files:
            print(f"Downloading: {f['name']}")
            dl_path = download_file(drive_service, f["id"], f["name"])
            print(f"Uploading: {f['name']} to Supabase...")
            upload_to_supabase(supabase, dl_path, BUCKET)
            uploaded.append(f['name'])
            # Optionally, cleanup the downloaded file
            dl_path.unlink(missing_ok=True)

        # Notify
        msg = f"Uploaded files: {uploaded}" if uploaded else "No files found."
        print(msg)
        send_email("Supabase upload complete", msg)

    except Exception as e:
        err_msg = f"Error in sync: {e}"
        print(err_msg)
        send_email("Supabase upload FAILED", err_msg)
        sys.exit(1)

if __name__ == "__main__":
    main()

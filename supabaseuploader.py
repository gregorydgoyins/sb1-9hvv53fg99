import os
import json
from supabase import create_client, Client
from google.oauth2 import service_account
from googleapiclient.discovery import build

# === CONFIG (replace with your actual paths and values as needed) ===
SUPABASE_URL = "https://ghjlzrmuugquumqwlqgl.supabase.co"
SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdoamx6cm11dWdxdXVtcXdscWdsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODY3MjkwOSwiZXhwIjoyMDY0MjQ4OTA5fQ.MNR1LTmZ113qVoYRsuuaHpXCA9fCdh4bCfZIM745O_M"
GDRIVE_FOLDER_ID = "1TggvWCw1GCVNQG50prleB9R7MLwkeD6P"
GOOGLE_CLIENT_SECRETS_FILE = "/Users/gregoryd.goyins/DLVAULT/panel-profits-new-86df286c4588.json"

# === SETUP SUPABASE ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# === SETUP GOOGLE DRIVE ===
creds = service_account.Credentials.from_service_account_file(
    GOOGLE_CLIENT_SECRETS_FILE,
    scopes=["https://www.googleapis.com/auth/drive.readonly"],
)
drive_service = build('drive', 'v3', credentials=creds)

def list_files(folder_id):
    results = drive_service.files().list(
        q=f"'{folder_id}' in parents and trashed = false",
        pageSize=1000,
        fields="nextPageToken, files(id, name)"
    ).execute()
    return results.get('files', [])

def upload_to_supabase(file_path, table='your_table_name'):
    # Write your logic to upload file to Supabase
    pass

def main():
    print("Authenticating to Google Drive...")
    print("Connecting to Supabase...")
    files = list_files(GDRIVE_FOLDER_ID)
    print(f"Found {len(files)} files to sync.")

    # Do your upload logic here...
    for f in files:
        print(f"File found: {f['name']} (ID: {f['id']})")
        # Example: upload_to_supabase(f['name']) # add your logic

    # --- EMAIL BLOCK DISABLED ---
    # try:
    #     send_email("Supabase upload complete", "Files have been synced to Supabase.")
    # except Exception as e:
    #     print(f"Email notification failed: {e}")

if __name__ == "__main__":
    main()

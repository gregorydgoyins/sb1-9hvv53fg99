PROJECT_MEMORY.md
(Paste this at the top of every new GPT or agent session. Update as project changes. Acts as the “tail” for persistent context across chains and sessions.)

Panel Profits – Persistent Project Memory
Project Name: Panel Profits
Type: AI-driven investment simulation game + file/data engine
Primary Owner: Gregory D. Goyins
Repo: github.com/gregorydgoyins/sb1-9hvv53fg99
Supabase: Project Dashboard
Main Data Vault: GDrive folder “Panel Profits Master Data Vault”
Contact: gregoryd.goyins@gmail.com
Purpose / Vision
Panel Profits blends the comic book world with stock-market mechanics.

Users buy, sell, and speculate on comics, franchises, and creators as in-game assets.

Bots power everything: data fetching, file indexing, price modeling, lore logging, schema generation, API sync, and more.

Automation, persistent memory, and knowledge chaining are top priorities.

Critical Integrations
Supabase (all files eventually stored and indexed here)

Bucket: panel-profits-core → /incoming/raw/

GDrive (sync source: see main data vault above)

APIs in use:

OpenAI, Claude, RunwayML, NewsData.io, Marvel API, ComicVine, GoCollect, CoverPrice, eBay, Polygon.io, CLZ Comics, CGC, CBCS, PGX, MyComicShop, Nostomania, ElevenLabs, Pinecone, etc.

Credentials/Secrets:

Kept in .env and .secrets.json (never in README or public memory docs)

Supabase project API keys, OpenAI keys, Google Client credentials, etc.

Reference only: DO NOT store them here.

Automation / Bots / Pipelines
GDrive → Supabase Sync:

Script (supabaseuploadere.py or via rclone) periodically moves all files of type .doc, .docx, .xls, .xlsx, .csv, .json, .md, .txt, .jpg, .heic, etc. from the data vault to Supabase bucket.

Cron job on DO server schedules this sync.

Script auto-renames/corrects suffixes as needed.

Upload UI (Planned):

Browser-based drag & drop, batch file upload.

Index/Search Bot:

Indexes file content for search by content, not just filename.

Game Logic Bots:

Generate dynamic market events, price indexes, and lore/copy on the fly.

Lore Logger:

Logs all major design, mechanic, and strategy revelations—versioned, always in memory.

File Ancestry Tracker:

Tracks all uploads, changes, and version lineage for transparency.

Workflow State / History
Files migrated from GDrive to Supabase for main data vault and more.

Rclone and Python automation scripts are operational.

All essential API credentials stored in secure config (.env/.secrets.json), not in repo.

Supabase dashboard and storage bucket operational.

Cron jobs established on DigitalOcean server for auto-sync.

All game design and mechanics described in project memory.

No production UI/UX yet for uploads or search; CLI/automation only as of now.

Planned: browser-based full-text/content search, file indexing, and AI “mechanics bot.”

How to Bootstrap a New GPT/Agent Session
Paste this entire PROJECT_MEMORY.md file at the start of every session (or as much as allowed by context window).

For super-long chats, keep a rolling log of what’s been changed, added, or decided in the last session.

Reference file and API integration status—what’s in Supabase, what’s still on GDrive, current workflows running, and what needs review.

Always keep .env, .secrets.json, and private keys outside public memory/docs.

Current State / Tasks
DONE:
GDrive to Supabase sync working (Python + rclone)

Supabase project, bucket, and permissions set up

Main data vault folder synced and ingesting all supported filetypes

Cron job on DO server running sync every X minutes

Documentation and README in progress

Game system and lore mapped out in README

TODO (Next Steps):
 Build or connect browser-based search engine for Supabase file content

 Expand supported filetypes for sync and ingestion (.heic, .jpg, images, zips)

 Build mechanics bot and lore bot (Autogen, LangChain, etc.)

 Migrate any remaining GDrive content to Supabase

 Enable real-time or scheduled “pull-all” for all user files (beyond panel profits vault)

 Connect UI upload interface for bulk, drag-and-drop, and zipped files

 Automate persistent memory paste/bootstrapping for all agents (via API, README ref, or user prompt)

 Set up agentic onboarding (instructions for new GPTs/AutoGen to pick up context automatically)

Best Practices / Memory Protocol
Never expose secrets in public files; always reference secure locations.

Update this file whenever major architecture, bots, or workflows change.

Make this the first file referenced/pasted at each new GPT/AutoGen/dev onboarding.

Add references/links to previous chat sessions, decision logs, or project lore as you go.

Use a “tail” pattern—always add newest session changes at the end for context chaining.

References / File Paths
Repo: /panelprofits-dashboard

Sync script: /root/supabaseuploadere.py (DO server)

Main data bucket: Supabase panel-profits-core/incoming/raw/

GDrive root: Panel Profits Master Data Vault

Secrets: ~/.env, ~/.secrets.json on DO server (not in repo)

Workflow logs: (document in /docs/WORKFLOW_LOG.md as needed)

Previous chat summaries: (link or paste into end of this file as chain grows)

How to Contribute/Continue
Always start by reading and pasting this PROJECT_MEMORY.md

Log every new change or task in the “TAIL” section below before ending the session.

Add references to new scripts, agents, data sources, or design changes as they happen.

TAIL / Session Log
(Add newest session summaries, key decisions, and links here for rolling memory. Copy/paste previous chat highlights as you go for context chaining.)


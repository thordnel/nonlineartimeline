# Non-Linear Timeline Manager

Visualize story beats in chronological order or in chapter sequence (linear or non-linear timeline).

A small single-file web app (index.html) for creating, editing, reordering and exporting story events ("beats"). Two views are provided:

- Visual (horizontal timeline)
- List (table)

Data is stored in browser localStorage so your timeline persists between sessions.

Live demo: https://thordnel.github.io/nonlineartimeline/

---

## Overview

This repository contains a single-page web app (index.html) that helps you manage story beats. You can:

- Add beats with a date/time, chapter number, and descriptive details.
- View beats on a horizontal visual timeline or as a table.
- Sort by date or by chapter.
- Reorder beats when sorted by chapter (drag-and-drop), with automatic recalculation of decimal chapter numbers.
- Export and import data as a CSV (the app encodes newlines and commas so CSV round-trips are preserved).
- Optionally back up and restore timelines to a personal cloud record (Firebase Firestore), and link devices using a unique ID.

---

## Features (current implementation)

- Add events with:
  - Date & Time (input type `datetime-local`)
  - Chapter number (numeric, accepts decimals; input `step="0.01"`)
  - Details (text area, maxlength 1000)
  - Input event timezone selector (choose timezone of the event when entering)
- Edit events; while editing you can "Save as New" to duplicate the event
- Sort by Date or by Chapter
- Reorder chapter items by dragging table rows (enabled only when sorted by Chapter)
  - After a reorder, decimal chapter numbers are recalculated automatically:
    - Step = 0.1 normally
    - Step = 0.01 when there are more than 9 items in the same integer chapter group
  - Note: dragging is enabled only when viewing the list sorted by Chapter. The current implementation recalculates decimals for the moved item's integer chapter part (Math.floor(number)); there is no additional client-side check that explicitly prevents dropping across different integer chapter groups — results may be unexpected if you manually move items across integer groups.
- Delete single events (confirmation modal)
- Reset all events: the UI contains a Reset button and a modal, but the reset functionality is intentionally disabled in the current build (button is disabled and reset handlers are not active).
- Export to CSV and Import from CSV
  - Export encodes newline characters in Details as `{nl}` and encodes literal commas as `{com}` so exported CSVs produced by the app can be parsed back reliably.
  - Import decodes `{nl}` back to newlines and `{com}` back to commas.
  - The app uses a simple CSV parser that splits on commas, so using the app's exported CSV is the recommended way to keep commas/newlines in Details.
- Print / Save as PDF (via browser Print): print view forces the table view and hides interactive UI controls
- Toast notifications for brief feedback
- Optional personal cloud backup/restore (Firebase Firestore)
  - Anonymous sign-in by default (or a custom token if provided)
  - You can copy your personal ID or paste another device's ID to link and restore that device's backup
  - Backup writes a document at a Firestore path of the form:
    artifacts / storylines-public / users / <activeId> / data / main_record
    and stores { beats, lastUpdated, lastDevice }.
  - Restore will overwrite the current local timeline with the cloud copy (no merge UI — it is an overwrite).

---

## CSV format

Header:
Date,Chapter,Details

- Date: stored exactly as entered (e.g., `2023-09-01T12:00`)
- Chapter: numeric decimal (e.g., `12.1`)
- Details: text — the app encodes newlines as `{nl}` and literal commas as `{com}` when exporting.

Example (as produced by the app):

Date,Chapter,Details
2025-12-24T09:30,12.1,Meeting with the knight{nl}Discuss plan
2025-12-24,12.2,Village scene - arrival

Notes:
- Export replaces newline characters in Details with `{nl}` and commas with `{com}`.
- Import converts `{nl}` → newline and `{com}` → comma.
- The importer performs a simple split on commas; to preserve commas in Details, use CSV files exported by the app (which encode commas as `{com}`).
- File downloaded by the app is named `storylines.csv`.

---

## Data storage and keys

- Local timeline data (beats) is stored in browser localStorage under the key:
  - storylines_persist
- Compare timezone preference is stored under:
  - storylines_tz
- Active cloud sync ID is stored under:
  - storylines_active_id

Cloud backups are stored in Firestore (if configured). The app contains a built-in Firebase configuration used for public hosting, and supports anonymous auth or a custom token via the global `__initial_auth_token` variable if you want to provide a specific token.

---

## Getting started / usage

1. Open index.html in a modern browser (desktop recommended for drag-and-drop reordering).
2. Add an event:
   - Fill Date & Time, Chapter number, and Details. Choose the Input Event Timezone if the event happened in a different timezone.
   - Click + Add Event.
3. Edit an event:
   - Click the pencil icon (✎) in the table row or click the dot/card on the visual timeline.
   - The Add button becomes Update Event. To duplicate while editing, click + Save as New.
4. Cancel edit:
   - Click Cancel while editing.
5. Sort:
   - Click Sort Date or Sort Chapter.
   - When sorted by Chapter, table rows become draggable for manual reordering.
6. Reordering:
   - Drag a table row to reorder. After a move, decimal chapter numbers are recalculated automatically.
   - The app recalculates decimals relative to the moved item's integer chapter (see the "Features" section for steps).
7. Delete:
   - Click × (delete) on a row or the card deletion icon and confirm in the modal.
8. Reset all:
   - A Reset UI is present, but the Reset button is disabled in the shipped build.
9. Export / Import:
   - Click Save CSV to download.
   - Use the file input to upload a CSV exported by the app (or one following the same `{nl}` / `{com}` format).
10. Print / PDF:
    - Click Print / Save PDF to open the browser print dialog. The app forces the table view for printing.

---

## Cloud (Backup / Restore) details

- The app includes optional cloud sync functionality backed by Firebase Firestore.
- Behavior:
  - The first time you load, the app attempts Firebase initialization. If the Firebase configuration is missing or invalid the UI shows "Setup Required" and cloud actions remain unavailable.
  - The app signs in anonymously by default (or uses a custom token if you provide one via the global `__initial_auth_token`).
  - When signed in, you get a Personal ID (displayed in the cloud banner). You can copy this ID and paste it on another device to link and restore that device's cloud backup.
  - Backup will overwrite the cloud record for the active ID with the current local beats.
  - Restore will fetch the cloud beats for the active ID and overwrite local data.
- Important:
  - Restore is an overwrite — there is no conflict resolution. Make a local CSV backup before restoring if you want to be safe.
  - The app persists the active sync ID locally: `storylines_active_id`.

---

## Print / PDF

- Print media rules hide interactive UI and force the table view so printed/PDF output shows the full list in a readable table.

---

## Limitations / Known issues

- Reset All: the Reset control is present in the UI but the reset action is disabled/unimplemented in this build.
- Mobile move buttons: the earlier concept of mobile up/down move buttons is not present in this version — reordering is available via drag-and-drop only when the list is sorted by Chapter (desktop browsers work best).
- Reordering across integer chapter groups: the UI enables dragging while sorted by Chapter, but the current code recalculates decimals based on the moved item's integer chapter; there is no explicit anti-cross-group guard. Avoid moving items across different integer chapter groups if you want to preserve group integrity.
- CSV import uses a simple comma-splitting parser. This is why the app encodes commas as `{com}` on export — to keep round-trips safe. If you hand-edit CSVs, follow the same encoding.
- The app relies on modern browser features (ES modules, Intl.DateTimeFormat with timeZone support, FileReader, etc.). Use a modern Chromium/Firefox/Safari build.
- Cloud operations require connectivity and Firestore rules that permit the anonymous/custom-token operations used by the app.

---

## Troubleshooting

- Nothing loads on open: ensure you are using a modern browser. Clear localStorage for the page to reset the app if stored data is corrupted.
- CSV import fails or says "No valid data found": make sure the file has the header `Date,Chapter,Details` and lines formatted as produced by the app (use `{nl}` and `{com}` encodings).
- Dragging doesn't work: ensure you are in List view and the timeline is sorted by Chapter (`Sort Chapter`).
- Backup/Restore show "Setup Required" or "Connection Failed": the app needs a valid Firebase configuration and network connectivity to use cloud features.

---

## Implementation notes (for contributors)

- The app is implemented in one file: `index.html`. The internal storage key is `storylines_persist`.
- Client-side timezone handling:
  - When adding events you enter the event's local date/time and choose an input timezone. The app converts that wall-clock input into a consistent UTC-based timestamp string for storage.
  - The "Compare Timezone" selector can be used to view beats in another timezone for comparison.
- Cloud uses Firestore with the following document path:
  - `artifacts / storylines-public / users / <activeId> / data / main_record`
  - Stored fields: `{ beats, lastUpdated, lastDevice }`
- CSV encoding for safe round-trip: `{nl}` for newlines, `{com}` for commas.

---

## Changelog (high level)

- Added personal cloud Backup / Restore (Firebase) UI and logic.
- Switched local storage key to `storylines_persist`.
- Increased Details maxlength to 1000.
- CSV export/import updated to encode commas as `{com}` (in addition to `{nl}` for newlines).
- Print view forces table view and hides controls.
- Reset all functionality presented in UI but left disabled in this build.

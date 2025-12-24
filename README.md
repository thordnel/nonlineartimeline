# Non-Linear Timeline Manager

Visualize story beats in chronological order or in chapter sequence (linear or non-linear timeline).

---

## Overview

A small single-file web app (index.html) for creating, editing, reordering and exporting story events ("beats"). Two views are provided:

- Visual (horizontal timeline)
- List (table)

Data is stored in browser localStorage so your timeline persists between sessions.

---

## Features

- Add events with:
  - Date & Time (datetime-local)
  - Chapter number (numeric, accepts decimals; input step 0.01)
  - Details (text, max 500 chars)
- Edit events and optionally "Save as New" while editing
- Sort by Date or by Chapter
- Reorder chapter items by dragging table rows (only when sorted by Chapter)
  - Dragging is restricted to items belonging to the same integer chapter (e.g., 12.x group)
  - After reordering, decimal chapter values are recalculated automatically:
    - step = 0.1 normally
    - step = 0.01 when more than 9 items in the same integer chapter
- Mobile-friendly move buttons (↑ / ↓) for reordering when drag isn't convenient
- Delete single events (confirmation modal) and reset all events (confirmation modal)
- Export to CSV and Import from CSV
  - Export replaces newline characters in Details with `{nl}` to preserve multi-line text in the simple CSV format used by the app
- Print / Save as PDF (browser Print): print view is optimized to force the table view and hide UI controls
- Toast notifications for feedback
- localStorage key used: `storylines_data`

---

## Getting Started (Usage)

1. Open index.html in a modern browser.
2. Add an event:
   - Fill Date & Time, Chapter number, and Details.
   - Click **+ Add Event**.
3. Edit an event:
   - Click the pencil icon (✎) in the table row or click the dot/card on the visual timeline.
   - The Add button turns into **Update Event**.
   - To duplicate while editing, click **+ Save as New**.
4. Cancel edit:
   - Click **Cancel** while editing.
5. Sort:
   - Click **Sort Date** or **Sort Chapter**.
   - When sorted by Chapter, table rows become draggable for manual reordering (or use mobile move buttons).
6. Reordering:
   - Drag a table row to reorder (only permitted within the same integer chapter group).
   - After a move, decimal chapter numbers are recalculated automatically.
7. Delete:
   - Click × (delete) on a row or the card deletion icon, confirm in the modal.
8. Reset all:
   - Click **Reset**, confirm in the modal to clear all events.
9. Export / Import:
   - Click **Save CSV** to download.
   - Use the file input to upload a CSV exported by the app (or one following the same format).
10. Print / PDF:
    - Click **Print / Save PDF** to open the browser print dialog. The app forces table view for printing.

---

## CSV Format

The app uses a simple CSV format:

Header:
Date,Chapter,Details

- Date: stored exactly as entered (e.g., `2023-09-01T12:00` or `2023-09-01`)
- Chapter: numeric (decimal)
- Details: text (newlines are replaced with `{nl}` during export)

Example CSV (as produced by the app):

Date,Chapter,Details
2025-12-24T09:30,12.1,Meeting with the knight{nl}Discuss plan
2025-12-24,12.2,Village scene - arrival

Notes about import/export:
- When exporting, newline characters in Details are replaced with `{nl}`.
- When importing, `{nl}` is converted back to actual newlines.
- The importer in the app uses a simple comma split and expects at least 3 columns; commas are not preserved in Details during Add (the app replaces commas with spaces when you add/update events), so keep that in mind when preparing CSVs manually.
- Best practice: use the app's "Save CSV" to generate a compatible file.

---

## Data Storage

- Stored in browser localStorage under key: `storylines_data`.
- Data persists per browser and device (i.e., not synced between devices unless you manually transfer CSV).

---

## Print / PDF Export

- The app hides interactive UI when printing and forces the table view so the exported PDF shows the full list of events in a readable table.
- Use your browser's print dialog (Click **Print / Save PDF**) to produce a PDF.

---

## Limitations & Notes

- The app removes commas from Details on add/update (commas are replaced with spaces) to keep CSV handling simple.
- CSV import parsing is basic (splits on commas and joins all columns after the second into Details). Use the app's export where possible to avoid formatting issues.
- Reordering is only allowed within the same integer chapter group to keep chapter-group integrity. Attempts to move between different integer chapter groups will show a toast explaining the restriction.
- Decimal recalculation is automatic after reordering and may cause chapter decimals to change to maintain sequence (step 0.1 or 0.01 depending on group size).

---

## Troubleshooting

- Nothing loads on open: ensure you have a modern browser and check localStorage for corrupted data — clearing localStorage for the page will reset the app.
- CSV import fails / says "No valid data found": make sure the file has the header and at least one valid line with Date and numeric Chapter.
- Dragging doesn't work: ensure the timeline is sorted by Chapter (`Sort Chapter`) and you're working in the List view (table). Dragging is disabled when sorted by Date or when viewing the Visual view.

---

Demo: https://thordnel.github.io/nonlineartimeline/

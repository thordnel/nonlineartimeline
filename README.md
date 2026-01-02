# **STORYLINES**

## **Non-Linear Timeline Manager**

Visualize story beats in chronological order or in chapter sequence (linear or non-linear timeline).

A small single-file web app (index.html) for creating, editing, reordering, and exporting story events ("beats"). Three distinct views are provided:

* **Linear**: A horizontal scrollable timeline.  
* **MultiTimeline**: A high-density grid grouped by year and day.  
* **List**: A traditional table view with advanced controls.

This page works offline (simply open index.html) without cloud sync, or it can be hosted on a local or remote server. To enable cloud synchronization, you must set up Firebase Storage. Configuration settings are found within the index file.

Data is stored in browser localStorage so your timeline persists between sessions.

Live demo: [https://thordnel.github.io/nonlineartimeline/](https://thordnel.github.io/nonlineartimeline/)

**Warning:** This demo uses a shared Firebase Storage instance—**do not upload sensitive data or private information**. The index.html file contains a sample configuration; please clone the repo and replace it with your own credentials for production use.

## **Overview**

This repository contains a single-page web app that helps you manage complex story architectures. You can:

* **Manage Beats**: Add beats with date/time, chapter/sub-chapter titles, and rich details.  
* **Markdown Support**: Use standard Markdown syntax (\*\*bold\*\*, \*italic\*, \- lists) in your beat details and remarks.  
* **Continuity Space**: Track objects, scars, or character states across specific time ranges. These appear as badges on your story beats automatically.  
* **Timezone Intelligence**: Enter events in their local timezone and compare them against other global zones.  
* **Reordering**: Drag-and-drop (desktop) or use Up/Down arrows (mobile) to sequence beats within a chapter.  
* **Cloud Sync**: Link multiple devices using a personal ID to backup and restore your timeline with built-in conflict checking.

## **Features (current implementation)**

* **Add/Edit Events**:  
  * Date & Time (input type datetime-local)  
  * Chapter number (numeric, accepts decimals for sub-beats)  
  * Chapter & Sub-Chapter Titles  
  * Details & Remarks (supports Markdown)  
  * Input event timezone selector  
* **Sorting & Filtering**:  
  * Sort by Date (Chronological) or Chapter (Linear)  
  * **Filter Mode**: Select tracking elements in the Continuity Space to show only the beats that occur while those elements are active.  
* **Smart Reordering**:  
  * Manual reordering via drag-and-drop or mobile buttons.  
  * **Safety Guard**: Movement is restricted to within the same integer chapter to prevent accidental timeline corruption.  
  * Automatic decimal recalculation (increments of 0.1 or 0.01 based on group size).  
* **MultiTimeline View**:  
  * Visualizes beats in vertical stacks grouped by Year and Day.  
  * Optimized for high-density storytelling (1.5-hour event stacking).  
* **File Tools**:  
  * **Export to CSV**: Encodes newlines and commas for a perfect round-trip. Now includes Continuity Data and Timezone preferences.  
  * **Import from CSV**: Seamlessly restores beats and tracking elements.  
  * **Print / PDF**: A dedicated print view that forces a clean table format and hides UI controls.

## **Cloud (Backup / Restore)**

* **Personal ID**: Every user is assigned a unique UID. Click the ID to copy it.  
* **Device Linking**: Paste a Device ID from another machine to link them and share the same cloud record.  
* **Conflict Prevention**: The "Restore" process now shows a comparison summary (local beat count vs. cloud beat count and timestamp) before performing an overwrite.

## **CSV format**

The app utilizes an extended CSV format to preserve all metadata:  
Date,Chapter,ChapterTitle,SubChapterTitle,Details,Remarks,PrefTz,PrefCountry

* **Details/Remarks**: Newlines are encoded as {nl} and commas as {com}.  
* **Continuity Data**: Stored at the end of the file within \[CONTINUITY\_DATA\_START\] blocks.

## **Limitations / Known issues**

* **Reset All**: The Reset button is visible but intentionally disabled to prevent accidental data loss.  
* **Cross-Chapter Moves**: To maintain data integrity, you cannot drag or move a beat from Chapter 1 into Chapter 2 manually; you must edit the Chapter number field instead.  
* **Browser Requirements**: Requires a modern browser with ES modules and Intl.DateTimeFormat support.

## **Implementation notes**

* **Single-File Architecture**: The entire application logic, styling, and Markdown parsing is contained within index.html.  
* **Markdown Engine**: Uses [marked.js](https://www.google.com/search?q=https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js) for high-performance rendering.  
* **Storage**: The primary local key is storylines\_persist.  
* **Cloud Path**: Data is stored in Firestore at /artifacts/storylines-public/users/\<activeId\>/data/main\_record.

## **Changelog**

* **v4.0**: Added Markdown support for Beat Details/Remarks.  
* **v3.5**: Introduced Continuity Space for tracking items/states over time.  
* **v3.0**: Added MultiTimeline view and mobile-friendly reordering buttons.  
* **v2.5**: Integrated Cloud Backup/Restore with conflict check summaries.

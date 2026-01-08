![image](https://thordnel.github.io/nonlineartimeline/parchtitle.png)

# **STORYLINES**

## **Non-Linear Timeline Manager**

Visualize story beats in chronological order or in chapter sequence (linear or non-linear timeline).

A small single-file web app (index.html) for creating, editing, reordering, and exporting story events ("beats"). Four distinct views and multiple tracking "Spaces" are provided to manage complex narratives.

* **Linear**: A horizontal scrollable timeline.
* **MultiTimeline**: A high-density grid grouped by year and day.
* **Card List**: A traditional table view with advanced controls, optimized for mobile.
* **Documentation**: An integrated viewer for this README.

This page works offline (simply open index.html) without cloud sync, or it can be hosted on a local or remote server. To enable cloud synchronization, you must set up Firebase Storage. Configuration settings are found within the index file.

Data is stored in browser localStorage so your timeline persists between sessions.

Live demo: [https://thordnel.github.io/nonlineartimeline/](https://thordnel.github.io/nonlineartimeline/)

**Warning:** This demo uses a shared Firebase Storage instance—**do not upload sensitive data or private information**. The index.html file contains a sample configuration; please clone the repo and replace it with your own credentials for production use.

## **Overview**

This repository contains a single-page web app that helps you manage complex story architectures.

### **Key Spaces**

* **Beat Space**: The core engine. Add beats with date/time, chapter/sub-chapter titles, and rich details. Supports Markdown syntax (**bold**, *italic*, \- lists) and **Narrative Modes** (e.g., Flashbacks, Visions).
* **Character Database**: Manage your cast. Assign unique colors and roles. Beats track character presence, and the database automatically counts appearances across your story.
* **Continuity Space**: Track objects, scars, or character states across specific time ranges. These appear as badges on your story beats automatically.
* **Master Narrative Tracker**: (Formerly Chekhov's Gun Space). Manage complex plot devices including Chekhov's Guns, Red Herrings, Twists, Motifs, and Symbolism. Text-based linking allows you to define where items appear (Setup), distract (Misdirection), and resolve (Payoff) by referencing chapter numbers (e.g., "Ch 1.2").
* **World Logic Tracker**: Define the rules of your world. Tag beats where rules are "Upheld" (✅) or "Broken" (⚠️) to identify plotholes and inconsistencies.

### **Features**

* **Narrative Modes**: Visually distinguish beats using color-coded modes:
  * **Present**: Standard background.
  * **Flashback**: Grey background.
  * **Vision/Dream**: Yellow background.
  * **Superimposed**: Orange background (for hauntings/mental overlays).
* **Smart Mentions**: Type `@` in any detail or remark field to instantly search and insert a link to another Chapter.
* **Search & Filter**:
  * **Global Search**: Instantly filter beats by details, titles, remarks, or narrative modes.
  * **Tag Filtering**: Click character or item badges to filter the timeline to only show beats involving those specific elements.
* **Timezone Intelligence**: Enter events in their local timezone and compare them against global zones. Set a "Preferred Display" timezone per beat for international narratives.
* **Smart Reordering**: Drag-and-drop (desktop) or use Up/Down arrows (mobile) to sequence beats. Movement is restricted to within the same chapter to maintain data integrity.
* **Cloud Sync**: Link multiple devices using a personal ID. The "Restore" process includes conflict checking, showing local vs. cloud beat counts before overwriting.
* **UI Enhancements**: Includes a "Collapse All" floating button for decluttering the workspace and sticky footers for easier data entry on long forms.

## **CSV Format**

The app utilizes an extended CSV format to preserve all metadata:

*Date,Chapter,ChapterTitle,SubChapterTitle,Details,Remarks, PrefTz,PrefCountry,NarrativeMode,CharTags,PlotholeTags*

* **NarrativeMode**: Stores the type of event (Present, Flashback, etc.).
* **Details/Remarks**: Newlines are encoded as {nl} and commas as {com}.
* **JSON Metadata**: Complex tags (Characters, Plotholes) are stored as escaped JSON strings within the CSV columns.
* **Data Blocks**: Continuity, Narrative Items (Chekhov), Character, and Plothole definitions are stored in dedicated \[DATA\_START\] blocks at the end of the file.

## **Limitations / Known Issues**

* **Reset All**: The Reset button is intentionally disabled in the standard build to prevent accidental data loss.
* **Cross-Chapter Moves**: You cannot drag a beat into a different chapter; you must edit the Chapter number field.
* **Browser Requirements**: Requires a modern browser with ES modules, Service Worker support, and Intl.DateTimeFormat support.

## **Implementation Notes**

* **Single-File Architecture**: Application logic, styling, and Markdown parsing are contained within index.html.
* **Markdown Engine**: Uses [marked.js](https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js) for rendering.
* **Storage**: Primary local key is storylines\_persist.
* **PWA**: Includes a Service Worker (sw.js) for offline reliability and update notifications.

## **Changelog**

* **v17.0**:
  * Renamed Chekhov Space to **Master Narrative Tracker** with expanded item types (Motifs, Red Herrings).
  * Added **Narrative Modes** for styling Flashbacks and Visions.
  * Added **Smart Mentions** (`@` autocomplete) for quick cross-referencing.
  * Added global "Collapse All" button and sticky action footers.
* **v16.0**: Added World Logic Tracker and enhanced Global Search with tag-based filtering.
* **v5.0**: Integrated Character Database and Chekhov's Gun management.
* **v4.0**: Added Markdown support for Beat Details/Remarks.
* **v3.5**: Introduced Continuity Space for tracking items/states over time.
* **v3.0**: Added MultiTimeline view and mobile-friendly reordering.

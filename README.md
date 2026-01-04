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

* **Beat Space**: The core engine. Add beats with date/time, chapter/sub-chapter titles, and rich details. Supports Markdown syntax (**bold**, *italic*, \- lists) and deep tagging.  
* **Character Database**: Manage your cast. Assign unique colors and roles. Beats track character presence, and the database automatically counts appearances across your story.  
* **Continuity Space**: Track objects, scars, or character states across specific time ranges. These appear as badges on your story beats automatically.  
* **Chekhov's Gun Space**: Manage foreshadowing. Tag items as "Setup" (🟢) or "Payoff" (🔴). The app automatically identifies "Pending" setups, "Fulfilled" arcs, or "Paradoxes" (payoffs with no setup).  
* **World Logic Tracker**: Define the rules of your world. Tag beats where rules are "Upheld" (✅) or "Broken" (⚠️) to identify plotholes and inconsistencies.

### **Features**

* **Search & Filter**:  
  * **Global Search**: Instantly filter beats by details, titles, or remarks.  
  * **Tag Filtering**: Click character or item badges to filter the timeline to only show beats involving those specific elements (supports AND logic for multiple tags).  
* **Timezone Intelligence**: Enter events in their local timezone and compare them against global zones. Set a "Preferred Display" timezone per beat for international narratives.  
* **Smart Reordering**: Drag-and-drop (desktop) or use Up/Down arrows (mobile) to sequence beats. Movement is restricted to within the same chapter to maintain data integrity.  
* **Cloud Sync**: Link multiple devices using a personal ID. The "Restore" process includes conflict checking, showing local vs. cloud beat counts before overwriting.

## **CSV Format**

The app utilizes an extended CSV format to preserve all metadata:

Date,Chapter,ChapterTitle,SubChapterTitle,Details,Remarks,PrefTz,PrefCountry,ChekhovTags,CharTags,PlotholeTags

* **Details/Remarks**: Newlines are encoded as {nl} and commas as {com}.  
* **JSON Metadata**: Complex tags are stored as escaped JSON strings within the CSV columns.  
* **Data Blocks**: Continuity, Chekhov, Character, and Plothole definitions are stored in dedicated \[DATA\_START\] blocks at the end of the file.

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

* **v16.0**: Added World Logic Tracker and enhanced Global Search with tag-based filtering.  
* **v5.0**: Integrated Character Database and Chekhov's Gun management.  
* **v4.0**: Added Markdown support for Beat Details/Remarks.  
* **v3.5**: Introduced Continuity Space for tracking items/states over time.  
* **v3.0**: Added MultiTimeline view and mobile-friendly reordering.

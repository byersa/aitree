# Blueprint Resources

This directory contains supplemental, non-Moqui files that are referenced by the project's **Blueprint** files. It serves as a central repository for "Supporting Materials" so they don't clutter the intention-driven Moqui-mirrored folders.

## What goes here?
- **Static Documents**: Policy PDFs, meeting agenda Excel files, or clinical guidelines.
- **Design Artifacts**: Low-fidelity wireframes, UI mockups, or exported system diagrams.
- **Data Samples**: CSV or JSON files used to define initial data requirements for entities.
- **Miscellaneous Scripts**: One-off scripts (e.g., Python data transformation scripts) that are useful for design but not part of the Moqui application logic.

## AI Usage Note
AI agents (Antigravity and local Qwen) should look in this folder whenever a `.md` blueprint refers to an "external resource," "data sheet," or "artifact" that isn't part of the active Moqui component codebase.

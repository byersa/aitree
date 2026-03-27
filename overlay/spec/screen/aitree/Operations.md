# Discussion Macros (UI Components)

## Discussion Tree (DT) Macro
The top-level component for rendering a meeting agenda.
- **Implementation**: Likely rendered using Quasar's `qTable` component (not `qTree`) to display maximum information compactly with consistent column ordering/spacing.
- **Row Elements (Discussion Message - DM representations)**:
  - Leading checkbox (for selection/processing, e.g., deletion).
  - Single-width field indicating the corporate entity that owns the agenda item.
  - Discussion Detail (DD) title field.
  - Action dropdown (deletion, copying, sharing, etc.). These actions must be screen macros to minimize custom code. *(Note: Moqui screen macros must allow attribute macros).*
- **Response Management**: The "tree" managing responses to top-level agenda topic DMs will be a Quasar `qTree`.

## Discussion Message (DM) Macro
Items of a Discussion Tree (DT). Encapsulated differently based on whether it is an agenda topic DM or a response DM, and its meeting template.
- **Attributes**: `id`, `parentId`, `title`, `content`.
- **Constraint**: Content must be modeled to allow locale translation and version control.

## Discussion Detail (DD) Macro
The mechanism that expands each DM for full viewing and management.
- **Modes**: Must support two modes for flexibility:
  1. A Vue `slot` for each DM.
  2. A popup dialog screen.
- **Features**: 
  - DM title and content available as a `qTooltip`.
  - Manages esoteric items (e.g., associated `AgendaArtifactAttributes`).
  - Content portion must be capable of using rich text/content.

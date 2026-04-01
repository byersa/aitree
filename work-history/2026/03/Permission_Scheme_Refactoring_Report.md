# Work-Prompt: Permission Scheme Analysis & Refactoring Requirements

**Project Context:** Huddle Agenda Refactoring (Meetings.xml)
**Date:** 2026-03-02
**Subject:** 1.0 Permission Scheme Hierarchy and Inheritance

## Objective
Analyze the hierarchical permission requirements for `Meetings.xml` and children, comparing them against the legacy implementation in `AgendaServices.xml`.

## Requirement 1.0: Permission Scheme Overview

### Roles Analysis
The system identifies 6 vertical roles for users relative to the owning organization/person:
- **ROOT**: Super Admin
- **SUPERGRP**: Corporate ancestor
- **SUBGRP**: Corporate descendant
- **OWNERGRP**: Same corporate group
- **OWNER**: Explicit owner
- **OTHER**: Non-vertical relationship

**Finding (AgendaServices.xml):** Roles are already resolved via `get#ValidRoleList` based on the `orgSuperAncestorIdList` and `person.orgId`. These correlate exactly with the facet type identifiers: `FT_PERM_SUPERGRP`, `FT_PERM_SUBGRP`, `FT_PERM_OWNERGRP`, and `FT_PERM_OWNER`.

### Logic: Deny-Mode Inheritance
Permission schemes are dynamic composites formed by merging a topic's scheme with its parent's. The model follows a **Deny-Mode** pattern where a specific denial in a scheme removes that privilege from the allowed set inherited from ancestors.

**Finding (AgendaServices.xml):** This is the core logic implemented in `merge#FacetValues`. The system clones the parent's merged list and iterates through the current topic's constraints. If a constraint facet is set to `PermDeny`, it explicitly removes the corresponding index from the inherited list.

### Operations Mapping
The specified operations for refactoring are:
1. `create`: Add AgendaMessage to Container/Topic
2. `modify`: Edit AgendaMessage
3. `delete`: Remove AgendaMessage
4. `view`: Read AgendaMessage
5. `share`: Grant third-party access
6. `cancel`: Update status to 'Cancelled'
7. `append`: Add child Message to specific parent

**Finding (AgendaServices.xml):** These map to the legacy `operationList`: `['shop_create', 'shop_edit', 'shop_append', 'shop_cancel', 'shop_view', 'shop_share']`. Note that `modify` maps to `shop_edit`.

## Architectural Pillars

- **Composite Calculation**: Permissions must not be statically stored; they are calculated recursively during fetch via `getFullAgendaTopic`.
- **Server-Side Filtering**: Security must be enforced on the server (via `check#ConstraintPermission`) so disallowed topics are never transmitted.
- **Inheritance vs. Customization**: Topics inherit the `permission_id` (FacetValueLookupId) of their parent unless a custom JSON scheme is provided.
- **Pseudo User Support**: Identity context is passed through session maps (`person`), enabling supervisors to effectively impersonate child users within the authority tree.

## Recommendations for Meetings.xml Refactoring
The new UI for `Meetings.xml` must ensure that all CRUD operations and visibility filters invoke the `check#ConstraintPermission` service using the dynamically calculated `mergedConstraintMap`. The "Deny" model is correctly implemented in the backend and should be treated as the source of truth.

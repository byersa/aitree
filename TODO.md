# AI Tree Project Backlog

This file contains tasks and improvements that need to be addressed.

## High Priority

## Completed
- [x] **Entity-Driven Labeling (Option 2)**: Implemented global field labels using a `title` attribute in entity definitions, reducing XML redundancy.
- [x] **Robust Dropdown Population**: Fixed issues with unpopulated dropdowns by pre-fetching `entity-options` server-side and improving attribute serialization.
- [x] **Infinite Recursion Fix**: Resolved `StackOverflowError` in `SubscreensActive` rendering using screen-specific context flags.
- [x] **Enhance `form-query` Filtering for ManageAgendaContainers**: Added operator support (begins/contains toggle) to `form-query-field`.
- [x] **Dropdowns for Enums in `form-query`**: Added `enum-type-id` and `status-type-id` support to `form-query-field` with automatic fetching.
- [x] Initial implementation of `<form-query>` and `<form-list>` integration.
- [x] Fixed "No data available" issue by restoring `actions` in `ManageAgendaContainers.xml`.
- [x] Resolved Vue `TypeError` in `setParameters` when navigation history is empty.

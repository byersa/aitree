# Staff Meeting App (SMA) - Blueprints

**Component**: `aitree`
[componentTitle]: "Staff Meeting"

## General Requirements for Agent Action
1. **Phased Execution**: Tasks must be executed in stages to manage resource utilization and avoid quotas. Agents must suggest ways to meet this requirement.
2. **Variable Declaration**: Use this `README.md` or other top-level `.md` files to declare variables (like `[componentTitle]`) for use in other documents.
3. **Moqui-AI Consultation**: Consult the `moqui-ai` component for applicable overriding instructions, skills, and rules.
4. **Standard CSS**: Identify and use a standard set of CSS classes and selectors.
5. **Legacy Reference**: Inspect and utilize legacy files from similar manually generated apps (prefaced with `legacy:`). These are for reference only.
6. **ARIA Tags**: HTML output must include ARIA id tags for each element to allow `moqui-mcp` to traverse output for frontend testing.
7. **Resource Serving**: Serve images and resources using Moqui Resource functionality (file and component, not database).
8. **Date Format**: Use ISO 8601 format for dates.

## Application Overview
The general purpose of the Staff Meeting App (SMA) is to allow nursing homes (or similar health care facilities) to hold "Stand Up" and "Staff Meetings" with their staff on a daily basis, as well as other scheduled/custom meetings. All meetings have a preset agenda prepared by a meeting "owner".

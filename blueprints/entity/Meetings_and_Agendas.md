# Agenda Container and Message Entities

> **[📝 ATTENTION AGENTS]**
> Any file path referenced in this document pointing to the `studdle` component (e.g., `component://studdle/entity/...`) is a **Legacy Reference Pattern**. 
> - **DO NOT** copy the legacy entity names or exact fields verbatim.
> - **DO** analyze the legacy definition to understand the underlying data relationships (foreign keys, statuses, permissions).
> - **DO** apply those structural patterns to build the new `aitree` equivalents (`AgendaContainer`, `AgendaMessage`), adjusting field names to match the modern recursive architecture outlined in this document.

## Core Concepts

### Agenda Container (AgendaContainer)
The digital representation of any concept to which agenda messages (topics or replies) can be attached, viewed, and commented on. Represents the high-level boundary of a discussion context.
In the component://studdle/entity.agendaHuddle.xml file, the equivalent of AgendaContainer would be MeetingTemplate. 

### Container Templates
Abstract containers serving as a "class" to instantiate actual containers (e.g. standard meeting formats). Connected to parent container templates through the "parent" of the owning person/organization (not via parent template ID).

### Instance Container
Instances of container templates actually held (e.g., a specific scheduled meeting). 
- **Identifier**: Composite key made of the container template ID and occurrence date-time value.
- Virtual container instances can be created before instantiation to modify upcoming agendas.

### Repository Container
A library modeled as a container. Uses some template features. Used exclusively to store headless messages (standard agenda topics) to share as libraries across templates, eliminating duplication.

### AgendaContainer notes
The MeetingTemplate definition uses a field, "meetingTypeEnumId" to identiy the "type" (ie. abstract, instance and repository). That field and all the fields defined in MeetingTemplate should be used in AgendaContainer. 

## Discussion & Message Entities
### Agenda Message
A recursive packet of information. 
- **Top-Level Topics**: An `AgendaMessage` attached directly to an `AgendaContainer` (Template, Instance, or Repository).
- **Threaded Replies**: An `AgendaMessage` attached directly to another `AgendaMessage` (as a child).
- **Oversight**: Owned by an organization or person with rights to modify/delete. Persons in lower orgs have restricted rights (view/share) via the permission scheme. Higher orgs have supervisory authority based on role.

### AgendaMessage notes. AgendaMessage should be modeled after AgendaTopic and AgendaTopicContent in agendaHuddle.xml.

### AgendaMessageAttribute notes
The legacy `FacetType`, `FacetValue`, and `FacetValueLookup` entities have been deprecated. Do not use them.
Instead, use a standard Moqui EAV (Entity-Attribute-Value) pattern to handle all metadata, tagging, UI state, and generic properties for `AgendaMessage`.
To support Moqui's native upsert caching while still allowing for rare multi-valued attributes, use the following schema:
- **Primary Keys**: `agendaMessageId` (id), `attrName` (text-short), and `sequenceNum` (number-integer, default 1).
- **Payload**: `attrValue` (text-medium) and an optional `attrEnumId` (id) for strictly validated Enumeration references.

### Implementation Targets
(Target entity root names replacing the legacy sh/studdle schema).
- `AgendaContainer`
- `AgendaMessage`
- `AgendaMessageContent` 
- `AgendaMessageAttribute`

## Message Permission Scheme
The application utilizes a hierarchical permission scheme based natively on `mantle.party.PartyRelationship` records (e.g., Corp -> Division -> Facility).
Do not build complex, custom permission junction tables (like the legacy `Facet` permission system).

- **Oversight Hierarchy**: The `AgendaContainer` and `AgendaMessage` entities must include an `orgId` (foreign key to `mantle.party.Organization`) to establish ownership.
- **Role-Based Access**: 
  - Only users who are members of the owning `orgId` can fundamentally create, modify, or delete messages.
  - Users in higher-level organizations (like Corporate) have supervisory authority and bypass standard access checks if a `PartyRelationship` graph proves they supervise the owning `orgId`.
- **Targeted Sharing**: Complex sharing semantics (e.g. sharing a private message down to a specific lower-level employee) should be modeled using standard mapping tables or `AgendaMessageAttribute` tags, evaluated against the user's `Party` and `UserGroup` memberships.

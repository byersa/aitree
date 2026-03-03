# AgendaServices.xml Notes

This document tracks the purpose and functionality of services defined in `AgendaServices.xml`.

## Service Overviews

| Verb | Noun | Description |
|------|------|-------------|
| `get` | `AgendaFacade` | Entry point for agenda data. Orchestrates cache init and retrieval for meetings, permissions, and topics. |
| `init` | `Cache` | Re-initializes `shCache` with base mappings for orgs, parties, and meeting templates. |
| `init` | `GlobalValueMap` | Initializes permutations and facet types in the global value map. |
| `init` | `FacetType` | Recursively loads facet types and values from the database into the cache. |
| `get` | `AgendaTopics` | Fetches all relevant agenda topics for a specific person and meeting ISO. |
| `merge` | `ReturnData` | Utility to merge two internal data maps. |
| `merge` | `ShortDataMap2Stores` | Merges small retrieved data maps into session-scoped `transferDataMap` and `topicStoreDB`. |
| `merge` | `TransferDataMap2TopicStore` | Syncs `transferDataMap` into the persistent `topicStoreDB` cache. |
| `complete` | `AbstractTopic` | Recursively fetches the full thread of an abstract (template) topic with permission filtering. |
| `get` | `AgendaTopic` | Fetches basic metadata and localized content for a single topic. |
| `get` | `FullAgendaTopic` | Resolves a topic with fully merged constraints from parents and pinning status. |
| `get` | `AbstractAgendaTopics` | Retrieves top-level abstract topics for a given template and organization. |
| `get` | `AbstractAgendaTopicsRecursive` | Helper for recursive processing of abstract topics and their children. |
| `get` | `AbstractChildInstanceTopics` | Fetches instance topics linked to an abstract parent. |
| `get` | `InstanceAgendaTopicsRecursive` | Recursively retrieves instance-level topics and their hierarchy. |
| `get` | `InstanceAgendaTopics` | Retrieves all instance topics for a specific meeting instance. |
| `stash` | `AbstractAgendaTopic` | Processes and stores an abstract topic in session caches, handling merging and link placement. |
| `get` | `PartyPersonLocale` | Resolves party, person, and locale context for the session. |
| `stash` | `InstanceAgendaTopicAndLink` | Processes and stores instance-level topics and their hierarchical links. |
| `get` | `AgendaContent` | Fetches localized titles and descriptions for a list of topics. |
| `get` | `SortOptions` | Retrieves sorting options and labels for a meeting template. |
| `lookup` | `SortLabels` | Resolves labels for sort IDs via dynamic entity lookup. |
| `merge` | `Constraints` | Consolidated merging of permission and domain constraints from hierarchical parents. |
| `check` | `ConstraintPermission` | Validates operation rights (view/edit) on a topic based on role and merged permissions. |
| `convert` | `Map2String` | Utility to serialize a map to a sorted JSON string for consistent hashing. |
| `get` | `MapLookup` | Retrieves map serializations from persistent storage. |
| `get` | `PermissionMap` | Manages permission set hash mapping in the cache. |
| `get` | `ScheduleMap` | Manages schedule config hash mapping in the cache. |
| `check` | `Domains` | Validates user context against topic domain constraints. |
| `get` | `TemplateStack` | Builds recursive ancestor list for a meeting template. |
| `get` | `OrgStack` | Builds recursive organization rollup hierarchy. |
| `get` | `MeetingTemplates` | Finds all top-level templates for a party with full hierarchy context. |
| `get` | `MeetingInstance` | Resolves meeting instances with temporal metadata and full hierarchy. |
| `build` | `MeetingInstance` | Core logic for constructing a meeting instance map and caching it. |
| `get` | `MeetingInstances` | Orchestrates building instances for a template and its descendants for a specific date. |
| `get` | `ParentInstance` | Recursively finds or builds parent instances up the organization hierarchy. |
| `get` | `InstanceChildren` | Recursively builds child instances based on template children. |
| `get` | `MeetingInstanceRecursive` | Builds a meeting instance and its ancestors/descendants recursively. |
| `findOrCreate` | `MeetingInstance` | High-level service to find or create a meeting instance. |
| `create` | `MeetingInstance` | Creates a new `sh.MeetingInstance` entity record. |
| `find` | `MeetingInstance` | Multi-criteria search for a meeting instance (ID, ISO, Template, Org). |
| `get` | `Person` | Comprehensive "init" service that populates user context, roles, domains, and available templates. |
| `get` | `Organization` | Retrieves organization details and manages organization-level caching. |
| `get` | `SortCriteria` | Fetches and caches sorting rules from `sh.FacetValueLookup` (FT_SORT). |
| `get` | `UserAccount` | Retrieves Moqui security user account and augmented preferences. |
| `get` | `MeetingTemplateIdList` | Finds all templates linked to a party, including relation-mapped ones. |
| `get` | `DescendantList` | Recursively builds a UI-friendly tree of child orgs and people. |
| `get` | `OrgDescendants` | Helper for recursive organization rollup and descendant discovery. |
| `get` | `LinkValidation` | Consolidates validation constraints for an agenda topic. |
| `get` | `MasterDomainRoles` | Resolves names and descriptions for the system's root domain roles. |
| `persist` | `InstanceAgendaTopic` | Orchestrates saving an instance-level topic and linking it to a meeting instance. |
| `persist` | `Pinned` | Manages the `sh.Pinned` entity to toggle topic pinning for orgs/parties. |
| `persist` | `TargetedRelation` | Serializes and persists targeted role/person relationships as `MapLookup` records. |
| `persist` | `ConcreteTopicFacade` | (Legacy) Handles persistence for complex path-based concrete topics. |
| `save` | `Topic` | Core entity writer for `sh.AgendaTopic` and localized `sh.AgendaContent`. |
| `save` | `AgendaTopicConstraint` | Persists domain, permission, and schedule constraints for a topic. |
| `sort` | `FacetValueList` | Standardizes and de-duplicates constraint lists by sorting and looking up Lookup IDs. |
| `persist` | `AgendaTopicFacetValues` | Manages associative links between topics and facet value lookups in `sh.AgendaTopicFacetValueLookup`. |
| `merge` | `FacetValues` | **Core Logic Engine**: Implements hierarchical inheritance (Allow/Deny) of constraints between topics and parents. |
| `get` | `AgendaTopicFacetValues` | Populates a topic's constraint map from its linked database lookups. |
| `get` | `MeetingTemplateFacetValues` | Populates a template's constraint map from its linked database lookups. |
| `get` | `ValidRoleList` | Calculates hierarchical security roles (Owner, OwnerGrp, SuperGrp, etc.) for a user on a topic. |
| `init` | `TargetStorage` | Vivifies sparse map structures in `topicStoreDB` for hierarchical topic storage. |
| `init` | `TransferDataMap` | Ensures standard map nesting for topic/content/thread data before processing. |
| `filter` | `TopicContents` | **Global Search Engine**: Filters topics by template/instance, domain, pinning, and text matching. |
| `filter` | `AgendaTopic` | Granular validator to check if a specific topic matches current filters/roles. |
| `get` | `ContentVersions` | Retrieves historical title/description versions for a topic from the content view. |
| `create` | `Organization` | Wraps Mantle party services and updates hierarchical organization caches. |
| `persist` | `User` | Massive orchestrator for Person, ContactInfo, and UserAccount creation/update. |

## Architectural Patterns Summary

- **Hierarchical Inheritance**: Topics and Templates use a sophisticated "Allow/Deny" facet merging logic to inherit constraints down the tree.
- **Sparse Map Vivification**: Multiple `init` services ensure that deeply nested Groovy maps (`transferDataMap`, `topicStoreDB`) are fully pre-populated to avoid NPEs during processing.
- **Heavy Caching**: Uses `ec.cache` (specifically `shCache`) extensively to store everything from org trees to flattened topic threads, minimizing redundant database hits.
- **Persistence Facades**: Uses "Facade" services to orchestrate complex save operations involving multiple entities (Topics, Content, Facets, Pinned status).
- **Search Engine**: Employs dynamic Groovy scripts to build complex `EntityCondition` objects for full-text and metadata filtering.

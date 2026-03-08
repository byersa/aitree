# Manage Agenda Containers
This screen performs CRUD operations on `AgendaContainer` records.

## Its menu-item name in its parent screen menu will be: "Manage Agenda Containers".

## Specifications:
- **Layout**: Use `<screen-layout>` with `<screen-header>` and `<screen-content>`.
- **Header**: 
  - Title: "Manage Agenda Containers"
  - A `<dynamic-dialog>` button to create a new container. Button text: "Create Container", Icon: "add", Transition: "EditAgendaContainerDialog".
- **Content**:
  - A `<form-list>` named "AgendaContainerList" to display the records.
  - Set `list="containerList"` on the `form-list`.
  - Inside the list, use `<entity-find entity-name="aitree.meeting.AgendaContainer" list="containerList">`
  - Display the following `<field>` elements as columns: `agendaContainerId`, `name`, `shortName`, `containerTypeEnumId`, `statusId`.
  - Add an "Edit" action column: A `<dynamic-dialog>` button for each row. Button text: "Edit", Icon: "edit", Transition: "EditAgendaContainerDialog", passing `agendaContainerId` as a parameter.

# MainInstancePage

## Description
A screen that will serve as the "do all" manager for AgendaContainer records. 
It will work for all containerCategoryEnumIds (ie AitCategoryAbstract, AitCategoryInstance)
and for all containerTypeEnumIds.
It main job will be to implement the <discussion-tree> element.

## web-settings
No content available

## parameter
No content available

## always-actions
No content available

## pre-actions
No content available

## condition
No content available

## actions
No content available

## subscreens
No content available

## transition
No content available

## transition-include
No content available

## widgets
<screen-layout>
    <screen-header>
        <menu-item >
    <screen-content>
        <discussion-tree name="dt_${targetAgendaContainerId}" store-function="useAiTreeStore">

## fail-widgets
No content available

## macro-template
No content available

## Vue and Quasar Integration

### screen-events
No content available

### prop-fields
    targetAgendaContainerId
    meetingInstanceId
    meetingTemplateId
    repositoryMeetingTemplateId
    locale
    loadedInstanceIdList
    threadWidthMap

### computed-fields
    agendaTopicIndex
    sortTypeIdList
    currentAgendaTopicId
    sortDB
    sortList
    orgIdList
    reversedOrgIdList
    partyMap
    borderStyle
    lastInstanceId
    meetingInstance
    departments
    roleTypes
    agendaTopicDB
    meetingInstances
    currentMeetingInstanceId
    currentMeetingTemplateId
    meetingTemplate
    subPath
    shortTopicIdList
    subSortTypeIdArr

### watched-fields
    meetingInstanceId
    status
    sizeTkn
    combinedWidthIndexCount
    currentIncludeDB
    currentAgendaTopicId
    shortTopicIdList
    topicIndex
    agendaTopicIndex
    expanded

### methods
    applyScheduleConstraints
    handleWidthAdjust
    getSizeTkn
    setSizeTkn
    getStatus
    setStatus
    setCombinedWidthIndexCount
    setDragWidthStyle
    processOpen
    handleItemListChanged
    handleAbstractClick
    handleInstanceClick
    handlePersistReturn
    handleAbstractCallback
    handleConcreteCallback
    handleAbstractStoreCallback
    handleConcreteStoreCallback
    startDrag
    endDrag
    handleDragging
    handleDrop
    hidePanel
    getClientWidth
    addSortCategory
    handleShowClick
    getShowList
    getLabel
    getSortedOrderList
    handleChange2AgendaTopicId
    incTopicIndex
    updateIncludedStatusDB
    handleIncludedStatusChanged
    persistStagedIncludedStatusDB
    handleAgendaDialogCallback
    refresh

### custom-data-fields
    sizeTkn: 'md'
    combinedWidthIndexCount: 0
    widthStyle: ''
    status: 'active'
    sortCategoryList: []
    defaultSortCategory: 'roleType'
    deptShowMap: {}
    sortId1: 'roleType'
    sortId2: ''
    counter: 0
    topicIndex: 0
    stagedIncludedStatusDB: {}
    rowCompLoc: "/huddlejs/huddle/agenda/abstract/AbstractAgendaRow.qvt.js"
    childSortTypeId: ''
    showAllLabel: 'Show All'
    timeoutId: ''
    includedChecked: 'Y'
    notIncludedChecked: 'Y'
    showAllScheduled: 'N'
    timeoutInterval: 500
    testId: 1
    expanded: []
    showFilter: false
    filteredIdList: []

### pinia-store-interactions
    // Resolves and provides the store via Vue.provide('discussionStore', resolvedStore)
    // Uses fallback pattern: moqui.useAiTreeStore() -> moqui.useMeetingsStore()

## Quality Assurance

### test-plan
No content available

### test-result
No content available

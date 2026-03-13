# DiscussionDetail

## Description
A screen macro component that will serve as the detailed panel for topics and items. This acts as the Vue equivalent to \`TopicBlkPanel.qvt.js\`.

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
    <screen-content>
        <discussion-detail name="dd_${targetAgendaContainerId}" >

## fail-widgets
No content available

## macro-template
No content available

## Vue and Quasar Integration

### screen-events
No content available

### prop-fields
    parentAgendaTopicId
    meetingInstanceId
    roleTypeId
    abstractSubPath

### computed-fields
    pinName
    rowClass
    pinnedStatus
    isPinned
    pinColor
    includedStatusId
    agendaTopicIdIndex
    meetingTemplate
    meetingInstance
    meetingInstanceMap
    expandName
    bodyExpandName
    subPath
    loadedInstanceIdList
    extendedTopicMap
    eventLine1BasisCls
    expandCollapseCls
    sizeCls
    subSectionCls
    axiosConfig
    threadColClass
    orgGroupId
    threadClass
    threadContentClass
    blkClass
    blkItemClass
    sizeIndices
    minSizeIndex
    midSizeIndex
    maxSizeIndex
    firstColor
    subColor
    currentMeetingInstanceId
    altBlkColClass
    blkColClass
    sectionCls
    expandCls
    collapseCls
    currentAgendaTopicId
    sidebarCls
    showDragStyle
    personAccount

### watched-fields
    agendaTopicIdIndex
    meetingInstance
    expandLevel
    sizeCls

### methods
    getCurrentEventInstanceId
    setCurrentEventInstanceId
    handleDialogCallback
    handleStoreCallback
    handleBodyExpandContract
    handleExpandContract
    completePromise
    handleAddClick
    refresh
    handleEditClick
    handleCallback
    handleReplyClick
    handleDeleteClick
    initIncludeControls
    buildThreadWidthMap
    handleWidthAdjust
    setStatusInSVG
    setStatusInThread
    calcBasis
    handleRowClicked

### custom-data-fields
    pinPopup: false
    expandLevel: 0
    bodyExpandLevel: 1
    parentExpandLevel: 2
    columnLimit: 12
    minColumnSize: 1
    threadWidthMap: {}
    meetingThreadMap: {}
    startX: 0
    blkStartWidMap: {}
    currentEventInstanceId: ''
    svgWid: 16
    svgHgt: 36
    campaignIncludedStatusMap: {}
    isDragging: false
    visibilityMap: {}
    threadTopicIdListMap: {}
    childIncludedStatusMap: {}

### pinia-store-interactions
    Vue.inject('discussionStore');

## Quality Assurance

### test-plan
No content available

### test-result
No content available

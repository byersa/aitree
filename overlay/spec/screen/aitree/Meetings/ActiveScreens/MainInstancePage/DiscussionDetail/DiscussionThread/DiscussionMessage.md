# DiscussionMessage

## Description
A screen macro component that will serve as the inner message component matching a Quasar Tree structure. This acts as the Vue equivalent to \`MeetingThreadBlk.qvt.js\`.

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
        <discussion-message name="dm_${targetAgendaContainerId}" >

## fail-widgets
No content available

## macro-template
No content available

## Vue and Quasar Integration

### screen-events
No content available

### prop-fields
    parentAgendaTopicId
    agendaTopicId
    meetingInstanceId
    roleTypeId
    parentExpandLevel
    isDragging

### computed-fields
    agendaTopicIdIndex
    subPath
    agendaTopic
    borderStyle

### watched-fields
    subPath
    agendaTopicId
    includedStatusId
    meetingInstance
    currentIncludeDB
    agendaTopicIndex

### methods
    getParentChildTopicList
    isTop
    buildChildHeader
    buildChildBody
    showThread
    refresh
    handleCopyClick
    startDataDrag
    handleDrop
    handleDropAndPaste
    handleEditClick
    handleReplyClick
    handleDeleteClick
    handleCallback
    handleIncludedClick
    endDrag
    handleDragging

### custom-data-fields
    title: ''
    noData: false
    expandLevel: 1
    schedOptions: []
    svgWid: 16
    svgHgt: 36
    sizeTkn: 'md'
    combinedWidthIndexCount: 0
    widthStyle: ''
    status: 'active'
    pairedAgendaTopic: null
    includedStatusId: 'ShInclNotUsed'
    isExpandedMap: {}
    expanded: []

### pinia-store-interactions
    Vue.inject('discussionStore');

## Quality Assurance

### test-plan
No content available

### test-result
No content available

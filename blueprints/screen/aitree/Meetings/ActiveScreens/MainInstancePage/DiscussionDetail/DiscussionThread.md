# DiscussionThread

## Description
A screen macro component that will serve as the thread container for a discussion. This acts as the Vue equivalent to \`InstanceBlock.qvt.js\`.

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
        <discussion-thread name="dt_${targetAgendaContainerId}" >

## fail-widgets
No content available

## macro-template
No content available

## Vue and Quasar Integration

### screen-events
No content available

### prop-fields
    parentAgendaTopicId
    meetingTemplateId
    meetingISO

### computed-fields
    subPath
    expandName
    includedStatusId
    agendaTopicIdIndex
    threadTopicIdList
    meetingTemplateName

### watched-fields
    childIncludedStatusMap
    threadTopicIdList

### methods
    getMeetingInstance
    hideBlock
    handleDropAndPaste
    handleTopInstanceAddClick
    handleCallback
    buildSubPath
    handleIncludedStatusClick
    handleIncludedStatusChanged
    processOpen
    handleDragStart
    handleDragEnd
    handleDragOver
    handleDragEnter
    handleDragLeave

### custom-data-fields
    status: 'active'
    sizeTkn: 'md'
    expandLevel: 1
    childIncludedStatusMap: {}
    meetingInstance: null

### pinia-store-interactions
    Vue.inject('discussionStore');

## Quality Assurance

### test-plan
No content available

### test-result
No content available

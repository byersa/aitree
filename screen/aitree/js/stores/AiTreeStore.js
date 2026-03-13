/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

/**
 * AiTreeStore.js
 * 
 * Pinia state management for the AiTree component.
 * Replaces legacy studdleStore functionality with generic handlers for 
 * AgendaContainers and split-screen management.
 */

(function () {
    if (typeof Pinia === 'undefined') {
        console.error('Pinia not found. Cannot define AiTreeStore.');
        return;
    }

    const { defineStore } = Pinia;

    moqui.useAiTreeStore = defineStore('aiTreeStore', {
        state: () => ({
            // List of containers currently active in the split-screen manager
            activeScreenIds: [],
            
            // Map of loaded container data to avoid redundant fetches
            containerMap: {},
            
            // Current user context/permissions
            currentOrgId: null,
            currentPartyId: null,
            
            // Search/Results state
            queryResults: [],
            activeStatusFilter: 'active', // 'active', 'inactive', 'all'
            
            isLoading: false
        }),
        
        getters: {
            activeContainers(state) {
                return state.activeScreenIds.map(id => state.containerMap[id]).filter(id => !!id);
            }
        },
        
        actions: {
            toggleContainerVisibility(containerId) {
                const index = this.activeScreenIds.indexOf(containerId);
                if (index > -1) {
                    this.activeScreenIds.splice(index, 1);
                } else {
                    this.activeScreenIds.push(containerId);
                }
            },
            
            hideContainer(containerId) {
                this.activeScreenIds = this.activeScreenIds.filter(id => id !== containerId);
            },
            
            showContainer(containerId) {
                if (!this.activeScreenIds.includes(containerId)) {
                    this.activeScreenIds.push(containerId);
                }
            },
            
            setContainerData(container) {
                if (container && container.agendaContainerId) {
                    this.containerMap[container.agendaContainerId] = container;
                }
            },
            
            // Generic state increment for triggering reactive updates in Vue components
            // Similar to incAgendaTopicIndexMap in legacy
            triggerRefresh(containerId) {
                // Implementation for forcing updates if necessary
            }
        }
    });
})();

/**
 * ManageMeetingsDialog.qvt.js
 * 
 * The Management Hub for blueprints (abstracts) and their instances.
 */

moqui.ManageMeetingsDialog = {
    name: 'ManageMeetingsDialog',
    template: `
    <q-dialog v-model="isOpen" persistent maximized transition-show="slide-up" transition-hide="slide-down">
        <q-card class="ait-manage-dialog bg-dark text-white">
            <q-toolbar class="bg-primary text-secondary q-pa-md">
                <q-toolbar-title class="text-h5 text-weight-bold">Manage Meetings Hub</q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup class="text-secondary" />
            </q-toolbar>

            <q-card-section class="q-pa-lg scroll" style="max-height: 80vh;">
                <div class="text-subtitle2 q-mb-md text-grey-4">Select a meeting type to manage blueprints or instances.</div>

                <q-list bordered separator class="rounded-borders no-border">
                    <!-- Abstract Meeting Type (e.g., Morning Huddle) -->
                    <q-expansion-item
                        v-for="abstractEntry in abstracts"
                        :key="abstractEntry.agendaContainerId"
                        group="meetings"
                        header-class="ait-abstract-header q-pa-md"
                        @show="fetchInstances(abstractEntry.agendaContainerId)"
                    >
                        <template v-slot:header>
                            <q-item-section avatar>
                                <q-icon name="hub" color="secondary" size="md" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-h6">{{ abstractEntry.name }}</q-item-label>
                                <q-item-label caption class="text-grey-5">{{ abstractEntry.shortName }} Blueprint</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <div class="row q-gutter-sm">
                                    <q-btn flat round color="grey-3" icon="edit" @click.stop="editAbstract(abstractEntry.agendaContainerId)">
                                        <q-tooltip>Edit Blueprint Record</q-tooltip>
                                    </q-btn>
                                    <q-btn flat round color="secondary" icon="add_circle" @click.stop="createInstance(abstractEntry.agendaContainerId)">
                                        <q-tooltip>Create New Instance</q-tooltip>
                                    </q-btn>
                                </div>
                            </q-item-section>
                        </template>

                        <q-card class="bg-grey-9 q-ma-sm rounded-borders shadow-1">
                            <q-card-section>
                                <div class="text-overline text-grey-5 q-mb-sm">Active Sessions</div>
                                <q-list dense padding v-if="instances[abstractEntry.agendaContainerId]?.active.length">
                                    <q-item v-for="inst in instances[abstractEntry.agendaContainerId].active" :key="inst.agendaContainerId">
                                        <q-item-section>
                                            <q-item-label>{{ inst.name }}</q-item-label>
                                            <q-item-label caption class="text-grey-6">Started: {{ inst.fromDate }}</q-item-label>
                                        </q-item-section>
                                        <q-item-section side>
                                            <div class="row q-gutter-xs">
                                                <q-btn flat dense icon="open_in_new" color="secondary" @click="openInstance(inst.agendaContainerId)">
                                                    <q-tooltip>Open in Split View</q-tooltip>
                                                </q-btn>
                                                <q-btn flat dense icon="block" color="negative" @click="deactivateInstance(inst.agendaContainerId)">
                                                    <q-tooltip>Deactivate Session</q-tooltip>
                                                </q-btn>
                                            </div>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-else class="text-caption text-grey-6 q-pa-sm italic">No active sessions for this meeting type.</div>

                                <!-- Sticky Search for History (Internal Expansion) -->
                                <q-expansion-item
                                    dense
                                    icon="history"
                                    label="View History / Inactive"
                                    class="text-grey-4 q-mt-md border-top-dash"
                                    header-class="q-pa-xs"
                                >
                                    <q-card class="bg-darker q-pa-sm">
                                        <q-input
                                            dark
                                            dense
                                            outlined
                                            v-model="lookups[abstractEntry.agendaContainerId].search"
                                            placeholder="Search by name or date..."
                                            class="q-mb-sm"
                                            @keyup.enter="searchHistory(abstractEntry.agendaContainerId)"
                                        >
                                            <template v-slot:append><q-icon name="search" /></template>
                                        </q-input>

                                        <q-list dense padding>
                                            <q-item v-for="hist in instances[abstractEntry.agendaContainerId]?.history" :key="hist.agendaContainerId">
                                                <q-item-section>
                                                    <q-item-label class="text-grey-5">{{ hist.name }}</q-item-label>
                                                    <q-item-label caption class="text-grey-7">{{ hist.fromDate }}</q-item-label>
                                                </q-item-section>
                                                <q-item-section side>
                                                    <q-btn flat dense icon="refresh" color="grey-6" @click="reactivateInstance(hist.agendaContainerId)">
                                                        <q-tooltip>Re-activate History Record</q-tooltip>
                                                    </q-btn>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-card>
                                </q-expansion-item>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-list>
            </q-card-section>
        </q-card>
    </q-dialog>
    `,
    data() {
        return {
            isOpen: false,
            abstracts: [],
            instances: {},
            lookups: {}
        };
    },
    methods: {
        show() {
            this.isOpen = true;
            this.fetchAbstracts();
        },
        fetchAbstracts() {
            // Service call to GetAbstractMeetingBlueprints
            // For now, mockup:
            this.abstracts = [
                { agendaContainerId: 'STF_MORNING_HUDDLE', name: 'Morning Huddle', shortName: 'Morning' },
                { agendaContainerId: 'STF_EVENING_ROUNDS', name: 'Evening Rounds', shortName: 'Evening' }
            ];
            this.abstracts.forEach(a => {
                if (!this.lookups[a.agendaContainerId]) {
                    this.lookups[a.agendaContainerId] = { search: '' };
                }
            });
        },
        fetchInstances(abstractId) {
            const vm = this;
            // Service call to GetMeetingInstancesByCategory
            $.ajax({
                type: 'POST',
                url: '/rest/s1/huddle/GetMeetingInstancesByCategory',
                data: { abstractAgendaContainerId: abstractId },
                dataType: 'json',
                headers: { 'moquiSessionToken': this.moqui.webrootVue.sessionToken },
                success: function (data) {
                    vm.instances[abstractId] = {
                        active: data.activeList || [],
                        history: data.historyList || []
                    };
                }
            });
        },
        openInstance(id) {
            if (window.useMeetingsStore) {
                window.useMeetingsStore().openSession(id);
            }
            this.isOpen = false;
        },
        deactivateInstance(id) {
            if (window.useMeetingsStore) {
                window.useMeetingsStore().closeSession(id);
            }
            // Add service call to deactivate status on server if needed
        },
        editAbstract(id) { console.log('Editing Abstract', id); },
        createInstance(id) { console.log('Creating Instance from', id); },
        searchHistory(id) { console.log('Searching history for', id, this.lookups[id].search); },
        reactivateInstance(id) { console.log('Reactivating history item', id); }
    }
};

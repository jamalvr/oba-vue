<template>
    <div id="home">
        <app-header v-if="!appData.loading"
                    :subject="api.query">
        </app-header>
        <filter-menu v-if="!appData.loading"
                     :subject="api.query"
                     :sortedByYear="appData.sortedByYear"
                     :filtered="appData.filtered"
                     @toggleFilter="filterToggle"
                     @toggleSort="sortToggle">
        </filter-menu>
        <overview v-if="!appData.error" :results="appData.renderedResults"></overview>
        <template v-if="appData.error">
            No results available. Try again.
        </template>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from "../components/AppHeader";
    import AppFooter from "../components/AppFooter";
    import FilterMenu from "../components/FilterMenu";
    import Overview from "../components/Overview";
    
    export default {
        props: {
            appData: Object,
            api: Object,
        },
        methods: {
            // Helper function (could be global)
            sortToggle: function () {
                this.appData.sortedByYear = !this.appData.sortedByYear;
                this.sortHandler();
            },
            filterToggle: function() {
                this.appData.filtered = !this.appData.filtered;
                this.filterHandler();
            },
            sortHandler: function() {
                if (this.appData.sortedByYear) {
                    this.sort(this.appData.renderedResults, 'year');
                } else {
                    this.sort(this.appData.renderedResults, 'title');
                }
            },
            filterHandler: function() {
                if (this.appData.filtered) {
                    this.appData.renderedResults = this.appData.renderedResults.filter(function (bro) {
                        return bro.year > 2000;
                    });
                } else {
                    this.appData.renderedResults = this.appData.results;
                    this.sortHandler();
                }
            },
            sort: function(array, dataString) {
                return array.sort(function (a, b) {
                    if (a[dataString] < b[dataString]) {
                        return -1;
                    }
                    if (a[dataString] > b[dataString]) {
                        return 1;
                    }
                    return 0;
                });
            },
        },
        components: {
            'app-header': AppHeader,
            'app-footer': AppFooter,
            'filter-menu': FilterMenu,
            'overview': Overview,
        }
    }
</script>

<style lang="scss">
    @keyframes color {
        0% {
            background-color: #222;
        }
        50% {
            background-color: #4285f4;
        }
        100% {
            background-color: #222;
        }
    }
    
</style>

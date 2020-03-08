<template>
    <div id="home">
        <app-header v-if="!appData.loading"
                    :subject="api.query">
        </app-header>
        <filter-menu v-if="!appData.loading"
                     :subject="api.query"
                     :sortedByYear="appData.sortedByYear"
                     :filtered="appData.filtered">
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

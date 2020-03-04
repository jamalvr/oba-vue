<template>
    <div id="app" class="container">
        <app-header></app-header>
        <p v-if="loading">Loading...</p>
        <filter-menu @toggleSort="sort"></filter-menu>
        <overview :results="results"></overview>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from "./components/AppHeader";
    import AppFooter from "./components/AppFooter";
    import FilterMenu from "./components/FilterMenu";
    import Overview from "./components/Overview";
    
    export default {
        name: 'App',
        // Data needs to be a function to scope it to this component
        data: function () {
            return {
                results: [],
                loading: false,
                sorted: false,
                api: {
                    cors: 'https://cors-anywhere.herokuapp.com/',
                    endpoint: 'https://zoeken.oba.nl/api/v1/search/?q=',
                    query: 'tolkien',
                    key: '1e19898c87464e239192c8bfe422f280',
                    secret: '4289fec4e962a33118340c888699438d',
                    detail: 'Default',
                }
            }
        },
        // Get data on creation of this instance
        created: function () {
            this.loading = true;
            this.fetchData();
        },
        methods: {
            toggleSort: function() {
                return this.sort(this.results, 'year');
            },
            // Helper function (could be global)
            sort: function() {
                this.sorted = !this.sorted;
                console.log(this.sorted);
            },
            // Fetching API data
            fetchData: function() {
                const url = `${this.api.cors}${this.api.endpoint}${this.api.query}&authorization=${this.api.key}&detaillevel=${this.api.detail}&output=json`;
                const config = {Authorization: `Bearer ${this.api.secret}`};
                
                fetch(url, config)
                    // Arrow functions so 'this' takes parent context
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.loading = false;
                        this.results = data.results;
                        console.log(this.results);
                    })
                    .catch(err => {
                        console.log(err);
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
    // Colors
    $color--primary: pink;
    $color--secondary: #000;
    $color--white: #fff;
    
    // Padding
    $padding--card: 16px;
    $padding--container: 32px;
    
    // Misc
    $border-radius--default: 4px;
    $box-shadow--default: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    
    .container {
        color: $color--white;
        background-color: $color--secondary;
        padding: $padding--container;
    }
</style>

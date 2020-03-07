<template>
    <div id="home" class="container">
        <app-header :subject="api.query"></app-header>
        <p v-if="loading">Loading...</p>
        <filter-menu :sortedByYear="sortedByYear" :filtered="filtered" @toggleFilter="filterToggle" @toggleSort="sortToggle"></filter-menu>
        <overview :results="renderedResults"></overview>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from "../components/AppHeader";
    import AppFooter from "../components/AppFooter";
    import FilterMenu from "../components/FilterMenu";
    import Overview from "../components/Overview";
    
    export default {
        // Data needs to be a function to scope it to this component
        data: function () {
            return {
                loading: false,
                results: [],
                renderedResults: [],
                sortedByYear: false,
                filtered: false,
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
        // Get data after creation of this instance
        created: function () {
            this.loading = true;
            this.fetchData();
        },
        methods: {
            // Helper function (could be global)
            sortToggle: function () {
                this.sortedByYear = !this.sortedByYear;
                this.sortHandler();
            },
            filterToggle: function() {
                this.filtered = !this.filtered;
                this.filterHandler();
            },
            sortHandler: function() {
                if (this.sortedByYear) {
                    this.sort(this.renderedResults, 'year');
                } else {
                    this.sort(this.renderedResults, 'title');
                }
            },
            filterHandler: function() {
                if (this.filtered) {
                    this.renderedResults = this.renderedResults.filter(function (bro) {
                        return bro.year > 2000;
                    });
                } else {
                    this.renderedResults = this.results;
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
            // Fetching API data
            fetchData: function () {
                const url = `${this.api.cors}${this.api.endpoint}${this.api.query}&authorization=${this.api.key}&detaillevel=${this.api.detail}&output=json`;
                const config = {Authorization: `Bearer ${this.api.secret}`};
                
                fetch(url, config)
                // Arrow functions so 'this' takes parent context
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.loading = false;
                        console.log(data);
                        return this.mapData(data.results);
                    })
                    .then(mappedData => {
                        this.results = this.sort(mappedData, 'title');
                        this.renderedResults = this.results;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            mapData: function (data) {
                return data.map(function (object, index) {
                    return data = {
                        img: object.coverimages[1],
                        title: object.titles[0],
                        year: object.year,
                        authors: object.authors.join(', '),
                        id: index,
                        summary: object.summaries,
                    };
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

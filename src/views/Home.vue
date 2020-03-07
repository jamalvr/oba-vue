<template>
    <div id="home">
        <div class="loading-bar" v-if="loading"></div>
        <app-header v-if="!loading" :subject="api.query"></app-header>
        <filter-menu v-if="!loading" :sortedByYear="sortedByYear" :filtered="filtered" @toggleFilter="filterToggle" @toggleSort="sortToggle"></filter-menu>
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
                localData: null,
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
            if('oba-vue' in localStorage) {
                return this.getLocalData();
            } else {
                return this.fetchData();
            }
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
                console.log('Fetch data activated');
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
                        this.storeLocalData(mappedData);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            storeLocalData: function(data) {
                localStorage.setItem('oba-vue', JSON.stringify(data));
            },
            getLocalData: function () {
                this.localData = localStorage.getItem('oba-vue');
                this.results = JSON.parse(this.localData);
                this.loading = false;
                this.renderedResults = this.results;
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
    .loading-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 12px;
        animation-name: color;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

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

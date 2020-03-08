<template>
    <div id="app" class="container">
        <transition name="fade">
            <div v-if="appData.loading" class="loading-bar"></div>
        </transition>
        <!-- Add transition to the rendered view-->
        <transition name="fade">
            <!-- Render desired router view here-->
            <router-view :appData="appData" :api="api"></router-view>
        </transition>
    </div>
</template>

<script>
    import { eventBus } from './main';
    
    export default {
        name: 'App',
        data: function () {
            return {
                appData: {
                    loading: false,
                    error: false,
                    results: [],
                    renderedResults: [],
                    sortedByYear: false,
                    filtered: false,
                    localData: null,
                },
                api: {
                    cors: 'https://cors-anywhere.herokuapp.com/',
                    endpoint: 'https://zoeken.oba.nl/api/v1/search/?q=',
                    query: 'harry potter',
                    key: '1e19898c87464e239192c8bfe422f280',
                    secret: '4289fec4e962a33118340c888699438d',
                    detail: 'Default',
                }
            }
        },
        // Get data after creation of this instance
        created: function () {
            let vm = this;
            
            if ('oba-vue' in localStorage) {
                this.getLocalData();
            } else {
                this.fetchData();
            }
            
            // Eventbus to talk with grandchildren
            eventBus.$on('newRequest', function(data) {
                vm.api.query = data;
                vm.fetchData();
            });
        },
        methods: {
            // Fetching API data
            fetchData: function () {
                const url = `${this.api.cors}${this.api.endpoint}${this.api.query}&authorization=${this.api.key}&detaillevel=${this.api.detail}&output=json`;
                const config = {Authorization: `Bearer ${this.api.secret}`};
                this.appData.loading = true;
                
                fetch(url, config)
                // Arrow functions so 'this' takes parent context
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data.results);
                        if (data.results.length <= 0) {
                            return this.appData.error = true;
                        }
                        this.appData.loading = false;
                        this.appData.error = false;
                        return this.mapData(data.results);
                    })
                    .then(mappedData => {
                        this.appData.results = this.sort(mappedData, 'title');
                        this.appData.renderedResults = this.appData.results;
                        return this.storeLocalData(mappedData);
                    })
                    .catch(err => {
                        console.log(err);
                        this.appData.error = true;
                    });
            },
            storeLocalData: function (data) {
                localStorage.setItem('oba-vue', JSON.stringify(data));
            },
            getLocalData: function () {
                this.appData.localData = localStorage.getItem('oba-vue');
                this.appData.results = JSON.parse(this.appData.localData);
                this.appData.loading = false;
                this.appData.renderedResults = this.appData.results;
            },
            mapData: function (data) {
                return data.map(function (object, index) {
                    return data = {
                        img: object.coverimages[1] ? object.coverimages[1] : 'https://v111.nbc.bibliotheek.nl/thumbnail?uri=http://data.bibliotheek.nl/ggc/ppn/056890680&amp;token=c1322402',
                        title: object.titles[0],
                        year: object.year,
                        authors: object.authors ? object.authors.join(', ') : 'No authors',
                        id: index,
                        summary: object.summaries ? object.summaries[0] : 'No summary',
                    };
                });
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
        }
    }
</script>

<style lang="scss">
    body {
        padding: 0;
        margin: 0;
    }

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
    
    .container {
        padding: 40px;
        color: white;
        background-color: #000;
        min-height: 100vh;
        box-sizing: border-box;
    }
    
    .fade-enter-active, .fade-leave-active {
        transition-property: opacity;
        transition-duration: .2s;
    }
    
    .fade-enter-active {
        transition-delay: .2s;
    }
    
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>

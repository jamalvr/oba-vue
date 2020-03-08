<template>
    <div id="app" class="container">
        <!-- Add transition to the rendered view-->
        <transition name="fade">
            <!-- Render desired router view here-->
            <router-view :appData="appData" :api="api"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data: function () {
            return {
                appData: {
                    loading: false,
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
            this.appData.loading = true;
            if ('oba-vue' in localStorage) {
                console.log('Local data');
                this.getLocalData();
            } else {
                console.log('API fetch');
                return this.fetchData();
            }
        },
        methods: {
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
                        this.appData.loading = false;
                        console.log(data);
                        return this.mapData(data.results);
                    })
                    .then(mappedData => {
                        this.appData.results = this.sort(mappedData, 'title');
                        this.appData.renderedResults = this.results;
                        this.storeLocalData(mappedData);
                    })
                    .catch(err => {
                        console.log(err);
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
                        img: object.coverimages[1],
                        title: object.titles[0],
                        year: object.year,
                        authors: object.authors.join(', '),
                        id: index,
                        summary: object.summaries ? object.summaries[0] : 'Geen samenvatting',
                    };
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

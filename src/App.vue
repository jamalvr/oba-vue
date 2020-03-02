<template>
    <div id="app" class="container">
        <app-header></app-header>
        <filter-menu></filter-menu>
        <overview></overview>
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
        data: function() {
            return {
                apiData: [],
            }
        },
        // Get data on creation of this instance
        created: function() {
            const cors = 'https://cors-anywhere.herokuapp.com/';
            const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
            const query = 'tolkien';
            const key = '1e19898c87464e239192c8bfe422f280';
            const secret = '4289fec4e962a33118340c888699438d';
            const detail = 'Default';
            const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`;
            const config = {
                Authorization: `Bearer ${secret}`
            };
            
            fetch(url, config)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.apiData = data.results;
                    console.log(this.apiData);
                })
                .catch(err => {
                    console.log(err);
                });
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
    // Colors
    $color--primary: pink;
    $color--secondary: #000;
    $color--white: #fff;
    
    // Padding
    $padding--card: 16px;
    $padding--container: 32px;
    
    // Misc
    $border-radius--default: 4px;
    $box-shadow--default: 0px 2px 8px 0px rgba(0,0,0,0.2);

    .container {
        color: $color--white;
        background-color: $color--secondary;
        padding: $padding--container;
    }
</style>

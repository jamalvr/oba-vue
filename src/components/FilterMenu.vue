<template>
    <div class="filter-menu">
        <div class="filter-submenu">
            <h3>{{ titleFilter }}</h3>
            <button @click="toggleFilter" class="sort-bmi">{{ filterButtonText }}</button>
        </div>
        
        <div class="filter-submenu">
            <h3>{{ titleSort }}</h3>
            <button @click="toggleSort" class="filter-bmi">{{ sortButtonText }}</button>
        </div>
        <div class="filter-submenu">
            <h3>Search for:</h3>
            <input type="text" v-model="newSubject" @keyup.enter="newRequest">
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main';
    
    export default {
        props: {
            sortedByYear: Boolean,
            filtered: Boolean,
            subject: String,
        },
        data: function() {
            return {
                newSubject: null,
            }
        },
        computed: {
            // Sort dynamic text
            titleSort: function() {
                return this.sortedByYear ? 'Sorted by year' : 'Sorted alphabetical';
            },
            sortButtonText: function() {
                return this.sortedByYear ? 'Sort alphabetical' : 'Sort by year';
            },
            // Filter dynamic text
            titleFilter: function() {
                return this.filtered ? 'Released after 2000' : 'All books';
            },
            filterButtonText: function() {
                return this.filtered ? 'Show all books' : 'Show books after 2000';
            }
        },
        methods: {
            toggleSort: function() {
                // Emit to parent state
                eventBus.$emit('toggleSort', 'function');
            },
            toggleFilter: function() {
                // Emit to parent state
                eventBus.$emit('toggleFilter', 'function');
            },
            newRequest: function() {
                // Emit to parent state
                if(this.newSubject !== null) {
                    eventBus.$emit('newRequest', this.newSubject);
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .filter-menu {
        display: flex;
        margin-bottom: 32px;
    }
    
    .filter-submenu {
        margin-right: 16px;
    }

    h3 {
        margin: 12px 0;
    }
    
    input {
        border: 0;
        padding: 8px;
        border-radius: 4px;
        font-size: 20px;
    }
    
    button {
        padding: 12px;
        width: 200px;
        text-align: center;
        font-size: 14px;
        border-radius: 4px;
        border: 0;
        background: #304a97;
        color: white;
        cursor: pointer;
        font-weight: bold;
        transition: ease-in-out .2s background;
        
        &:hover {
            background: #5a3097;
        }
    }
</style>

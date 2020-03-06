<template>
    <div class="filter-menu">
        <div class="filter-submenu">
            <h2>{{ titleFilter }}</h2>
            <button @click="toggleFilter" class="sort-bmi">{{ filterButtonText }}</button>
        </div>
        
        <div class="filter-submenu">
            <h3>{{ titleSort }}</h3>
            <button @click="toggleSort" class="filter-bmi">{{ sortButtonText }}</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            sortedByYear: Boolean,
            filtered: Boolean,
        },
        computed: {
            titleSort: function() {
                return this.sortedByYear ? 'Sorted by year' : 'Sorted alphabetical';
            },
            sortButtonText: function() {
                return this.sortedByYear ? 'Sort alphabetical' : 'Sort by year';
            },
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
                this.$emit('toggleSort');
            },
            toggleFilter: function() {
                // Emit to parent state
                this.$emit('toggleFilter');
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

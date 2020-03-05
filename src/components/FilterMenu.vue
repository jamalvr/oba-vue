<template>
    <div class="filter-menu">
        <div class="filter-submenu">
            <h2>Filter</h2>
            <button @click="toggleFilter" class="sort-bmi">Filter</button>
        </div>
        
        <div class="filter-submenu">
            <h3>Sort</h3>
            <button @click="toggleSort" class="filter-bmi">Sort</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {},
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

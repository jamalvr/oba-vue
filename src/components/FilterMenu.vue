<template>
    <div class="filter-menu">
        <div class="filter-submenu">
            <h2>Sort</h2>
            <button class="sort-bmi">Sort</button>
        </div>
        
        <div class="filter-submenu">
            <h3>Filter</h3>
            <button @click="toggleSort" class="filter-bmi">Filter</button>
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

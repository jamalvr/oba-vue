<template>
    <ul class="content">
        <li v-for="result in results" :key="result.id">
            <a class="card" href="/">
                <h2>{{ result.titles[0] }}</h2>
                <img :src="result.coverimages[1]">
                <p>{{ result.year }}</p>
                <p>{{ result.authors.join(', ') }}</p>
            </a>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            results: Array,
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .card {
        color: inherit;
    }
</style>

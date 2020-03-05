<template>
    <ul class="content">
        <li v-for="result in results" :key="result.id">
            <a class="card" href="/">
                <h2>{{ result.title }}</h2>
                <img :src="result.img">
                <p>{{ result.year }}</p>
                <p>{{ result.authors }}</p>
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
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    
    .content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        grid-gap: 16px;
    }
    
    .card {
        display: flex;
        flex-flow: column;
        justify-content: center;
        text-align: left;
    
        color: inherit;
        padding: 16px;
        border-radius: 10px;
        background-color: #2D2D2D;
    }
</style>

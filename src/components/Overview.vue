<template>
    <ul class="content">
        <li v-for="result in results" :key="result.id">
            <router-link class="card" :to="{ name: 'detail', params: { id: result.id }}">
                <div class="image">
                    <img :src="result.img" :alt="result.title">
                </div>
                <div class="info">
                    <h2>{{ result.title }}</h2>
                    <p>Release: {{ result.year }}</p>
                </div>
            </router-link>
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
    
    li {
        display: flex;
    }
    
    h2 {
        margin: 0 0 8px 0;
        font-size: 20px;
    }
    
    .content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        grid-gap: 16px;
    }
    
    .card {
        display: flex;
        flex-flow: row;
        width: 100%;
        text-align: left;
        color: inherit;
        padding: 16px;
        border-radius: 10px;
        background-color: #2D2D2D;
        text-decoration: none;
        transition: ease-in-out background .2s;
        box-sizing: border-box;
        
        .info {
            display: flex;
            flex-flow: column;
        }
        
        img {
            width: 40px;
            height: auto;
        }
        
        .image {
            display: flex;
            align-items: center;
            margin-right: 16px;
        }
        
        &:hover {
            background-color: #3C3B3B;
        }
        
        p {
            margin: 0;
        }
    }
</style>

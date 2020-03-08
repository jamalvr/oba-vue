<template>
    <div id="detail">
        <router-link class="card" to="/">Back to home</router-link>
        <template v-if="!current">
            <h1>404: Woops , this page doesn't exist!</h1>
        </template>
        
        <template v-if="current">
            <h1>{{ current.title }}</h1>
            <img :src="current.img" :alt="current.title">
            <p>{{ current.summary }}</p>
            <p>{{ current.authors }}</p>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            appData: Object,
            api: Object,
        },
        data: function () {
            return {
                // Get id params from current route
                params: this.$route.params,
            }
        },
        computed: {
            current: function() {
                return this.appData.results[this.params.id];
            }
        },
        watch: {
            '$route'(to) {
                this.params = to.params;
            }
        },
    }
</script>


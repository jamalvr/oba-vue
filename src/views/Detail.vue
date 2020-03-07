<template>
    <div id="detail">
        <router-link class="card" to="/">Back to home</router-link>
        <h1>{{ params.title }}</h1>
        <img :src="params.img" :alt="params.title">
        <p>{{ params.summary }}</p>
        <p>{{ params.authors }}</p>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                // Get id params from current route
                params: this.$route.params,
            }
        },
        watch: {
            '$route'(to) {
                this.params = to.params;
            }
        },
        created() {
            console.log(this.$route.params);
        }
    }
</script>


<template>
    <div id="app" class="container">
        <!-- Add transition to the rendered view-->
        <transition name="fade">
            <!-- Render desired router view here-->
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style lang="scss">
    body {
        padding: 0;
        margin: 0;
    }
    
    .container {
        padding: 40px;
        color: white;
        background-color: #000;
        min-height: 100vh;
        box-sizing: border-box;
    }

    .fade-enter-active, .fade-leave-active {
        transition-property: opacity;
        transition-duration: .2s;
    }

    .fade-enter-active {
        transition-delay: .2s;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>

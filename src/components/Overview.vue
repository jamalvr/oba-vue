<template>
    <ul class="content">
        <li>
            <a class="pokemon-card" href="#pokemon/0">
                <h2>bulbasaur</h2>
                <ul class="stats">
                    <li class="order">#1</li>
                    <li class="bmi">BMI: 14</li>
                </ul>
            </a>
        </li>
        
        <li>
            <a class="pokemon-card" href="#pokemon/1">
                <h2>ivysaur</h2>
                <ul class="stats">
                    <li class="order">#2</li>
                    <li class="bmi">BMI: 13</li>
                </ul>
            </a>
        </li>
        
        <li>
            <a class="pokemon-card" href="#pokemon/2">
                <h2>venusaur</h2>
                <ul class="stats">
                    <li class="order">#3</li>
                    <li class="bmi">BMI: 25</li>
                </ul>
            </a>
        </li>
    </ul>
</template>

<script>
    export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .pokemon-card {
        display: flex;
        flex-flow: column;
        justify-content: center;
        text-align: left;
        color: inherit;
        padding: var(--spacing_default);
        border-radius: var(--radius-default);
        background-color: var(--color_secondary);
        box-shadow: var(--shadow-default);
    }
</style>

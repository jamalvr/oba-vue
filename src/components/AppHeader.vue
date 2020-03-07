<template>
  <header>
    <h1>Everything about: {{ subject }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    subject: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>

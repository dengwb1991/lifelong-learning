<template>
  <div class="d-text">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'd-text',
  props: {
    msg: {
      type: String,
      default: '文案'
    }
  }
}
</script>

<style lang="stylus" scoped>
.d-button {
  color: red;
  display: flex;
}
</style>
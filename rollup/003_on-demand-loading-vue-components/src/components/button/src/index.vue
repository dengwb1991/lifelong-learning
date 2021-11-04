<template>
  <div class="d-button">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'd-button',
  props: {
    msg: {
      type: String,
      default: '按钮'
    }
  }
}
</script>

<style lang="less" scoped>
.d-button {
  color: orange;
  display: flex;
}
</style>
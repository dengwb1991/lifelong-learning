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
      default: '按钮'
    }
  }
}
</script>

<style lang="less" scoped>
.d-button {
  color: blueviolet;
  display: flex;
}
</style>
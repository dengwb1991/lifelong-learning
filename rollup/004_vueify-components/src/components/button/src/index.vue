<template>
  <div class="d-button">
    {{msg}}
  </div>
</template>

<script>
import { transformCamelCase } from '../../_common/util'
export default {
  name: 'd-button',
  props: {
    msg: {
      type: String,
      default: '按钮'
    }
  },
  created () {
    transformCamelCase('Abc')
  }
}
</script>

<style lang="stylus" scoped>
.d-button {
  color: color-text-base;
  display: flex;
  font-size: font-minor-large
}
</style>
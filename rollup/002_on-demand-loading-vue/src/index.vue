<template>
  <div class="hello">{{text}}</div>
</template>

<script>
export default {
  name: "hello",
  data () {
    return {
      text: 'rollup'
    }
  }
}
</script>

<style lang="less" scoped>
.hello {
  color: red;
  display: flex;
}
</style>
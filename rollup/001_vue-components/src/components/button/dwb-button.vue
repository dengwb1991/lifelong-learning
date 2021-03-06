<template>
  <div
    class="dwb-button"
    :style="style"
    @click="tapHandler">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DwbButton",
  props: {
    style: {
      type: Object,
      default: {}
    }
  },
  methods: {
    tapHandler (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss">
.dwb-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  word-wrap: break-word;
  white-space: nowrap;
}
</style>
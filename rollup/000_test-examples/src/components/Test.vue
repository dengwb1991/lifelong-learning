<template>
  <div>
    <d-button msg="我是按钮"></d-button>
  </div>
</template>

<script>
import { Button } from 'r-components'

export default {
  components: {
    [Button.name]: Button 
  }  
}
</script>
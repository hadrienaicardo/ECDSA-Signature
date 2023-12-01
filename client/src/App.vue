<template>
  <nav>
  </nav>
    <n-dialog-provider>
    <n-message-provider>
      <router-view />
    </n-message-provider>
    </n-dialog-provider>
</template>

<script>
import { NDialogProvider, NMessageProvider } from 'naive-ui'

export default {

  name: "App",
  components: {
    NMessageProvider,
    NDialogProvider
  },
  methods: {

  }
}
</script>

<style>

</style>
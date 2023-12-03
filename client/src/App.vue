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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');
    .mainPart {
      margin-left: 2%;
      margin-top: 2%;
      margin-right: 2%;
    }

    * {
        font-family: 'Poppins', sans-serif;
    }
    
    .box {
        display: flex;
    }

</style>
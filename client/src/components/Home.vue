<template>
    <div class="mainPart">
        <div class="headerContainer">
            <i class="bx bx-layer logo" />
            <h1>Wallet Alchemy</h1>
        </div>

        <div class="box">
            <n-card class="sender">
                <Wallet />
            </n-card>

            <n-card class="receiver">
                <Transaction />
            </n-card>
        </div>
    </div>
</template>
    
<script>
    import { NFormItem, NPopconfirm, NInput, NDataTable, NButton, useMessage, NCard, NPopover } from 'naive-ui'
    import { ref, reactive, defineComponent, h, computed } from 'vue'
    import { RouterLink } from 'vue-router'
    import Transaction from './Transaction.vue'
    import Wallet from './Wallet.vue'

    
    
    export default defineComponent ({
        components: {
            Wallet, Transaction, NCard, RouterLink
        },
        name: 'Home',
        
        setup (props) {
        
            /* fetch(import.meta.env.VITE_API_URL + '/equipmenttype/',  
            {
                headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                },
            })
                .then(result => result.json())
                .then(result => {
                    equipmentstype.value = result;
                    loadingRef.value = false
                }); */
    
            return {

            }
        }
    })
</script>
    
    
<style scoped>
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

    .sender {
        width: 50%;
        margin-right: 0.5%;
    }

    .receiver {
        width: 50%;
        margin-left: 0.5%;
    }
    
    
    /* CSS du titre/logo */
    
    .logo {
          font-size: 30px;
    }
    
    h1 {
        display: inline-block;
        margin-left: 15px;
        font-weight: 400;
        font-size: 18px;
        vertical-align: top;
    }

    h2 {
        margin-top: 0px;
    }

    
    
    .subtitle {
        margin-left: 15px;
        font-weight: 400;
        font-size: 15px;
        color: rgb(110, 110, 110);
        font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .col-1 {
        flex: 1;
        margin-right: 15px;
    }
    
    .headerContainer {
        display: flex;
        align-items: center;
        margin-bottom : 15px;
    }

    :deep(.n-input) {
        min-width: 200% !important;
    }

     
</style>
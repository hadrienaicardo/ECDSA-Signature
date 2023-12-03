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
    import { NCard } from 'naive-ui'
    import { defineComponent } from 'vue'
    import { RouterLink } from 'vue-router'
    import Transaction from './Transaction.vue'
    import Wallet from './Wallet.vue'

    
    
    export default defineComponent ({
        components: {
            Wallet, Transaction, NCard, RouterLink
        },
        name: 'Home',
        
        setup () {
        

            return {

            }
        }
    })
</script>
    
    
<style scoped>
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

    


    .col-1 {
        flex: 1;
    }
    
    .headerContainer {
        display: flex;
        align-items: center;
        margin-bottom : 15px;
    }


     
</style>
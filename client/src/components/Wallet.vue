<template>                
    <h2>Get balance of address</h2>
    <div class="box">
            <div class="col-1">
                <n-form-item label="Public address" path="publickey">
                    <div>
                        <n-input type="text" v-model:value="publicKey" placeholder="Public Key" />
                    </div>
                </n-form-item>
            </div>
    </div>

    <div class="box">
        <div class="col-1" v-if="balance">
            <label>Balance : {{ balance }}</label>
        </div>
        <div class="col-1" v-if="signature">
            <label>{{ signature.value }}</label>
        </div>
    </div>

    <div class="box">
        <div class="col-1">
            <n-button type="success" @click="getAddressBalance">Get balance</n-button>
        </div>
    </div>

    
</template>

<script>
    import { NFormItem, NPopconfirm, NInput, NDataTable, NButton, useMessage, NCard, NPopover } from 'naive-ui'
    import { ref, reactive, defineComponent, h, computed } from 'vue'
    import { RouterLink } from 'vue-router'
    import { keccak256 } from 'ethereum-cryptography/keccak'
    import { utf8ToBytes } from 'ethereum-cryptography/utils'
    import { secp256k1 } from 'ethereum-cryptography/secp256k1'
    import server from '../scripts/server';
    
    export default defineComponent ({
        components: {
            NFormItem, NPopconfirm, NInput, NDataTable, NButton, NCard, RouterLink, useMessage
        },
        name: 'Wallet',
        
        setup (props) {
            const publicKey = ref(null);
            const balance = ref(null);
            const message = useMessage();

            const getAddressBalance = async() => {
                try {
                let result = await server.get(`balance/${publicKey.value}`)

                if (result.status != 200) {
                    throw new Error("Error when fetching the API");
                }

                balance.value = result.data.balance;

                if (balance.value == 0) {
                    message.error("This address doesn't exist or have empty balance")
                }
                } catch(err) {
                    message.error(`${err}`);
                }
            }
    
            return {
                publicKey,
                balance,
                getAddressBalance
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

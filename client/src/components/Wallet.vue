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
    import { NFormItem, NPopconfirm, NInput, NDataTable, NButton, useMessage, NCard } from 'naive-ui'
    import { ref, defineComponent } from 'vue'
    import { RouterLink } from 'vue-router'
    import server from '../scripts/server';
    
    export default defineComponent ({
        components: {
            NFormItem, NPopconfirm, NInput, NDataTable, NButton, NCard, RouterLink, useMessage
        },
        name: 'Wallet',
        
        setup () {
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

    h2 {
        margin-top: 0px;
    }


</style>

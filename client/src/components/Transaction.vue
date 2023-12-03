<template>                <h2>Send Transaction</h2>
    <div class="box">
            <div class="col-1">
                <n-form-item label="Recipient address" path="recipient">
                    <div>
                        <n-input type="text" v-model:value="recipient" placeholder="Recipient" />
                    </div>
                </n-form-item>
            </div> 

            <div class="col-1">
                <n-form-item label="Your public key" path="publicKey">
                    <div>
                        <n-input type="text" v-model:value="publicKey" placeholder="Your public key" />
                    </div>
                </n-form-item>
            </div> 


            <div class="col-1">
                <n-form-item label="Your private key" path="privateKey">
                    <div>
                        <n-input type="text" v-model:value="privateKey" placeholder="Your private Key" />
                    </div>
                </n-form-item>
            </div> 
        </div>

    <div class="box">
        <div class="col-1">
            <n-form-item label="Amount to send" path="amount">
                <div>
                    <n-input-number type="text" v-model:value="amount" placeholder="Amount to send" :min="0" />
                </div>
            </n-form-item>
        </div>
    </div>

    <div class="box">
        <n-button type="success" @click="sendTransaction">Sign and transfer</n-button>
    </div>
    
</template>

<script>
    import { NInputNumber, NFormItem, NPopconfirm, NInput, NDataTable, NButton, useMessage, NCard, NPopover } from 'naive-ui'
    import { ref, defineComponent } from 'vue'
    import { RouterLink } from 'vue-router'
    import { keccak256 } from 'ethereum-cryptography/keccak'
    import { secp256k1 } from 'ethereum-cryptography/secp256k1'
    import server from '../scripts/server';
    import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";


    
    
    export default defineComponent ({
        components: {
            NInputNumber, NFormItem, NPopconfirm, NInput, NDataTable, NButton, NCard, RouterLink, useMessage
        },
        name: 'Transaction',
        
        setup () {
            const privateKey = ref(null);
            const publicKey = ref(null);
            const recipient  = ref(null);
            const amount = ref(null);
            const message = useMessage();

            const generateKey = () => {
                const newPrivate = toHex(secp256k1.utils.randomPrivateKey());
                const newPublic = toHex(secp256k1.getPublicKey(newPrivate));
                console.log(newPrivate);
                console.log(newPublic);
            }

            const sendTransaction = async() => {

                let hashed = hashMessage(`Envoi de ${parseInt(amount.value)} ETH`);
                let signature = secp256k1.sign(hashed, hexToBytes(privateKey.value));
                signature.r = signature.r.toString()
                signature.s = signature.s.toString()

                let result = await server.post(`send`, {
                    sender: publicKey.value,
                    amount: parseInt(amount.value),
                    recipient: recipient.value,
                    signature: signature
                });

                if (result.status == 200) {
                    message.success("Transfert réussi !");
                } else if (result.status == 400) {
                    message.error("Error : not enough funds !")
                } else if (result.status == 500) {
                    message.error("Error : invalid signature !")
                }
            }

            const hashMessage = (message) => {
                return keccak256(utf8ToBytes(message));
            }

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

            function bigintToUint8Array(value) {
                const buffer = new ArrayBuffer(32);
                const view = new DataView(buffer);

                // Remplir le buffer avec les octets du bigint
                for (let i = 0; i < 32; ++i) {
                    view.setUint8(i, Number(value & BigInt(0xffn)));
                    value >>= BigInt(8);
                }

                return new Uint8Array(buffer);
            }

    
            return {
                privateKey,
                publicKey,
                recipient,
                sendTransaction,
                amount,
                generateKey
            }
        }
    })
</script>

<style scoped>

    h2 {
        margin-top: 0px;
    }

    .n-form-item {
        margin-right: 10px;
    }

</style>

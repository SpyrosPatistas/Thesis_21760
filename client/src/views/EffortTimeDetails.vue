<template>
    <div class="container">
        <p class="error" v-if="error">{{ error }}</p>
        <!-- Page showing the logged person hours for specific contract, shows the contract's id and name (the associated employee and project) -->
        <h1>Details Of Effort In Person Hours</h1>
        <h3>Contract Name: {{ this.contract.name }}</h3>
        <h3>Contract Id: {{ id }}</h3>
        <h3>Person Hours Logged: {{ effortResult }}</h3>
        <h3>Summed Person Hours Logged: {{ this.sum }}</h3>

        <div class="back">
            <router-link :to="{ name: 'TimeSpentComponent' }">
                <button class="button">Back</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import TimeSpentService from '../TimeSpentService'
import ContractService from '../ContractService'
export default{
    data() {
        return {
            id: this.$route.params.send_contract_id,
            error: '',
            effortResult: [],
            contract: '',
            sum: ''
        }
    },
    async created() {
        try {
            this.effortResult = await TimeSpentService.getEffort(this.$route.params.send_contract_id);
            this.contract = await ContractService.getOneContract(this.$route.params.send_contract_id);
            // Following lines set the 'sum' variable to the the total sum of all logged person hours in the current effort
            let total = 0;
            for (let i = 0; i < this.effortResult.length; i++) {
                total = total + this.effortResult[i];
            }
            this.sum = total;
        } catch (err) {
            this.error = err.message;
        }
    }
}
</script>

<style scoped>
  .button {
    background-color: #008B8B;
    border: none;
    color: white;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 10px;
    width: 200px;
  }

  .button:hover {
    background-color: #4CAF50; /* Green */
    color: white;
    cursor: pointer;
  }
</style>
<template>
    <div class="container">
        <!-- Menu for the logged time in contracts -->
        <h1> Logged time of employees </h1>
        <div class="create-effort">
            <label for="create-effort">Enter data for the time spent:</label>
            <br>
            <!-- Dropdown list of all contracts in db, with the associated employee and project as the name that shows -->
            <select class="form-control" v-model="selected">
                <option value="">Choose Contract</option>
                <option id="contractOption" v-for="con in contracts" :value="con._id" :key="con.id">{{ con.name + " - " + con._id }}</option>
            </select>   
            <br>
            <input type="text" id="create-effort" v-model="person_hours" placeholder="Person Hours Spent">
            <br>
            <button class="button" v-on:click="createEffort">Create Effort</button>
        </div>
        <hr>
        <!-- Show person HOURS spent for specific contract -->
        <div class="show-effort">
            <label for="show-effort">Enter which contract's logged effort you wish to see:</label>
            <br>
            <!-- Same use of a dropdown list for all contracts -->
            <select class="form-control" v-model="selected2">
                <option value="">Choose Contract</option>
                <option id="contractOption" v-for="con in contracts" :value="con._id" :key="con.id">{{ con.name + " - " + con._id }}</option>
            </select>
            <br>
            <router-link :to="{ name: 'EffortTimeDetails', params: { send_contract_id: this.selected2 } }">
                <button class="button" v-on:click="showEffort">Show Effort</button>
            </router-link>
        </div>
        <hr>       
        <!-- Show person MONTHS (person hours divided by 143.3) for specific contract -->
        <div class="show-effort-months">
            <label for="show-effort-months">Enter which contract's logged effort you wish to see in person months:</label>
            <br>
            <!-- Same dropdown list that shows all contracts -->
            <select class="form-control" v-model="selected3">
                <option value="">Choose Contract</option>
                <option id="contractOption" v-for="con in contracts" :value="con._id" :key="con.id">{{ con.name + " - " + con._id }}</option>
            </select>
            <br>
            <router-link :to="{ name: 'EffortTimeDetailsMonths', params: { send_contract_id: this.selected3 } }">
                <button class="button" v-on:click="showEffortMonths">Show Effort In Months</button>
            </router-link>
        </div>
        <br>
        <div class="back">
            <router-link :to="{ name: 'MainMenuComponent' }">
                <button class="button">Back</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import TimeSpentService from '../TimeSpentService'
import ContractService from '../ContractService'
export default {
    name: '',
    data() {
        return {
            create_contract_id: '',
            person_hours: '',
            show_contract_id: '',
            show_contract_id_months: '',
            contracts: [],
            selected: '',
            selected2: '',
            selected3: ''
        }
    },
    async created() {
        try {
            this.contracts = await ContractService.getContracts();
        } catch (err) {
            this.error = err.message
        }
    },
    methods: {
        async createEffort() {
            await TimeSpentService.insertEffort(this.selected, this.person_hours);
        },
        async showEffort() {
            await TimeSpentService.getEffort(this.selected2);
        },
        async showEffortMonths() {
            await TimeSpentService.getEffortMonths(this.show_contract_id_months);
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
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 160px;
  }

  .button:hover {
    background-color: #4CAF50; /* Green */
    color: white;
    cursor: pointer;
  }

  input[type=text] {
    width: 10%;
    padding: 5px 10px;
    margin-top: 10px;
    box-sizing: border-box;
  }

  .form-control {
      margin-top: 10px;
      width: 200px;
  }
</style>

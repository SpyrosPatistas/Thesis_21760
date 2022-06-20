<template>
  <div class="container">
    <!-- Menu for contracts -->
    <h1>Contracts Menu</h1>
    <div class="create-contract">
      <!-- 'Form' for the user to enter the data for a new contract -->
      <label for="create-contract">Enter data for new contract:</label>
      <br>
      <!-- Dropdown list with the names of all employees -->
      <select class="form-control" v-model="selectedEmployee">
        <option value="">Choose Employee</option>
        <option id="employeeOption" v-for="emp in employees" :value="emp._id" :key="emp.id">{{ emp.first_name + ' ' + emp.last_name }}</option>
      </select>
      <br>
      <!-- Dropdown list with the titles of all projects -->
      <select class="form-control" v-model="selectedProject">
        <option value="">Choose Project</option>
        <option id="projectOption" v-for="pr in projects" :value="pr._id" :key="pr.id">{{ pr.title }}</option>
      </select>
      <br>
      <label>Start date: </label>
      <input type="date" id="create-employee" v-model="start_date">
      <br>
      <label>End date: </label>
      <input type="date" id="create-employee" v-model="end_date">
      <br>
      <input type="text" id="create-contract" v-model="cost" placeholder="Cost">
      <br>
      <input type="text" id="create-contract" v-model="rate" placeholder="Rate">
      <br>
      <button class="button" v-on:click="createContract">Create Contract</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="contracts-container">
      <!-- List with all existing contracts with their id (not user friendly) and the associated employee and project to make it user friendly -->
      <h2>Contracts</h2>
      <div class="contract" v-for="(contract, index) in contracts" v-bind:item="contract" v-bind:index="index" v-bind:key="contract._id">
        <router-link :to="{ name: 'ContractDetails', params: { id: contract._id } }">
          <!-- Clicking on the contract will redirect to its details page -->
          <div class="id">{{ contract._id }}</div>
          <div class="name">{{ contract.name }}</div>
        </router-link> 
        <!-- Delete button for the contract, not sure if needed -->
        <button class="button" v-on:click="deleteContract(contract._id)">Delete</button>
      </div>
    </div>
    <div class="back">
        <router-link :to="{ name: 'MainMenuComponent' }">
          <button class="button">Back</button>
        </router-link>
    </div>
  </div>
</template>

<script type="text/javascript">
import ContractService from '../ContractService'
import EmployeeService from '../EmployeeService'
import ProjectService from '../ProjectService'
export default {
  name: 'ContractComponent',
  data() {
    return {
      contracts: [],
      error: '',
      employee: '',
      project: '',
      start_date: '',
      end_date: '',
      cost: '',
      rate: '',
      name: '',
      employees: [],
      projects: [],
      selectedEmployee: '',
      selectedProject: ''
    }
  },
  async created() {
    try {
      this.contracts = await ContractService.getContracts();
      this.employees = await EmployeeService.getEmployees();
      this.projects = await ProjectService.getProjects();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createContract() {
      await ContractService.createContractAndUpdate(this.selectedEmployee, this.selectedProject, this.start_date, this.end_date, this.cost, this.rate);
      this.contracts = await ContractService.getContracts();
    },
    async deleteContract(id) {
      await ContractService.deleteContract(id);
      this.contracts = await ContractService.getContracts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.contract {
  position: relative;
  border-radius: 10px;
  color: #444;
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
}

div.contract:hover {
  background-color: #ddd;
}

div.contract a {
  text-decoration: none;
}
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

  input{
    width: 200px;
    padding: 5px 10px;
    margin-top: 10px;
    box-sizing: border-box;
  }

  .form-control {
      margin-top: 10px;
      width: 200px;
  }
</style>

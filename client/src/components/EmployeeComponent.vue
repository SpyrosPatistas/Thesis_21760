<template>
  <div class="container">
    <!-- Menu for employees -->
    <h1>Employees Menu</h1>
    <div class="search-employee">
      <!-- Input of type text where user puts either a VAT number or a last name and it calls a search method. -->
      <label for="search-employee">Search for an employee by entering their VAT number or the employee's last name:</label>
      <br>
      <input type="text" id="search-employee" v-model="search_criteria" placeholder="Employee's VAT/last name">
      <br>
      <!-- The button executes the search by VAT number or last name, sending the input as a parameter for the search -->
      <router-link :to="{ name: 'SearchResults', params: { search_criteria: this.search_criteria } }">
        <button class="button" v-on:click="searchEmployee">Search</button>
      </router-link>
    </div>
    <br>
    <br>
    <!-- 'Form' to enter data for the creation of a new employee -->
    <div class="create-employee">
      <label for="create-employee">Alternatively, enter data for new employee:</label>
      <br>
      <input type="text" id="create-employee" v-model="first_name" placeholder="First name">
      <br>
      <input type="text" id="create-employee" v-model="last_name" placeholder="Last name">
      <br>
      <label>Date of birth: </label>
      <input type="date" id="create-employee" v-model="birth_date">
      <br>
      <input type="text" id="create-employee" v-model="employee_vat" placeholder="VAT number">
      <br>
      <button class="button" v-on:click="createEmployee">Create Employee</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <!-- List of all existing employees -->
    <div class="employees-container">
      <h2>All Employees</h2>
      <div class="employee" v-for="(employee, index) in employees" v-bind:item="employee" v-bind:index="index" v-bind:key="employee._id">
        <router-link :to="{ name: 'EmployeeDetails', params: { id: employee._id } }">
          <!-- Using the employee first and last name as a link to the employee's details -->
          <div class="fname">{{ employee.first_name }} {{ employee.last_name }}</div>
        </router-link> 
        <button class="button" v-on:click="deleteEmployee(employee._id)">Delete</button>
      </div>
    </div>
    <div class="back">
        <router-link :to="{ name: 'MainMenuComponent' }">
          <button class="button">Back</button>
        </router-link>
    </div>
  </div>
</template>

<script>
import EmployeeService from '../EmployeeService'
export default {
  name: 'EmployeeComponent',
  data() {
    return {
      employees: [],
      error: '',
      first_name: '',
      last_name: '',
      birth_date: '',
      employee_vat: '',
      search_criteria: ''
    }
  },
  async created() {
    try {
      this.employees = await EmployeeService.getEmployees();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createEmployee() {
      await EmployeeService.insertEmployee(this.first_name, this.last_name, this.birth_date, this.employee_vat);
      this.employees = await EmployeeService.getEmployees();
    },
    async deleteEmployee(id) {
      await EmployeeService.deleteEmployee(id);
      this.employees = await EmployeeService.getEmployees();
    },
    async searchEmployee() {
      await EmployeeService.searchEmployee(this.search_criteria);
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

div.employee {
  position: relative;
  border-radius: 10px;
  color: #444;
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
}

div.employee:hover {
  background-color: #ddd;
}

div.employee a {
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

  input {
    width: 200px;
    padding: 5px 10px;
    margin-top: 10px;
    box-sizing: border-box;
  }


</style>

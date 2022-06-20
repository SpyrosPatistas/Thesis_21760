<template>
    <div class="container">
      <p class="error" v-if="error">{{ error }}</p>
      <!-- Page showing the results of the search, each result can be clicked to be redirected to the respected employee's details page -->
      <h1>Search results</h1>
      <div class="employee" v-for="(employee, index) in employeesResult" v-bind:item="employee" v-bind:index="index" v-bind:key="employee._id">
        <router-link :to="{ name: 'EmployeeDetailsFromSearch', params: { id: employee._id, search_criteria: this.$route.params.search_criteria } }">
          <div class="fname">{{ employee.first_name }} {{ employee.last_name }}</div>
        </router-link> 
      </div>

      <div class="back">
        <router-link :to="{ name: 'EmployeeComponent' }">
          <button class="button">Back</button>
        </router-link>
      </div>
    </div>
</template>

<script>
import EmployeeService from '../EmployeeService'
export default {
    data() {
        return {
            error: '',
            first_name: '',
            last_name: '',
            projects: [],
            employeesResult: []
        }
    },
    async created() {
        try {
            this.employeesResult = await EmployeeService.searchEmployee(this.$route.params.search_criteria);
        } catch(err) {
            this.error = err.message;
        }
    },
}
</script>

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

</style>
<template>
    <div class="container">
        <p class="error" v-if="error">{{ error }}</p>
        <!-- Page showing the details of the selected project -->
        <h1>Project Details Page</h1>
        <h3>Id: {{ id }}</h3>
        <h3>Title: {{ project.title }}</h3>
        <h3>Acronym: {{ project.acronym }}</h3>
        <h3>Start Date: {{ this.startDate }}</h3>
        <h3>End Date: {{ this.endDate }}</h3>
        <h3>Project Budget: {{ project.project_budget }} euros</h3>
        <h3>Partner Budget: {{ project.partner_budget }} euros</h3>
        <!-- Array showing the names all employees bound to this project with a contract -->
        <h3>Employees: {{ this.employeeNames }}</h3>

        <div class="back">
          <router-link :to="{ name: 'ProjectComponent' }">
            <button class="button">Back</button>
          </router-link>
        </div>
    </div>
</template>

<script>
import ProjectService from '../ProjectService'
import EmployeeService from '../EmployeeService'
export default {
    data() {
        return {
            id: this.$route.params.id,
            error: '',
            project: {},
            title: '',
            acronym: '',
            start_date: '',
            end_date: '',
            project_budget: '',
            partner_budget: '',
            employees: [],
            employeeNames: [],
            contracts: [],
            startDate: '',
            endDate: ''
        }
    },
    async created() {
      try {
        this.project = await ProjectService.getOneProject(this.$route.params.id);
        // Dates were not in a desired format, so they are being reformatted into the preferred one
        let x = this.project.start_date.split('T')[0];
        let y = this.project.end_date.split('T')[0];
        this.startDate = x.split("-").reverse().join("-");
        this.endDate = y.split("-").reverse().join("-");
        // For every employee id inside the project's employee array, the employee object is found and its first and last name are added inside the employeeNamesArray
        for (let index = 0; index < this.project.employees.length; index++) {
          let res = await EmployeeService.getOneEmployee(this.project.employees[index]);
          this.employeeNames.push(res.first_name + ' ' + res.last_name);
          
        }
      } catch(err) {
        this.error = err.message;
      }
    },
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
</style>

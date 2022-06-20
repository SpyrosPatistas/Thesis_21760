<template>
  <div class="container">
      <p class="error" v-if="error">{{ error }}</p>
      <!-- Page showing the details of an employee FROM A SEARCH, different to the normal employee details page. The reason why it is different is because this page's 
      'Back' button returns the user back to the search results -->
      <h1>Employee Details Page</h1>
      <h3>Id: {{ id }}</h3>
      <h3>First Name: {{ employee.first_name }}</h3>
      <h3>Last Name: {{ employee.last_name }}</h3>
      <h3>Date of Birth: {{ this.birthday }}</h3>
      <h3>VAT Number: {{ employee.employee_vat }}</h3>
      <!-- Array with the titles of all projects this employee has a contract with -->
      <h3>Projects: {{ this.projectNames }}</h3>

      <div class="back">
          <router-link :to="{ name: 'SearchResults', params: { search_criteria: this.$route.params.search_criteria } }">
              <button class="button" v-on:click="searchEmployee">Back</button>
          </router-link>
      </div>
  </div>
</template>

<script>
import EmployeeService from '../EmployeeService'
import ProjectService from '../ProjectService'
export default {
    data() {
        return {
            id: this.$route.params.id,
            error: '',
            employee: {},
            first_name: '',
            last_name: '',
            employee_vat: '',
            birth_date: '',
            projects: [],
            search_criteria: '',
            projectNames: [],
            birthday: ''
        }
    },
    async created() {
        try {
            this.employee = await EmployeeService.getOneEmployee(this.$route.params.id);
            // Date of birth was not in the desired format, so it is being reformatted into the preferred one
            let temp = this.employee.birth_date.split('T')[0];
            this.birthday = temp.split("-").reverse().join("-");
            for (let index = 0; index < this.employee.projects.length; index++) {
                let res = await ProjectService.getOneProject(this.employee.projects[index]);
                this.projectNames.push(res.title);
            }
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async searchEmployee() {
            await EmployeeService.searchEmployee(this.$route.params.search_criteria);
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
</style>
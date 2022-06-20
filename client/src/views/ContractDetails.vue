<template>
  <div class="container">
      <p class="error" v-if="error">{{ error }}</p>
      <!-- Page showing the selected contract's details -->
      <h1>Contract Details Page</h1>
      <h3>Contract Id: {{ id }}</h3>
      <h3>Employee Id: {{ contract.employee }}</h3>
      <h3>Employee Associated: {{ emp.first_name + ' ' + emp.last_name }}</h3>
      <h3>Project Id: {{ contract.project }}</h3>
      <h3> Project Associated: {{ pr.title }}</h3>
      <h3>Start Date: {{ this.startDate }}</h3>
      <h3>End Date: {{ this.endDate }}</h3>
      <h3>Cost: {{ contract.cost }} euros</h3>
      <h3>Rate: {{ contract.rate }} euros</h3>
      <!--<h3> {{ contract.name }} </h3>-->

      <div class="back">
        <router-link :to="{ name: 'ContractComponent' }">
          <button class="button">Back</button>
        </router-link>
      </div>
  </div>
</template>

<script>
import ContractService from '../ContractService'
import EmployeeService from '../EmployeeService'
import ProjectService from '../ProjectService'
export default {
    data() {
        return {
            id: this.$route.params.id,
            error: '',
            contract: {},
            employee: '',
            project: '',
            start_date: '',
            end_date: '',
            cost: '',
            rate: '',
            emp: {},
            pr: {},
            startDate: '',
            endDate: ''
        }
    },
    async created() {
        try {
            this.contract = await ContractService.getOneContract(this.$route.params.id);
            this.emp = await EmployeeService.getOneEmployee(this.contract.employee);
            this.pr = await ProjectService.getOneProject(this.contract.project);
            // Date was not in the desired format, so this changes it into the preferred one
            let x = this.contract.start_date.split('T')[0];
            let y = this.contract.end_date.split('T')[0];
            this.startDate = x.split("-").reverse().join("-");
            this.endDate = y.split("-").reverse().join("-");
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
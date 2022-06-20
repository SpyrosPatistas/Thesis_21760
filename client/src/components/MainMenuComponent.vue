<template>
<div class="container">
  <!-- Main menu page, each button redirects to the respective menu-->
  <h1>Main Menu</h1>
  <br>
  <button class="button" v-on:click="goToProjects">Projects</button>
  <br>
  <button class="button" v-on:click="goToEmployees">Employees</button>
  <br>
  <button class="button" v-on:click="goToContracts">Contracts</button>
  <br>
  <button class="button" v-on:click="goToTimeSpent">Time Spent</button>
</div>
</template>

<script>
export default {
  name: 'MainMenuComponent',
  methods: {
    goToProjects() {
      this.$router.push('/projects');
    },
    goToEmployees() {
      this.$router.push('/employees');
    },
    goToContracts() {
      this.$router.push('/contracts');
    },
    goToTimeSpent() {
      this.$router.push('/timespent');
    },
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

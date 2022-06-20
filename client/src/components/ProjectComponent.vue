<template>
  <div class="container">
    <!-- Meny for projects -->
    <h1>Projects Menu</h1>
    <!-- 'Form' to enter data for creation of new project -->
    <div class="create-project">
      <label for="create-project">Enter data for new project:</label>
      <br>
      <input type="text" id="create-project" v-model="title" placeholder="Project title">
      <br>
      <input type="text" id="create-project" v-model="acronym" placeholder="Project acronym">
      <br>
      <label>Start date: </label>
      <input type="date" id="create-project" v-model="start_date">
      <br>
      <label>End date: </label>
      <input type="date" id="create-project" v-model="end_date">
      <br>
      <input type="text" id="create-project" v-model="project_budget" placeholder="Project budget">
      <br>
      <input type="text" id="create-project" v-model="partner_budget" placeholder="Partner budget">
      <br>
      <button class="button" v-on:click="createProject">Create Project</button>
    </div>
    <hr>
    <!-- List of all existing projects -->
    <p class="error" v-if="error">{{ error }}</p>
    <div class="projects-container">
      <h2>Projects</h2>
      <div class="project" v-for="(project, index) in projects" v-bind:item="project" v-bind:index="index" v-bind:key="project._id">
        <router-link :to="{ name: 'ProjectDetails', params: { id: project._id } }">
          <!-- Using the project's title as a link to the project's details -->
          <div class="title">{{ project.title }}</div>
        </router-link> 
        <button class="button" v-on:click="deleteProject(project._id)">Delete</button>
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
import ProjectService from '../ProjectService'
export default {
  name: 'ProjectComponent',
  data() {
    return {
      projects: [],
      error: '',
      title: '',
      acronym: '',
      start_date: '',
      end_date: '',
      project_budget: '',
      partner_budget: ''
    }
  },
  async created() {
    try {
      this.projects = await ProjectService.getProjects();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createProject() {
      await ProjectService.insertProject(this.title, this.acronym, this.start_date, this.end_date, this.project_budget, this.partner_budget);
      this.projects = await ProjectService.getProjects();
    },
    async deleteProject(id) {
      await ProjectService.deleteProject(id);
      this.projects = await ProjectService.getProjects();
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

div.project {
  position: relative;
  border-radius: 10px;
  color: #444;
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
}

div.project:hover {
  background-color: #ddd;
}

div.project a {
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

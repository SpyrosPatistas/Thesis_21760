import axios from 'axios';


const url = 'http://localhost:3000/projectsummary/';

class ProjectService {
  
    // Get all projects
    static async getProjects() {

        const res = await axios.get(url);
 
        try { 
          const data = res.data; 
          return data.map(project => ({  
            ...project
          }));
        } catch (err) { 
          return err;  
        }
  
    }

    // Get one project
    static async getOneProject(id) {
      const res = await axios.get(`${url}${id}`);

      try {
        const data = res.data;
        return data;
      } catch (err) {
        return err;
      }
    }

    // Create project
    static insertProject(title, acronym, start_date, end_date, project_budget, partner_budget) {
        return axios.post(url, {
            title,
            acronym,
            start_date,
            end_date,
            project_budget,
            partner_budget
        });
    }

    // Delete project 
    static async deleteProject(id) {
      const res = await this.getOneProject(id);

      try {
        if(res.employees.length === 0) {
          return axios.delete(`${url}${id}`);
        } else {
          console.log("Cannot delete project because it has related employees!");
        }
      } catch (err) {
        return err;
      }
    }

}

export default ProjectService;
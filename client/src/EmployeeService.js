import axios from 'axios';

// URLs used for back-end calls
const url = 'http://localhost:3000/employeesummary/';
const searchUrl = 'http://localhost:3000/employeesummary/search/';

class EmployeeService {
    // Get all employees
    static async getEmployees() {

        const res = await axios.get(url);
  
        try {
  
          const data = res.data;
  
          return data.map(employee => ({
  
            ...employee
          }));
  
        } catch (err) {
  
          return err;
  
        }
  
    }

    // Get one employee
    static async getOneEmployee(id) {
      const res = await axios.get(`${url}${id}`);

      try {
        const data = res.data;
        return data;
      } catch (err) {
        return err;
      }
    }

    // Create employee
    static insertEmployee(first_name, last_name, birth_date, employee_vat) {
        return axios.post(url, {
            first_name,
            last_name,
            birth_date,
            employee_vat
        });
    }

    // Delete employee
    static async deleteEmployee(id) {
      const res = await this.getOneEmployee(id);

      try {
        if(res.projects.length === 0) {
          return axios.delete(`${url}${id}`);
        } else {
          console.log("Cannot delete employee because they have related projects!");
        }
      } catch (err) {
        return err;
      }
    }

    // Search employee by VAT or last name
    static async searchEmployee(search_criteria) {
      const result = await axios.get(`${searchUrl}${search_criteria}`);

      try {
        const data = result.data;
        return data;
      } catch (err) {
        return err;
      }
    }

}

export default EmployeeService;
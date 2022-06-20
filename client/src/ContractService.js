import axios from 'axios';
import EmployeeService from './EmployeeService';
import ProjectService from './ProjectService';


// Different URLs used for the back-end calls
const url = 'http://localhost:3000/contractsummary/';
const projectURL = 'http://localhost:3000/projectsummary/';
const employeeURL = 'http://localhost:3000/employeesummary/';

class ContractService {
    // Get all contracts
    static async getContracts() {

        const res = await axios.get(url);
  
        try {
  
          const data = res.data;
  
          return data.map(contract => ({
  
            ...contract
          }));
  
        } catch (err) {
  
          return err;
  
        }
  
    }

    // Get one contract
    static async getOneContract(id) {
      const res = await axios.get(`${url}${id}`);

      try {
        const data = res.data;
        return data;
      } catch (err) {
        return err;
      }
    }


    // Create a contract and update the associated employee and project
    static async createContractAndUpdate(employee, project, start_date, end_date, cost, rate) {
      let emp = await EmployeeService.getOneEmployee(employee);
      let pr = await ProjectService.getOneProject(project);
      let name = emp.first_name + " " + emp.last_name + " - " + pr.title;
      return axios.post(url, {
        employee,
        project,
        start_date, 
        end_date,
        cost,
        rate,
        name
      }).then(async res => {
        if(res.status === 201) {

         // If employees array contains the id from the input already, it is not added to the array
          var p = 0;
          for(var i = 0; i < pr.employees.length; i++) {
            if(pr.employees[i] === employee) {
              p = 1;
              break;
            }
          }

          // Otherwise, it is pushed into the array and the respected project object is updated
          if(p === 0) {
            pr.employees.push(employee);

            const updateValue = [{"fieldName": "employees", "fieldValue": pr.employees}];
            axios.patch(`${projectURL}${project}`, updateValue
            ).then(() => null
            ).catch(error => {
              console.error('There was an error: ', error.message);
              return error;
            });
          }

          // Similarly, if the projects array contains the id from the input already, it is not added into the array
          var t = 0;
          for(var k = 0; k < emp.projects.length; k++) {
            if(emp.projects[k] === project) {
              t = 1;
              break;
            }
          }

          // Otherwise, it is pushed into thye array and the respected employee object is updated
          if(t === 0) {
            emp.projects.push(project);
            const toUpdate = [{"fieldName": "projects", "fieldValue": emp.projects}];
            axios.patch(`${employeeURL}${employee}`, toUpdate
            ).then(() => null
            ).catch(error => {
              console.error('There was an error: ', error.message);
              return error;
            });
          }

        }
      }).catch(error => {
        console.error('There was an error:', error.message);
        return error;
      });
      
    }

    // Delete contract
    static deleteContract(id) {
        return axios.delete(`${url}${id}`);
    }

}

export default ContractService;
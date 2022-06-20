import axios from 'axios';

const url = 'http://localhost:3000/contractsummary/';
const urlEnd = '/personhours';
const urlMonths = '/months';

class TimeSpentService {

    // Create Effort
    static insertEffort(contract_id, person_hours) {
        return axios.post(`${url}${contract_id}${urlEnd}`, {
            contract_id,
            person_hours
        }).then(console.log("Successfully added effort!"));
    }

    // Show Effort - returns an array with the logged person hours, each element is a different logged time
    static async getEffort(contract_id) {
        const res = await axios.get(`${url}${contract_id}${urlEnd}`);

        try {
            const data = res.data.hours;
            return data;
        } catch (err) {
            return err;
        }
    }

    // Show Effort in Months
    static async getEffortMonths(contract_id) {
        const res = await axios.get(`${url}${contract_id}${urlEnd}${urlMonths}`);

        try {
            const data = res.data.months;
            return data;
        } catch (err) {
            return err;
        }
    }
}

export default TimeSpentService;
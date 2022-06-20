import {createRouter, createWebHistory} from 'vue-router'
import MainMenuComponent from '@/components/MainMenuComponent'
import ProjectComponent from '@/components/ProjectComponent'
import EmployeeComponent from '@/components/EmployeeComponent'
import ContractComponent from '@/components/ContractComponent'
import ProjectDetails from '@/views/ProjectDetails'
import EmployeeDetails from '@/views/EmployeeDetails'
import ContractDetails from '@/views/ContractDetails'
import SearchResults from '@/views/SearchResults'
import EmployeeDetailsFromSearch from '@/views/EmployeeDetailsFromSearch'
import TimeSpentComponent from '@/components/TimeSpentComponent'
import EffortTimeDetails from '@/views/EffortTimeDetails'
import EffortTimeDetailsMonths from '@/views/EffortTimeDetailsMonths'
import NotFound from '@/views/NotFound'


const routes = [
    {
        path: '/',
        name: 'MainMenuComponent',
        component: MainMenuComponent
    },
    {
        path: '/projects',
        name: 'ProjectComponent',
        component: ProjectComponent
    },
    {
        path: '/projects/:id',
        name: 'ProjectDetails',
        component: ProjectDetails
    },
    {
        path: '/employees',
        name: 'EmployeeComponent',
        component: EmployeeComponent
    },
    {
        path: '/employees/:id',
        name: 'EmployeeDetails',
        component: EmployeeDetails
    },
    {
        path: '/contracts',
        name: 'ContractComponent',
        component: ContractComponent
    },
    {
        path: '/contracts/:id',
        name: 'ContractDetails',
        component: ContractDetails
    },
    {
        path: '/employees/searchresults',
        name: 'SearchResults',
        component: SearchResults
    },
    {
        path: '/employees/searchresults/:id',
        name: 'EmployeeDetailsFromSearch',
        component: EmployeeDetailsFromSearch
    },
    {
        path: '/timespent',
        name: 'TimeSpentComponent',
        component: TimeSpentComponent
    },
    {
        path: '/timespent/personhours',
        name: 'EffortTimeDetails',
        component: EffortTimeDetails
    },
    {
        path: '/timespent/personhours/months',
        name: 'EffortTimeDetailsMonths',
        component: EffortTimeDetailsMonths
    },
    // Catch all 404
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL), routes
})

export default router
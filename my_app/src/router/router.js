import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/LoginForm.vue'
import Register from '../components/RegisterForm.vue'
import TopNavBar from '../components/TopNavBar.vue'
import MainPage from '../components/MainPage.vue'
import InstallDeployment from '../components/InstallDeployment'
import MonitorControl from '../components/MonitorControl'
import WorkSubmit from '../components/WorkSubmit'
const routes = [
  // {
  //   path:'/',
  //   name:'Home',
  //   component:Home
  // },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path:'/',
    name:'/',
    component:TopNavBar
  },
  {
    path:'/mainpage',
    name:'mainpage',
    component:MainPage
  },
  {
    path:'/installdeployment',
    name:'indstalldeployment',
    component:InstallDeployment
  },
  {
    path:'/monitorcontrol',
    name:'monitorcontrol',
    component:MonitorControl
  },
  {
    path:'/worksubmit',
    name:'worksubmit',
    component:WorkSubmit
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

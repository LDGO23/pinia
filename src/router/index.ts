import { createRouter, createWebHistory } from 'vue-router'
import StudentsView from '@/views/StudentsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import StudentView from '@/views/StudentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'students',
      component: StudentsView
    },
    {
      path:'/register',
      name:'register',
      component: RegisterView
    },
    {
      path:'/students/:id',
      name:'student',
      component: StudentView
    }
  ]
})

export default router

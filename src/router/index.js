import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue";
import {useUserStore} from "@/stores/UserStore.js";

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0, behavior: 'smooth' };
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/OrderView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue')
    }
  ]
});


router.beforeEach((to, from, next) => {
  document.body.style.overflowY = '';
  let user = useUserStore();
  if(!user.tried){
    setTimeout(()=>{
      if(((to.name === 'login' || to.name === 'register') && user.user_data.is_auth) || ((to.name === 'admin') && !user.user_data.is_admin)) next({ name: 'home' })
      else if((to.name === 'profile' || to.name === 'order') && !user.user_data.is_auth) next({ name: 'login' })
      else next()
    }, 100);
  }
  else{
    if(((to.name === 'login' || to.name === 'register') && user.user_data.is_auth) || ((to.name === 'admin') && !user.user_data.is_admin)) next({ name: 'home' })
    else if((to.name === 'profile' || to.name === 'order') && !user.user_data.is_auth) next({ name: 'login' })
    else next()
  }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import ListadoProductos from '../views/producto/ListadoProductos.vue'
import AgregarProducto from '../views/producto/AgregarProducto.vue'
import ModificarProducto from '../views/producto/ModificarProducto.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/producto',
    name: 'ListadoProductos', // nombre de la ruta
    component: ListadoProductos
  },
  {
    path: '/producto/create', // URL path
    name: 'AgregarProducto', // nombre de la ruta
    component: AgregarProducto // componente que se llama
  },
  {
    path: '/producto/edit/:id', // por la URL viaja el parametro :id para recibirlo
    name: 'ModificarProducto', // nombre de la ruta
    component: ModificarProducto // componente que se llama
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

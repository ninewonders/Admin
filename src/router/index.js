import { createRouter, createWebHistory } from "vue-router";

import dashboard from "../pages/master/dashboard.vue";

import Category from "../pages/Category.vue";
import Product from "../pages/Product.vue";
import Client from "../pages/Clients.vue";
import Order from "../pages/Orders.vue";
import Auth from "../pages/Auth.vue";
const routes = [
  {
    name: "Auth",
    path: "/",
    component: Auth,
  },
  {
    name: "Dashboard",
    path: "/Dash",
    component: dashboard,
    children: [
      {
        name: "Category",
        path: "/Category",
        component: Category,
      },
      {
        name: "Product",
        path: "/Product",
        component: Product,
      },
      {
        name: "Client",
        path: "/Client",
        component: Client,
      },
      {
        name: "Order",
        path: "/Order",
        component: Order,
      },
    ],
  },
];
const router = Router();
export default router;
function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}

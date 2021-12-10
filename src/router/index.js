import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/search",
		name: "Search",
		component: () => import("../views/Search.vue"),
	},
	{
		path: "/module/:keyId",
		name: "ModuleDetail",
		component: () => import("../views/ModuleDetail.vue"),
	},
	{
		path: "/ahout",
		name: "About",
		component: () => import("../views/About.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

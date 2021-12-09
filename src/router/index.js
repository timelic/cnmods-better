import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home.vue"),
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
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

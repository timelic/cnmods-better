import { createApp, nextTick } from "vue";
import App from "./App.vue";
import naive from "naive-ui";
import router from "./router";

router.afterEach(function (to) {
	nextTick(() => {
		document.body.scrollTo(0, 0);
	});
});

createApp(App).use(naive).use(router).mount("#app");

<template>
	<n-config-provider :theme="darkTheme" :locale="zhCN">
		<n-loading-bar-provider>
			<div id="sidebar">
				<img src="" id="logo" />
				<span class="sidebar-item" @click="toPage('Home')">
					<n-icon size="24">
						<home />
					</n-icon>
					<span>首页</span>
				</span>
				<span
					class="sidebar-item"
					@click="toUrl('https://cnmods.gitbook.io/practice/')"
				>
					<n-icon size="24">
						<book />
					</n-icon>
					<span>专题</span>
				</span>
				<span
					class="sidebar-item"
					@click="
						toUrl('https://www.cnmods.net/#/moduleDetail/tougao')
					"
				>
					<n-icon size="24">
						<upload />
					</n-icon>
					<span>投稿</span>
				</span>
				<span class="sidebar-item" @click="toPage('Favourite')">
					<n-icon size="24">
						<star />
					</n-icon>
					<span>收藏</span>
				</span>
				<span class="sidebar-item info" @click="toPage('About')">
					<n-icon size="24">
						<info />
					</n-icon>
					<span>关于</span>
				</span>
			</div>
			<div>
				<div id="mobile-header">
					<n-icon
						size="20"
						class="mobile-icon"
						@click="toPage('Home')"
					>
						<home-regular />
					</n-icon>
					<n-icon
						size="20"
						class="mobile-icon search"
						@click="toPage('Search')"
					>
						<search-icon />
					</n-icon>
					<n-icon
						size="20"
						class="mobile-icon nav"
						@click="switchExpandMenu"
					>
						<navigation />
					</n-icon>
				</div>
				<n-collapse-transition
					:show="showExpandMenu"
					style="background: #1c1c1c"
				>
					<div
						class="mobile-header-expand-item"
						@click="toUrl('https://cnmods.gitbook.io/practice/')"
					>
						<n-icon size="20" class="mobile-icon">
							<book />
						</n-icon>
						<span>专题</span>
					</div>
					<div
						class="mobile-header-expand-item"
						@click="
							toUrl(
								'https://www.cnmods.net/#/moduleDetail/tougao'
							)
						"
					>
						<n-icon size="20" class="mobile-icon">
							<upload />
						</n-icon>
						<span>投稿</span>
					</div>
					<div
						class="mobile-header-expand-item"
						@click="toPage('About')"
					>
						<n-icon size="20" class="mobile-icon">
							<info />
						</n-icon>
						<span>关于</span>
					</div>
					<div
						class="mobile-header-expand-item"
						v-for="item in advertisementList"
						@click="toUrl(item.linkUr)"
					>
						<n-icon size="20" class="mobile-icon">
							<news />
						</n-icon>
						<span>{{ item.title }}</span>
					</div>
				</n-collapse-transition>
				<div id="header">
					<n-icon
						class="back normal-click"
						size="20"
						@click="router.go(-1)"
						v-if="route.path !== '/'"
					>
						<back />
					</n-icon>
					<n-input
						placeholder="搜索"
						@focus="toPage('Search')"
						v-if="route.path !== '/search'"
					>
						<template #suffix>
							<n-icon>
								<search-icon />
							</n-icon>
						</template>
					</n-input>
				</div>
				<div id="main">
					<router-view></router-view>
				</div>
				<!-- ANCHOR footer html -->
				<Footer />
			</div>
		</n-loading-bar-provider>
	</n-config-provider>
</template>

<script setup>
import { darkTheme } from "naive-ui";
import {
	Search24Regular as SearchIcon,
	Home24Filled as home,
	Home24Regular as HomeRegular,
	BookStar24Filled as book,
	CloudBackup48Filled as upload,
	Info24Filled as info,
	ArrowLeft20Filled as back,
	Navigation24Regular as navigation,
	News24Regular as news,
	Star24Filled as star,
} from "@vicons/fluent";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { zhCN } from "naive-ui";
import Footer from "./components/Footer.vue";

const router = useRouter();
const route = useRoute();
function toPage(name, query) {
	router.push({
		name,
		query,
	});
}
function toUrl(url) {
	window.open(url);
}
const showExpandMenu = ref(false);
function switchExpandMenu() {
	showExpandMenu.value = !showExpandMenu.value;
}
// ANCHOR 获取tm的轮播图列表
const advertisementList = ref({});

// ANCHOR 自执行方法
//
(async () => {
	const resp = await fetch("https://www.cnmods.net/index.do").then(
		(response) => response.json()
	);
	advertisementList.value = resp.data.advertisementList;
})();
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap");
div,
span {
	box-sizing: border-box;
}
#app,
html,
body {
	margin: 0 !important;
	padding: 0 !important;
	font-family: "Open Sans", "Pingfang SC";
	overflow: auto !important;
	color: #eee;
}
body {
	background: #0c0c0c;
	/* background: gray; */
}

::selection {
	color: #fff;
	background: rgb(0, 190, 165);
}
#sidebar {
	width: 60px;
	height: 100vh;
	position: fixed;
	background: black;
	display: flex;
	flex-direction: column;
	padding: 30px 0;
}
/* ANCHOR 尝试解决苹果端100vh问题 */
/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
	#sidebar {
		/* The hack for Safari */
		height: -webkit-fill-available;
	}
}
#sidebar + div {
	width: calc(100vw - 60px);
	background-color: #111;
	position: fixed;
	left: 60px;
	overflow-y: scroll;
	height: 100vh;
	min-height: -webkit-fill-available;
	/* background-image: radial-gradient(closest-corner at 50% 30%, #2d2d2d, #111); */
}
#header {
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
}
#header .n-input {
	width: 379px !important;
}
.sidebar-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: 0.2s;
	margin-bottom: 20px;
	cursor: pointer;
}
.sidebar-item:hover {
	opacity: 0.7;
}
.sidebar-item span {
	font-size: 12px;
	margin-top: 3px;
}
.sidebar-item.info {
	margin-top: auto;
	margin-bottom: 0;
}
.carousel-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	filter: brightness(0.75);
	transition: 0.2s;
}

#card-wrap {
	display: grid;
	grid-template-columns: repeat(3, 33.33%);
	width: 1300px;
	margin: 30px auto;
}

@media screen and (max-width: 1365px) {
	#card-wrap {
		grid-template-columns: repeat(2, 50%);
		width: 860px;
	}
}

.card {
	width: 400px;
	height: 230px;
	background: #242424;
	border-radius: 5px;
	display: inline-block;
	padding: 20px;
	margin-right: 30px;
	margin-bottom: 30px;
	transition: 0.2s;
	cursor: pointer;
	margin-left: 15px;
	/* 为了使它在格子里面居中 */
	border: 1px solid transparent;
	position: relative;
}
.card:hover {
	background: #292929;
	border: 1px solid #7fe7c4;
	/* transform: scale(1.02); */
}
.card:active {
	transform: scale(0.95);
}
.title {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 2px;
}
.name-and-date {
	font-size: 12px;
	color: gray;
	margin-bottom: 6px;
}
.abstract {
	line-height: 1.5rem;
	height: 6rem;
	margin-bottom: 8px;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
	-webkit-line-clamp: 4; /* 控制最多显示几行 */
	-webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
	margin-bottom: 15px;
}
.tag {
	font-size: 12px;
	background-color: rgba(102, 102, 102, 0.19);
	padding: 0.1rem 0.35rem;
	color: rgba(184, 184, 184, 1);
	border-radius: 3px;
	margin-right: 8px;
	flex-shrink: 0;
}
.tag:last-of-type {
	margin-right: 0;
}
.orange {
	background-color: rgba(255, 123, 0, 0.19);
	color: rgb(216, 152, 88);
}
.tags-wrap {
	display: flex;
	flex-wrap: nowrap;
}
.subtitle {
	text-align: center;
	font-size: 1.25rem;
	line-height: 2rem;
	margin-top: 30px;
	/* transform: scaleX(0.9); */
	display: flex;
	justify-content: center;
	align-items: center;
}
.subtitle .n-icon {
	margin-right: 0.25rem;
}
.blue {
	background-color: rgb(57 126 185 / 19%);
	color: rgb(96 155 216);
}
.back {
	position: fixed;
	left: 85px;
	cursor: pointer;
	z-index: 999;
}
.normal-click:hover {
	opacity: 0.8;
}
.normal-click:active {
	transform: scale(0.9);
}

.star {
	position: absolute;
	right: 22.5px;
	top: 24.5px;
	z-index: 99;
	cursor: cell;
	opacity: 0;
	transition: 0.2s;
}
.star > svg {
	position: absolute;
	right: 0px;
	top: 0;
}
.card:hover .star {
	opacity: 1;
}
.pre-space {
	white-space: pre;
}

#main {
	min-height: -webkit-fill-available;
}
#mobile-header {
	display: none;
}
.only-show-on-mobile {
	display: none;
}
.only-show-on-large-screen {
	display: flex;
}

@media (max-width: 930px) {
	/* 这应该包括了ipad普通版在内的所有手机端 */
	#sidebar {
		display: none;
	}
	#sidebar + div {
		width: 100%;
		left: 0;
	}
	#card-wrap {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 20px auto;
		align-items: center;
	}
	.card {
		width: calc(100% - 20px);
		height: 230px;
		margin: 0;
		margin-bottom: 10px;
		overflow: hidden;
		padding: 15px;
		height: 225px;
		background: #1d1d1d;
	}

	.card {
		max-width: 500px;
	}
	#header {
		display: none;
	}
	.back {
		display: none;
	}
	.tags-wrap {
		overflow: hidden;
	}
	#module-wrap {
		width: calc(100% - 40px) !important;
		padding-top: 40px !important;
	}
	#mobile-header {
		height: 50px;
		background: #1c1c1c;
		display: block;
		display: flex;
		align-items: center;
		padding: 0 17.5px;
	}
	.mobile-icon.nav {
		margin-left: 15px;
	}
	.mobile-icon.search {
		margin-left: auto;
	}
	.mobile-header-expand-item {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 15px;
		cursor: pointer;
	}
	.mobile-header-expand-item:last-of-type {
		height: 50px;
		padding-bottom: 10px;
		/* 让最下方有一点视觉上的空余 */
	}
	.mobile-header-expand-item .n-icon {
		margin-right: 30px;
	}
	.subtitle {
		margin-top: 20px;
	}
	.module-title {
		font-size: 2.5rem !important;
	}
	#main {
		padding: 10px 0;
	}
	.only-show-on-mobile {
		display: flex;
	}
	.only-show-on-large-screen {
		display: none !important;
	}
	div:hover,
	span:hover {
		border: none !important;
	}
}
</style>

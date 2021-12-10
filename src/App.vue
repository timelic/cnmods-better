<template>
	<n-config-provider :theme="darkTheme">
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
				@click="toUrl('https://www.cnmods.net/#/moduleDetail/tougao')"
			>
				<n-icon size="24">
					<upload />
				</n-icon>
				<span>投稿</span>
			</span>
			<span class="sidebar-item info">
				<n-icon size="24">
					<info />
				</n-icon>
				<span>关于</span>
			</span>
		</div>
		<div>
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
			<div id="footer">This is a footer.</div>
		</div>
	</n-config-provider>
</template>

<script setup>
import { darkTheme } from "naive-ui";
import {
	Search24Regular as SearchIcon,
	Home24Filled as home,
	BookStar24Filled as book,
	CloudBackup48Filled as upload,
	Info24Filled as info,
	ArrowLeft20Filled as back,
} from "@vicons/fluent";
import { useRouter, useRoute } from "vue-router";
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
	border-right: 1px solid #1d1d1d;
	display: flex;
	flex-direction: column;
	padding: 30px 0;
}
#sidebar + div {
	width: calc(100vw - 60px);
	background-color: #111;
	position: fixed;
	left: 60px;
	overflow-y: scroll;
	height: 100vh;
	min-height: 100vh;
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
.n-carousel {
	--width: 1190px;
	width: var(--width);
	height: 297px;
	margin-top: 20px;
	border-radius: 5px;
	display: inline-block;
	position: relative;
	margin-left: calc((100% - var(--width)) / 2);
	cursor: pointer;
	transition: 0.2s;
}

#card-wrap {
	display: grid;
	grid-template-columns: repeat(3, 33.33%);
	width: 1300px;
	margin: 30px auto;
}

@media screen and (max-width: 1300px) {
	#card-wrap {
		grid-template-columns: repeat(2, 50%);
		width: 860px;
	}
	.n-carousel {
		--width: 830px;
		width: var(--width);
		height: calc(var(--width) / 4);
		margin-left: calc((100% - var(--width)) / 2);
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
	font-size: 1.5rem;
	line-height: 2rem;
	margin-top: 30px;
	transform: scaleX(0.9);
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
.carousel-mask {
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(
		to bottom,
		transparent 50%,
		#00000063 100%
	);
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99;
}
.n-carousel > div > div > div {
	/* mask的上一层 */
	position: relative;
}
.carousel-mask > div {
	/* hover mask 可以显示文字 */
	font-size: 2rem;
	font-weight: bold;
	transition: 0.2s;
	color: transparent;
}
.carousel-mask:hover + .carousel-img {
	filter: brightness(0.5);
}
.carousel-mask:hover > div {
	color: white;
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
#footer {
	display: block;
	height: 4rem;
	background-color: #1c1c1c;
	text-align: center;
	position: relative;
	line-height: 4rem;
	font-family: "Courier New", Courier, monospace;
	color: gray;
}
#main {
	min-height: calc(100vh - 80px - 4rem);
}
@media (max-width: 768px) {
	/* 这应该包括了ipad普通版在内的所有手机端 */
	#sidebar {
		display: none;
	}
	#sidebar + div {
		width: 100%;
		background-color: #111;
		position: fixed;
		left: 0;
		overflow-y: scroll;
		height: 100vh;
		min-height: 100vh;
	}
	#card-wrap {
		display: flex;
		flex-direction: column;
		grid-template-columns: repeat(3, 33.33%);
		width: 100%;
		margin: 30px auto;
		align-items: center;
	}
	.card {
		width: calc(100% - 20px);
		height: 230px;
		margin: 0;
		margin-bottom: 10px;
		overflow: hidden;
	}
	.n-carousel {
		--width: 500px;
		width: var(--width);
		height: calc(var(--width) / 4);
		margin-left: calc((100% - var(--width)) / 2);
	}
	#header .n-input {
		width: calc(100% - 20px) !important;
	}
	.carousel-mask {
		display: none;
	}
	.carousel-mask > div {
		/* hover mask 可以显示文字 */
		font-size: 1rem;
		color: transparent !important;
	}
	.back {
		display: none;
	}
	#real-search {
		width: calc(100% - 20px) !important;
		margin-left: 10px !important;
	}
	.search-options {
		display: flex;
		flex-wrap: wrap;
		width: calc(100% - 20px) !important;
		margin: none;
		padding-left: 0 !important;
	}
	.search-options > * {
		margin-bottom: 10px;
	}
	.search-options + #card-wrap {
		margin-top: 10px;
	}
	.tags-wrap {
		overflow: hidden;
	}
	#module-wrap {
		width: calc(100% - 40px) !important;
		padding-top: 40px !important;
	}
}
</style>

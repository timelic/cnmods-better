<template>
	<div id="module-wrap">
		<div class="module-title">{{ module_data.module.title }}</div>
		<div class="module-name-and-date pre-space">
			{{
				`${module_data.module.article}   ${module_data.module.releaseDate}`
			}}
		</div>
		<div class="module-abstract normal-text">
			{{ module_data.module.opinion }}
		</div>

		<!-- ANCHOR 原生 -->
		<span class="download-btn" @click="toUrl(module_data.module.url)">
			<n-icon size="18">
				<download />
			</n-icon>
			<span>下载</span>
		</span>

		<!-- naiveui按钮  -->
		<!-- <n-button
			type="primary"
			round
			class="download-btn-new"
			@click="toUrl(module_data.module.url)"
		>
			<template #icon>
				<n-icon>
					<download />
				</n-icon>
			</template>
			下载
		</n-button> -->

		<div class="module-part">
			<div class="module-part-subtitle">推荐语</div>
			<div v-for="item in module_data.recommendList">
				<div class="module-part-content normal-text">
					{{ item.content }}
				</div>
				<div class="module-part-small-text pre-space">
					{{
						`${
							item.loginUser.nickName
						}   ${item.loginUser.createTime.substring(0, 10)}`
					}}
				</div>
			</div>
		</div>
		<div class="module-part">
			<div class="module-part-subtitle">版权声明</div>
			<div class="module-part-content">本作品为原创作品</div>
		</div>
		<div class="module-part">
			<div class="module-part-subtitle">联系投稿人</div>
			<div class="module-part-content module-contact">
				<n-icon size="16">
					<mail />
				</n-icon>
				<span
					><a :href="`mailto:${module_data.module.email}`">{{
						module_data.module.email
					}}</a></span
				>
			</div>
			<div
				class="module-part-content module-contact"
				v-if="module_data.module.qq"
			>
				<img src="../assets/QQ.svg" style="width: 16px; height: 16px" />
				<span>{{ module_data.module.qq }}</span>
			</div>
		</div>
		<div class="module-part">
			<div class="module-part-subtitle" v-if="other_module.length">
				该投稿人的其他投稿
			</div>
			<span class="card" v-for="item in other_module" :key="item">
				<div class="title">{{ item.title }}</div>
				<div class="name-and-date">
					{{ item.article + "   " + item.releaseDate }}
				</div>
				<div class="abstract">
					{{ item.opinion }}
				</div>
				<div class="tags-wrap">
					<span
						class="tag"
						:class="item.original ? 'orange' : 'blue'"
						>{{ item.original ? "原创" : "翻译" }}</span
					>
					<!-- <span class="tag orange">上周更新</span> -->
					<span class="tag" v-if="item.moduleVersion">{{
						item.moduleVersion
					}}</span>
					<span class="tag" v-if="item.moduleAge">{{
						item.moduleAge
					}}</span>
					<span class="tag" v-if="item.occurrencePlace">{{
						item.occurrencePlace
					}}</span>
					<span class="tag" v-if="item.minDuration">{{
						`${item.minDuration}-${item.maxDuration}h`
					}}</span>
					<span class="tag" v-if="item.minAmount">{{
						`${item.minAmount}-${item.maxAmount}人`
					}}</span>
				</div>
			</span>
		</div>
	</div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
import {
	ArrowDownload20Filled as download,
	Mail24Filled as mail,
} from "@vicons/fluent";

import { useLoadingBar } from "naive-ui";
const loadingBar = useLoadingBar();

const keyId = route.params.keyId;
const module_data = ref({});

const other_module = ref([]);

// 获取数据
(async () => {
	loadingBar.start(); // 启动加载条
	const resp = await fetch(
		`https://www.cnmods.net/index/moduleDetail.do?keyId=${keyId}`
	).then((response) => response.json());
	module_data.value = resp.data;
	console.log(resp.data);
	// 这个后端是不是nt啊 怎么写的
	const res = await fetch(
		`https://www.cnmods.net/index/articleModules.do?keyId=${keyId}`
	).then((response) => response.json());
	other_module.value = res.data;
	loadingBar.finish(); // 启动加载条
})();
function toUrl(url) {
	window.open(url);
}
</script>

<style scoped>
#module-wrap {
	width: 550px;
	text-align: center;
	margin: 0 auto;
	padding-top: 80px;
}

.module-title {
	font-size: 3rem;
	font-family: "微软雅黑";
	font-weight: bold;
	letter-spacing: 0.2rem;
	color: gainsboro;
	margin-bottom: 10px;
}

.module-name-and-date {
	font-weight: bold;
	color: gainsboro;
	margin-bottom: 30px;
}
.normal-text {
	font-size: 14px;
	font-weight: 500;
	line-height: 29px;
	text-align: center;
	color: #ffffff;
}

.module-part-subtitle {
	/* 推荐语 */
	font-size: 18px;
	font-weight: bold;
	color: #f0f0f0;
	margin-bottom: 17px;
}

.module-part-small-text {
	/* by章鱼2021-12-01 */
	font-size: 12px;
	font-weight: 500;
	line-height: 28px;
	color: #c8c8c8;
}

.download-btn {
	display: inline-block;
	width: 93px;
	height: 31px;
	border-radius: 54px;
	background: #292929;
	display: flex;
	margin: 50px auto 60px;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: 0.2s;
	user-select: none;
}
.download-btn-new {
	margin: 50px auto 60px;
	transition: 0.2s;
}
.download-btn-new:active {
	transform: scale(0.95);
}
.download-btn:hover {
	/* filter: brightness(1.1); */
	background: #7fe7c4;
	color: black;
}
.download-btn:active {
	transform: scale(0.95);
}
.download-btn .n-icon {
	margin-right: 4px;
}

.module-contact {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: small;
	opacity: 0.9;
	line-height: 2rem;
}
.module-contact .n-icon {
	margin-right: 5px;
}
.module-contact img {
	margin-right: 5px;
}
.module-part {
	margin-bottom: 50px;
}

.card {
	background: transparent;
	width: 100%;
	margin: 0;
	height: auto;
}
.card:hover {
	opacity: 0.8;
}
.tags-wrap {
	justify-content: center;
}
.title {
	font-size: 1rem;
}
.abstract {
	height: auto;
	margin-bottom: 16px;
}
.module-contact a {
	color: #f0f0f0;
	text-decoration: none;
}
.module-contact a:hover {
	text-decoration: underline;
}
</style>

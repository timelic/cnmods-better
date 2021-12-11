<template>
	<n-input
		id="real-search"
		placeholder="搜索"
		:autofocus="true"
		v-model:value="input_value"
		:input-props="{ type: 'search' }"
		@keyup.enter="search"
	>
		<template #suffix>
			<n-icon @click="search" style="cursor: pointer" class="search-icon">
				<search-icon />
			</n-icon>
		</template>
	</n-input>
	<div class="search-options">
		<n-select
			placeholder="类别"
			v-model:value="selected_catagory"
			:options="catagory_list"
		/>
		<n-select
			placeholder="来源"
			v-model:value="source_catagory"
			:options="source_list"
		/>
		<div class="slider-wrap">
			<span>人数</span>
			<n-slider
				v-model:value="player_num"
				:min="1"
				:max="10"
				:tooltip="false"
			/>
			<span>{{ player_num }} 人</span>
		</div>
		<div class="slider-wrap">
			<span>时长</span>
			<n-slider
				v-model:value="player_hours"
				:min="1"
				:max="10"
				:tooltip="false"
			/>
			<span>{{ player_hours }} 时</span>
		</div>
		<n-radio-group v-model:value="updateLastWeek" @click="handleBtn">
			<n-radio-button value="上周更新">上周更新</n-radio-button>
		</n-radio-group>
		<n-radio-group v-model:value="recommended" @click="handleBtn(flase)">
			<n-radio-button value="编辑推荐">编辑推荐</n-radio-button>
		</n-radio-group>
	</div>
	<div id="card-wrap">
		<span
			class="card"
			v-for="x in 18"
			v-if="!Object.keys(search_result).length"
		></span>
		<span
			class="card"
			v-for="item in search_result"
			:key="item"
			@click="toPageByPath(`/module/${item.keyId}`)"
		>
			<div class="title">{{ item.title }}</div>
			<div class="name-and-date">
				{{ item.article + "   " + item.releaseDate }}
			</div>
			<div class="abstract">
				{{ item.opinion }}
			</div>
			<div class="tags-wrap">
				<span class="tag" :class="item.original ? 'orange' : 'blue'">{{
					item.original ? "原创" : "翻译"
				}}</span>
				<span class="tag orange" v-if="item.updateLastWeek"
					>上周更新</span
				>
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
					item.minDuration !== item.maxDuration
						? `${item.minDuration}-${item.maxDuration} h`
						: `${item.minDuration}h`
				}}</span>
				<span class="tag" v-if="item.minAmount">{{
					item.minAmount !== item.maxAmount
						? `${item.minAmount}-${item.maxAmount}人`
						: `${item.minAmount}人`
				}}</span>
			</div>
		</span>
	</div>
	<n-pagination
		v-model:page="page"
		v-model:page-size="pageSize"
		:item-count="totalElements"
		show-size-picker
		:page-sizes="[18, 36]"
		show-quick-jumper
	/>
</template>

<script setup>
import { Search24Regular as SearchIcon } from "@vicons/fluent";
import { ref, watch } from "vue";
import { useLoadingBar } from "naive-ui";
const loadingBar = useLoadingBar();

const search_result = ref({});

const player_num = ref("");
const player_hours = ref("");
const catagory_list = [
	{ label: "COC", value: "1" },
	{ label: "DND", value: "2" },
	{ label: "其他", value: "3" },
];
const source_list = [
	{ label: "原创", value: "1" },
	{ label: "翻译", value: "2" },
];
const selected_catagory = ref(null);
const source_catagory = ref(null);
const updateLastWeek = ref(null);
let flag_updateLastWeek = false;
const recommended = ref(null);
let flag_recommended = false;

const input_value = ref("");

function handleBtn(p) {
	// 一个写的很烂的东西 但是能用 这是为了用好看的按钮的妥协
	if (p) {
		flag_updateLastWeek = !flag_updateLastWeek;
		if (flag_updateLastWeek) updateLastWeek.value = null;
	} else {
		flag_recommended = !flag_recommended;
		if (flag_recommended) recommended.value = null;
	}
	console.log("click");
	search();
}

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
function toPageByPath(path) {
	router.push(path);
}

async function search() {
	loadingBar.start(); // 启动加载条
	const data = {
		moduleAge: "",
		occurrencePlace: "",
		duration: player_hours.value,
		amount: player_num.value,
		original: "",
		releaseDateAsc: "",
		moduleVersion: "",
		freeLevel: "",
		structure: "",
		title: input_value.value,
		page: page.value,
		pageSize: pageSize.value,
		moduleType: "",
		updateLastWeek: Boolean(updateLastWeek.value) || "",
		command: Boolean(recommended.value) || "",
	};
	console.log(data);
	console.log(updateLastWeek.value);
	const data_str = Object.keys(data)
		.map((key, index) => `${key}=${Object.values(data)[index]}`)
		.reduce((total, item) => total + "&" + item);
	const url = `https://www.cnmods.net/index/moduleListPage.do?${data_str}`;
	const resp = await fetch(url).then((response) => response.json());
	console.log(resp);
	search_result.value = resp.data.list;
	totalElements.value = resp.data.totalElements;
	loadingBar.finish(); // 结束加载条
}

// 分页的逻辑

const page = ref(1);
const pageSize = ref(18);
const totalElements = ref();

watch(page, search);
watch(pageSize, search);
(async () => {
	search();
})();
</script>

<style scoped>
.search-options {
	display: flex;
	width: 840px;
	margin: 10px auto 0;
	padding-left: 5px;
}
.search-options > * {
	margin-right: 10px;
}
.n-select {
	width: 100px;
}
.slider-wrap {
	width: 220px;
	display: flex;
	color: #ccc;
	background: #292929;
	align-items: center;
	padding: 0 0.75rem;
	border-radius: 3px;
	height: 34px;
}
.n-slider {
	margin: 0 0.5rem 0 0.25rem;
}
.slider-wrap > span {
	/* width: 4rem; */
	flex-shrink: 0;
}
.slider-wrap > div {
	margin: 0 10px;
}
@media screen and (min-width: 1300px) {
	.search-options {
		display: flex;
		width: 1300px;
		margin: 30px auto 0;
		padding: 0 10px 0 15px;
	}
	.n-select {
		width: 200px;
	}

	.slider-wrap {
		width: 300px;
	}
	.n-radio-button {
		width: 120px;
		display: flex;
		justify-content: center;
	}
}
#real-search {
	margin: auto;
	margin-left: calc((100% - 379px) / 2);
	position: absolute;
	width: 379px;
	top: calc((80px - 34px) / 2);
}
.n-pagination {
	margin-bottom: 60px;
	justify-content: center;
}
</style>

<style>
/* 修改圆圈的大小 */
.n-slider-handle {
	width: 14px !important;
	height: 14px !important;
	filter: brightness(0.8);
}
/* 搜索按钮加上动画 */
.search-icon {
	transition: 0.2s !important;
}
.search-icon:hover {
	transform: scale(1.2);
}
.search-icon:active {
	transform: scale(1);
	opacity: 0.5;
}
</style>

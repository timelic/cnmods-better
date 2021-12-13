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
		<!-- <n-select
			placeholder="类别"
			v-model:value="selected_catagory"
			:options="catagory_list"
		/> -->
		<!-- ANCHOR 级联选择 HTML -->
		<n-cascader
			v-model:value="selected_catagory"
			placeholder="类别"
			:options="options"
			:leaf-only="false"
			:on-blur="handleSelectedCatagoryBlur"
			:multiple="true"
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
				:min="0"
				:max="10"
				:tooltip="false"
			/>
			<span>{{ player_num ? `${player_num} 人` : "不限" }}</span>
		</div>
		<div class="slider-wrap">
			<span>时长</span>
			<n-slider
				v-model:value="player_hours"
				:min="0"
				:max="20"
				:tooltip="false"
			/>
			<span>{{ player_hours ? `${player_hours} 时` : "不限" }} </span>
		</div>
		<div class="updateLastWeek-recommend-wrap">
			<span
				class="updateLastWeek-recommend-item"
				:class="
					updateLastWeek
						? 'updateLastWeek-recommend-item-active'
						: null
				"
				@click="handleBtn(true)"
				>上周更新</span
			>
			<span
				class="updateLastWeek-recommend-item"
				:class="
					recommended ? 'updateLastWeek-recommend-item-active' : null
				"
				@click="handleBtn()"
				>编辑推荐</span
			>
		</div>
	</div>
	<div id="card-wrap">
		<span
			class="card"
			v-for="x in 18"
			v-if="!Object.keys(search_result).length && !has_get_search_result"
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
		class="flex only-show-on-large-screen"
	/>
	<n-pagination
		v-model:page="page"
		:item-count="totalElements"
		:page-slot="5"
		class="only-show-on-mobile flex"
	/>
</template>

<script setup>
import { Search24Regular as SearchIcon } from "@vicons/fluent";
import { ref, watch } from "vue";
import { useLoadingBar } from "naive-ui";
const loadingBar = useLoadingBar();

const search_result = ref({});

const has_get_search_result = ref(false); // 如果已经拿到了数据 就不应该再显示骨架屏

const player_num = ref(0);
const player_hours = ref(0);
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
const recommended = ref(null);

const input_value = ref("");

function handleBtn(p) {
	// 一个写的很烂的东西 但是能用 这是为了用好看的按钮的妥协
	// 这么写是为了它可能为空
	if (p) {
		if (updateLastWeek.value) updateLastWeek.value = false;
		else updateLastWeek.value = true;
	} else {
		if (recommended.value) recommended.value = false;
		else recommended.value = true;
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
		duration: player_hours.value || "",
		amount: player_num.value || "",
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
	const data_str = Object.keys(data)
		.map((key, index) => `${key}=${Object.values(data)[index]}`)
		.reduce((total, item) => total + "&" + item);
	const url = `https://www.cnmods.net/index/moduleListPage.do?${data_str}`;
	const resp = await fetch(url).then((response) => response.json());
	search_result.value = resp.data.list;
	totalElements.value = resp.data.totalElements;
	has_get_search_result.value = true; //表示已经拿到了数据
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

// ANCHOR 级联选择 JS
const options = [
	{
		value: "COC",
		label: "COC",
		leaf_only: false,
		children: [
			{
				value: "version",
				label: "版本",
				children: [
					{
						value: "coc6th",
						label: "coc6th",
					},
					{
						value: "coc7th",
						label: "coc7th",
					},
				],
			},
			{
				value: "era",
				label: "年代",
				children: [
					{
						value: "future",
						label: "未来",
					},
					{
						value: "ancient",
						label: "古代",
					},
				],
			},
		],
	},
];
function handleSelectedCatagoryBlur() {
	console.log(selected_catagory.value);
}

function debounce(func, wait = 0) {
	let timeid = null;
	let result;
	return function () {
		const context = this;
		const args = arguments;
		if (timeid) {
			clearTimeout(timeid);
		}
		timeid = setTimeout(function () {
			result = func.apply(context, args);
		}, wait);

		return result;
	};
}

watch(player_num, debounce(search, 1000));
watch(player_hours, debounce(search, 1000));
</script>

<style scoped>
/* ANCHOR 搜索选项整体 */
.search-options {
	display: flex;
	width: 840px;
	margin: 10px auto 0;
	transform: translateX(5px);
	justify-content: space-between;
}
.search-options > * {
	margin-right: 10px;
	flex-grow: 1;
	/* flex-shrink: 1; */
}
@media (min-width: 1365px) {
	.search-options {
		width: 1300px;
		margin: 30px auto 0;
		padding: 0 10px 0 15px;
		transform: none;
	}
}
@media (max-width: 930px) {
	.search-options {
		max-width: 510px;
		transform: translateX(5px);
	}
	.search-options {
		display: flex;
		flex-wrap: wrap;
		width: calc(100% - 10px) !important;
		margin: none;
		padding-left: 0 !important;
	}
	.search-options > * {
		margin-bottom: 10px;
	}
}
/* ANCHOR 搜索选项里面的条目 */
.n-select,
.n-cascader {
	flex-basis: 100px;
}
.slider-wrap {
	flex-basis: 220px;
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
.updateLastWeek-recommend-wrap {
	display: flex;
	flex-grow: 1;
	/* margin-right: 5px; */
	justify-content: space-between !important;
	flex-basis: 240px;
	/* 魔鬼数字 */
}
.updateLastWeek-recommend-item {
	width: calc((100% - 10px) / 2) !important;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #aaa;
	background: transparent;
	align-items: center;
	border: 1px solid rgba(255, 255, 255, 0.24);
	border-radius: 3px;
	height: 34px;
	min-width: 4rem;
	transition: 0.2s;
	cursor: pointer;
}
.updateLastWeek-recommend-item:hover {
	border: 1px solid #63e2b7;
	color: #63e2b7;
	background-color: #122;
}
.updateLastWeek-recommend-item-active {
	color: black;
	border: 1px solid #63e2b7;
	background: #63e2b7;
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

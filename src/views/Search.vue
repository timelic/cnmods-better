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
		<!-- ANCHOR 下拉菜单 HTML -->
		<n-dropdown
			:options="options"
			placement="bottom-start"
			:show="showDropdown"
			@select.self="handleDownloadMenuSelect"
			@clickoutside="test"
			:ref="(el) => (dropdown = el)"
		>
			<n-select
				:placeholder="selected_basic_category"
				:show="false"
				:value="
					selected_basic_category !== '类别'
						? selected_basic_category
						: null
				"
				@click.stop="handleClick"
			/>
		</n-dropdown>
		<n-select
			placeholder="来源"
			v-model:value="source_catagory"
			:options="source_list"
			@update:value="search"
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
import { ref, watch, onMounted } from "vue";
import { useLoadingBar, NIcon } from "naive-ui";
const loadingBar = useLoadingBar();

const search_result = ref({});

const has_get_search_result = ref(false); // 如果已经拿到了数据 就不应该再显示骨架屏

const player_num = ref(0);
const player_hours = ref(0);
const source_catagory = ref(null);

const source_list = [
	{ label: "原创", value: true },
	{ label: "翻译", value: false },
];

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
	search();
}

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
function toPageByPath(path) {
	router.push(path);
}

// ANCHOR 下拉菜单 JS

const initial_options = [
	{
		label: "COC（默认）",
		key: "COC",
	},
	{
		label: "DND",
		key: "DND",
	},
	{
		label: "其它类型",
		key: "其它类型",
	},
];
const extra_option_hint = [
	{
		type: "divider",
		key: "---",
	},
];
const options = ref(initial_options);
const COC_expand = [
	{
		label: "版本",
		key: "版本",
		children: [
			{
				label: "coc6th",
				key: "coc6th",
			},
			{
				label: "coc7th",
				key: "coc7th",
			},
		],
	},
	{
		label: "年代",
		key: "年代",
		children: [
			{
				label: "未来",
				key: "未来",
			},
			{
				label: "古代",
				key: "古代",
			},
			{
				label: "近代",
				key: "近代",
			},
			{
				label: "现代",
				key: "现代",
			},
			{
				label: "现代日本",
				key: "现代日本",
			},
			{
				label: "当代",
				key: "当代",
			},
		],
	},
	{
		label: "自由度",
		key: "自由度",
		children: [
			{
				label: "低",
				key: "低",
			},
			{
				label: "中",
				key: "中",
			},
			{
				label: "高",
				key: "高",
			},
		],
	},
	{
		label: "发生地",
		key: "发生地",
		children: [
			{
				label: "中国",
				key: "中国",
			},
			{
				label: "日本",
				key: "日本",
			},
			{
				label: "亚洲",
				key: "亚洲",
			},
			{
				label: "美洲",
				key: "美洲",
			},
			{
				label: "非洲",
				key: "非洲",
			},
			{
				label: "其它",
				key: "其它",
			},
		],
	},
	{
		label: "结构",
		key: "结构",
		children: [
			{
				label: "线性",
				key: "线性",
			},
			{
				label: "非线性",
				key: "非线性",
			},
		],
	},
];

const DND_expand = [
	{
		label: "版本",
		key: "版本",
		children: [
			{
				label: "3E",
				key: "3E",
			},
			{
				label: "3R",
				key: "3R",
			},
			{
				label: "4E",
				key: "4E",
			},
			{
				label: "5E",
				key: "5E",
			},
		],
	},
	{
		label: "等级",
		key: "等级",
		children: [
			{
				label: "1-4",
				key: "1-4",
			},
			{
				label: "5-10",
				key: "5-10",
			},
			{
				label: "11-16",
				key: "11-16",
			},
			{
				label: "17-20",
				key: "17-20",
			},
			{
				label: "20+",
				key: "20+",
			},
			{
				label: "Epic",
				key: "Epic",
			},
		],
	},
];

const selected_basic_category = ref("类别");
let moduleVersion,
	moduleAge,
	occurrencePlace,
	original,
	freeLevel,
	structure,
	moduleType;
// 获取次级目录里面的key的array 用来下面判断在哪个集合里面
function getKeysIn2thCategory(category, category_2th_name) {
	return category
		.filter((item) => item.label === category_2th_name)[0]
		.children.map((item) => item.key);
}
// 点击下拉菜单
function handleDownloadMenuSelect(key) {
	// 判断是不是基础选项
	if (["COC", "DND", "其它类型"].includes(key)) {
		switch (key) {
			case "COC":
				options.value = initial_options
					.concat(extra_option_hint)
					.concat(COC_expand);
				selected_basic_category.value = "COC";
				break;
			case "DND":
				options.value = initial_options
					.concat(extra_option_hint)
					.concat(DND_expand);
				selected_basic_category.value = "DND";
				break;
			case "其它类型":
				options.value = initial_options;
				selected_basic_category.value = "其他";
				showDropdown.value = false; // 隐藏下拉菜单
				break;
			default:
				break;
		}
		// 清空原有的额外
		moduleVersion =
			moduleAge =
			occurrencePlace =
			original =
			freeLevel =
			structure =
			moduleType =
				"";
	}
	// 判断是不是额外选项
	const COC_expand_keys = COC_expand.reduce(
		(total, item) => total.concat(item.children),
		[]
	).map((item) => item.key);
	const DND_expand_keys = DND_expand.reduce(
		(total, item) => total.concat(item.children),
		[]
	).map((item) => item.key);
	if (COC_expand_keys.includes(key)) {
		switch (true) {
			case getKeysIn2thCategory(COC_expand, "版本").includes(key):
				moduleVersion = key;
				break;
			case getKeysIn2thCategory(COC_expand, "年代").includes(key):
				moduleAge = key;
				break;
			case getKeysIn2thCategory(COC_expand, "自由度").includes(key):
				freeLevel = key;
				break;
			case getKeysIn2thCategory(COC_expand, "发生地").includes(key):
				occurrencePlace = key;
				break;
			case getKeysIn2thCategory(COC_expand, "结构").includes(key):
				structure = key;
				break;
			default:
				break;
		}
	}
	if (DND_expand_keys.includes(key)) {
		switch (true) {
			case getKeysIn2thCategory(DND_expand, "版本").includes(key):
				moduleVersion = key;
				break;
			case getKeysIn2thCategory(DND_expand, "等级").includes(key):
				freeLevel = key;
				break;
			default:
				break;
		}
	}
	search();
}

// ANCHOR 下拉菜单的blur收起问题
const showDropdown = ref(false);
function handleClick() {
	showDropdown.value = !showDropdown.value;
	return false;
}
function test() {
	showDropdown.value = false;
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

// ANCHOR 搜索的JS逻辑
async function search() {
	loadingBar.start(); // 启动加载条
	const data = {
		moduleAge: moduleAge || "",
		occurrencePlace: occurrencePlace || "",
		duration: player_hours.value || "",
		amount: player_num.value || "",
		original:
			typeof source_catagory.value !== "boolean" && !source_catagory.value
				? ""
				: source_catagory.value,
		releaseDateAsc: "",
		moduleVersion: moduleVersion || "",
		freeLevel: freeLevel || "",
		structure: structure || "",
		title: input_value.value,
		page: page.value,
		pageSize: pageSize.value,
		moduleType:
			selected_basic_category.value !== "类别"
				? selected_basic_category.value
				: "",
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

/* 真实搜索框 */
@media (max-width: 930px) {
	/* 这应该包括了ipad普通版在内的所有手机端 */
	#real-search {
		position: relative !important;
		display: flex;
		width: 500px !important;
		max-width: calc(100% - 20px) !important;
		margin: auto !important;
		top: 0 !important;
	}
	.search-options + #card-wrap {
		margin-top: 10px;
	}
}

/* 下拉菜单 */
.n-dropdown-menu {
	min-width: 169px;
	/* 设置最小宽度 */
}
</style>

<template>
	<n-carousel autoplay show-arrow trigger="hover" style="background: #222">
		<div
			v-for="item in advertisementList"
			:key="item.keyId"
			@click="toUrl(item.linkUr)"
		>
			<div class="carousel-mask">
				<div>{{ item.title }}</div>
			</div>
			<img class="carousel-img" :src="item.picUrl" />
		</div>
	</n-carousel>
	<!-- 手机版显示一张头图 -->
	<img
		src="https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f419/u1f419_u1f31c.png"
		style="
			height: 150px;
			margin: 20px auto;
			filter: brightness(0.9);
			user-select: none;
		"
		class="only-show-on-mobile"
	/>
	<div class="subtitle">
		<n-icon size="20" class="recommend-icon">
			<like />
		</n-icon>
		编辑推荐
	</div>
	<div id="card-wrap">
		<!-- 这个是骨架之类的玩意 -->
		<span
			class="card"
			v-for="x in 7"
			v-if="!Object.keys(index_data).length"
		></span>
		<span
			class="card"
			v-for="item in commandModuleList"
			:key="item"
			@click="toPageByPath(`/module/${item.keyId}`)"
		>
			<n-icon class="star" size="20">
				<star />
				<!-- <star-fill /> -->
			</n-icon>
			<div class="title">{{ item.title }}</div>
			<div class="name-and-date pre-space">
				{{ item.article + "   " + item.releaseDate }}
			</div>
			<div class="abstract">
				{{ item.opinion }}
			</div>
			<div class="tags-wrap">
				<span class="tag" :class="item.original ? 'orange' : 'blue'">{{
					item.original ? "原创" : "翻译"
				}}</span>
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
	<div class="subtitle">
		<n-icon>
			<news />
		</n-icon>
		最新投稿
	</div>
	<div id="card-wrap">
		<span
			class="card"
			v-for="item in index_data.latestModuleList"
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
	<div class="search-more-modes-wrap">
		<n-button class="search-more-modes" @click="toPage('Search')">
			<template #icon>
				<n-icon>
					<like />
				</n-icon>
			</template>
			搜索更多</n-button
		>
	</div>
</template>

<script setup>
import {
	// ThumbLike24Regular as like,
	FlashOn24Regular as like,
	New24Regular as news,
	Star24Regular as star,
} from "@vicons/fluent";
import { ref } from "vue";
const index_data = ref({});
const advertisementList = ref({});
const commandModuleList = ref({});
(async () => {
	const resp = await fetch("https://www.cnmods.net/index.do").then(
		(response) => response.json()
	);
	index_data.value = resp.data;
	console.log(resp.data);
	advertisementList.value = resp.data.advertisementList;
	commandModuleList.value = resp.data.commandModuleList;
})();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();

function toPageByPath(path) {
	router.push(path);
}

function toUrl(url) {
	window.open(url);
}

function toPage(name, query) {
	router.push({
		name,
		query,
	});
}
</script>

<style scoped>
.recommend-icon {
	position: relative;
	top: 1px;
}
.search-more-modes {
	margin: auto;
	/* display: block; */
	position: relative;
	margin-bottom: 30px;
}
.search-more-modes-wrap {
	display: flex;
	justify-content: center;
}
</style>

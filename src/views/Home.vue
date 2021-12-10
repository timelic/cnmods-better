<template>
	<n-carousel autoplay show-arrow trigger="hover">
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
	<div class="subtitle">
		<n-icon size="20" class="recommend-icon">
			<like />
		</n-icon>
		编辑推荐
	</div>
	<div id="card-wrap">
		<span class="card" v-if="index_data.length" v-for="x in 7"></span>
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
</script>

<style scoped>
.recommend-icon {
	position: relative;
	top: 1px;
}
</style>

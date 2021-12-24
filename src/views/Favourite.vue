<template>
	<div class="fav-wrap">
		<div class="fav-item" v-for="item in 10">
			<span class="fav-title">腐坏的叶</span>
			<span class="fav-name-and-time">油骨 2021-12-16</span>
			<n-icon class="normal-click" size="20">
				<back />
			</n-icon>
		</div>
	</div>
</template>

<script setup></script>

<style>
.fav-wrap {
	display: block;
	width: 500px;
	margin: auto;
}
.fav-item {
	background: #222;
	height: 4rem;
	display: flex;
	align-items: center;
	padding: 0 20px;
	border-radius: 5px;
	margin-bottom: 10px;
}
.fav-title {
	font-size: 16px;
	color: #ddd;
}
.fav-name-and-time {
	font-size: 13px;
	color: #bbb;
	margin-left: 10px;
}
</style>

<template>
	<div class="about-card">
		<img
			src="https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f643/u1f643_u1f419.png"
			style="width: 50px; height: 50px"
		/>
		<p class="about-title">作者声明</p>
		<p class="about-content">
			这个网站只是为提供一个更好的魔都网站，并没有任何侵犯版权，攫取流量的意图。如有冒犯，我只能说很抱歉。
		</p>
		<p class="about-content">
			官方站是
			<a class="open-source" href="cnmods.net">cnmods.net</a>。
		</p>
		<p class="about-title">吐槽</p>
		<p class="about-content">
			记得几年以前，站主出了一个众筹，说想做一个更好的网站，有更多的功能。我不记得后来筹了多少钱，但是这程序员雇的，确实不行。
		</p>
		<p class="about-content">
			做这个网站的本意一是为了练手，二是觉得魔都cnmods.net主站做的不太行。
		</p>
		<p class="about-content">
			主站的前端一直没有什么优化，而后端也存在很严重的安全问题。
		</p>
		<p class="about-content">当然我自己的技术也挺差劲。</p>
		<p class="about-content">
			这个网站还有许多值得改进的地方，比如说增加收藏模组功能。但评分功能是不会做的。
		</p>
		<p class="about-title">开源</p>
		<p class="about-content">
			代码已开源到
			<a
				class="open-source"
				href="https://github.com/timelic/cnmods-better"
				>Github</a
			>。
		</p>
	</div>
	<div
		style="display: flex; flex-direction: column; align-items: center"
	></div>
</template>

<style scoped>
div {
	line-height: 1.75rem;
	max-width: calc(100vw - 30px);
	margin-left: 15px;
}
.about-card {
	width: 600px;
	max-width: calc(100vw - 20px);
	background-color: #222;
	border-radius: 5px;
	padding: 30px;
	margin: auto;
	margin-top: 30px;
}
@media (max-width: 930px) {
	.about-card {
		margin-top: 0;
		background-color: transparent;
		padding-bottom: 0;
	}
}
.about-title {
	font-size: 1.25rem;
	font-weight: bold;
}
.about-content {
	/* white-space: pre-wrap; */
}
.open-source {
	color: white;
}
</style>

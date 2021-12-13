<script setup></script>

<template>
	<div id="footer">
		<div id="footer-wrap">
			<n-tooltip trigger="hover">
				<template #trigger>
					<a href="http://wiki.cnmods.org" target="view_window"
						>魔都wiki</a
					>
				</template>
				魔都Wiki的最初宗旨是为作者及点评人提供专栏，放置他们的精华文章供受众浏览。
			</n-tooltip>
			<a
				href="https://www.cnmods.net/#/moduleDetail/nameList"
				target="view_window"
				>感谢名单</a
			>
			<a href="">手册内页</a>
			<a href="mailto:cnmods@163.com">联系我们</a>
			<a href="https://www.wenjuan.com/s/ZjEnQn/" target="view_window"
				>求评系统</a
			>
			<a href="http://www.qking.ink/" target="view_window">魔都旧址</a>
			<n-tooltip trigger="hover">
				<template #trigger>
					<a href="http://www.goddessfantasy.net" target="view_window"
						>纯美苹果园</a
					>
				</template>
				国内知名跑团论坛。
			</n-tooltip>
			<a href="https://trpg.moonrailgun.com/" target="view_window"
				>TRPG Engine</a
			>
		</div>
	</div>
</template>

<style scoped>
/* ANCHOR footer css */
#footer {
	display: flex;
	height: 5rem;
	background-color: #1c1c1c;
	text-align: center;
	position: relative;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
#footer a {
	text-decoration: none;
	font-family: "Courier New", Courier, monospace;
	color: gray;
	margin-right: 10px;
	flex-shrink: 0;
	margin-bottom: 0;
	height: 1rem;
	font-size: 0.85rem;
}
#footer-wrap {
	padding: 1rem;
}
@media (max-width: 610px) {
	#footer a {
		text-decoration: none;
		font-family: "Courier New", Courier, monospace;
		color: gray;
		margin-right: 10px;
	}
} ;
</style>

<template>
	<footer class="footer">
		<div class="container">
			<!-- <p class="yo">&copy; {{ currentYear }} Your Company Name. All rights reserved.</p> -->
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return {
			currentYear: new Date().getFullYear()
		};
	}
}
</script>

<style scoped lang="scss">
.footer {
	height: 39px;
	background: #243139;
}
</style>

<template>
	<button class="up-btn" @click="scrollToTop">
		<img src="../assets/images/icons/icon-up-arrow.svg" alt="arrow up">
	</button>
</template>

<script>
export default {
	methods: {
		scrollToTop() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	}
}
</script>

<style scoped lang="scss">
.up-btn {
	display: flex;
	justify-content: center;
	align-items: center;

	height: 60px;
	width: 60px;
	border-radius: 50%;
	background: var(--primary-color);
	cursor: pointer;
	transition: var(--transition-fast);

	& img {
		margin-bottom: 4px;
	}

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--secondary-hover-color);
		}
	}
}
</style>
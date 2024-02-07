<template>
	<button @click="toggleCart" class="bag-btn">
		<img src="../assets/images/icons/icon-cart.svg" alt="bag">
	</button>
</template>

<script>

import { mapMutations } from 'vuex';

export default {
	methods: {
		...mapMutations('cartOpenClose', [
			'toggleCart'
		])
	}
};

</script>


<style scoped lang="scss">
.bag-btn {
	height: 42px;
	width: 42px;
	background-color: #fff;
	border-radius: 50%;

	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	text-align: center;
	cursor: pointer;

	transition: var(--transition-fast);

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--primary-hover-color);
		}
	}

}
</style>
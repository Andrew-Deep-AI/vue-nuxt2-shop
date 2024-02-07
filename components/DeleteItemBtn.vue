<template>
	<button @click="REMOVE_FROM_CART(productCartItem.id)" class="delete-item-btn">
		<img src="@/assets/images/icons/icon-trash.svg" alt="delete">
	</button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	props: {
		productCartItem: {
			type: Object,
			required: true,
		},
	},

	methods: {
		...mapMutations('products', [
			'REMOVE_FROM_CART'
		]),
	},
}
</script>

<style scoped lang="scss">
.delete-item-btn {
	display: flex;
	align-items: center;

	margin-top: 12px;
	width: 41px;
	height: 64px;
	border-radius: 200px 0px 0px 200px;
	background-color: var(--primary-font-color);
	cursor: pointer;

	transition: var(--transition-fast);

	& img {
		margin-left: 16px;
	}

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--secondary-hover-color);
		}
	}
}
</style>
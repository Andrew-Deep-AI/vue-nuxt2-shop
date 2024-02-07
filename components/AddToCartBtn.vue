<template>
	<button @click="ADD_TO_CART(productItem)" class="btn-cart">В корзину</button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	props: {
		productItem: {
			type: Object,
			required: true,
		},
	},

	methods: {
		...mapMutations('products', [
			'ADD_TO_CART'
		]),
	},
};
</script>

<style scoped lang="scss">
.btn-cart {
	padding: 8px 22px;
	border-radius: 8px;
	background: var(--primary-color);
	box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.35);

	color: var(--tertiary-font-color);
	font-family: "PT Sans Narrow";
	font-size: 15px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.45px;
	cursor: pointer;


	transition: var(--transition-fast);

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--secondary-hover-color);
		}
	}
}
</style>
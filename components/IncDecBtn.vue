<template>
	<button @click="ADD_TO_CART(productCartItem)" v-if="isIncrease" class="incdec-item-btn increase">
		<img src="@/assets/images/icons/icon-increase-white.svg" alt="increase">
	</button>

	<button @click="DECREMENT_PRODUCT_QUANTITY(productCartItem.id)" v-else class="incdec-item-btn decrease">
		<img src="@/assets/images/icons/icon-decrease-white.svg" alt="decrease">
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
		isIncrease: {
			type: Boolean,
			default: true
		},
	},

	methods: {
		...mapMutations('products', [
			'ADD_TO_CART'
		]),
		...mapMutations('products', [
			'DECREMENT_PRODUCT_QUANTITY'
		]),
	},

}
</script>

<style scoped lang="scss">
.incdec-item-btn {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background-color: var(--primary-font-color);
	cursor: pointer;

	transition: var(--transition-fast);

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--secondary-hover-color);
		}
	}
}
</style>
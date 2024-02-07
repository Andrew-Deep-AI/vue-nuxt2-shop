<template>
	<div class="product-item" :class="{ 'inCart': productItem.inCart }">
		<button class="product-item__icon-like-box" :class="{ 'active-like': productItem.like }"
			@click="TOGGLE_LIKE(productItem)">
			<div v-if="!productItem.inCart" class="product-item__icon-like">
				<img src="@/assets/images/icons/icon-heart.svg" alt="like">
			</div>
			<div v-else class="product-item__icon-like">
				<img src="@/assets/images/icons/icon-white-heart.svg" alt="like">
			</div>
			<div class="product-item__icon-like-active">
				<img src="@/assets/images/icons/icon-heart-active.svg" alt="like">
			</div>
		</button>

		<div class="product-item__image">
			<img :src="imagePath" :alt="altPath">
		</div>

		<div class="product-item__info product-info">
			<div class="product-info__top-box">
				<h5 class="product-info__title">{{ productItem.name }}</h5>
				<p class="product-info__weight">{{ productItem.weight }} г</p>
			</div>

			<p class="product-info__description">
				{{ productItem.description }}
			</p>

			<div class="product-info__bottom-box">
				<p class="product-info__price">{{ productItem.price }} <span>₽</span></p>

				<div v-if="productItem.inCart" class="product-info__box-quantity">
					<IncDecBtnBlack :productCartItem="productItem" :isIncrease="false" />
					<p class="product-info__quantity">{{
						findItemQuantity }}</p>
					<IncDecBtnBlack :productCartItem="productItem" :isIncrease="true" />
				</div>

				<AddToCartBtn v-else :productItem="productItem" class="product-info__add-cart-btn" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	props: {
		productItem: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			findItemQuantity: null
		};
	},

	computed: {
		imagePath() {
			return require(`@/assets/images/${this.productItem.photo}.png`);
		},
		altPath() {
			return (`${this.productItem.name}`);
		},

		...mapState('products', [
			'cartProductList'
		]),


	},

	watch: {
		cartProductList: {
			handler(newVal, oldVal) {
				this.itemInCart();
			},
			deep: true
		}
	},

	methods: {
		...mapMutations('products', [
			'TOGGLE_LIKE'
		]),

		itemInCart() {
			const findItem = this.cartProductList.find(item => item.id === this.productItem.id) || null;
			if (findItem) {
				this.findItemQuantity = findItem.quantity
			} else {
				console.log("Элемент не найден в корзине");
			}
		}
	},
};
</script>

<style scoped lang="scss">
.product-item {
	position: relative;
	padding: 30px;
	min-height: 390px;
	width: 270px;

	display: flex;
	flex-direction: column;

	border-radius: 8px;
	background: var(--secondary-background);
	box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);

	transition: var(--transition-fast);

	@media (max-width: 610px) {
		width: unset;
	}

	//product-item__image
	&__image {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 25px;

		& img {
			@media (max-width: 610px) {
				width: 100%;
			}
		}
	}

	//product-item__icon-like-box
	&__icon-like-box {
		height: 20px;
		width: 20px;
		position: absolute;
		top: 30px;
		right: 30px;
		background: none;
		cursor: pointer;

		&.active-like {
			.product-item__icon-like {
				opacity: 0;
			}

			.product-item__icon-like-active {
				opacity: 1;
			}
		}
	}

	//product-item__icon-like
	&__icon-like {
		transition: var(--transition-fast);
	}

	//product-item__icon-like-active
	&__icon-like-active {
		transition: var(--transition-fast);
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	&.inCart {
		background: var(--primary-font-color);

		.product-item__image img {
			filter: drop-shadow(15px 12px 17px rgba(203, 182, 137, 0.70));
		}

		.product-info__title {
			color: #fff;
		}

		.product-info__weight {
			color: #fff;
		}

		.product-info__description {
			color: #fff;
		}

		.product-info__price {
			color: #fff;
		}
	}
}

.product-info {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: auto;

	//product-info__top-box
	&__top-box {
		display: flex;
		justify-content: space-between;
	}

	//product-info__title
	&__title {
		color: var(--sixth-font-color);
		font-family: "Neucha";
		font-size: 19px;
		font-style: normal;
		font-weight: 400;
		line-height: 25px;
		letter-spacing: 1.9px;
		text-transform: uppercase;
	}

	//product-info__weight
	&__weight {
		color: var(--seventh-font-color);
		font-family: "Arial";
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 0.52px;
	}

	//product-info__description
	&__description {
		flex: auto;

		color: var(--seventh-font-color);
		font-family: "Arial";
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 0.6px;

		margin-top: 20px;

		@media (max-width: 610px) {
			margin-bottom: 20px;
		}
	}

	//product-info__bottom-box
	&__bottom-box {
		display: flex;
		justify-content: space-between;
	}

	//product-info__price
	&__price {
		color: var(--sixth-font-color);
		font-family: "Neucha";

		font-size: 19px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 0.95px;

		& span {
			font-family: "Arial";
		}
	}

	//product-info__box-quantity
	&__box-quantity {
		display: flex;
		align-items: center;
		gap: 13px;
	}

	//product-info__quantity
	&__quantity {
		color: #FFF;
		font-family: "Neucha";
		font-size: 19px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 0.95px;
	}
}
</style>
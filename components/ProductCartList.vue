<template>
	<p v-if="cartProductList.length === 0" class="empty-product-cart">Корзина пуста, заполни её ;)</p>
	<ul v-else class="product-cart-list">
		<li v-for="productCartItem in  cartProductList " :key="productCartItem.id" class="product-cart-list__item cart-item">
			<div class="cart-item__left">
				<div class="cart-item__image">
					<img :src="require(`~/assets/images/${productCartItem.photo}.png`)" :alt="productCartItem.name">
				</div>

				<div class="cart-item__info-box">
					<button class="cart-item__icon-like-box" :class="{ 'active-like': productCartItem.like }">
						<div class="cart-item__icon-like">
							<img src="@/assets/images/icons/icon-heart.svg" alt="like">
						</div>
						<div class="cart-item__icon-like-active">
							<img src="@/assets/images/icons/icon-heart-active.svg" alt="like">
						</div>
					</button>

					<h5 class="cart-item__title">{{ productCartItem.name }}</h5>
					<p class="cart-item__description">{{ productCartItem.description }}</p>
					<p class="cart-item__weight">( {{
						productCartItem.weight }} г)</p>
				</div>

			</div>
			<div class="cart-item__right">
				<div class="cart-item__sum-box">
					<p class="cart-item__price"><span>Цена</span>{{
						productCartItem.price }} ₽</p>
					<div class="cart-item__box-quantity">
						<IncDecBtn :productCartItem="productCartItem" :isIncrease="false" />
						<p class="cart-item__quantity">{{
							productCartItem.quantity }}</p>
						<IncDecBtn :productCartItem="productCartItem" :isIncrease="true" />
					</div>
					<p class="cart-item__sum"><span>Сумма</span>{{
						productCartItem.price * productCartItem.quantity }} ₽</p>
				</div>

				<DeleteItemBtn :productCartItem="productCartItem" class="cart-item__delete-btn" />
			</div>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState('products', [
			'cartProductList'
		])
	},
}
</script>


<style scoped lang="scss">
.empty-product-cart {
	color: var(--secondary-font-color);
	font-family: "Neucha";
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 1px;
	margin-bottom: 40px;
}

.product-cart-list {
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.cart-item {
	display: flex;
	justify-content: space-between;
	gap: 35px;

	border-radius: 8px;
	background: var(--secondary-background);
	box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
	min-height: 112px;
	min-width: 528px;
	padding: 15px 0px 15px 15px;

	@media (max-width: 600px) {
		flex-direction: column;
		min-width: unset;
		gap: 15px;
	}

	//cart-item__left
	&__left {
		display: flex;

		@media (max-width: 600px) {
			margin-right: 15px;
		}
	}

	//cart-item__image
	&__image {
		margin-right: 26px;

		& img {
			height: 80px;
			width: 80px;
		}
	}

	//cart-item__info-box
	&__info-box {
		position: relative;
	}

	//cart-item__icon-like-box
	&__icon-like-box {
		position: absolute;
		top: 0;
		right: 0;
		background: none;
		cursor: pointer;

		&.active-like {
			.cart-item__icon-like {
				opacity: 0;
			}

			.cart-item__icon-like-active {
				opacity: 1;
			}
		}
	}

	//cart-item__icon-like
	&__icon-like {
		transition: var(--transition-fast);

	}

	//cart-item__icon-like-active
	&__icon-like-active {
		transition: var(--transition-fast);
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	//cart-item__title
	&__title {
		color: var(--sixth-font-color);
		font-family: "Neucha";
		font-size: var(--font-size-md);
		font-style: normal;
		font-weight: 400;
		line-height: 25px;
		letter-spacing: 1.6px;
		text-transform: uppercase;
		margin-right: 20px;
	}

	//cart-item__description
	&__description {
		color: var(--eighth-font-color);
		font-family: "PT Sans Narrow";
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	//cart-item__weight
	&__weight {
		color: var(--eighth-font-color);
		font-family: "PT Sans Narrow";
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 2px;
	}

	//cart-item__right
	&__right {
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: 15px;
		max-width: 162px;

		@media (max-width: 600px) {
			max-width: unset;
		}
	}

	//cart-item__sum-box
	&__sum-box {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	//cart-item__price
	&__price {
		color: var(--sixth-font-color);
		font-family: "Neucha";
		font-size: var(--font-size-md);
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 0.8px;

		& span {
			font-size: 13px;
			letter-spacing: 0.65px;
			margin-right: 10px;
		}
	}

	//cart-item__box-quantity
	&__box-quantity {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	//cart-item__quantity
	&__quantity {
		color: var(--ninth-font-color);
		font-family: "Neucha";
		font-size: var(--font-size-md);
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 0.8px;
	}

	//cart-item__sum
	&__sum {
		color: var(--sixth-font-color);
		font-family: "Neucha";
		font-size: var(--font-size-md);
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 0.8px;

		& span {
			font-size: 13px;
			letter-spacing: 0.65px;
			margin-right: 10px;
		}
	}
}
</style>
<template>
	<div @click="toggleCart" class="cart__wrapper" :class="{ 'cart-active': isCartOpen }">
		<div @click.stop="" class="cart__list-box cart-box-list">
			<h1 class="cart-box-list__title">корзина</h1>

			<ProductCartList class="cart-box-list__product-list" />

			<div class="cart-box-list__box-info cart-info">
				<p class="cart-info__total-price">Общая сумма <span>{{ sumProducts }} ₽</span></p>

				<p class="cart-info__remark"><span>*</span>Сумма заказа для доставки курьером должна составлять не менее 500 ₽</p>
				<div class="cart-info__btn-box">
					<button @click="toggleCart" class="cart-info__btn secondary-btn">Вернуться к покупкам</button>
					<button @click="toggleOrderForm" class="cart-info__btn primary-btn" :disabled="sumProducts === 0">Оформить
						заказ</button>
				</div>
			</div>
		</div>

		<OrderForm :sumProducts="sumProducts" />
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
		...mapState('cartOpenClose', [
			'isCartOpen',
		]),
		...mapState('products', [
			'cartProductList'
		]),
		sumProducts() {
			return this.cartProductList.reduce((sum, product) => {
				return sum + product.price * product.quantity;
			}, 0);
		}
	},

	methods: {
		...mapMutations('cartOpenClose', [
			'toggleCart', 'toggleOrderForm'
		]),
	}
};
</script>


<style scoped lang="scss">
.cart__wrapper {
	position: fixed;
	z-index: 99;
	top: 0;
	right: -100%;
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	transition: right 0.6s ease 0s, backdrop-filter 0.3s ease 0s, background 0.1s ease 0s;
}

.cart__list-box {
	margin-right: -100%;
	transition: margin-right 0.3s ease 0.1s;

}

.cart__wrapper.cart-active {
	background: rgba(60, 75, 97, 0.60);
	backdrop-filter: blur(11px);
	transition: right 0.3s ease 0s, backdrop-filter 0.3s ease 0.2s, background 0.3s ease 0.2s;

	right: 0;

	.cart__list-box {
		margin-right: 0;
	}
}

.cart-box-list {
	display: flex;
	flex-direction: column;
	padding: 40px 40px 45px 45px;
	width: 100%;
	max-width: 612px;

	overflow-y: auto;
	overflow-x: hidden;

	background-color: var(--tertiary-background);

	@media (max-width: 980px) {
		max-width: unset;
	}

	@media (max-width: 630px) {
		padding: 30px;
	}

	//cart-box-list__title
	&__title {
		position: relative;
		color: var(--primary-font-color);
		font-family: "Neucha";
		font-size: var(--font-size-title-h2);
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-transform: uppercase;
		padding-left: 40px;
		padding-right: 40px;
		margin: 0 auto;
		margin-bottom: 30px;

		&::before {
			position: absolute;
			content: '';
			top: 50%;
			left: 0;
			width: 10px;
			height: 10px;
			background-color: var(--primary-color);
			border-radius: 50%;
			transform: translate(-100%, -50%);
		}

		&::after {
			position: absolute;
			content: '';
			top: 50%;
			right: 0;
			width: 10px;
			height: 10px;
			background-color: var(--primary-color);
			border-radius: 50%;
			transform: translate(100%, -50%);
		}
	}

	//cart-box-list__product-list
	&__product-list {
		display: flex;
		flex: auto;
	}

	//cart-box-list__box-info
	&__box-info {
		margin-top: 30px;
	}
}

.cart-info {

	//cart-info__total-price
	&__total-price {
		color: var(--secondary-font-color);
		font-family: "Neucha";
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 1px;
		margin-bottom: 40px;

		& span {
			color: var(--secondary-font-color);
			font-family: "Neucha";
			font-size: 22px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			letter-spacing: 1.1px;
			margin-left: 10px;
		}
	}

	//cart-info__remark
	&__remark {
		color: var(--secondary-font-color);
		font-family: "Ubuntu";
		font-size: var(--font-size-md);
		font-style: normal;
		font-weight: 300;
		line-height: 20px;
		letter-spacing: 0.48px;
		max-width: 360px;
		margin-bottom: 40px;

		& span {
			margin-right: 8px;
		}
	}

	//cart-info__btn-box
	&__btn-box {
		display: flex;
		gap: 30px;
	}

	//cart-info__btn
	&__btn {
		color: var(--sixth-font-color);
		font-family: "Neucha";
		font-size: var(--font-size-lg);
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 0.9px;
	}
}

.secondary-btn {
	padding: 19px 22px;
	border-radius: 8px;
	border: 1px solid #AFAFAF;
	background: #FFF;
	box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);

	cursor: pointer;

	transition: var(--transition-fast);

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--primary-hover-color);
		}
	}
}

.primary-btn {
	color: #FFF;
	padding: 19px 25px;
	border-radius: 8px;
	background: var(--primary-font-color);
	box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);

	&:disabled {
		background: #ccc;
		color: #666;
		box-shadow: none;
		cursor: auto;
	}


	cursor: pointer;


	transition: var(--transition-fast);

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--secondary-hover-color);
		}
	}
}
</style>
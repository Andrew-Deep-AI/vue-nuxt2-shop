<template>
	<main>
		<section class="menu">
			<div class="container">
				<div class="menu__content">
					<h1 class="menu__title">
						МЕНЮ
					</h1>

					<ul class="menu__filter filter-menu">
						<li class="filter-menu__items">роллы</li>
						<li class="filter-menu__items">суши и гунканы</li>
						<li class="filter-menu__items">сеты</li>
						<li class="filter-menu__items active">лапша и рис</li>
						<li class="filter-menu__items">салаты</li>
						<li class="filter-menu__items">горячие блюда</li>
					</ul>

					<ul class="menu__row">
						<li v-for="productItem in allProductsList" :key="productItem.id">
							<ProductItem :productItem="productItem" />
						</li>
					</ul>

					<BackUpBtn class="menu__up-btn" />
				</div>
			</div>
		</section>
	</main>
</template>

<script>

import products from '@/data/products.json'
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
		...mapState('products', [
			'allProductsList'
		]),
	},

	methods: {
		...mapMutations('products', {
			addProducts: 'ADD_PRODUCTS'
		}),
	},

	mounted() {
		let data = Object.values(products);
		this.addProducts(data[0]);
	},

	// !!! =================================

	// data() {
	// 	return {
	// 		products: []
	// 	}
	// },
	// async fetch() {
	// 	this.products = await fetch(
	// 		'https://jsonplaceholder.typicode.com/users' // some URL
	// 	).then(res => res.json())
	// },
};

</script>


<style scoped lang="scss">
.menu {
	position: relative;

	//menu__content
	&__content {
		display: flex;
		align-items: center;
		flex-direction: column;

		margin-top: 100px;
		margin-bottom: 120px;

		@media (max-width: 980px) {
			margin-top: 40px;
			margin-bottom: 87px;
		}

		@media (max-width: 430px) {
			margin-top: 20px;
			margin-bottom: 40px;
		}
	}

	//menu__title
	&__title {
		font-family: "Neucha";
		color: var(--primary-color);
		font-size: var(--font-size-title-h1);
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		position: relative;
		text-align: center;
		padding-left: 40px;
		padding-right: 40px;
		margin-bottom: 50px;

		word-break: break-word;

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

		@media (max-width: 980px) {
			font-size: 48px;
			margin-bottom: 30px;
		}

		@media (max-width: 430px) {
			font-size: 22px;
			margin-bottom: 20px;
		}
	}

	//menu__filter
	&__filter {
		margin-bottom: 60px;
	}

	//menu__row
	&__row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30px;

		@media (max-width: 1210px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (max-width: 910px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: 610px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	//menu__up-btn
	& .menu__up-btn {
		position: absolute;
		bottom: 0;
		right: -130px;

		@media (max-width: 1480px) {
			right: -100px;
		}

		@media (max-width: 1440px) {
			right: -50px;
		}

		@media (max-width: 1330px) {
			position: relative;
			right: unset;
			bottom: unset;

			margin-top: 50px;
			margin-bottom: -50px;
		}

		@media (max-width: 430px) {
			margin-top: 20px;
			margin-bottom: -20px;
		}
	}
}

.filter-menu {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;

	@media (max-width: 980px) {
		gap: unset;
	}

	@media (max-width: 340px) {
		gap: 2px;
		column-gap: 5px;
	}

	//filter-menu__items
	&__items {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 16px 32px;
		border-radius: 100px;
		background-color: var(--primary-background);

		color: var(--fifth-font-color);

		font-family: Neucha;
		font-size: var(--font-size-xlg);
		font-style: normal;
		font-weight: 400;
		line-height: 32px;
		text-transform: uppercase;

		transition: var(--transition-fast);

		@media (max-width: 980px) {
			font-size: 21px;
			line-height: normal;


		}

		@media (max-width: 430px) {
			font-size: 16px;
			line-height: 20px;
			padding: 12px 18px;
		}
	}

	&__items.active {
		background-color: var(--primary-font-color);
		color: var(--tertiary-font-color);
	}
}
</style>
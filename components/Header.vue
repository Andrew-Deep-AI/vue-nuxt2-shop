<template>
	<header>
		<div class="container">
			<div class="header-content">

				<div class="header-content__left">
					<button type="button" class="header-content__left-btn btn-burger" :class="{ 'menu-open': isMenuOpen }"
						@click="toggleMenu"><span></span></button>
					<Logo class="header-content__logo" />
					<div class="header-content__left-navigation header-left">
						<nav>
							<ul class="header-left__navigation" :class="{ 'menu-open': isMenuOpen }">
								<li><nuxt-link to="/">Меню</nuxt-link></li>
								<li><nuxt-link to="/delivery">Доставка</nuxt-link></li>
								<li><nuxt-link to="/events">Акции</nuxt-link></li>
								<li><nuxt-link to="/reviews">Отзывы</nuxt-link></li>
								<li><nuxt-link to="/contacts">Контакты</nuxt-link></li>
							</ul>
						</nav>
					</div>
				</div>

				<Logo class="header-content__logo-mobile" />

				<PhoneBox class="header-middle__phone-box" />

				<div class="header-content__right" :class="{ 'menu-open': isMenuOpen }">
					<BagBtn class="header-content__btn-bag" />
					<EnterBtn class="header-content__btn-enter" />
				</div>
			</div>
		</div>
	</header>
</template>


<script>
export default {
	data() {
		return {
			isMenuOpen: false,
		};
	},

	watch: {
		isMenuOpen(newValue) {
			if (newValue) {
				document.body.classList.add('menu-open');
			} else {
				document.body.classList.remove('menu-open');
			}
		}
	},

	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
	},
};
</script>

<style lang="scss">
body.menu-open,
body.cart-open {
	overflow: hidden;
}

body.cart-open {
	@media (any-hover: hover) {
		padding-right: 17px;

	}
}

body.cart-open.mac-os {
	@media (any-hover: hover) {
		padding-right: unset;
	}
}
</style>

<style scoped lang="scss">
header {
	background-color: var(--secondary-color);
	color: var(--tertiary-font-color);

}

.header-content {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;

	height: 100%;
	padding-top: 20px;
	padding-bottom: 20px;

	@media (max-width: 980px) {
		padding-top: 12px;
		padding-bottom: 12px;
	}

	//header-content__right
	&__right {
		display: flex;
		align-items: center;
		gap: 24px;


		@media (max-width: 550px) {
			position: fixed;
			left: -100%;
			transition: var(--transition-fast);

			z-index: 3;
			width: 100%;
			top: 67px;
			overflow: auto;
			background-color: var(--secondary-color);
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			&.menu-open {
				left: 0;
			}
		}

	}

	//header-content__left
	&__left {
		display: flex;
		align-items: center;
	}

	//header-content__logo
	&__logo {
		@media (max-width: 430px) {
			display: none;
		}
	}

	//header-content__logo-mobile
	&__logo-mobile {
		margin-right: 25px;

		@media (min-width:431px) {
			display: none;
		}
	}

	//header-content__left-navigation
	&__left-navigation {
		margin-left: 70px;

		@media (max-width: 1080px) {
			margin-left: 50px;
		}

		@media (max-width: 980px) {
			margin-left: unset;
		}
	}

	//header-content__left-btn
	&__left-btn {
		margin-right: 22px;
	}
}

.header-left {
	position: relative;
	display: flex;
	align-items: center;

	font-family: "Neucha";
	font-size: var(--font-size-md);
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: 0.8px;


	//header-left__navigation
	&__navigation {
		display: flex;

		& li {
			transition: var(--transition-fast);

			@media (any-hover: hover) {
				&:hover {
					color: var(--primary-hover-color);
				}
			}
		}

		& li:not(:last-child) {
			margin-right: 17.5px;
			padding-right: 17.5px;
			position: relative;

			&:after {
				position: absolute;
				content: '';
				top: 50%;
				right: 0;
				height: 3px;
				width: 3px;
				background-color: var(--tertiary-font-color);
				border-radius: 50%;
				transform: translate(50%, -50%);

				@media (max-width: 980px) {
					display: none;
				}
			}

			@media (max-width: 980px) {
				margin-right: unset;
				padding-right: unset;
			}
		}

		@media (max-width: 980px) {
			font-size: 30px;
			line-height: 40px;
			text-transform: uppercase;
			padding: 60px 20px;
			position: fixed;
			z-index: 3;
			width: 100%;
			height: calc(100% - 67px);
			top: 67px;
			left: -100%;
			transition: var(--transition-fast);
			overflow: auto;
			background-color: var(--secondary-color);
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			&.menu-open {
				left: 0;
			}
		}

		@media (max-width: 550px) {
			top: 175px;
			height: calc(100% - 175px);

		}
	}


}

.header-middle__phone-box {
	font-family: "Neucha";
	font-size: var(--font-size-md);
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: 0.8px;
}

.btn-burger {
	background: none;
	display: none;


	@media (max-width: 980px) {
		margin-left: 2px;
		display: block;
		position: relative;
		height: 14px;
		width: 20px;
		z-index: 5;

		@media (any-hover: none) {
			cursor: default;
		}

		span,
		&::before,
		&::after {
			content: "";
			transition: var(--transition-fast);
			right: 0;
			position: absolute;
			width: 100%;
			height: 2px;
			background-color: #fff;
			border-radius: 1px;
		}

		&::before {
			top: 0;
		}

		&::after {
			bottom: 0;
		}

		span {
			top: calc(50% - 1px);
		}

		&.menu-open {
			span {
				width: 0;
			}

			&::before {
				top: calc(50% - 1px);
				transform: rotate(-45deg);
			}

			&::after {
				bottom: calc(50% - 1px);
				transform: rotate(45deg);
			}
		}
	}
}
</style>



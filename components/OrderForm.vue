<template>
	<div @click.stop="" class="order-form" :class="{ 'order-form-active': isOrderFormOpen }">
		<h3 class="order-form__title">Оформление заказа</h3>
		<form @submit.prevent="submitForm" class="order-form__form form-order">
			<div class="form-order__delivery delivery">
				<h4 class="delivery__title block-title">
					<span>1</span>Способ доставки
				</h4>
				<div class="delivery__radio-item">
					<div class="delivery__radio">
						<input type="radio" id="courier" name="delivery" value="courier" :disabled="isDisabled"
							v-model="form.radioOption" />
						<label class="delivery__radio-label" v-bind:class="{ disabled: isDisabled }" for="courier">
							<img src="@/assets/images/icons/icon-delivery.svg" alt="Курьер">
							<p>Курьер</p>
						</label>
					</div>
					<p class="delivery__radio-add-info delivery__radio-add-info_unavailable">Временно недоступно</p>
				</div>

				<div class="delivery__radio-item">
					<div class="delivery__radio">
						<input type="radio" id="pickup" name="delivery" value="pickup" checked v-model="form.radioOption" />
						<label class="delivery__radio-label" for="pickup">
							<img src="@/assets/images/icons/icon-shopping-bag.svg" alt="Самовывоз">
							<p>Самовывоз</p>
						</label>
					</div>
					<p class="delivery__radio-add-info"><span>Скидка - 10%</span>на стоиомость покупки</p>
				</div>
			</div>

			<div class="form-order__information information">
				<h4 class="information__title block-title">
					<span>2</span>Данные для доставки
				</h4>

				<div class="information__item" :class="{ 'error-info': v$.name.$error }">
					<img src="@/assets/images/icons/icon-user.svg" alt="Пользователь">
					<input type="text" id="name" placeholder="Имя" v-model="form.name" />
					<p v-if="v$.name.$error">Это обязательное поле, минимум 3 символа</p>
				</div>
				<div class="information__item" :class="{ 'error-info': v$.name.$error }">
					<img src="@/assets/images/icons/icon-phone-black.svg" alt="Телефон">
					<input type="tel" id="phone" placeholder="Телефон" v-model="form.phone" />
					<p v-if="v$.phone.$error">Это обязательное поле, {{ v$.phone.phone.$message }}</p>
				</div>
				<div class="information__item">
					<img src="@/assets/images/icons/icon-additional-information.svg" alt="Информация">
					<textarea id="info" placeholder="Дополнительная информация" v-model="form.info"></textarea>
				</div>
			</div>

			<div class="form-order__total">
				<p class="form-order__total-goods">Cтоимость товаров<span>{{ sumProducts }} ₽</span></p>
				<div class="form-order__total-br"></div>
				<p class="form-order__total-cost">Итого к оплате<span>{{ sumProducts }} ₽</span></p>

				<button class="form-order__total-btn" type="submit">Купить и оплатить</button>

				<p class="form-order__total-agree">Создавая заказ, вы соглашаетесь с <a ref="">политикой обработки персональных
						данных</a>
				</p>
			</div>
		</form>
	</div>
</template>

<script>
import { reactive, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import { mapState } from 'vuex';

export default {
	setup(props) {
		const form = reactive({
			radioOption: 'pickup',
			name: '',
			phone: '',
			info: '',
			sum: 0,
		});

		// Отслеживаем изменения sumProducts и обновляем sum
		watch(() => props.sumProducts, (newValue) => {
			form.sum = newValue;
		}, {
			immediate: true // Это вызовет обработчик немедленно с текущим значением при создании экземпляра
		});

		const v$ = useVuelidate({
			name: { required, minLength: minLength(3) },
			phone: {
				required,
				// Пользовательская функция для проверки номера телефона РФ
				phone: helpers.withMessage(
					'введите корректный номер телефона',
					value => /^((\+7|7|8)+([0-9]){10})$/.test(value)
				)
			},
		}, form);

		function submitForm() {
			v$.value.$validate();
			if (!v$.value.$error && !v$.value.$invalid) {
				// Форма валидна, отправляем данные
				console.log('Форма валидна, отправляем данные:', form);
			} else {
				// Форма невалидна, отображаем ошибки
				console.log('Форма содержит ошибки:', v$.value);
			}
		}

		return {
			form,
			v$,
			submitForm,
		};
	},


	props: {
		sumProducts: {
			type: Number,
			default: 0
		},
	},

	data() {
		return {
			isDisabled: true // Установите это значение в false, чтобы активировать чекбокс
		};
	},

	computed: {
		...mapState('cartOpenClose', [
			'isOrderFormOpen'
		]),

	},

	mounted() {
	}
}
</script>

<style scoped lang="scss">
.disabled {
	opacity: 0.5;
	pointer-events: none;
}

.order-form {
	position: absolute;
	top: 0;
	right: -100%;
	display: flex;
	flex-direction: column;
	padding: 36px;
	width: 100%;
	height: 100vh;
	max-width: 612px;

	display: flex;
	flex-direction: column;

	overflow-y: auto;
	overflow-x: hidden;

	background-color: var(--tertiary-background);

	transition: right var(--transition-fast);

	@media (max-width: 980px) {
		max-width: unset;
	}

	@media (max-width: 630px) {
		padding: 30px;
	}

	@media (max-width: 350px) {
		padding: 10px;
	}

	//order-form__title
	&__title {
		position: relative;
		color: var(--primary-font-color);
		font-family: "Neucha";
		font-size: 32px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-left: 15px;
		padding-right: 15px;
		margin: 0 auto;
		margin-bottom: 27px;

		&::before {
			position: absolute;
			content: '';
			top: 50%;
			left: 0;
			width: 5px;
			height: 5px;
			background-color: var(--primary-color);
			border-radius: 50%;
			transform: translate(-100%, -50%);
		}

		&::after {
			position: absolute;
			content: '';
			top: 50%;
			right: 0;
			width: 5px;
			height: 5px;
			background-color: var(--primary-color);
			border-radius: 50%;
			transform: translate(100%, -50%);
		}
	}

	&.order-form-active {
		right: 0;
	}
}

.form-order {
	display: flex;
	flex-direction: column;
	gap: 14px;

	//form-order__total
	&__total {
		padding: 32px 16px 32px 16px;
		background-color: var(--primary-background);
		border-radius: 8px;

		display: flex;
		flex-direction: column;
	}

	//form-order__total-goods
	&__total-goods {
		color: #222222;
		font-family: "Ubuntu";
		font-size: var(--font-size-lg);
		font-weight: 300;
		line-height: 21px;
		display: flex;
		justify-content: space-between;
		width: 253px;
		padding-bottom: 20px;

		margin-left: 46px;
		margin-right: 32px;


		& span {
			font-weight: 400;
			text-align: right;
		}

		@media (max-width: 470px) {
			margin-left: unset;
			margin-right: unset;
		}
	}

	//form-order__total-br
	&__total-br {
		margin: 20px 32px 20px 46px;
		border-bottom: 1px solid #D9D9D9;

		@media (max-width: 470px) {
			margin-left: unset;
			margin-right: unset;
		}
	}

	//form-order__total-cost
	&__total-cost {
		margin-left: 46px;
		color: #222222;
		font-family: "Ubuntu";
		font-size: var(--font-size-lg);
		font-weight: 400;
		line-height: 21px;
		display: flex;
		justify-content: space-between;
		width: 253px;
		margin-bottom: 40px;
		margin-right: 32px;

		@media (max-width: 470px) {
			margin-left: unset;
			margin-right: unset;
		}
	}

	//form-order__total-btn
	&__total-btn {
		color: var(--primary-background);
		font-family: Neucha;
		font-size: 18px;
		font-weight: 400;
		line-height: 20px;
		letter-spacing: 5%;
		text-align: left;
		padding: 14px 0;
		text-align: center;

		box-sizing: border-box;
		border: 1px solid #0C334A;
		border-radius: 4px;

		background-color: #0C334A;

		cursor: pointer;

		transition: var(--transition-fast);

		@media (any-hover: hover) {
			&:hover {
				background-color: var(--secondary-hover-color);
			}
		}
	}

	//form-order__total-agree
	&__total-agree {
		margin-top: 20px;
		font-family: "Ubuntu";
		font-size: 12px;
		font-weight: 300;
		line-height: 16px;

		& a {
			color: #185598;

			cursor: pointer;

			transition: var(--transition-fast);

			@media (any-hover: hover) {
				&:hover {
					color: var(--secondary-hover-color);
				}
			}
		}
	}
}

.delivery {
	padding: 20px 48px 16px 62px;
	background-color: var(--primary-background);
	border-radius: 8px;

	display: flex;
	flex-direction: column;
	gap: 14px;

	@media (max-width: 630px) {
		align-items: start;
	}

	@media (max-width: 470px) {
		padding: 70px 16px 35px 16px;
	}

	//delivery__radio-item
	&__radio-item {
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media (max-width: 630px) {
			flex-direction: column;
			gap: 15px;
		}
	}

	//delivery__radio
	&__radio {
		display: flex;
		align-items: center;
	}

	//delivery__radio-label
	&__radio-label {
		display: flex;
		align-items: center;
		gap: 40px;

		color: #222222;
		font-family: "Ubuntu";
		font-size: var(--font-size-lg);
		font-weight: 300;
		line-height: 21px;
		text-align: left;
	}

	//delivery__radio-add-info
	&__radio-add-info {
		display: flex;
		flex-direction: column;
		color: #3F4871;
		font-family: "Ubuntu";
		font-size: 8px;
		font-weight: 700;
		line-height: 9px;
		width: 145px;
		gap: 2px;

		& span {
			font-size: 14px;
			line-height: 16px;
		}

		//delivery__radio-add-info_unavailable
		&_unavailable {
			color: rgb(255, 0, 0);
			font-size: 12px;
			font-weight: 300;
			line-height: 14px;
		}
	}
}

.delivery__radio input[type="radio"] {
	position: absolute;
	opacity: 0;

	+label {
		position: relative;
		cursor: pointer;
		padding-left: 52px;

		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 32px;
			height: 32px;
			border-radius: 50%;
			border: 0.3px solid #0ACF83;
			background-color: #fff;
		}

		&:after {
			content: '';
			position: absolute;
			width: 32px;
			height: 32px;
			border-radius: 50%;
			left: 0;
			top: 50%;
			transform: translateY(-50%) scale(0);
			background-image: url('@/assets/images/icons/icon-check-mark.svg');
			background-size: 12px;
			background-position: center;
			background-repeat: no-repeat;
			transition: transform 0.2s ease-in-out;
		}
	}

	&:checked+label:after {
		transform: translateY(-50%) scale(1);
		background-color: #0ACF83;
	}
}

.information {
	padding: 20px 48px 16px 62px;
	background-color: var(--primary-background);
	border-radius: 8px;

	display: flex;
	flex-direction: column;
	gap: 40px;

	@media (max-width: 470px) {
		padding: 70px 16px 35px 16px;
	}

	//information__item
	&__item {
		position: relative;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #D9D9D9;

		& img {
			margin-left: 6px;
			margin-right: 21px;
			margin-bottom: 6px;
		}


		& input::placeholder,
		textarea::placeholder {
			color: #4C4C4C;
			font-family: "Ubuntu";
			font-size: var(--font-size-md);
			font-weight: 300;
			line-height: 18px;
		}

		& input,
		textarea {
			background-color: transparent;
			border: none;
			outline: none;
			padding: 0;
			margin: 0;

			width: 100%;
			height: 26px;

			font-family: "Ubuntu";
			font-size: var(--font-size-md);
			font-weight: 300;
			line-height: 18px;
		}

		& textarea {
			overflow: auto;
			min-height: 26px;
			max-height: 200px;
			resize: vertical;
		}

		& p {
			position: absolute;
			bottom: -19px;
			left: 0;
			color: rgb(255, 0, 0);
			font-family: "Ubuntu";
			font-size: 12px;
			font-weight: 300;
			line-height: 14px;
		}

		&.error-info {
			border-bottom: 1px solid red;
		}
	}
}

.block-title {
	position: relative;
	font-family: "Ubuntu";
	font-size: 22px;
	font-weight: 300;
	font-style: normal;
	line-height: 25px;
	color: var(--secondary-font-color);

	& span {
		position: absolute;
		top: -4px;
		left: -46px;
		background-color: red;
		background: #D34A44;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 1px;

		color: rgb(255, 255, 255);
		font-size: 20px;
		font-weight: 400;
		line-height: 23px;

		@media (max-width: 470px) {
			left: 0;
			top: -40px;
		}
	}
}
</style>
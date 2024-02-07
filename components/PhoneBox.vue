<template>
	<a href="tel:+79797009791" class="box-phone">
		<img src="../assets/images/icons/icon-phone.svg" alt="bag">
		<div class="box-phone__number">+7 979 700 97 91</div>
	</a>
</template>

<style scoped lang="scss">
.box-phone {
	display: flex;
	align-items: center;
	gap: 6px;

	font-size: var(--font-size-lg);
	line-height: 24px;
	letter-spacing: 0.18px;

	& img {
		margin-bottom: 2px;
	}

	transition: var(--transition-fast);

	@media (any-hover: hover) {
		&:hover {
			color: var(--primary-hover-color);
		}
	}

	@media (max-width: 980px) {
		font-size: var(--font-size-md);
		letter-spacing: 0.16px;
	}

	@media (max-width: 430px) {

		//box-phone__number
		&__number {
			display: none;
		}
	}
}
</style>
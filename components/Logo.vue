<template>
	<div class="header-content__logo-image">
		<div class="header-content__logo-box">
			<img src="../assets/images/logo-nami.png" alt="Nami Logo">
		</div>
		<div class="header-content__logo-box-mibile">
			<img src="../assets/images/logo-nami-mobile.svg" alt="Nami Logo">
		</div>
	</div>
</template>

<style scoped lang="scss">
.header-content__logo-image {
	position: relative;
	width: 162px;

	@media (max-width: 1030px) {
		width: unset;
	}
}

.header-content__logo-box {
	position: absolute;
	top: -41px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 162px;
	width: 162px;
	border-radius: 50%;
	background-color: #fff;
	filter: drop-shadow(1px -1px 16px rgba(0, 0, 0, 0.06));

	& img {
		position: absolute;
		top: 91px;
		left: 50%;
		transform: translate(-50%, -50%);

		width: 182px;
	}

	@media (max-width: 1030px) {
		display: none;
	}
}

.header-content__logo-box-mibile {
	@media (min-width:1031px) {
		display: none;
	}
}
</style>
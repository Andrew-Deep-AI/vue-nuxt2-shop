<template>
	<button class="enter-btn">
		Войти
	</button>
</template>

<style scoped lang="scss">
.enter-btn {
	display: inline-block;
	padding: 12px 30px 10px 30px;
	border-radius: 30px;
	background-color: var(--primary-background);
	color: var(--quaternary-font-color);
	text-decoration: none;
	text-align: center;
	cursor: pointer;

	font-family: "Neucha";
	font-size: var(--font-size-md);
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: 0.8px;

	transition: var(--transition-fast);

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--primary-hover-color);
		}
	}

}
</style>
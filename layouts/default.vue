<template>
	<div class="wrapper-page">
		<div class="wrapper-page__image-box">
			<div class="wrapper-page__image">
				<img src="@/assets/images/BG-menu1x.png" alt="BG">
			</div>
		</div>
		<CartProducts />
		<Header />
		<Nuxt class="main-content" />
		<Footer />
	</div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
	components: {
		Header,
		Footer
	}
}
</script>

<style scoped lang="scss">
.wrapper-page {
	position: relative;

	//wrapper-page__image-box
	&__image-box {
		position: absolute;
		top: 82px;
		height: calc(100% - 82px - 39px);
		width: 100%;

	}

	//wrapper-page__image
	&__image {
		position: relative;
		margin: 0 auto;
		height: 100%;
		width: 100%;
		max-width: 1920px;
		overflow: hidden;

		& img {
			position: absolute;
			top: 0;
			left: 50%;
			object-fit: contain;
			transform: translate(-50%, 0%);
		}
	}
}
</style>
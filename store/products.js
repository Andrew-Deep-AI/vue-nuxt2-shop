export const state = () => ({
  allProductsList: [],
  cartProductList: [],
});

export const mutations = {
  // ========= allProductsList Start =========
  ADD_PRODUCTS(state, products) {
    state.allProductsList.push(...products);
  },
  TOGGLE_LIKE(state, product) {
    product.like = !product.like;
  },
  // ========= allProductsList End =========

  // ========= cartProductList Start =========
  ADD_TO_CART(state, product) {
    const existingProduct = state.cartProductList.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      state.cartProductList.push({ ...product, quantity: 1, inCart: true });
      product.inCart = !product.inCart;
    }
  },

  REMOVE_FROM_CART(state, productId) {
    state.cartProductList = state.cartProductList.filter(
      (item) => item.id !== productId
    );
    const allListProduct = state.allProductsList.find(
      (item) => item.id === productId
    );
    allListProduct.inCart = !allListProduct.inCart;
  },

  DECREMENT_PRODUCT_QUANTITY(state, productId) {
    const product = state.cartProductList.find((item) => item.id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
    } else if (product) {
      state.cartProductList = state.cartProductList.filter(
        (item) => item.id !== productId
      );

      const allListProduct = state.allProductsList.find(
        (item) => item.id === productId
      );
      allListProduct.inCart = !allListProduct.inCart;
    }
  },
  // ========= cartProductList End =========
};

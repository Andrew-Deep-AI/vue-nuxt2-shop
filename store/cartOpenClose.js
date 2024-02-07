export const state = () => ({
  isCartOpen: false,
  isOrderFormOpen: false,
});

export const mutations = {
  toggleCart(state) {
    state.isCartOpen = !state.isCartOpen;

    if (state.isOrderFormOpen) {
      state.isOrderFormOpen = !state.isOrderFormOpen;
    }

    if (state.isCartOpen) {
      // if (navigator.userAgent.indexOf("Win") != -1) {
      //   document.body.classList.add("windows-os");
      // }
      if (navigator.platform.indexOf("Mac") !== -1) {
        document.body.classList.add("mac-os");
      }

      document.body.classList.add("cart-open");
    } else {
      // if (navigator.userAgent.indexOf("Win") != -1) {
      //   document.body.classList.remove("windows-os");
      // }
      if (navigator.platform.indexOf("Mac") !== -1) {
        document.body.classList.remove("mac-os");
      }

      document.body.classList.remove("cart-open");
    }
  },

  toggleOrderForm(state) {
    if (state.isCartOpen && !state.isOrderFormOpen) {
      state.isOrderFormOpen = !state.isOrderFormOpen;
    }
  },
};

export const actions = {
  toggleCart({ commit }) {
    commit("toggleCart");
  },
};

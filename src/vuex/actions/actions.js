import axios from 'axios'


export default {
  GET_PRODUCTS_FROM_API ({ commit }) {
    return axios('https://firebasestorage.googleapis.com/v0/b/sportshop-4597c.appspot.com/o/db.json?alt=media&token=f9229faf-4b5a-498d-be03-5b932c85c8d1', {
      method: 'GET'
    })
      .then((products) => {
        commit('SET_PRODUCTS_TO_STATE', products.data)
        return products
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  },
  ADD_TO_CART ({ commit }, product) {
    commit('SET_CART', product)
  },
  DELETE_FROM_CART ({ commit }, index) {
    commit('REMOVE', index)
  }
}

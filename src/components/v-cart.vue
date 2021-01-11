<template>
  <div class="v-cart col-md-10 col-sm-8 col-8 col-lg-12">
    <router-link :to="{name: 'Catalog'}">
      <div class="cartLink back"><i class="fa fa-arrow-left" aria-hidden="true"></i>
      </div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!cart_data.length">There are not products in cart...</p>
    <CartItem v-for="(item, index) in cart_data"
    :key="item.article"
    :cart_item_data="item"
    @Delete="DeleteFromCart(index)"
    ></CartItem>
    <div class="total">
      <p class="name">Total price:</p>
      <p class="name" v-if="cart_data.length">{{TotalPrice + " UAH"}}</p>
      <p v-if="!cart_data.length">0 UAH</p>
    </div>
  </div>
</template>

<script>
import CartItem from './cart-item'
import { mapActions } from 'vuex'
export default {
  components: {
    CartItem
  },
  props: {
    cart_data: {
      type: Array,
      return: []
    }
  },
  computed: {
    TotalPrice () {
      let result = []
      if (this.cart_data.length) {
        for (const item of this.cart_data) {
          result.push(item.price * item.quantity)
        }
        result = result.reduce(function (sum, el) {
          return sum + el
        })
      }
      return result
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART'
    ]),
    DeleteFromCart (index) {
      this.DELETE_FROM_CART(index)
    }
  }
}
</script>

<style>
  .total
  {
    position: fixed;
    bottom: 0;
    background: rgb(26, 143, 32);
    font-size: 21px;
    left: 0;
    right: 0;
    padding: 10px;
    display: flex;
    justify-content: center;
    color: white;
  }
</style>

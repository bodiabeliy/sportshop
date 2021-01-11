<template>
  <div class="v-catalog-item">
    <img :src=" require('../assets/images/' + product_data.image)" alt="img">
    <p class="v-catalog-item_name">{{ product_data.name}}</p>
    <p class="v-catalog-item_price">{{ product_data.price + " UAH."}}</p>
    <button  class="v-catalog-item_add_to_cart btn"
      @click="AddToCart">Add to cart  <i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
  </div>
</template>

<script>
export default {
  props: {
    product_data: {
      type: Object,
      return: { }
    }
  },
  methods: {
    AddToCart () {
      this.$emit('AddToCart', this.product_data)
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap');
.v-catalog-item{
  flex-basis: 25%;
  box-shadow:0 0 8px 0 #9e9d9d;
  padding: 16px;
  margin-bottom: 16px
}

.v-catalog-item:hover{
  background: rgba(71, 70, 70, 0.144);
}

.btn
{
  padding: 8px, 16px;
  background-color: rgb(26, 143, 32);
  color: #fff;
  border-radius:7px;
}
.btn:hover
{
  background-color: rgb(39, 97, 38);
}
.v-catalog-item_price{
  font-family: 'Fugaz One', cursive;
}
.v-catalog-item_name{
  font-family: 'Russo One', sans-serif;
}
</style>

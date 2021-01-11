<template>
  <div class="v-catalog col-md-10 col-sm-8 col-8 col-lg-12">
    <Notification :messages="messages"
    :timeOut="3000"
    ></Notification>
    <router-link :to="{name: 'Cart', params: {cart_data: CART}}">
      <div class="cartLink"><i class="fa fa-opencart" aria-hidden="true"></i> {{ CART.length }}</div>
    </router-link>
    <h1>Catalog</h1>
      <div class="filters">
        <Select :options="options"
        @select="SelectOption"
        :selection="selected">
      </Select>
      <div class="range-slider">
        <p>Min: {{ minPrice }}
          <input type="range" min="1700" max="24000" step="50"
          v-model.number="minPrice"
          @change="rangeSlider">
        </p>
        <p>Max: {{ maxPrice }}
          <input type="range" min="1700" max="24000" step="50"
        v-model.number="maxPrice"
        @change="rangeSlider">
        </p>
      </div>
      </div>
    <div class="v-catalog__list">
      <CatalogItem
      v-for="product in filter"
        :key="product.article"
        :product_data="product"
        @AddToCart="AddToCart"
      ></CatalogItem>
    </div>
  </div>
</template>

<script>
import CatalogItem from './v-catalog-item'
import Select from './v-select'
import Notification from './notification/v-notifications'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CatalogItem,
    Select,
    Notification
  },
  data: () => ({
    options: [
      { name: 'All', value: 'ALL' },
      { name: 'Oneseason', value: 'O' },
      { name: 'Allseason', value: 'A' }
    ],
    selected: 'Type:',
    sort: [],
    minPrice: 1700,
    maxPrice: 24000,
    messages: [
    ],
    products: [
      {
        image: 'camp-1.jpg',
        name: 'Rocks',
        price: 7800.0,
        article: 'T1',
        available: true,
        category: 'Oneseason'
      },
      {
        image: 'camp-2.jpg',
        name: 'Greenhouse',
        price: 3150.0,
        article: 'T2',
        available: true,
        category: 'Oneseason'
      },
      {
        image: 'camp-3.jpg',
        name: 'FishingPro',
        price: 4200.0,
        article: 'T3',
        available: false,
        category: 'Allseason'
      },
      {
        image: 'camp-4.jpg',
        name: 'PremierGold',
        price: 10300.0,
        article: 'T4',
        available: true,
        category: 'Allseason'
      },
      {
        image: 'camp-5.jpg',
        name: 'Forest',
        price: 6500.0,
        article: 'T5',
        available: false,
        category: 'Oneseason'
      },
      {
        image: 'camp-6.jpg',
        name: 'Orange',
        price: 3000.0,
        article: 'T6',
        available: true,
        category: 'Oneseason'
      },
      {
        image: 'camp-7.jpg',
        name: 'T-shirt 6',
        price: 8700,
        article: 'T7',
        available: true,
        category: 'Allseason'
      },
      {
        image: 'camp-8.jpg',
        name: 'Hunter',
        price: 7500.0,
        article: 'T8',
        available: true,
        category: 'Allseason'
      },
      {
        image: 'camp-9.jpg',
        name: 'Forest',
        price: 5500.0,
        article: 'T9',
        available: true,
        category: 'Oneseason'
      },
      {
        image: 'camp-10.jpg',
        name: 'Jungle',
        price: 17550.0,
        article: 'T10',
        available: true,
        category: 'Allseason'
      },
      {
        image: 'camp-11.jpg',
        name: 'FishingPro',
        price: 1700.0,
        article: 'T11',
        available: false,
        category: 'Oneseason'
      },
      {
        image: 'camp-12.jpg',
        name: 'Bear',
        price: 9850.0,
        article: 'T12',
        available: true,
        category: 'Allseason'
      },
      {
        image: 'camp-13.jpg',
        name: 'Rocks',
        price: 24000,
        article: 'T13',
        available: true,
        category: 'Allseason'
      },
      {
        image: 'camp-14.jpg',
        name: 'Rocks',
        price: 9000.0,
        article: 'T14',
        available: true,
        category: 'Oneseason'
      },
      {
        image: 'camp-15.jpg',
        name: 'PremierGold',
        price: 2750.0,
        article: 'T15',
        available: true,
        category: 'Oneseason'
      }
    ]
  }),
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CART'
    ]),
    filter () {
      if (this.sort.length) {
        return this.sort
      } else {
        return this.PRODUCTS
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    AddToCart (data) {
      this.ADD_TO_CART(data)
        .then(() => {
          const timeStep = Date.now().toLocaleString()
          this.messages.push(
            { name: 'Product add to cart', id: timeStep }
          )
        })
    },
    SelectOption (category) {
      // this.sort = []
      // const value = this
      // this.PRODUCTS.map(function (item) {
      //  if (item.category === category.name) {
      //   value.sort.push(item)
      //  }
      // })
      // this.selected = category.name
      const val = this
      this.sort = [...this.PRODUCTS]
      this.sort = this.sort.filter(function (item) {
        return item.price >= val.minPrice && item.price <= val.maxPrice
      })
      if (category) {
        this.sort = this.sort.filter(function (item) {
          val.selected = category.name
          return item.category === category.name
        })
      }
    },
    rangeSlider () {
      if (this.minPrice > this.maxPrice) {
        const temp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = temp
      }
      this.SelectOption()
    }
  },
  mounted () {
    this.GET_PRODUCTS_FROM_API()
      .then((responce) => {
        if (responce.data) {
          console.log('Data success reload!')
          this.SelectOption()
        }
      })
  }
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
  h1
  {
    font-family: 'Kanit', sans-serif;
  }
.v-catalog{
  margin-left:9%;
}

.v-catalog__list
{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.cartLink
{
  position: absolute;
  top: 0px;
  right: 10px;
  padding: 16px;
  border: solid 3px rgb(18, 104, 29);
  border-radius: 10%;
  background: rgba(241, 241, 241, 0.925);

}
.cartLink:hover
{
background: rgba(81, 187, 95, 0.911) !important;
}
.back
{
  background-color:rgb(17, 95, 23);
  color: #000;
  font-size: 19px;
}
.back:hover
{
  color: #fff;
}
.range-slider
{
  width: 250px;
  margin: auto 16px;
  text-align: center;
}
.range-slider svg, .range-slider input[type=range]
{
  margin: 5px;
  position: absolute;
}
.filters
{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>

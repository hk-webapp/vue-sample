import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import product from './modules/product'
import products from './modules/products'
import category from './modules/category'
import categories from './modules/categories'
import imageMng from './modules/imageMng'
import articles from './modules/articles'
import imageinfo from './modules/imageinfo'
import articledItem from './modules/articledItem'

Vue.use(Vuex);

// const myPlugin = store => {
//   // called when the store is initialized
//   store.subscribe((mutation, state) => {
//     // called after every mutation.
//     // The mutation comes in the format of `{ type, payload }`.
//   })
// }

const store = new Vuex.Store({
  modules: {
    user,
    product,
    products,
    category,
    categories,
    imageMng,
    articles,
    imageinfo,
    articledItem
  }
})

export default store;
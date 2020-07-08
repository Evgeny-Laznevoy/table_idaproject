import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    title_filter: [
      {
        id: 1,
        name: "product",
        title: 'Product (100g serving)',
        color: false
      },
      {
        id: 2,
        name: "calories",
        title: 'Calories',
        color: false
      },
      {
        id: 3,
        name: "fat",
        title: 'Fat (g)',
        color: false
      },
      {
        id: 4,
        name: "carbs",
        title: 'Carbs (g)',
        color: false
      },
      {
        id: 5,
        name: "protein",
        title: 'Protein (%)',
        color: false
      },
      {
        id: 6,
        name: "iron",
        title: 'Iron (%)',
        color: false
      }
    ],
    sortBy: "name",
    sortDirection: "ASC",
  },
  mutations: {
      SET_PRODUCTS_TO_STATE(state, products){
        state.products = products
      },
      SORT_PRODUCTS(state){
        state.products.sort( function(a, b) {
          if ( state.sortDirection == "ASC" ) {
            return ( (a.product == b.product) ? 0 : ( ( a.product > b.product) ? 1 : -1 ));
          }

          if ( state.sortDirection == "DESC" ) {
            return ( (a.product == b.product) ? 0 : ( ( a.product < b.product) ? 1 : -1 ));
          }
        }.bind(state));    
      },
      SORT_BY_NUMBER(state, payload){

        switch (payload) {
          case "product":
            
          break;
          case "calories":
            state.products.sort( function(a, b){
              if ( state.sortDirection == "ASC" ) {
                return a.calories < b.calories ? 1 : -1;
              } else {
                return a.calories > b.calories ? 1 : -1;
              }
            }.bind(state))
          break;
          case "fat":
            state.products.sort( function(a, b){
              if ( state.sortDirection == "ASC" ) {
                return a.fat < b.fat ? 1 : -1;
              } else {
                return a.fat > b.fat ? 1 : -1;
              }
            }.bind(state))
          break;
          case "carbs":
            state.products.sort( function(a, b){
              if ( state.sortDirection == "ASC" ) {
                return a.carbs < b.carbs ? 1 : -1;
              } else {
                return a.carbs > b.carbs ? 1 : -1;
              }
            }.bind(state))
          break;
          case "protein":
            state.products.sort( function(a, b){
              if ( state.sortDirection == "ASC" ) {
                return a.protein < b.protein ? 1 : -1;
              } else {
                return a.protein > b.protein ? 1 : -1;
              }
            }.bind(state))
          break;
          case "iron":
            state.products.sort( function(a, b){
              if ( state.sortDirection == "ASC" ) {
                return a.iron < b.iron ? 1 : -1;
              } else {
                return a.iron > b.iron ? 1 : -1;
              }
            }.bind(state))
          break;
          default:
            break;
        }
        // state.products.sort( function(a, b){
        //   if ( state.sortDirection == "ASC" ) {
        //     return a.calories < b.calories ? 1 : -1;
        //   }

        //   if ( state.sortDirection == "DESC" ) {
        //     return a.calories > b.calories ? 1 : -1;
        //   }
        // }.bind(state))
      },
  },
  actions: {
    GET_PRODUCTS_FROM_API({commit}){
      return axios.get('http://localhost:3000/products')
      .then((res) => {
        commit('SET_PRODUCTS_TO_STATE', res.data)
      })
      .catch((error) => {
        console.log(error);
        return error
      })
    },
    SORT_PRODUCTS_TO_STATE({commit}, payload){
      // console.log(payload);
      if ( payload == this.state.sortBy ) {
        if ( this.state.sortDirection == 'ASC' ) {
          this.state.sortDirection = 'DESC';
        } else {
          this.state.sortDirection = 'ASC';
        }
      }

      if ( payload != this.state.sortBy ) {
        this.state.sortBy = payload;
        this.state.sortDirection = 'ASC';
      }

      if (this.state.sortBy == "product") {
        commit('SORT_PRODUCTS');
      } else {
        commit('SORT_BY_NUMBER', this.state.sortBy);
      }
    }
  },
  getters:{
    PRODUCTS(state){
      return state.products
    },
    TITLE_FILTER(state){
      return state.title_filter
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* eslint no-unused-vars: 0 , no-console:off , no-undef: off*/
export default new Vuex.Store({
  state: {
    global_total_price: 0,
    global_total_amount: 0,
    global_order_list: [
      { name: "焦糖星冰樂", img: "drink1.jpg", price: 130, amount: 0 },
      { name: "焦糖可可星冰樂", img: "drink2.jpg", price: 145, amount: 0 },
      { name: "英式紅茶", img: "drink3.jpg", price: 110, amount: 0 },
      { name: "冰蜜柚紅茶", img: "drink4.jpg", price: 125, amount: 0 },
      { name: "太妃核果風味那堤", img: "drink5.jpg", price: 145, amount: 0 },
      { name: "耶誕雪人巧克力那堤", img: "drink6.jpg", price: 150, amount: 0 },
      { name: "法式千層薄餅", img: "cake1.jpg", price: 95, amount: 0 },
      { name: "咖啡巧克力松露蛋糕", img: "cake2.jpg", price: 85, amount: 0 },
      { name: "提拉米蘇千層薄餅", img: "cake3.jpg", price: 100, amount: 0 },
      { name: "可可伯爵薄餅", img: "cake4.jpg", price: 130, amount: 0 }
    ],
    global_show_list: [
      { name: "焦糖星冰樂", price: 130, amount: 0 },
      { name: "焦糖可可星冰樂", price: 145, amount: 0 },
      { name: "英式紅茶", price: 110, amount: 0 },
      { name: "冰蜜柚紅茶", price: 125, amount: 0 },
      { name: "太妃核果風味那堤", price: 145, amount: 0 },
      { name: "耶誕雪人巧克力那堤", price: 150, amount: 0 },
      { name: "法式千層薄餅", price: 95, amount: 0 },
      { name: "咖啡巧克力松露蛋糕", price: 85, amount: 0 },
      { name: "提拉米蘇千層薄餅", price: 100, amount: 0 },
      { name: "可可伯爵薄餅", price: 130, amount: 0 }
    ],
  },
  mutations: {
    INCREMENT_ORDER(state, p_name) {
      state.global_order_list.forEach(element => {
        if (element.name == p_name) {
          state.global_total_price += element.price;
          element.amount++;
          state.global_total_amount++;
        }
      });
    },
    DECREMENT_ORDER(state, p_name) {
      state.global_order_list.forEach(element => {
        if (element.name == p_name) {
          state.global_total_amount--;
          state.global_total_price -= element.price;
          element.amount--;
        }
      })
      if (state.global_total_amount < 0) {
        state.global_total_amount = 0
        state.global_total_price = 0
      }
    },
  },
  getters: {
    get_order_list(state) {
      return state.global_order_list
    },
    get_order_list_amount(state) {
      return state.global_total_amount
    },
    get_order_list_price(state) {
      return state.global_total_price
    },
    get_global_show_list(state) {
      return state.global_show_list
    }
  }
})

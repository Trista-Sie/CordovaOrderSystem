<template>
  <div class="home">
    <div class="Navbar">
      <div class="navbar-brand">
        <b>Hotbucks</b>
      </div>
      <img class="info_icon" src="../assets/info_icon.png" />
    </div>

    <div class="menu" id="menu">
      <!-- for迴圈顯示商品列表 -->
      <ul :key="item" v-for="item in product">
        <li class="list-group-item">
          <img class="product_img" v-bind:src="getSrc(item.img)" v-bind:alt="pic" />
          {{item.name}} {{item.price}}元
          <div class="amount_block">
            <img
              class="plus_minus"
              src="../assets/plus.png"
              @click="clickPlus(item.number,item.name)"
            />
            <input
              :id="item.number"
              v-model="item.amount"
              class="amount col-md-3 form-control"
              type="text"
            />
            <img
              class="plus_minus"
              src="../assets/minus.png"
              @click="clickMinus(item.number,item.name)"
            />
          </div>
          <br />
        </li>
      </ul>
    </div>

    <div class="end_block">
      <div class="totalPrice">
        總金額:
        <input class="form-control" id="totalPrice" type="text" value="0" v-model="total_money" />
      </div>

      <div class="totalAmount">
        總數量:
        <input
          class="form-control"
          id="totalAmount"
          type="text"
          value="0"
          v-model="total_amount"
        />
      </div>
      <div class="pay" id="pay">
        <router-link :to="{name:'purchase'}">
          <img class="purchase_icon" id="pay" src="../assets/purchase.png" />
        </router-link>
      </div>
      <div class="time_block">{{date | formatDate}}</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint no-unused-vars: 0 , no-console:off , no-undef: off*/

var padDate = function(value) {
  //在月份、日期、小时等小于10时在前面补0
  // console.log("padDate=", padDate);
  return value < 10 ? "0" + value : value;
};
export default {
  name: "home",
  components: {},

  data() {
    return {
      images: "",
      pic: "",
      total_amount: 0,
      total_money: 0,
      date: new Date(),

      product: [
        {
          number: 1,
          name: "焦糖星冰樂",
          img: "drink1.jpg",
          price: 130,
          amount: 0
        },
        {
          number: 2,
          name: "焦糖可可星冰樂",
          img: "drink2.jpg",
          price: 145,
          amount: 0
        },
        {
          number: 3,
          name: "英式紅茶",
          img: "drink3.jpg",
          price: 110,
          amount: 0
        },
        {
          number: 4,
          name: "冰蜜柚紅茶",
          img: "drink4.jpg",
          price: 125,
          amount: 0
        },
        {
          number: 5,
          name: "太妃核果風味那堤",
          img: "drink5.jpg",
          price: 145,
          amount: 0
        },
        {
          number: 6,
          name: "耶誕雪人巧克力那堤",
          img: "drink6.jpg",
          price: 150,
          amount: 0
        },
        {
          number: 7,
          name: "法式千層薄餅",
          img: "cake1.jpg",
          price: 95,
          amount: 0
        },
        {
          number: 8,
          name: "咖啡巧克力松露蛋糕",
          img: "cake2.jpg",
          price: 85,
          amount: 0
        },
        {
          number: 9,
          name: "提拉米蘇千層薄餅",
          img: "cake3.jpg",
          price: 100,
          amount: 0
        },
        {
          number: 10,
          name: "可可伯爵薄餅",
          img: "cake4.jpg",
          price: 130,
          amount: 0
        }
      ]
    };
  },
  filters: {
    formatDate: function(value) {
      //value为需要过滤的数据
      var date = new Date();
      var year = date.getFullYear();
      var month = padDate(date.getMonth() + 1);
      var day = padDate(date.getDate());
      var hours = padDate(date.getHours());
      var minutes = padDate(date.getMinutes());

      //整理数据并返回
      return year + " / " + month + " / " + day + " " + hours + ":" + minutes;
    }
  },
  methods: {
    getSrc(img) {
      //顯示商品圖片
      this.images = require.context("../assets/product/", false, /\.jpg$/);
      return this.images("./" + img);
    },
    clickPlus(p_num, p_name) {
      this.$store.commit("INCREMENT_ORDER", p_name);
      this.amountChange(p_num, "plus");
      this.saveData();
    },
    clickMinus(p_num, p_name) {
      this.$store.commit("DECREMENT_ORDER", p_name);
      this.amountChange(p_num, "minus");
      this.saveData();
    },
    //使v-model同步顯示數量增減
    amountChange(id, mode) {
      this.product.forEach((element, index) => {
        if (id == element.number) {
          if (mode == "plus") {
            this.product[index].amount++;
            // console.log('index=',index);
            // console.log('plus=',this.product[index].amount);
          } else if (mode == "minus") {
            this.product[index].amount--;
            if (this.product[index].amount < 0) {
              this.product[index].amount = 0;
            }
            // console.log('index=',index);
            // console.log('minus=',this.product[index].amount);
          }
        }
      });
    },
    //取得state的變數
    saveData() {
      this.total_amount = this.$store.getters.get_order_list_amount;
      // console.log('total_amount=',this.total_amount);
      this.total_money = this.$store.getters.get_order_list_price;
      // console.log('total_monney=',this.total_money);
    }
  },
  // mounted: function() {
  //   //定时器，用于每秒刷新页面
  //   var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
  //   this.timer = setInterval(function() {
  //     _this.date = new Date(); //修改数据date
  //   }, 1000);
  // },
  beforeDestory: function() {
    //清除定时器
    if (this.timer) {
      clearInterval(this.timer); //在Vue实例销毁前，清除定时器
    }
  }
};
</script>
<style scoped>
.info_icon {
  float: right;
  width: 40px;
  height: 40px;
}
.Navbar {
  width: 100%;
  text-align: center;
}
.navbar-brand {
  font-size: 47px;
  text-align: center;
}
.end_block {
  width: 90%;
  height: 20%;
  display: inline-block;
}
.time_block {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: large;
}
.totalPrice {
  display: inline-block;
  text-align: left;
  font-size: large;
  margin: 3px;
}

.totalAmount {
  display: inline-block;
  text-align: left;
  font-size: large;
  margin: 3px;
}

.pay {
  display: inline-block;
  text-align: right;
  font-size: large;
}
.purchase_icon {
  float: right;
  width: 45px;
  height: 45px;
}
.amount {
  display: inline-block;
}

.product_img {
  height: 155px;
  width: 150px;
}

.amount_block {
  height: 20%;
  margin: 30px;
  float: right;
}

.plus_minus {
  height: 30px;
  width: 30px;
}

.list-group-item {
  text-align: left;
  margin: 3px;
}
.menu {
  height: 80%;
  width: 90%;
  left: 5%;
}
</style>
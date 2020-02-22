<template>
  <div class="home">
    <center>
      <div class="Navbar">
        <div class="navbar-brand">
          <b>Hotbucks</b>
        </div>
        <a href="https://github.com/Trista-Sie/CordovaOrderSystem" target="_blank">
          <img class="info_icon" src="../assets/info_icon.png" />
        </a>
      </div>
    </center>

    <center>
      <div class="menu" id="menu">
        <!-- for迴圈顯示商品列表 -->
        <ul :key="item" v-for="item in product">
          <li class="list-group-item">
            <img class="product_img" v-bind:src="getSrc(item.img)" v-bind:alt="pic" />
            {{item.name}} {{item.price}}元
            <div class="amount_block">
              數量
              <img
                class="plus"
                src="../assets/plus.png"
                @click="clickPlus(item.number,item.name)"
              />
              <input class="amount_input" :id="item.number" v-model="item.amount" type="text" />
              <img
                class="minus"
                src="../assets/minus.png"
                @click="clickMinus(item.number,item.name)"
              />
            </div>
            <br />
          </li>
        </ul>
      </div>
    </center>

    <div class="end_block">
      <div class="total_info">
        <div class="totalPrice">
          總金額
          <input
            class="to_price_input"
            id="totalPrice"
            type="text"
            value="0"
            v-model="total_money"
          />
        </div>

        <div class="totalAmount">
          總數量
          <input
            class="to_amount_input"
            id="totalAmount"
            type="text"
            value="0"
            v-model="total_amount"
          />
        </div>
      </div>
      <div class="pay" id="pay">
        <router-link :to="{name:'purchase'}">
          <img id="pay" class="purchase_icon" src="../assets/purchase.png" />
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
          } else if (mode == "minus") {
            this.product[index].amount--;
            if (this.product[index].amount < 0) {
              this.product[index].amount = 0;
            }
          }
        }
      });
    },
    //取得state的變數
    saveData() {
      this.total_amount = this.$store.getters.get_order_list_amount;
      this.total_money = this.$store.getters.get_order_list_price;
    }
  },  
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:ivory");
  },
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
  cursor: pointer;
  float: right;
  width: 8%;
  height: 8%;
}
.Navbar {
  width: 85%;
  text-align: center;
}
.navbar-brand {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  width: 50%;
  font-size: 40px;
  text-align: center;
}
.time_block {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: large;
}
.pay {
  display: inline-block;
  text-align: right;
  font-size: large;
}
.purchase_icon {
  margin-top: 5px;
  float: right;
  width: 45px;
  height: 45px;
}
.totalPrice {
  width: 90%;
  text-align: left;
  margin-left: 19.5px;
  font-size: 17px;
}
.to_price_input {
  margin-left: 5px;
  width: 30%;
  border-style: none;
  font-size: 15px;
  text-align: left;
}
.totalAmount {
  width: 90%;
  text-align: left;
  margin-left: 19.5px;
  font-size: 17px;
}
.to_amount_input {
  margin-left: 5px;
  width: 30%;
  border-style: none;
  font-size: 15px;
  text-align: left;
}
.total_info {
  display: inline-block;
}
.end_block {
  display: inline-block;
  width: 90%;
  font-family: "Microsoft YaHei";
}
.product_img {
  display: inline-block;
  height: 55px;
  width: 55px;
}
.amount_block {
  display: inline-block;
  text-align: left;
  font-size: 17px;
  float: 40px;
  margin: 8px;
}
.amount_input {
  display: inline-block;
  margin-left: 5px;
  width: 20px;
  border-style: none;
  font-size: 16px;
  text-align: center;
}
.minus {
  display: inline-block;
  margin-left: 5px;
  height: 20px;
  width: 20px;
}
.plus {
  display: inline-block;
  margin-left: 10px;
  height: 20px;
  width: 20px;
}
.list-group-item {
  text-align: left;
  height: 50%;
  width: 95%;
}
.menu {
  position: relative;
  font-family: "Microsoft JhengHei";
  margin-right: 19.5%;
  width: 90%;
  font-size: 16px;
}
</style>
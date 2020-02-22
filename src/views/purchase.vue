<template>
  <div class="purchase">
    <div class="Navbar">
      <div class="navbar-brand">
        <b>Shoppinglist</b>
      </div>
      <a href="https://github.com/Trista-Sie/CordovaOrderSystem" target="_blank">
        <img class="info_icon" src="../assets/info_icon.png" />
      </a>
    </div>

    <div class="menu" id="menu">
      <!-- for迴圈顯示商品列表 -->
      <ul :key="item" v-for="item in orderData">
        <li
          class="list-group-item"
          v-if="item.amount != 0"
        >{{item.name}} {{item.amount}} 個 {{item.amount*item.price}} 元</li>
      </ul>
    </div>
    <div class="total_info">
      <div class="totalPrice">
        總金額:
        <input
          class="to_price_input"
          id="totalPrice"
          type="text"
          value="0"
          v-model="total_money"
        />
      </div>

      <div class="totalAmount">
        總數量:
        <input
          class="to_amount_input"
          id="totalAmount"
          type="text"
          value="0"
          v-model="total_amount"
        />
      </div>
    </div>
    <div class="purchase_way">
      <font size="4">付款方式:</font>
      <form action="/action_page.php" class>
        <input class="pur_way_input" type="radio" name="choice" value="ibon" />7-11 ibon
        <br />
        <input class="pur_way_input" type="radio" name="choice" value="WebATM" />WebATM 轉帳
        <br />
        <input class="pur_way_input" type="radio" name="choice" value="getPay" checked />超商取貨付款
        <br />
        <br />
      </form>
    </div>
    <router-link :to="{name:'home'}">
      <input class="choose" type="button" value="取消訂單！" />
    </router-link>
    <input class="choose" type="button" onclick="alert('下單成功 !')" value="確認購買！" />
    <div class="time_block">下單時間：{{date | formatDate}}</div>
  </div>
</template>


<script>
/* eslint no-unused-vars: 0 , no-console:off , no-undef: off*/

var padDate = function(value) {
  //在月份、日期、小时等小于10时在前面补0
  return value < 10 ? "0" + value : value;
};

export default {
  name: "purchase",
  componemts: {},

  data() {
    return {
      images: "",
      pic: "",
      total_amount: 0,
      total_money: 0,
      orderData: []
    };
  },
  filters: {
    formatDate: function(value) {
      //value为需要过滤的数据
      var date = new Date();
      // console.log('date=',date);
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
    reset_info() {
      this.orderData.forEach((element, index) => {
        this.orderData[index].amount = 0;
      });
      this.total_amount = 0;
      this.total_price = 0;
    }
  },
  mounted: function() {
    this.orderData = this.$store.getters.get_order_list;
    // console.log("orderData=", this.orderData);
    this.total_amount = this.$store.getters.get_order_list_amount;
    // console.log("total_amount=", this.total_amount);
    this.total_money = this.$store.getters.get_order_list_price;
    // console.log("total_monney=", this.total_money);
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    // this.timer = setInterval(function() {
    //   _this.date = new Date(); //修改数据date
    // }, 1000);
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
  display: inline;
  cursor: pointer;
  float: right;
  width: 25px;
  height: 25px;
}
.Navbar {
  display: inline;
  width: 85%;
  text-align: center;
}
.navbar-brand {
  font-family: Cambria, Cochin, Georgia, Times, "Microsoft JhengHei", serif;
  width: 50%;
  font-size: 30px;
  text-align: center;
}
.list-group-item {
  text-align: left;
  margin: 5px;
}
.time_block {
  display: inline-block;
  font-family: "Microsoft JhengHei";
  width: 80%;
  text-align: right;
  font-size: 18px;
}
.choose {
  cursor: pointer;
  background-color: #800000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  margin: 40px;
}
.purchase_way {
  font-family: "Microsoft JhengHei";
  margin-top: 5%;
  margin-left: 10%;
  width: 80%;
  text-align: left;
}
.pur_way_input {
  display: inline-block;
  margin-top: 3%;
}
.totalPrice {
  display: inline-block;
  width: 50%;
  text-align: left;
  font-size: 18px;
}
.to_price_input {
  display: inline-block;
  margin-left: 5px;
  width: 50%;
  border-style: none;
  font-size: 17px;
  text-align: left;
}
.totalAmount {
  display: inline-block;
  width: 50%;
  text-align: left;
  font-size: 18px;
}
.to_amount_input {
  display: inline-block;
  margin-left: 5px;
  width: 50%;
  border-style: none;
  font-size: 17px;
  text-align: left;
}
.total_info {
  display: inline-block;
  font-family: "Microsoft JhengHei";
  width: 80%;
}
.menu {
  position: relative;
  font-family: "Microsoft JhengHei";
  margin-right: 19.5%;
  width: 90%;
  font-size: 15px;
}
</style>

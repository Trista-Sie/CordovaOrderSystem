<template>
  <div class="purchase">
    <div class="Navbar">
      <div class="navbar-brand">
        <b>Hotbucks Orderlist</b>
      </div>
      <img class="info_icon" src="../assets/info_icon.png" />
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
    </div>
    <div class="purchase_way">
      <font size="4">付款方式:</font>

      <form action="/action_page.php" class>
        <input type="radio" name="choice" value="ibon" />7-11 ibon
        <br />
        <input type="radio" name="choice" value="WebATM" />WebATM 轉帳
        <br />
        <input type="radio" name="choice" value="getPay" checked />超商取貨付款
        <br />
        <br />
      </form>
    </div>
    <div class="toPurchase">
      <router-link :to="{name:'home'}">
        <input type="button" value="取消訂單！" />
      </router-link>
      <input class="buy" type="button" onclick="alert('下單成功 !')" value="確認購買！" />
    </div>
    <div class="time_blocl">下單時間：{{date | formatDate}}</div>
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
  methods: {},
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
.product_img {
  height: 150px;
  width: 150px;
}
.list-group-item {
  text-align: left;
  margin: 5px;
}
.end_block {
  display: inline-block;
  width: 80%;
  margin: 2px;
  float: left;
}
.time_block {
  display: inline-block;
  text-align: right;
  float: right;
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
.purchase_way {
  margin: 20px;
  width: 80%;
  text-align: left;
}
</style>

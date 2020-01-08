<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm :passData="userData" />

      <!-- 侧边栏 -->
      <OrderAside :data='userData.data'/>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from '@/components/air/orderAside'
export default {
  components: {
    OrderForm,OrderAside
  },
  data() {
    return {
      userData: {}
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.$axios({
      url: `/airs/${this.$route.query.id}`,
      params: {
        seat_xid: this.$route.query.seat_xid
      }
    }).then(res => {
      this.userData = res
      console.log(this.userData);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>
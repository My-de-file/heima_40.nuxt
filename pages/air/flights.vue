<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data='filtration' @select='select1' />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in aDouble" :key="index" :data="item" />
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totil"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";

import FlightsListHead from "@/components/air/flightsListHead";

import FlightsItem from "@/components/air/flightsItem";

import FlightsFilters from "@/components/air/flightsFilters";
export default {
  data() {
    return {
      flightsdata: {
        info: {},
        options: {}
      },
      filtration: {
        info: {},
        options: {}
      },
      currentPage1: 5,
      currentPage2: 1,
      currentPage4: 5,
      totil: 0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: {
        departCity: this.$route.query.departCity,
        departCode: this.$route.query.departCode,
        destCity: this.$route.query.destCity,
        destCode: this.$route.query.destCode,
        departDate: this.$route.query.departDate
      }
    }).then(res => {
      this.filtration = res.data;
      this.flightsdata = { ...res.data };
      this.totil = this.flightsdata.flights.length;
    //   console.log(this.filtration);
    });
  },
  methods: {
    // 过滤条件
    select1(v){
        console.log(v);
        this.flightsdata.flights = v
        this.totil = v.length
    },

    handleSizeChange(val) {
      this.currentPage1 = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage2 = val;
      // console.log(`当前页: ${val}`);
    }
  },
  computed: {
    aDouble() {
      //   console.log(this.currentPage2, 1212);
      if (!this.flightsdata.flights) return [];

      //   this.flightsdata.flights.length = this.currentPage1

      return this.flightsdata.flights.slice(
        (this.currentPage2 - 1) * this.currentPage1,
        this.currentPage2 * this.currentPage1
      );
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
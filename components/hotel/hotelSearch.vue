<template>
  <div id="search">
    <el-col :span="6">
      <el-autocomplete
        style="width: 95%;"
        class="inline-input"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
    </el-col>
    <div class="block">
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <el-select v-model="value" placeholder="请选择">
      <el-option-group v-for="group in options" :key="group.label" :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-option-group>
    </el-select>
      <el-button type="primary" style="margin-left: 15px;">查看价格</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: ['1','2','3'],
      state1: "",
      state2: "",
      options: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海"
            },
            {
              value: "Beijing",
              label: "北京"
            }
          ]
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都"
            },
            {
              value: "Shenzhen",
              label: "深圳"
            },
            {
              value: "Guangzhou",
              label: "广州"
            },
            {
              value: "Dalian",
              label: "大连"
            }
          ]
        }
      ],
      value: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(this.restaurants);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return ["1", "2", "3"];
    },
    handleSelect() {
      console.log(1);
      
    }
  }
};
</script>

<style lang='less' scoped>
#search{
    display: flex;
    justify-content:flex-start;
    width: 100%;
    .block{
    width: 33%;
    margin-right: 10px;
    /deep/ .el-date-editor{
        width: 100%;
    }
    }
    .inline-input{
        margin-right: 15px;
    }

}
</style>
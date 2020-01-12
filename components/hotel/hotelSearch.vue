<template>
  <div name="sech">
    <div id="search">
      <el-col :span="6">
        <el-autocomplete
          style="width: 95%;"
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入城市"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @blur="helblur"
        ></el-date-picker>
      </div>
      <div class="selectNumber" @click="helclick">
        <span>人数未定</span>
        <i class="el-icon-edit"></i>
      </div>
      <el-button type="primary" style="margin-left: 15px;">查看价格</el-button>
    </div>
    <div class="show" v-if="showde">
      <div class="showsom">
        <span>每间</span>
        <div>
          <el-select v-model="value" placeholder="成人">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value" placeholder="儿童">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="anniu" @click="helclick"><div>确定</div></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      state2: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24 * 1;
        }
      },
      value1: "",
      showde: false
    };
  },
  methods: {
    helclick() {
      this.showde = !this.showde;
    },
    helblur() {
      console.log(moment(this.value1[0]).format("YYYY-MM-DD"));
      console.log(moment(this.value1[1]).format("YYYY-MM-DD"));
    },
    querySearch(queryString, cb) {
      // console.log(queryString);
      this.$axios({
        url: "/cities",
        params: {
          name: queryString
        }
      }).then(res => {
        this.return = res.data.data.map(v => {
          v.value = v.name;
          return v;
        });
        console.log(this.return);
        cb(this.return);
      });
    },
    handleSelect(value) {
      this.$emit("click", value);
    }
  }
};
</script>

<style lang='less' scoped>
/deep/.el-select {
  .el-input {
    height: 25px;
    width: 90px;
    margin-right: 10px;
    .el-input__inner {
      height: 100%;
    }
    .el-input__icon{
      line-height: 0px;
    }
  }
}
.anniu{
  position: relative;
  >div{
    position: absolute;
    top: 38px;
    left: 248px;
    border: 1px solid #409EFF;
    border-radius: 5px;
    width: 40px;
    background-color: #409EFF;
    color: #fff;
    height: 25px;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
  }
}
.show {
  width: 300px;
  height: 120px;
  position: absolute;
  left: 955px;
  background: #fff;
  z-index: 99;
  top: 160px;
  border-radius: 5px;
  border: 1px solid #ebeef5;
  transition: all 0.6s ease-in-out;
  display: flex;
  flex-direction: column;
  .showsom {
    height: 40%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin: 0 10px;
    > div {
      display: flex;
      justify-content: space-between;
      margin-left: 50px;
    }
    span{
      font-size: 12px;
      color: #666;
    }
  }
}
#search {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  .selectNumber {
    width: 25%;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 0 5px;
    span {
      margin-left: 10px;
    }
  }
  .block {
    width: 33%;
    margin-right: 10px;
    /deep/ .el-date-editor {
      width: 100%;
    }
  }
  .inline-input {
    margin-right: 15px;
  }
}
</style>
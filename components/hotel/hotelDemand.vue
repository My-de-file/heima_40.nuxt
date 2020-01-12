<template>
  <div id="demand">
    <div class="head">
      <ul>
        <li>
          <div>
            <p>
              价格
              <span style="float: right;">0-4000</span>
            </p>
            <div class="block" ref="top">
              <el-slider v-model="value2" :max="4000"></el-slider>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div v-for="(item,index) in hotelSele" :key="index">
              <p>{{item}}</p>
            </div>
          </div>
          <div>
            <div v-for="(item,index) in hotelSele" :key="index">
              <el-dropdown>
                <span class="el-dropdown-link choice-boxSom">
                  下拉菜单
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 160px;">
                  <el-radio-group v-model="radio">
                    <el-radio v-model="radio" label="1">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                    <el-radio v-model="radio" label="3">备选项</el-radio>
                    <el-radio v-model="radio" label="4">备选项</el-radio>
                    <el-radio v-model="radio" label="5">备选项</el-radio>
                    <el-radio v-model="radio" label="6">备选项</el-radio>
                    <el-radio v-model="radio" label="7">备选项</el-radio>
                    <el-radio v-model="radio" label="8">备选项</el-radio>
                  </el-radio-group>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="choicebox">
      <div class="choice-boxSom" v-for="(item,index) in selectBox" :key="index">
        <div
          class="hover-show"
          :class="{hover:hoverShow === index}"
          @mouseover="hoverSele(index)"
          @mouseout="hoverUop()"
        >
          <span class="point"></span>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>
      </div>
    </div>-->
    <div v-if="cityshow">
      <div class="comte" v-for="(item,index) in cityHotel" :key="index">
        <div class="comte-left">
          <img :src="item.photos" alt />
        </div>
        <div class="comte-commt">
          <p>{{item.name}}</p>
          <div>
            {{item.alias}}
            <i
              class="iconfont iconhuangguan"
              style="color: #f90;"
              v-for="(i,index) in item.level"
              :key="index"
            ></i>
            {{item.hoteltype.name}}
          </div>
          <div>
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
            <span>
              <i>{{item.roomCount}}</i>条评价
            </span>
            <span>
              <i>{{item.good_remarks}}</i>篇游记
            </span>
          </div>
          <div>
            <i class="el-icon-location"></i>
            位于：{{item.address}}
          </div>
        </div>
        <div class="comte-rigth">
          <div v-for="(pro,index) in item.products" :key="index">
            {{pro.name}}
            <span>
              <i>￥{{pro.price}}</i>起
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      v-if="cityHotel"
      layout="prev, pager, next"
      next-text="下一页"
      prev-text="上一页"
      :total="50"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      radio:'',
      value2: 4000,
      value: "",
      options: [],
      selectBox: ["1", "2", "3", "4"],
      hoverShow: "",
      hotelSele: ["住宿等级", "住宿类型", "酒店设施", "酒店品牌"],
      cityHotel: [],
      cityshow: false
    };
  },
  methods: {
    handleChange() {
      console.log(1);
    },
    hoverSele(index) {
      this.hoverShow = index;
      //   console.log(this.$refs.top);
    },
    hoverUop() {
      this.hoverShow = "";
    }
  },
  watch: {
    data() {
      console.log(this.data);
      this.cityshow = true;
      this.$axios({
        url: "/hotels",
        data: {
          city: this.data.city
        }
      }).then(res => {
        this.cityHotel = res.data.data.map(v => {
          if (v.hotellevel) {
            v.level = v.hotellevel.level;
          } else {
            v.level = [];
          }
          return v;
        });
        console.log(this.cityHotel);
      });
    }
  }
};
</script>

<style lang='less' scoped>
#demand {
  .el-dropdown {
    width: 100%;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .comte {
    height: 250px;
    display: flex;
    justify-content: flex-start;
    padding: 20px 0;
    .comte-left {
      width: 320px;
      height: 210px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .comte-rigth {
      flex: 1;
      div {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
          padding-right: 30px;
        }
      }
      div i:nth-child(2) {
        margin-left: 5px;
      }
      div i:nth-child(1) {
        // margin-left: 5px;
        color: #f90;
      }
    }
    .comte-commt {
      width: 400px;
      margin-left: 20px;
      > p {
        color: #000;
        font-size: 24px;
      }
    }
    .comte-commt div:nth-child(2) {
      color: #999;
      font-size: 14px;
    }
    .comte-commt div:nth-child(3) {
      display: flex;
      // align-items:baseline;
      margin-top: 10px;
      color: #000;
      // background-color: red;
      span {
        margin: 0 20px;
        font-size: 16px;
      }
      i {
        color: #f90;
        margin-right: 5px;
      }
    }
    .comte-commt div:nth-child(4) {
      margin-top: 10px;
      font-size: 12px;
      i {
        font-size: 14px;
      }
    }
  }
  width: 100%;
  margin: 20px 0 0 0;
  font-size: 14px;
  color: #666;
  // .choicebox {
  //   display: flex;
  //   justify-content: flex-start;
  //   margin-left: 200px;
  // .hover-show {
  //   //   float: left;
  //   margin-top: -10px;
  //   width: 170px;
  //   // margin: 10px 0 0 0;
  //   height: 200px;
  //   background-color: #fff;
  //   border: 1px solid #ebeef5;
  //   margin-left: 30px;
  //   position: absolute;
  //   z-index: 2001;
  //   display: none;
  //   .point {
  //     position: absolute;
  //     top: -6px;
  //     left: 60px;
  //     display: block;
  //     float: right;
  //     width: 10px;
  //     height: 10px;
  //     border-left: 1px solid #ebeef5;
  //     border-top: 1px solid #ebeef5;
  //     transform: rotate(45deg);
  //     -ms-transform: rotate(45deg); /* IE 9 */
  //     -moz-transform: rotate(45deg); /* Firefox */
  //     -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
  //     -o-transform: rotate(45deg);
  //     z-index: 2001;
  //     background-color: #fff;
  //   }
  // }
  // .hover {
  //   display: block;
  //   // animation: myfirst 1s;
  //   // -webkit-animation: myfirst 1s;
  // }
  // }
  .choicebox .choice-boxSom:nth-child(2) div {
    left: 765px;
  }
  .choicebox .choice-boxSom:nth-child(3) div {
    left: 965px;
  }
  .choicebox .choice-boxSom:nth-child(4) div {
    left: 1165px;
  }
  .hvoer-s {
    top: 310px;
    .point {
      top: 194px !important;
      border-left: none !important;
      border-top: none !important;
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
    }
  }
  .head {
    border: 1px solid #ccc;
    margin: 0 10px 0 0;
    height: 80px;
    padding: 5px 0;
    > ul {
      display: flex;
      > li {
        flex: 20%;
        height: 70px;
        border-right: 1px solid #ccc;
        // p {
        //   line-height: 35px;
        //   .span {
        //     margin-top: 12px;
        //     display: block;
        //     float: right;
        //     width: 10px;
        //     height: 10px;
        //     border-right: 1px solid #666;
        //     border-bottom: 1px solid #666;
        //     transform: rotate(45deg);
        //     -ms-transform: rotate(45deg); /* IE 9 */
        //     -moz-transform: rotate(45deg); /* Firefox */
        //     -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
        //     -o-transform: rotate(45deg);
        //   }
        // }
      }
    }
  }
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul li:nth-child(2) {
    border-right: none;
    flex: 80%;
    // display: flex;
    // flex-direction: row-reverse;
    // li div {
    //   flex: 25%;
    //   padding: 0 20px;
    // }
    > div:nth-child(1) {
      height: 50%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      div {
        flex: 25%;
        padding: 0 20px;
        border-right: 1px solid #ccc;
      }
      > div:nth-child(4) {
        border-right: none;
      }
    }
    > div:nth-child(2) {
      height: 50%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      > div {
        flex: 25%;
        padding: 0 20px;
        border-right: 1px solid #ccc;
      }
      > div:nth-child(4) {
        border-right: none;
      }
    }
  }
  ul li:nth-child(1) {
    padding: 0 20px;
  }
}
// @keyframes myfirst {
//   0% {
//     height: 0px;
//   }
//   100% {
//     height: 200px;
//   }
// }
</style>
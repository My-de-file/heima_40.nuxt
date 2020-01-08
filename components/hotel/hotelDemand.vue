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
          <div v-for="(item,index) in hotelSele" :key="index">
            <p>{{item}}</p>
            <p @mouseover="hoverSele(index)" @mouseout="hoverUop()">
              不限
              <span class="span"></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="choicebox">
      <div class="choice-boxSom" v-for="(item,index) in selectBox" :key="index">
        <div class="hover-show" :class="{hover:hoverShow === index}">
          <span class="point"></span>
          <!-- <el-radio v-model="radio" label="1">备选项</el-radio> -->
          <!-- <el-radio v-model="radio" label="2">备选项</el-radio> -->
        </div>
      </div>
    </div>
    <div class="comte">
      <div class="comte-left">
        <img src="http://img1.imgtn.bdimg.com/it/u=4238142487,3274484296&fm=26&gp=0.jpg" alt />
      </div>
      <div class="comte-commt">
        <p>1</p>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
      <div class="comte-rigth">
        <div>
          1
          <span>22</span>
        </div>
        <div>
          1
          <span>22</span>
        </div>
        <div>
          1
          <span>22</span>
        </div>
      </div>
    </div>
    <el-pagination layout="prev, pager, next" next-text='下一页' prev-text='上一页' :total="50"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: 4000,
      value: "",
      options: [],
      selectBox: ["1", "2", "3", "4"],
      hoverShow: "",
      hotelSele: ["住宿等级", "住宿类型", "酒店设施", "酒店品牌"]
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
  }
};
</script>

<style lang='less' scoped>
#demand {
  .comte {
    //   float: left;
    border: 1px solid #000;
    height: 250px;
    display: flex;
    justify-content: flex-start;
    padding: 20px 0;
    .comte-left {
      width: 320px;
      height: 210px;
      img {
        width: 320px;
        height: 210px;
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
    }
    .comte-commt {
      width: 400px;
      > p {
        color: #000;
        font-size: 30px;
      }
    }
  }
  width: 100%;
  margin: 20px 0 0 0;
  font-size: 14px;
  color: #666;
  .choicebox {
    display: flex;
    justify-content: flex-start;
    margin-left: 200px;
    .hover-show {
      //   float: left;
      margin-top: -10px;
      width: 170px;
      // margin: 10px 0 0 0;
      height: 0px;
      background-color: #fff;
      border: 1px solid #ebeef5;
      margin-left: 30px;
      position: absolute;
      z-index: 2001;
      display: none;
      .point {
        position: absolute;
        top: -6px;
        left: 60px;
        display: block;
        float: right;
        width: 10px;
        height: 10px;
        border-left: 1px solid #ebeef5;
        border-top: 1px solid #ebeef5;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg); /* IE 9 */
        -moz-transform: rotate(45deg); /* Firefox */
        -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
        -o-transform: rotate(45deg);
        z-index: 2001;
        background-color: #fff;
      }
    }
    .hover {
      display: block;
      animation: myfirst 1s;
      -webkit-animation: myfirst 1s;
    }
  }
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
    ul {
      display: flex;
      li {
        flex: 20%;
        height: 70px;
        border-right: 1px solid #ccc;
        p {
          line-height: 35px;
          .span {
            margin-top: 12px;
            display: block;
            float: right;
            width: 10px;
            height: 10px;
            border-right: 1px solid #666;
            border-bottom: 1px solid #666;
            transform: rotate(45deg);
            -ms-transform: rotate(45deg); /* IE 9 */
            -moz-transform: rotate(45deg); /* Firefox */
            -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
            -o-transform: rotate(45deg);
          }
        }
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
    display: flex;
    > div {
      flex: 25%;
      padding: 0 20px;
    }
  }
  ul li:nth-child(1) {
    padding: 0 20px;
  }
}
@keyframes myfirst {
  0% {
    height: 0;
  }
  100% {
    height: 200px;
  }
}
</style>
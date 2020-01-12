<template>
  <div id="post">
    <div class="post-left">
      <div class="left-tap">
        <div
          class="tap-list"
          v-for="(item,index) in tapList"
          :key="index"
          v-on:mouseover="mouseover(index)"
          v-on:mouseout="mouseout(index)"
        >
          {{item.name}}
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="left-show" :class="{'left-block':tapShow}" v-if="cityData">
          <ul v-on:mouseout="mouseout(index)">
            <li v-for="(item,index) in cityData.children" :key="index">
              <nuxt-link to="/about">
                <i>{{index+1}}</i>
              </nuxt-link>
              <nuxt-link to="/about">{{item.city}}</nuxt-link>
              <nuxt-link to="/about">{{item.desc}}</nuxt-link>
            </li>
            <li></li>
            <!-- <li>
              <nuxt-link to="/about">
                <i>2</i>
              </nuxt-link>
              <nuxt-link to="/about">北京</nuxt-link>
              <nuxt-link to="/about">北京11</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about">
                <i>3</i>
              </nuxt-link>
              <nuxt-link to="/about">北京</nuxt-link>
              <nuxt-link to="/about">北京11</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about">
                <i>4</i>
              </nuxt-link>
              <nuxt-link to="/about">北京</nuxt-link>
              <nuxt-link to="/about">北京11</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about">
                <i>5</i>
              </nuxt-link>
              <nuxt-link to="/about">北京</nuxt-link>
              <nuxt-link to="/about">北京11</nuxt-link>
            </li>-->
          </ul>
        </div>
      </div>

      <p>1</p>
      <img
        src="http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=1750168506,2908256039&os=610549673,78821150&simid=3378801237,172993249&pn=568&rn=1&di=97020&ln=1648&fr=&fmq=1578746020155_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fa0.att.hudong.com%2F41%2F09%2F01200000000481121160092004615.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined"
        alt
      />
    </div>
    <div class="post-right">
      <div class="input-sech">
        <input type="text" />
        <div>
          <i class="el-icon-search"></i>
        </div>
      </div>
      <div class="tuijian">
        <span>推荐：</span>
        <nuxt-link to="/about">广州</nuxt-link>
        <nuxt-link to="/about">上海</nuxt-link>
        <nuxt-link to="/about">北京</nuxt-link>
      </div>
    <div class="gonglou">
        <span>推荐攻略</span>
        <nuxt-link to="/about"><i class="el-icon-edit"></i>写攻略</nuxt-link>
    </div>
    <PostContent></PostContent>
    </div>
  </div>
</template>

<script>
import PostContent from '@/components/post/postContent'
export default {
    components: {
        PostContent
    },
  data() {
    return {
      tapList: [
        {
          name: "热门城市",
          tapShow: false
        },
        {
          name: "推荐城市",
          tapShow: false
        },
        {
          name: "奔向海岛",
          tapShow: false
        },
        {
          name: "主题推荐",
          tapShow: false
        }
      ],
      tapShow: false,
      cityData: ""
    };
  },
  methods: {
    // onmouseout
    mouseover(index) {
      //   console.log(index);
      //   this.tapList[index].tapShow = true;
      this.tapShow = true;
      this.$axios({
        url: "/posts/cities"
      }).then(res => {
        // console.log(res);
        let data = JSON.parse(res.request.response);
        // console.log(data.data[index]);
        this.cityData = data.data[index];
        // console.log(this.cityData);
      });
    },
    mouseout(index) {
      this.cityData = "";
      //   this.tapList[index].tapShow = false;
      this.tapShow = false;
    }
  }
};
</script>

<style lang='less' scoped>
ul,
li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
#post {
  display: flex;
  width: 1000px;
  margin: 20px auto;
  position: relative;
  .left-show {
    width: 300px;
    height: 180px;
    position: absolute;
    top: 0px;
    left: 259px;
    border: 1px solid #ccc;
    border-left: none;
    z-index: 99;
    background: #fff;
    ul {
      width: 100%;
      height: 100%;
      li {
        padding: 0 0 0 10px;
      }
    }
    ul li:nth-child(6) {
      margin-top: 14.5px;
      height: 20px;
      border-left: 1px solid #ccc;
    }
    a {
      padding-left: 5px;
      font-size: 12px;
      color: #999;
      //   text-decoration: underline;
    }
  }
  .left-show a:nth-child(1),
  .left-show a:nth-child(2) {
    color: orange;
  }
  .left-show a:nth-child(2):hover,
  .left-show a:nth-child(3):hover {
    text-decoration: underline;
  }
  .left-show a:nth-child(1) > i {
    font-size: 22px;
  }
  .left-block {
    display: block;
    //   border-left: none;
  }
  .left-show:hover {
    display: block;
  }
  .post-left {
    width: 28%;
    border-right: none;
    display: flex;
    flex-direction: column;
    .tap-list {
      border: 1px solid #ccc;
      height: 40px;
      padding: 0 20px;
      //   border-bottom: none;
      //   border-right: 1px solid #ccc;
      line-height: 40px;
      font-size: 12px;
      z-index: 99;
      i {
        margin-top: 15px;
        float: right;
      }
    }
    .tap-list:hover {
      border-right: none;
    }
  }
  .post-left div:nth-child(1),
  .post-left div:nth-child(2),
  .post-left div:nth-child(3) {
    border-bottom: none;
  }
  .post-right {
    width: 80%;
    padding-left: 30px;
    .input-sech {
      display: flex;
      align-items: center;
      border: 4px solid orange;
      input {
        width: 660px;
        height: 36px;
        padding: 0 20px;
        // border: 4px solid orange;
        border: none;
        outline: none;
        outline: medium;
      }
      i {
        font-size: 24px;
        color: orange;
      }
    }
    .tuijian {
      color: #666;
      font-size: 12px;
      line-height: 36px;
      a {
        color: #666;
      }
      a:hover {
        text-decoration: underline;
        color: orange;
      }
    }
    .gonglou{
        height: 50px;
        border-bottom: 1px solid #ccc;
        span{
            float: left;
            color: orange;
            border-bottom: 1px solid orange;
            padding-bottom: 26px;
        }
        a{
            float: right;
            display: block;
            background-color: #409eff;
            width: 105px;
            height: 38px;
            line-height: 38px;
            text-align: center;
            border-radius: 5px;
            color: #fff;
        }
    }
  }
}
</style>
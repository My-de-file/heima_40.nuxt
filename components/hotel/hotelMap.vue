<template>
  <div id="map">
    <div class="map-left">
      <div class="left-one">
        <span>区域:</span>
        <div>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
      </div>
      <div class="left-one">
        <span>攻略:</span>
        <div>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
      </div>
      <div class="left-one">
        <span>均价 ? :</span>
        <div>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
      </div>
    </div>
    <div id="map-rigth">
      <script src="https://webapi.amap.com/maps?v=1.4.15&key=2e856a98eed695681440bf84a01c53c0"></script>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  mounted() {
      let map = new AMap.Map("map-rigth", {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 11, //初始化地图层级
      center: [113.262784,23.128967] //初始化地图中心点
    });
  }
};
</script>

<style lang='less' scoped>
#map {
  display: flex;
  height: 260px;
  margin: 20px 0 0 0;
  font-size: 14px;
  .map-left {
    width: 60%;
    padding: 0 10px 0 0;
    > div {
      color: #666;
      height: 33%;
      > span {
        float: left;
        width: 60px;
        height: 100%;
      }
    }
  }
  #map-rigth {
    width: 40%;
    height: 100%;
  }
}
</style>
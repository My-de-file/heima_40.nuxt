<template>
  <div class="index">
    <div class="content" :span="12">
      <div class="nav">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px 0;">
          <el-breadcrumb-item :to="{ path: 'hotel' }">酒店</el-breadcrumb-item>
          <el-breadcrumb-item>广州市酒店</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div name='search'>
      <HotelSearch  @click="hendlClick($event)"></HotelSearch>
      </div>
      <HotelMap :city='scity' @find='findHendl'></HotelMap>
      <HotelDemand :data='scity'></HotelDemand>
    </div>
  </div>
</template>

<script>
import HotelSearch from '@/components/hotel/hotelSearch'
import HotelMap from '@/components/hotel/hotelMap'
import HotelDemand from '@/components/hotel/hotelDemand'
export default {
  data() {
    return {
      scity:''
    };
  },
  components: {
      HotelSearch,HotelMap,HotelDemand
  },
  methods: {
     hendlClick($event){
       this.scity = $event
     },
     findHendl($event){
      //  console.log($event);
     }
  }
};
</script>

<style lang='less' scoped>
.index {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  .content {
    width: 100%;
    // border: 1px solid #000;
  }
}
</style>
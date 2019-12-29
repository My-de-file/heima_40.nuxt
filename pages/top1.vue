<template>
  <div>
      <span v-for="(item,index) in ['按钮1','按钮2','按钮3']" :key="index" @click="hendelclick(index)" :class="{color:current===index}">{{item}}</span>
      <div v-if='current===0'>
          <ul>
              <li>111</li>
              <li>111</li>
              <li>111</li>
          </ul>
      </div>
      <div v-if='current===1'>
          <ul>
              <li>222</li>
              <li>222</li>
              <li>222</li>
          </ul>
      </div>
      <div v-if='current===2'>
          <ul>
              <li>333</li>
              <li>333</li>
              <li>333</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            current:0
        }
    },
    methods: {
        hendelclick(index){
            this.current = index
        }
    }
}
</script>

<style>
    .color{
        color: #f00;
    }
</style>
<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info && data.info.departCity}} - {{data.info && data.info.destCity}}
        /
        {{data.info && data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" >
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" >
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from}:${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" >
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" >
          <el-option v-for="(item,index) in one" :key="index" :label="item.som" :value="item.big"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    {{hendleData}}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      // 默认是空数组
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      one: [
        { som: "大", big: "L" },
        { som: "中", big: "M" },
        { som: "小", big: "S" }
      ]
    };
  },
    computed: {
        hendleData(){
            let flightTimes = this.flightTimes.split(':')
            if(this.data.flights){
            // console.log(this.data.flights);
            let arr = this.data.flights.filter(v => {
                let res = true;
                if(this.airport && this.airport !== v.org_airport_name){
                    res = false;
                }
                v.depData = v.dep_time.split(':')[0]
                // console.log(+v.depData);
                // console.log(+flightTimes[0]);
                // console.log(+flightTimes[1]);
                if(+v.depData < +flightTimes[0] || +v.depData >= +flightTimes[1]){
                    res = false;
                }
                // console.log(this.company);
                // console.log(v.airline_name);
                
                if(this.company && this.company !== v.airline_name){
                    res = false;
                }
                if(this.airSize && this.airSize !== v.plane_size){
                    res = false;
                }
                // console.log(res);
                if(res === false)  return;
                return v;
            })
            this.$emit('select',arr)
            }

            return ''
        }
    },
  methods: {
    // // 选择机场时候触发
    // handleAirport(value) {
    //   const arr = this.data.flights.filter(v => {
    //     if (value !== v.org_airport_name) {
    //     //   data = false;
    //         return;
    //     } else{
    //     return v
    //     }
    //     // if (data === false) return;
    //   });
    //   this.$emit('select',arr)
    // //   console.log(arr);
    // },

    // // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //     // console.log(value);
        
    //   var value = value.split(':')
    //   const arr = this.data.flights.filter(v => {
    //      v.data = v.dep_time.split(':')
    //      v.data = +v.data[0]
    //      value[0] = +value[0]
    //      value[1] = +value[1]
    //     //  console.log(v.data);
    //     //  console.log(value[0]);
    //     //  console.log(value[1]);
    //      if(value[0] <= v.data && v.data < value[1]){
    //          return v;
    //      }
    //   })
    //   this.$emit('select',arr)
    // },

    // // 选择航空公司时候触发
    // handleCompany(value) {
    //   const arr = this.data.flights.filter(v => {
    //     if (value === v.airline_name) {
    //         return v;
    //     }
    //   });
    //   this.$emit('select',arr)
    // },

    // // 选择机型时候触发
    // handleAirSize(value) {
    // //   console.log(value);
    //   const arr = this.data.flights.filter(v => {
    //       if(v.plane_size === value){
    //           return v;
    //       }
    //   })
    //   this.$emit('select',arr)
    // },

    // 撤销条件时候触发
    handleFiltersCancel() {}
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
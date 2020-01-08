<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info" v-for="(item,index) in userList" :key="index">
        <div class="member-info-item">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          class="insurance-item"
          v-for="(item,index) in (passData.data && passData.data.insurances)"
          :key="index"
        >
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  ${item.compensation}`"
            border
            @change="handleCheckedCitiesChange(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="conta.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="conta.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="conta.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    {{data}}
  </div>
</template>

<script>
export default {
  props: {
    passData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      userList: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [],
      conta: {
        contactName: "",
        contactPhone: "",
        captcha: ""
      }
    };
  },
  computed:{
    data(){
      if(this.passData.data){
      let money = 0;
      money = this.insurances.length * this.passData.data.insurances[0].price
      money += this.passData.data.airport_tax_audlet
      money += this.passData.data.seat_infos.par_price
      money = this.userList.length * money
      console.log(money);
      this.$store.commit('air/dataMoney',money)
      // console.log(this.insurances);
      return ''
      }
    }
  },
  methods: {
    handleCheckedCitiesChange(id) {
      const index = this.insurances.indexOf(id);
      // console.log(index);

      if (index !== -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(id);
      }
      //   this.insurances = data;
      // console.log(this.insurances);
    },
    // 添加乘机人
    handleAddUsers() {
      this.userList.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      if (this.userList.length === 1) {
        return;
      } else {
        this.userList.splice(index, 1);
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (this.conta.contactPhone === "") {
        this.$message.error("手机号码不能为空");
      } else {
        this.$axios({
          method: "post",
          url: "/captchas",
          data: { tel: this.conta.contactPhone }
        }).then(res => {
          console.log(res);
          this.$message({
            message: "验证码为" + res.data.code,
            type: "success"
          });
        });
      }
    },

    // 提交订单
    handleSubmit() {
        
    //   console.log(this.$store.state.user.name.token);
      let arr = true;
    //   console.log(this.userList);
    //   console.log(this.conta);
      this.userList.filter(v => {
        if (v.username === "") {
          arr = false;
          return this.$message.error("乘机人不能为空");
        }
        if (v.id === "") {
          arr = false;
          return this.$message.error("乘机人身份证不能为空");
        } else {
          if (this.conta.contactName === "") {
            arr = false;
            return this.$message.error("联系人不能为空");
          } else if (this.conta.contactPhone === "") {
              arr = false;
            return this.$message.error("手机号码不能为空");
          } else if (this.conta.captcha === "") {
              arr = false;
            return this.$message.error("手机验证码不能为空");
          }
        }
      });

      if(arr === false) return;


      this.$axios({
          method: "post",
          url:'/airorders',
          headers:{
              Authorization : 'Bearer ' + this.$store.state.user.name.token,
          },
          data:{
              users:this.userList,
              insurances:this.insurances,
              contactName:this.conta.contactName,
              contactPhone:this.conta.contactPhone,
              captcha:this.conta.captcha,
              invoice:false,
              seat_xid:this.passData.data.seat_infos.seat_xid,
              air:this.passData.data.id
          }
      }).then(res=>{
          console.log(res);
            this.$message({
            message:res.data.message,
            type: "success"
          });
            let {data:{id}} = res.data
          this.$router.push({
            path:'/air/pay',
            query:{
              id
              }
          })
      })
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  //   &:first-child {
  //     .delete-user {
  //       display: block;
  //     }

  //   }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
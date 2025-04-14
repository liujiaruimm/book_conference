<template>
  <div id="app">
      <!-- 头部 -->
      <div class="header">
          <p>智能会议室管理系统</p>
          <a href="#" class="d">用户登录</a>
      </div>

      <!-- 主体 -->
      <div class="main">
          <div class="login-form">

              <!-- 快捷登录 -->
              <div v-show="loginWay == 1">
                  <h3>快捷登录</h3>
                  <div>
                      <div class="phonenumber">
                          <input type="text" placeholder="请输入用户名" v-model="userName">
                      </div>
                      <div class="code2">
                          <input name="pw" type="password" placeholder="请输入密码" v-model="passWord">
                      </div>
                      <div class="code">
                          <input v-model="code" type="text" placeholder="请输入验证码">
                          <canvas id="canvas" @click="handleCanvas"></canvas>
                      </div>
                      <login><div @click="submit">
                          登录
                      </div></login>
                  </div>

                  <p class="regi">没有账号？<a href="#" @click="loginWay = 2">立即注册</a></p>
              </div>

              <!-- 注册账号 -->
              <div v-show="loginWay == 2">
                  <h3>注册账号</h3>
                  <div class="phonenumber">
                      <input type="text" placeholder="请输入用户名">
                  </div>
                  <div class="password">
                      <input type="password" placeholder="请输入密码">
                  </div>
                  <div class="picture">
                      <span>人脸注册——上传照片：</span>
                      <input type="file" accept="image/*" class="capture" />
                  </div>
                  <login><div @click="loginWay = 1">立即注册</div></login>
                  <p class="regi">已有账号？<a href="#" @click="loginWay = 1, submit">立即登录</a></p>
              </div>

          </div>
      </div>

      <!-- 脚部 -->
      <div class="footer">
          <p class="us">关于我们 | <a href="#">联系我们</a></p>
      </div>
  </div>
</template>

<script>
//import { Message } from 'element-ui';
import login from '../components/LLogin.vue'
import request from '@/utils/request'

export default {
  data() {
      return {
          loginWay: 1,

          code: '',
          trueCode: '',
          checkArr: [],

          userName: '',
          passWord: '',

      }
  },

  components: {
      'login': login,
  },

  methods: {
      //获取验证码
      draw(show_num) {
          var canvas_width = document.querySelector("#canvas").clientWidth;
          var canvas_height = document.querySelector("#canvas").clientHeight;
          var canvas = document.getElementById("canvas"); //获取到canvas
          var context = canvas.getContext("2d"); //获取到canvas画图
          canvas.width = canvas_width;
          canvas.height = canvas_height;
          var sCode = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
          var aCode = sCode.split(",");
          var aLength = aCode.length; //获取到数组的长度

          //4个验证码数
          for (var i = 0; i <= 3; i++) {
              var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
              var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
              var txt = aCode[j]; //得到随机的一个内容
              show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
              var x = 10 + i * 20; //文字在canvas上的x坐标
              var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
              context.font = "bold 23px 微软雅黑";

              context.translate(x, y);
              context.rotate(deg);

              context.fillStyle = this.randomColor();
              context.fillText(txt, 0, 0);

              context.rotate(-deg);
              context.translate(-x, -y);
          }
          //验证码上显示6条线条
          for (let i = 0; i <= 5; i++) {
              context.strokeStyle = this.randomColor();
              context.beginPath();
              context.moveTo(
                  Math.random() * canvas_width,
                  Math.random() * canvas_height
              );
              context.lineTo(
                  Math.random() * canvas_width,
                  Math.random() * canvas_height
              );
              context.stroke();
          }
          //验证码上显示31个小点
          for (let i = 0; i <= 30; i++) {
              context.strokeStyle = this.randomColor();
              context.beginPath();
              let x = Math.random() * canvas_width;
              let y = Math.random() * canvas_height;
              context.moveTo(x, y);
              context.lineTo(x + 1, y + 1);
              context.stroke();
          }

          //最后把取得的验证码数组存起来，方式不唯一
          var num = show_num.join("");
          // console.log(num);
          this.trueCode = num
      },

      //得到随机的颜色值
      randomColor() {
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var b = Math.floor(Math.random() * 256);
          return "rgb(" + r + "," + g + "," + b + ")";
      },

      //canvas点击刷新
      handleCanvas() {
          this.draw(this.checkArr);
      },

      async submit() {
          // 验证验证码
          if (this.code.toLowerCase() !== this.trueCode.toLowerCase()) {
              this.$message.error("验证码错误");
              this.code = '';
              this.handleCanvas();
              return;
          }

          // 验证用户名和密码是否为空
          if (!this.userName || !this.passWord) {
              this.$message.error("用户名或密码不能为空");
              this.code = '';
              this.handleCanvas();
              return;
          }

          // 验证固定的用户名和密码
          if (this.userName === 'ljr' && this.passWord === '123') {
              // 登录成功
              this.$message.success("登录成功");
              
              // 保存用户信息到localStorage和Vuex
              const userInfo = {
                  userName: this.userName,
                  role: 'admin'
              };
              this.$store.dispatch('login', userInfo);
              
              // 跳转到主页
              this.$router.push('/main');
          } else {
              this.$message.error("用户名或密码错误");
              this.code = '';
              this.handleCanvas();
          }
      },
      
  },

  mounted() {
      this.handleCanvas();
  }
}
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

#app {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #74a0f7;
}

.header {
    position: relative;
    height: 60px;
    background-color: #ffffff;
    color: #7a7c6b;
    font-size: 12px;
    box-shadow: 0 1px #c0d1f4;
    text-align: center;
}

.header p {
    position: absolute;
    margin-left: 86px;
    font-size: 18px;
    font-weight: 900;
}

.header .d {
    position: absolute;
    left: 88%;
    padding: 5px 14px;
    margin-top: 18px;
    text-decoration: none;
    color: #74a0f7;
    border: 1px solid #74a0f7;
    border-radius: 10%;
}

.header .z {
    position: absolute;
    left: 93%;
    padding: 5px 14px;
    margin-top: 18px;
    text-decoration: none;
    color: #f9fcfd;
    background-color: #4095e5;
    border: 1px solid #74a0f7;
    border-radius: 10%;
}

.login-form {
    margin: 86px auto;
    text-align: center;
    width: 350px;
    height: 420px;
    background-color: #ffffff;
    border-radius: 2%;
}

.phonenumber {
    float: left;
    width: 280px;
    height: 36px;
    margin-top: 32px;
    margin-left: 30px;
    text-align: center;
}

.phonenumber input {
    float: left;
    border: none;
    height: 36px;
    width: 248px;
    border: 2px solid #eceff2;
    border-radius: 5%;
    padding-left: 2em;
    outline: none;
}

.code input {
    float: left;
    width: 142px;
    height: 36px;
    margin-top: 32px;
    margin-left: 30px;
    border: 2px solid #eceff2;
    border-radius: 5%;
    padding-left: 2em;
    outline: none;
}

.code a {
    float: left;
    width: 100px;
    height: 38px;
    margin-top: 32px;
    border: 2px solid #e2e5e9;
    border-radius: 5%;
    font-size: 12px;
    color: #b3b3b3;
    text-decoration: none;
    line-height: 38px;
}

.code2 input {
    float: left;
    width: 248px;
    height: 36px;
    margin-top: 32px;
    margin-left: 30px;
    border: 2px solid #eceff2;
    border-radius: 5%;
    padding-left: 2em;
    outline: none;
}

.reset {
    float: right;
    margin-right: 40px;
    text-decoration: none;
    font-size: 12px;
    color: #4d9ce7;
    margin-top: 10px;
    font-weight: bold;
}

h3 {
    float: left;
    color: #383838;
    margin-top: 30px;
    margin-left: 40%;
}

.password {
    float: left;
    margin-left: 30px;
}

.password input {
    float: left;
    width: 248px;
    height: 36px;
    margin-top: 20px;
    border: 2px solid #eceff2;
    border-radius: 5%;
    padding-left: 2em;
    outline: none;
}

canvas {
    float: left;
    margin-top: 32px;
    width: 100px;
    height: 36px;
    border: 2px solid #eceff2;
    border-radius: 5%;
    border-left: none;
    padding: 1px 2px;
}

.picture {
    float: left;
    background-color: #ffffff;
    border: 2px solid #a1cbf2;
    border-radius: 5%;
    margin: 20px 30px 0 30px;
    width: 280px;
    height: 42px;
    color: #4095e5;
    font-size: 14px;
}

.picture span {
    float: left;
    padding: 0 2em;
}

.picture input {
    float: right;
}

.regi {
    float: left;
    margin: 10px auto;
    padding-left: 33%;
    font-size: 12px;
}

.regi a {
    text-decoration: none;
    font-weight: bolder;
    color: #4095e5;
}

.footer {
    background-color: #2e2e41;
    width: 100%;
    height: 60px;
}

.us {
    float: left;
    margin-left: 46%;
    text-decoration: none;
    font-size: 12px;
    color: #929999;
}

.us a {
    text-decoration: none;
    font-size: 12px;
    color: #929999;
}
</style>
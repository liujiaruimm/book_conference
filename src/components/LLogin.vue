<template>
  <a href="#" class="login"><slot>登录</slot></a>
</template>

<script>
export default {

}
</script>

<style scoped>
.login {
    float: left;
    background-color: #4296e5;
    border: none;
    border-radius: 5%;
    margin: 30px 30px;
    margin-bottom: 0;
    width: 280px;
    height: 42px;
    color: #ffffff;
    font-weight: bolder;
    font-size: 14px;
    line-height: 42px;
    text-decoration: none;
}
</style>
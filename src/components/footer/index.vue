<template>
  <div class="footer">
    <div class="footer_top">
        <div class="whiteLine"></div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody><tr>
            <td><img src="../../images/footLogo1.png"></td>
            <td><img src="../../images/footLogo2.png"></td>
            <td><img src="../../images/footLogo3.png"></td>
            <td><img src="../../images/footLogo4.png"></td>
            <td><img src="../../images/footLogo5.png"></td>
            <td><img src="../../images/footLogo6.png"></td>
            <td><img src="../../images/footLogo7.png"></td>
            <td><img src="../../images/footLogo8.png"></td>
            <td><img src="../../images/footLogo9.png"></td>
            <td><img src="../../images/footLogo10.png"></td>
            <td><img src="../../images/footLogo11.png"></td>
          </tr>
        </tbody></table>
        <div class="whiteLine"></div>
    </div>
    <div class="footer_foot">Copyright © 2014-2015 银狐娱乐版权所有</div>
</div>
</template>
<script lang="babel">
    export default {

        data(){
            return {
            }
        },

        methods :{
            handleClick(tab){
                console.log(tab)
            },
        }

    }
</script>
<style scoped>
    .footer {
        width: 1000px;
        height: 95px;
        margin: 0 auto;
        margin-top: 10px;
        font-size: 12px;
    }
    .footer_top {
       height: 60px;
    }
    .whiteLine {
        height: 1px;
        margin: 0;
        padding: 0;
        border: 0;
        background: url(../../images/nav.png) 0 0 repeat-x;
    }
    table {
        border-collapse: collapse;
    }
    * {
        margin: 0;
        padding: 0;
    }
    .footer_foot {
        height: 35px;
        line-height: 35px;
        color: #fff;
        text-align: center;
    }
    .footer_top table td {
        height: 58px;
        text-align: center;
    }
    a:hover img, img {
        border: none;
    }
</style>
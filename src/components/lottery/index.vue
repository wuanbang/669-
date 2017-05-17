<template>
  <div class="lottery-container">
     <div class="lottery-left">
        <left></left>
     </div>
     <div class="lottery-right">
       <right></right>
     </div>
  </div>
</template>
<script lang="babel">
    import left from "./left"
    import right from "./right"
    export default {

        components : {
          left,right
        },

       data() {
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
    .lottery-container {
       width: 1000px;
       margin: 0 auto;
       padding: 10px 0;
    }
    .lottery-left {
      float: left;
      width: 200px;
    }
    .lottery-right {
      float: right;
      width: 790px;
    }
</style>
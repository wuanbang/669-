<template>
  <div class="main">
     <tzbar></tzbar>
     <qipai></qipai>
  </div>
</template>
<script lang="babel">

    import tzbar from "./tzbar.vue"
    import qipai from "./qipai.vue"
    export default {

        components : {
          tzbar, qipai
        },

        data(){
            return {
            }
        },

        methods :{
        }

    }
</script>
<style scoped>
    .main {
       width: 1000px;
       margin: 0 auto;
       padding: 0;
    }
</style>
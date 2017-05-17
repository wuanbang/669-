<template>
    <div>
        <top></top>
        <div class="whiteLine"></div>
        <component :is="currentType">
        </component>
        <foot></foot>
    </div>
</template>
<script lang="babel">
import top from "./top"
import mainHistory from "./main-history"
import mainZoushi from "./main-zoushi"
import foot from "../footer/index.vue"
import { mapActions } from 'vuex'
export default {
    name : "history",

    mounted(){
        this.getInit()
    },

    components : {
      top, foot, mainHistory,mainZoushi
    },

    data() {
      return {
      }
    },

    computed: {
        currentType(){
            var stype = this.$store.state.history.stype
            if(stype == '0'){
                return 'mainHistory'
            }
            return 'mainZoushi'
        }
    },

    methods: {
        ...mapActions({
          setHisLottery : 'setHisLottery',
        }),
        getInit(){
            var query = location.search
            if(query.indexOf('=') > -1){
                this.setHisLottery(query.substring(query.indexOf('=') + 1))
            }
        }
    }
}
    
</script>


<style scoped>
    
</style>
<template>
    <ul class="game-switchtab-choose show_list clearfix" ref="playMethod" @click.stop="selectPlayMethod">
        <li v-for="item in methods" :name='item.name'><a href="javascript:void(0);">{{item.value}}</a></li>
    </ul>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import cai from './lottery-data'
    import {addClass, hasClass, toggleClass, removeClass} from '../../tools/command'
    export default {
        mounted(){
            var playMethod = this.$refs.playMethod
            addClass(playMethod.firstChild.firstChild,'selected')
            this.setPlayMethod(playMethod.firstChild.getAttribute("name"))
        },
        updated(){
            var playMethod = this.$refs.playMethod
            var curActiveElem = playMethod.querySelector(".selected")
            if(curActiveElem) {
                removeClass(curActiveElem,'selected')
            }
            addClass(playMethod.firstChild.firstChild,'selected')
            this.setPlayMethod(playMethod.firstChild.getAttribute("name"))
        },
        data(){
            return {
            }
        },

       computed: {
            methods(){
                var curLottery = this.$store.state.lottery.currentLottery
                return cai[curLottery].playMethod
            },

        },

        methods :{
            ...mapActions({
              setPlayMethod : 'setPlayMethod',
            }),
            selectPlayMethod(event){
                var srcElem = event.target
                var curelem = event.currentTarget
                var curActiveElem = curelem.querySelector(".selected")
                var playMethod = ''
                if(curActiveElem) {
                    removeClass(curActiveElem,'selected')
                }
                if(srcElem.tagName.toLowerCase() == 'a'){
                    addClass(srcElem, 'selected')
                    playMethod = srcElem.parentElement.getAttribute("name")
                } else if(srcElem.tagName.toLowerCase() == 'li'){
                    addClass(srcElem.firstChild(), 'selected')
                    playMethod = srcElem.getAttribute("name")
                }
                if(playMethod){
                    this.setPlayMethod(playMethod)
                }
                var that = this
                this.$nextTick(function () {
                    that.$root.$emit("clear_number")
                    that.$root.$emit("clear-betting")
                })
            },
        }

    }
</script>
<style scoped>
     li {
        list-style: none;
        font-size: 12px;
     }
     a:active {
        border: none; 
        outline: none; 
     }
     * {
         margin: 0;
         padding: 0;
     }
     a {
       text-decoration: none;
     }
</style>

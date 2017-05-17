<template>
<div ref="playMethodType" @click.stop="selectMethodType">
	<dl class="subCate clearfix" v-for="item in types" :name="item.name">
		<dt v-if="showTitle">{{item.desc}}：</dt>
		<dd class="m-l-0" v-for="ctype in item['items']" :name="ctype.name">
			<span class="bl" ></span><span class="bm" name="wanfa2mneu">{{ctype.value}}</span><span class="br" ></span>｜
		</dd>
	</dl>
</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
    import cai from './lottery-data'
    import {addClass, hasClass, toggleClass, removeClass} from '../../tools/command'

    export default {
    	mounted(){
    		var ref = this.$refs.playMethodType
    		var firstDd = ref.querySelector("dd")
    		if(firstDd){
	    		addClass(firstDd, 'selected')
	    		this.setPlayMethodType(firstDd.getAttribute("name"))
    		}
            var that = this
            this.$nextTick(function () {
                that.$root.$emit("getBonus")
            })
        },
        updated(){
        	var ref = this.$refs.playMethodType
        	var curActiveElem = ref.querySelector(".selected")
            if(curActiveElem) {
                removeClass(curActiveElem,'selected')
            }
    		var firstDd = ref.querySelector("dd")
    		if(firstDd){
	    		addClass(firstDd, 'selected')
	    		this.setPlayMethodType(firstDd.getAttribute("name"))
                var that = this
                this.$nextTick(function () {
                    that.$root.$emit("getBonus")
                })
            }
        },
        data(){
            return {
            }
        },

       computed: {
            types(){
            	var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
                var curLottery = this.$store.state.lottery.currentLottery
                console.log('cai[curLottery].methodType[gamePlayMethod]', cai[curLottery].methodType[gamePlayMethod])
                return cai[curLottery].methodType[gamePlayMethod]
            },
            showTitle(){
                var curLottery = this.$store.state.lottery.currentLottery
                var cail = ['cai4','cai5','cai8', 'cai9', 'cai10']
                if(cail.indexOf(curLottery) > -1){
                    return false
                }
                return true
            },

        },

        methods :{
            ...mapActions({
               setPlayMethodType : 'setPlayMethodType',
               clearSelected : 'clearSelected',
            }),
            selectMethodType(event){
                var srcElem = event.target
                var curelem = event.currentTarget
                var curActiveElem = curelem.querySelector(".selected")
                var playMethodType = ''
                if(curActiveElem && ['span','dd'].indexOf(srcElem.tagName.toLowerCase()) != -1) {
                    removeClass(curActiveElem,'selected')
                }
                if(srcElem.tagName.toLowerCase() == 'span'){
                    addClass(srcElem.parentElement, 'selected')
                    playMethodType = srcElem.parentElement.getAttribute("name")
                } else if(srcElem.tagName.toLowerCase() == 'dd'){
                    addClass(srcElem, 'selected')
                    playMethodType = srcElem.getAttribute("name")
                }
                if(playMethodType){
                    this.setPlayMethodType(playMethodType)
                    this.clearSelected()
                    var that = this
                    this.$nextTick(function () {
                        that.$root.$emit("clear_number")
                        that.$root.$emit("clear-betting")
                        that.$root.$emit("getBonus")
                    })
                }
            },
        }
    }

</script>
<style scoped>
	.m-l-0 {
		margin-left: 0;
	}

	.m-r-6 {
		margin-right: -6px;
	}

	.m-l-6 {
		margin-left: -6px;
	}

	.type-sty {
		width: 48px;
	    margin-left: -6px;
	    margin-right: -6px;
	    text-align: center;
	}

	*{
		margin: 0;
		padding: 0;
	}

</style>

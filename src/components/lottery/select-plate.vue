<template>
    <div class="gf-main">
      <div class="xz">
      	 <div class="gzsm_rx f-12" v-if="showSelectUnit" ref="selBar" @click.stop="action">
	            <strong>选择球位</strong>：
	            <input id="check_wan" type="checkbox" name="1" class="v_mid"> 万位   
	            <input id="check_qian" type="checkbox" name="2" class="v_mid"> 千位   
	            <input id="check_bai" type="checkbox" name="3" class="v_mid"> 百位   
	            <input id="check_shi" type="checkbox" name="4" class="v_mid"> 十位   
	            <input id="check_ge" type="checkbox" name="5" class="v_mid"> 个位   
	        </div>
		<number-bar :ref="item.type" :data="item.values" v-for="item in numBarData"></number-bar>
      </div>
	</div>
</template>
<script lang="babel">
import numberBar from './number-bar'
import cai from './lottery-data'
import ballPosi from './data/ball-position'
import { mapActions } from 'vuex'
export default {

    mounted(){
    	this.$root.$on("clear_number", this.clear)
    },
    beforeDestroy(){
    	this.$root.$off("clear_number", this.clear)
    },
    
	components : {
		numberBar
	},

	updated(){
		var selBar = this.$refs.selBar
		if(selBar){
	    	var all = selBar.querySelectorAll('input')
	    	var allArray = Array.from(all)
	    	if(allArray && allArray.length > 0){
	    		allArray.forEach( function(element, index) {
	    			if(element.checked){
	    				element.checked = false
	    			}
	    		})
	    	}
		}
	},

	data(){
		return {
			showSelectUnit : false,
		}
	},

	methods : {
		...mapActions({
           setSelected : 'setSelected',
        }),
        action(event){
        	var data = {
    			name : 'ballposi',
    			selected : []
    		}
        	var selBar = this.$refs.selBar
	    	var all = selBar.querySelectorAll('input')
	    	var allArray = Array.from(all)
	    	if(allArray && allArray.length > 0){
	    		allArray.forEach( function(element, index) {
	    			if(element.checked){
	    				data.selected.push(element.getAttribute("name"))
	    			}
	    		})
	    	}
	    	this.setSelected(data)
	    	var that = this
	    	this.$nextTick(function () {
	    	    that.$root.$emit("betting")
	    	})
        },
        clear(){
			var selBar = this.$refs.selBar
			if(selBar){
		    	var all = selBar.querySelectorAll('input')
		    	var allArray = Array.from(all)
		    	if(allArray && allArray.length > 0){
		    		allArray.forEach( function(element, index) {
		    			if(element.checked){
		    				element.checked = false
		    			}
		    		})
		    	}
			}
		},
	},
	computed : {
		numBarData(){
		    var curLottery = this.$store.state.lottery.currentLottery
			var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
		    var playMethodType = this.$store.state.lottery.playMethodType
		    if(ballPosi.indexOf(playMethodType) > -1){
		    	this.showSelectUnit = true
		    } else {
		    	this.showSelectUnit = false
		    }
		    var typeArray = cai[curLottery].methodType[gamePlayMethod]
		    if(!typeArray){
		    	return
		    }
		    var typeObj = typeArray.filter(function(elem){
		    	return elem.name == playMethodType.substring(0, elem.name.length)
		    })
		    if(typeObj && typeObj.length > 0){
		    	return typeObj[0].selectPlate[playMethodType]
		    }
		    return
		},
	}

}
	
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.gf-main {
		padding-top: 5px;
	}
</style>
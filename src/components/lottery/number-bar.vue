<template>
	<div class="dd_zx_xq clearfix" style="height: 34px;padding-bottom: 7px;">
	    <ul class="dd_zx_font" ref="titleBar">
	       	<li class="f-12" v-for="item in data.types" :name="item.name">{{item.value}}</li>
	    </ul>
	    <ul class="dd_zx_q" @click.stop="select" ref="selBar">
	    	<li v-for="item in data.vulues" :name="item.name" class="bet_status group2" :title="item.value">{{item.value}}</li>
	    </ul>
	    <ul class="nav01">
	    	<li>
	    		<div id="shuaixuan">
	    			<dl class="nav_sub" @click.stop="action">
	    				<dd v-for="item in data.actions" :name="item.name">{{item.value}}</dd>
	    			</dl>
	    		</div>
	    	</li>
	    </ul>
	</div>
</template>
<script lang="babel">

import {addClass, hasClass, toggleClass, removeClass} from '../../tools/command'
import { mapActions } from 'vuex'

export default {
		props: {
	      data: Object,
	    },

	    mounted(){
	    	this.$root.$on("clear_number", this.clear)
        },
        beforeDestroy(){
        	this.$root.$off("clear_number", this.clear)
        },

	    data(){
	    	return {
	    		selected : []
	    	}
	    },

	    methods : {
	    	...mapActions({
               setSelected : 'setSelected',
            }),
	    	action(event){
	    		var srcElem = event.target
	    		var name = srcElem.getAttribute("name")
	    		if(name){
	    			switch (name) {
	    				case "all":
	    					this.selectAll()
	    					break;
	    				case "odd":
	    					this.selectOdd()
	    					break;
	    				case "even":
	    					this.selectEven()
	    					break;
	    				case "big":
	    					this.selectBig()
	    					break;
	    				case "small":
	    					this.selectSmall()
	    					break;
	    				case "clear":
	    					this.clear()
	    					break;
	    				default:
	    					break;
	    			}
	    		}
	    		this.staticSelected()

	    	},
	    	select(event){
	    		var srcElem = event.target
	    		toggleClass(srcElem, 'selected')
	    		this.staticSelected()
	    	},
	    	selectAll(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('li')
	    		if(all && all.length > 0){
	    			var allArray = Array.prototype.slice.call(all)
	    			allArray.forEach( function(element, index) {
	    				addClass(element, 'selected')
	    			})
	    		}

	    	},
	    	selectOdd(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('li')
	    		if(all && all.length > 0){
	    			var allArray = Array.prototype.slice.call(all)
	    			allArray.forEach( function(element, index) {
                        var value = element.getAttribute("title")
	    				if(1 == value%2){
	    					addClass(element, 'selected')
	    				} else {
	    					removeClass(element, 'selected')
	    				}
	    			})
	    		}
	    	},
	    	selectEven(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('li')
	    		if(all && all.length > 0){
	    			var allArray = Array.prototype.slice.call(all)
	    			allArray.forEach( function(element, index) {
                        var value = element.getAttribute("title")
	    				if(0 == value%2){
	    					addClass(element, 'selected')
	    				} else {
	    					removeClass(element, 'selected')
	    				}
	    			})
	    		}
	    	},
	    	selectBig(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('li')
	    		if(all && all.length > 0){
	    			var allArray = Array.prototype.slice.call(all)
                    var max = allArray[allArray.length - 1].getAttribute("title")
	    			allArray.forEach( function(element, index) {
                        var value = element.getAttribute("title")
	    				if( value > max/2){
	    					addClass(element, 'selected')
	    				} else {
	    					removeClass(element, 'selected')
	    				}
	    			})
	    		}
	    	},
	    	selectSmall(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('li')
	    		if(all && all.length > 0){
	    			var len = all.length / 2
	    			var allArray = Array.prototype.slice.call(all)
                    var max = allArray[allArray.length - 1].getAttribute("title")
	    			allArray.forEach( function(element, index) {
                        var value = element.getAttribute("title")
	    				if( value <= max/2){
	    					addClass(element, 'selected')
	    				} else {
	    					removeClass(element, 'selected')
	    				}
	    			})
	    		}
	    	},
	    	clear(){
	    		var selBar = this.$refs.selBar
	    		if(selBar){
		    		var all = selBar.querySelectorAll('li')
		    		if(all && all.length > 0){
		    			var allArray = Array.prototype.slice.call(all)
		    			allArray.forEach( function(element, index) {
		    				removeClass(element, 'selected')
		    			})
		    		}
	    		}
	    	},
	    	staticSelected(){
	    		var titleBar = this.$refs.titleBar
	    		var selBar = this.$refs.selBar
	    		var data = {
	    			name : '',
	    			selected : []
	    		}
	    		var all = selBar.querySelectorAll('li.selected')
	    		if(all && all.length > 0){
	    			var allArray = Array.from(all)
	    			allArray.forEach( function(element, index) {
	    				data.selected.push(element.getAttribute("name"))
	    			});
	    		}
	    		var allTitle = titleBar.querySelectorAll('li')
	    		if(allTitle && allTitle.length > 0){
	    			data.name = allTitle[0].getAttribute("name")
	    		}
	    		this.setSelected(data)
	    		var that = this
	    		this.$nextTick(function () {
	    		    that.$root.$emit("betting")
	    		})
	    	}

	    },
}


</script>
<style scoped>
	li {
		list-style: none;
	}
	* {
		margin: 0;
		padding: 0;
	}
</style>

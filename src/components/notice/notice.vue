<template>
	<div>
		<div class="notice-tabs">
			<div class="Menubox">
				<ul class="celearfix" >
						<li v-for="item in msgData.list" v-on:click="selectItem(item.id)" v-bind:class="{'hover' : itemId == item.id}" >
							<span>{{item.addTime.substr(0,10)}}</span>
							<i v-text="item.title"></i>
						</li>
				</ul>
				<div class="page clearfix">
					<div class="Webpage1">
						<div class="page_mid">
	                        <a href="javascript:void(0)" class="first" @click.stop="getSysNotice('first')">首页</a>
	                        <a href="javascript:void(0)" class="pre" @click.stop="getSysNotice('pre')">上一页</a>
	                        <input type="text" name="" disabled="disabled" :value="curPage">
	                        <a href="javascript:void(0)" class="last" @click.stop="getSysNotice('nxt')">下一页</a>
	                        <a href="javascript:void(0)" class="nxt" @click.stop="getSysNotice('last')">getSysNotice(1)</a>
						</div>
					</div>
				</div>
			</div>
			<div class="Contentbox">
				<detail :data="detailData"></detail>
			</div>
		</div>
	</div>
</template>
<script lang="babel">
	import detail from "./detail"
    import api from '../../api'
    import { mapActions } from 'vuex'
    import {errorMsg,succMsg} from '../../tools/command'
	export default {
        mounted(){
            this.itemId = this.$store.state.useraction.noticeId
            this.setNoticeId("")
            this.getSysNotice('first')
        },
		components :{
			detail
		},
		data(){
            return {
                msgData : {},
                detailData : {},
                itemId : '',
            }
        },
        updated(){
            this.detail()
        },
        computed : {
            curPage(){
                return this.msgData.pageNumber + "/" + this.msgData.totalPage
            }
        },
        methods: {
            ...mapActions({
              setNoticeId : 'setNoticeId',
            }),
            getSysNotice(param){
                var parameter = {}
                parameter.pageSize = 15
                if(param == 'first'){
                    param = 1
                } else if(param == 'pre'){
                    if(this.msgData.pageNumber > 1){
                        param = this.msgData.pageNumber - 1
                    } else {
                        param = 1
                    }
                } else if(param == 'nxt'){
                   if(this.msgData.pageNumber < this.msgData.totalPage){
                        param = this.msgData.pageNumber + 1
                   } else {
                        param = this.msgData.pageNumber
                   }
                } else if(param == 'last'){
                    param = this.msgData.totalPage
                }
                parameter.pageNumber = param
                api.ajax('notice/list', parameter).then(data => {
                    if(data && data.code == '0'){
                        this.msgData = data.data
                        if(!this.itemId && data.data.list && data.data.list[0]){
                            this.itemId = data.data.list[0].id
                        }
                    } else {
                        errorMsg(data.msg)
                    }
                }, error => {
                    errorMsg("登录报错，"+JSON.stringify(error))
                })
            },

        	selectItem (id) {
                console.log('selectItem', id)
                this.itemId = id
        	},
            detail(){
                if(this.msgData.list){
                    this.msgData.list.forEach( (element, index) => {
                        if(element.id == this.itemId){
                            this.detailData = element
                        }
                    })
                }
            },
        	removeClass () {
        		var elem = document.querySelector("div.notice-tabs .Menubox li:hover")
        		if(elem){
	              	elem.className = elem.className.replace('.Menubox li:hover','')
	          	}
        	},
        	beforeRouteEnter (to, from, next) {
	            next(vm => {
	            })
	        },
        }
	}
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	ul {
	    list-style: none;
	}
	li {
	    display: list-item;
	    text-align: -webkit-match-parent;
	}
	a {
	    text-decoration: none;
	    color: inherit;
	}
	.notice-tabs {
		margin-left: auto;
        margin-right: auto;
        width: 940px;
        height: 540px;
        margin-bottom: -17px;
        font-size: 12px;
        color: #000;
    }
    .notice-tabs .Menubox {
	    float: left;
	    width: 300px;
	    height: 550px;
	    position: relative;
	    background: url(../../images/gg_bg.png) right top repeat-y #eee;
	}
	.Menubox li {
        font-weight: normal !important;
	    height: 30px;
	    line-height: 30px;
	    padding: 0 10px 0 25px;
	    cursor: pointer;
	    background: url(../../images/gg_ico.png) 10px center no-repeat;
	}
	.Menubox li.hover {
	    color: #f00;
	    background: url(../../images/gg_ico.png) 10px center no-repeat #fff;
	}
	.Menubox li:hover {
	    background: url(../../images/gg_ico.png) 10px center no-repeat #f5f5f5;
	}
	.Menubox li span {
	    float: right;
	    color: #000;
	}
	.Menubox li i {
	    width: 200px;
	    height: 30px;
	    line-height: 30px;
	    display: inline-block;
	    font-style: normal;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.page {
	    padding: 8px 10px 0 10px;
	}
	.Menubox .page_mid {
        float: none;
	    width: 100%;
	    padding: 10px 0;
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    text-align: center;
    }
    .page .page_mid a {
        width: 22px;
        height: 22px;
        line-height: 22px;
        margin: 0 4px;
        display: inline-block;
        vertical-align: top;
        font-size: 0;
        background: url(../../images/page.png) 0 0 no-repeat;
    }
    .page .page_mid a.first {
        background-position: 0 0;
    }
    .page .page_mid a.first:hover {
        background-position: 0 -22px;
    }
    .page .page_mid a.pre {
        background-position: -22px 0;
    }
    .page .page_mid a.pre:hover {
        background-position: -22px -22px;
    }
    .page .page_mid a.last {
        background-position: -44px 0;
    }
    .page .page_mid a.last:hover {
        background-position: -44px -22px;
    }
    .page .page_mid a.nxt {
        background-position: -66px 0;
    }
    .page .page_mid a.nxt:hover {
        background-position: -66px -22px;
    }
    .page .page_mid input {
        width: 70px;
        height: 20px;
        line-height: 20px;
        margin: 0 4px;
        text-align: center;
        border: solid 1px #ccc;
        background: #fff;
    }
    .Contentbox {
    	float: right;
    	width: 630px;
    	height: 540px;
    	font-size: 12px;
    	color: #000;
    }
</style>
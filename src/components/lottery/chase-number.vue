<template>
    <div>
       <div class="zhuihao_tit">
         <input name="ckb_stop" ref="ifWinZuihao" @click.stop="ifWinZuihao = !ifWinZuihao" :checked="ifWinZuihao" type="checkbox">
         <h3><label for="tzzh">中奖后停止追号</label></h3>
         <em class="f_style_n f-12">（最多追号100期,您本次追号的单倍注数为： <i id="zs">{{zhushu}}</i> 注）</em>
       </div>
       <div class="grey_box_top pdt1">
		    <div class="grey_box_foot">
			    <div class="zhuihao_box">
			        <table id="thetable" cellpadding="0" cellspacing="0" width="100%" border="0">
			            <thead>
			                <tr>
			                    <th>序号</th>
			                    <th>追号期数<input type="text" maxlength="3" class="input_txt" style="width: 50px;" :value="qishu" @keyup.stop="zuijiaQishu"></th>
			                    <th>倍数<input type="text" maxlength="6" class="input_txt" style="width: 50px" :value="multiple" @keyup.stop="zuijiaBeishu"> 倍</th>
			                    <th>当期投入(合计:<span id="spMoneySum">{{allMoney}}</span>{{danwei}})</th>
			                </tr>
			            </thead>
			            <tbody ref="chaseNumberBar">
			            	<tr v-for="(item,index) in chaseNumber">
			            	   <td align="center">{{index + 1}}</td>
			            	   <td>
			            	      <input name="Sel_QiHao" :id="'ck'+item.id" type="checkbox" :checked="item.checked" @click.stop="isCheck(index)">{{item.titleCode}}
			            	   </td>
			            	   <td>
			            	      <a class="fandian_less v_mid" href="javascript:void(0);" @click.stop="mlDwon(index)">-</a>
			            	      <input :id="'ml' + item.id" maxlength="6" class="input_txt" type="Text" @keyup.stop="setItemMultiple(index, item.id)" :value="item.multiple" style="width: 50px;">
			            	      <a class="fandian_add v_mid" href="javascript:void(0);" @click.stop="mlUp(index)">+</a> 倍
			            	    </td>
			            	    <td class="tc">
			            	      ￥:<input :id="'my' + item.id" disabled class="input_txt" type="Text" :value="item.money">
			            	         <span> {{danwei}}</span>
			            	    </td>
			            	</tr>
			            </tbody>
			        </table>
			    </div>
			     <div class="zhuihao_foot">
			    	<a class="btnBig" href="javascript:void(0)" @click.stop="showDailog">
				    	<span class="bl"></span><span class="bm">提交</span><span class="br"></span>
			    	</a>
			    </div>
		     </div>
        </div>
        <div class="betting-bar-chase-dialog">
            <el-dialog title="提示" v-model="dialogVisible" size="tiny" :modal="dialogModal">
              <span>您确认要提交本次追号吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="confirmChase">确 定</el-button>
              </span>
            </el-dialog>
        </div>

     </div>
</template>
<script lang="babel">

import api from '../../api'
import {errorMsg, succMsg} from '../../tools/command'
import lotteryType from './order-type-constants'
export default {

	data(){
		return {
			showSelectUnit : false,
			chaseNumber : [],
			multiple : 1,
			qishu : 1,
			allMoney : 0,
			baseMoney : 0,
			ifWinZuihao : true,
			curAct : '',
            dialogVisible : false,
            dialogModal : false,
		}
	},

	methods : {
        submitChase(){
        	var actIds = this.getNumIds()
        	if(!actIds){
        		errorMsg("您还没有选择要追的期号，不能进行追号操作！")
        		return
        	}
        	var curLottery = this.$store.state.lottery.currentLottery
        	var betObj = this.$store.state.lottery.betList[0]
        	var parameter = {}
        	parameter.classId = curLottery.slice(3)
        	parameter.actCount = this.qishu
        	parameter.orderCount = betObj.count
        	parameter.singleMoney = betObj.model
        	parameter.sumMoney = this.allMoney
        	parameter.point = 0.0

        	var isBingoStop = this.$refs.ifWinZuihao.checked ? 1 : 0
        	parameter.isBingoStop = isBingoStop
        	parameter.numIds = actIds.slice(0, -1)
        	parameter.multiples = this.getMultiples().slice(0, -1)

        	var para = []
        	var that = this
            this.$store.state.lottery.betList.forEach(function(value, index) {
                var item = {}
                item.gid = value.lottery.slice(3)
                item.gmcid = lotteryType[value.lottery][value.playMethod][value.methodType]
                item.contents = value.betnumbers
                item.lid = that.curAct
                item.zs = value.count
                item.bs = value.multiple
                item.model = value.model
                item.amount = value.totalMoney
                item.tzbs = value.tzbs
                para.push(item)
            })
        	parameter.strJson = JSON.stringify(para)
        	api.ajax('order/saveFollow', parameter).then(data => {
                        if(data && data.code == '0'){
                            succMsg(data.msg)
                            that.closeChase()
                        } else {
                            errorMsg(data.msg)
                        }
                    }, error => {
                        errorMsg("系统出错，请稍后重试", error)
                    })

        },
        closeChase(){
        	var that = this
        	this.$nextTick(function () {
                that.$root.$emit("close-chase")
            })
        },
        chaseImmediate(){
            var that = this
            var para = {}
            var curLottery = this.$store.state.lottery.currentLottery
            para.classId = curLottery.slice(3)
            api.ajax('lottery/findCurrentInfo', para).then(data => {
                        if(data && data.code == '0'){
                            that.curAct = data.data.numId
                            that.submitChase()
                        } else {
                            errorMsg(data.msg)
                        }
                    }, error => {
                        errorMsg("系统出错，请稍后重试", error)
                    })
        },
        getMultiples(){
        	var rst = ''
        	this.chaseNumber.forEach( function(element, index) {
        		if(element.checked){
        			rst = rst + element.multiple + ','
        		}
        	})
        	return rst
        },
        getNumIds(){
        	var rst = ''
        	this.chaseNumber.forEach( function(element, index) {
        		if(element.checked){
        			rst = rst + element.id + ','
        		}
        	})
        	return rst
        },
        getChaseNumbers(){
        	let curLottery = this.$store.state.lottery.currentLottery
        	var parameter = {}
        	parameter.classId = curLottery.slice(3)
        	var that = this
        	api.ajax('lottery/listCanBet', parameter)
        	   .then(data => {
        	            if(data && data.code == '0'){
        	               if(data.data && data.data.length > 0){
        	                    that.chaseNumber.splice(0, that.chaseNumber.length, ...data.data)
        	                    that.chaseNumber.forEach( function(element, index) {
        	                    	if(index == 0){
        	                    		element.checked = true
        	                    		element.multiple = 1
        	                    		element.money = that.allMoney * element.multiple
        	                    	} else {
        	                    		element.checked = false
        	                    		element.multiple = 0
        	                    		element.money = 0
        	                    	}
        	                    })
        	               }
        	            } else {
        	                errorMsg(data.msg)
        	            }
        	        }, error => {
        	            errorMsg("系统出错，请稍后重试", error)
        	        })
        },
        isCheck(index){
        	var obj = this.chaseNumber[index]
			 obj.checked = !obj.checked
			 if(obj.checked){
			 	obj.multiple = this.multiple
			 	obj.money = obj.multiple * this.baseMoney
			 } else {
			 	obj.multiple = 0
			 	obj.money = 0
			 }
			 this.calcAllMoney()
        },
        mlDwon(index){
        	var obj = this.chaseNumber[index]
        	if(obj.checked){
        		if(obj.multiple > 1){
        			obj.multiple = obj.multiple - 1
        			obj.money = obj.multiple * this.baseMoney
        			this.calcAllMoney()
        		}
        	}
        },
        mlUp(index){
        	var obj = this.chaseNumber[index]
        	if(obj.checked){
    			if(obj.multiple < 999999){
    			   obj.multiple = obj.multiple - 1 + 2
    			}
    			obj.money = obj.multiple * this.baseMoney
    			this.calcAllMoney()
        	}
        },
        setItemMultiple(index, id){
        	var obj = this.chaseNumber[index]
        	if(obj.checked){
	        	var cn = this.$refs.chaseNumberBar.querySelector("#ml"+id)
				var cnValue = cn.value
				var re = /\D+/g
				cnValue = cnValue.replace(re, '')
				if(!cnValue){
					cnValue = 1
				}
				cn.value = cnValue
				obj.multiple = cnValue
			 	obj.money = obj.multiple * this.baseMoney
			 	this.calcAllMoney()
        	} else {
        		obj.multiple = 0
			 	obj.money = 0
        	}

        },
        calcAllMoney(){
           var that = this
           var count = 0
           var qishu = 0
           this.chaseNumber.forEach( function(element, index) {
           	    if(element.checked){
           	    	count += element.multiple * that.baseMoney
           	    	qishu ++
           	    }
           })
           this.allMoney = count
           this.qishu = qishu
        },
        zuijiaQishu(event){
        	var obj = event.target
        	var objValue = obj.value
        	var re = /\D+/g
			objValue = objValue.replace(re, '')
        	if(!objValue){
        		objValue = 1
        	}
        	if(objValue > 100){
        		objValue = 100
        	}
        	this.qishu = objValue
        	this.clearData()
        	var that = this
        	this.chaseNumber.forEach(function(element, index) {
        		if(index <= objValue -1 ){
	        		element.checked = true
	        		element.multiple = that.multiple
				 	element.money = element.multiple * that.baseMoney
        		}
        	})
        	this.calcAllMoney()
        },
        clearData(){
        	this.chaseNumber.forEach( function(element, index) {
        		element.checked = false
        		element.multiple = 0
			 	element.money = 0
        	})
        },
        zuijiaBeishu(event){
        	var obj = event.target
        	var objValue = obj.value
        	var re = /\D+/g
			objValue = objValue.replace(re, '')
        	if(!objValue){
        		objValue = 1
        	}
        	this.multiple = objValue
        	var that = this
        	this.chaseNumber.forEach(function(element, index) {
        		if(element.checked){
	        		element.multiple = that.multiple
				 	element.money = element.multiple * that.baseMoney
        		}
        	})
        	this.calcAllMoney()
        },
        showDailog(){
            this.dialogVisible = true
        },
        confirmChase(){
            this.dialogVisible = false
            this.chaseImmediate()
        }
	},
	computed : {
		zhushu(){
			if(this.$store.state.lottery.betList.length > 0){
			   this.$forceUpdate()
			   this.getChaseNumbers()
			   this.allMoney = 2 * this.$store.state.lottery.betList[0].count
		       this.baseMoney =  2 * this.$store.state.lottery.betList[0].count
		       this.multiple = 1
			   this.qishu = 1
			   this.ifWinZuihao = true
			   return this.$store.state.lottery.betList[0].count
			}
			return 0
		},
		danwei(){
			if(this.$store.state.lottery.betList.length > 0){
				return this.$store.state.lottery.betList[0].unitName
			}
			return 0
		},
	}
}

</script>
<style scoped>
    #thetable {
        width: 610px;
        overflow: hidden;
        text-align: center;
        border-collapse: collapse;
    }
</style>

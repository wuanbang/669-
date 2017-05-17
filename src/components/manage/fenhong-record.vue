<template>
	<div class="contentBox">
		<div class="grey_box_top" style="clear:both">
			<div class="grey_box_bottom">
				<div class="searchBar">
					从 <el-date-picker v-model="value1" type="date" class="myDate" style="width:120px"></el-date-picker>到 <el-date-picker v-model="value2" type="date" class="myDate" style="width:120px"></el-date-picker>状态:<div style="width:105px ; display:inline-block">
						<el-select v-model="value3" class="myDate" :placeholder="placeholder">
							<el-option v-for="item in options" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</div>
					<el-button type="text" icon="search" class="btnGreen3" size="small" style="width: 75px" @click.native.prevent="search">搜索</el-button>
				</div>
				<div class="scroll">
					<table id="thetable" width="100%" border="0" cellpadding="0" cellspacing="0">
						<thead>
							<tr>
								<th>玩家用户</th>
								<th>申请时间</th>
								<th>提升分红</th>
								<th>申请理由说明</th>
								<th>审核状态</th>
								<th>原因说明</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="6" v-if="show">暂无数据..</td>
							</tr>
							<tr v-for="item in data" v-if="show1">
								<td>{{item.agentName}}</td>
								<td>{{item.reqTime}}</td>
								<td>{{item.newRate}}</td>
								<td>{{item.remark}}</td>
								<td>
									<span v-if="item.status ==0">待审核</span>
									<span v-if="item.status ==1">审核通过</span>
									<span v-if="item.status ==2">审核不通过</span>
								</td>
								<td>{{item.auditDesc}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { datePick,errorMsg }from '../../tools/command'
	export default {
		data () {
			return {
				show: true,
				show1: false,
				value1: '',
				value2: '',
				value3: '',
				placeholder: '待审核',
				options: [{
					value: '0',
					label: '待审核'
				}, {
					value: '1',
					label: '审核通过'
				}, {
					value: '2',
					label: '审核不通过'
				}],
				form: {},
				data: {},
			}
		},
		mounted :function(){
            this.value1 = new Date();
            this.value2 = new Date();
        },
        methods : {
        	search () {
        		var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
        		this.form.userId = this.$store.state.useraction.id;
        		api.ajax('team/dividendAgent/listApplication',this.form).then(data =>{
					this.show = false;
					this.show1 = true;
					this.data = data.data;
				},error =>{
					errorMsg("数据请求失败")
				})
        	},
        }
	}
</script>
<style scoped>
	.contentBox {
		width: 580px;
	    font-size: 12px;
	    height: 475px;
	}
	.searchBar {
	    width: 560px;
	}
	.scroll {
		overflow-y: scroll;
		overflow-x: hidden;
		height: 282px;
	}
	#thetable {
	    width: 580px;
	}    
	.btnGreen3 {
        background: #3dcb00;
        color: #fff;
        border-radius: 5px;
    }
    .btnGreen3:hover {
        background: #55df00;
    }
</style>
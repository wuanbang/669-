<template>
	<div class="contentBox">
		<div class="grey_box_top" style="clear:both">
			<div class="grey_box_bottom">
				<div class="searchBar">
					从<el-date-picker v-model="value1" type="date" class="myDate datePicker"></el-date-picker> 到
					<el-date-picker v-model="value2" type="date" class="myDate datePicker"></el-date-picker>
					状态:<div class="select">
						<el-select v-model="value3" class="myDate" :placeholder="placeholder">
							<el-option v-for="item in options" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</div>
					<el-button type="text" icon="search" class="btnGreen3" size="small" @click.native.prevent="search">搜索</el-button>
				</div>
				<div class="scroll">
					<table id="thetable" width="100%" border="0" cellpadding="0" cellspacing="0">
						<thead>
							<tr>
								<th>申请时间</th>
								<th>提升返点</th>
								<th>申请理由说明</th>
								<th>审核状态</th>
								<th>原因说明</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="7" v-if="show">暂无数据..</td>
							</tr>
							<tr v-for="item in tabList">
								<td><span v-text="item.addTime"></span></td>
								<td><span v-text="item.bpoint"></span>% -> <span v-text="item.point"></span>%</td>
								<td><span v-text="item.appDesc"></span></td>
								<td>
									<span v-if="item.status ==0" >等待处理</span>
									<span v-if="item.status ==1" >同意</span>
									<span v-if="item.status ==2" >不同意</span>
								</td>
								<td><span v-text="item.auditDesc"></span></td>
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
				value1: '',
				value2: '',
				value3: '',
				placeholder: '等待处理',
				options: [{
					value: '0',
					label: '等待处理'
				}, {
					value: '1',
					label: '同意'
				}, {
					value: '2',
					label: '不同意'
				}],
				tabList: [],
				form: {
					bDate : '2001-01-01',
                    eDate : '2016-10-20',
					status : 0,
					userId : '',
				},
			}
		},
		mounted :function(){
            this.value1 = new Date();
            this.value2 = new Date();
            this.value3 = '0';
            this.search()
        },
        methods : {
        	search () {
        		var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
        		this.form.userId = this.$store.state.useraction.id;
        		this.form.status = this.value3;
        		api.ajax('team/point/listApplication',this.form).then(data =>{
        			this.show = false;
        			this.tabList = data.data;
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
	.datePicker {
		width: 120px;
	}
	.select {
		width:120px ; 
		display: inline-block;
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
    	width: 75px;
        background: #3dcb00;
        color: #fff;
        border-radius: 5px;
    }
    .btnGreen3:hover {
        background: #55df00;
    }
</style>
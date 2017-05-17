<template>
	<div style="height:462px" >
		<div class="account-tabs">
			<el-tabs :active-name="defaultActive" @tab-click="handleClick">
				<el-tab-pane name="transfer-balance" label="余额转换"></el-tab-pane>
				<el-tab-pane name="dividend-detail" label="分红资金明细"></el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<component :is="transferBalanceView"></component>
		</div>
	</div>
</template>
<script lang="babel">
	import { mapActions } from 'vuex'
	import api from '../../api'
    import transferBalance from './transfer-balance'
    import dividendDetail from './dividend-detail'
	export default {
		components : {
            transferBalance,
            dividendDetail,
        },
		data () {
			return {
			}
		},
		computed : {
			defaultActive () {
				return this.$store.state.useraction.dialogSecView;
			},
			transferBalanceView () {
                var dialogsec = this.$store.state.useraction.dialogSecView; 
                if (dialogsec == 'transfer-balance') {
                    return "transferBalance"
                } else if (dialogsec == 'dividend-detail') {
                	return "dividendDetail"
                }
            },
		},
		methods : {
			...mapActions({
                setDialogSecView : 'setDialogSecView',
            }),
			handleClick (tab) {
				console.log(tab);
				switch (tab.name) {
					case 'transfer-balance':
					this.setDialogSecView('transfer-balance') 
					break
					case 'dividend-detail':
					this.setDialogSecView('dividend-detail') 
					break
				}
			}
		}
	}
</script>
<style scoped>
	.account-tabs {
        margin-left: auto;
        margin-right: auto;
        width: 204px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>
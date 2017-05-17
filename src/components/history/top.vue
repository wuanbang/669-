<template>
    <div class="header_top2">
        <div class="header_top_left"></div>
        <dl class="clearfix">
            <dd><a href="javascript:void(0)" @click.stop.self="zoushi" ref="zoushi">走势</a></dd>
            <dd><a class="hover" href="javascript:void(0)" @click.stop.self="haoma" ref="haoma">号码</a></dd>
            <dd id="caizhu" v-popover:popover1><a href="javascript:void(0)">彩种</a>
                <el-popover ref="popover1" placement="bottom" width="480" popper-class="pop-cus-class-history" trigger="hover" :visible-arrow="false" :offset="190">
                    <div class="categoryBox2 clearfix" style="padding-top: 15px;">
                        <div class="category" @click.stop="lottery(1)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai1.png" width="75" height="75"></span></div>
                            <div class="category_name">重庆时时彩</div>
                        </div>
                        <div class="category" @click.stop="lottery(12)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai12.png" width="75" height="75"></span></div>
                            <div class="category_name">分分彩</div>
                        </div>
                        <div class="category" @click.stop="lottery(15)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai15.png" width="75" height="75"></span></div>
                            <div class="category_name">三分彩</div>
                        </div>
                        <div class="category" @click.stop="lottery(11)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai11.png" width="75" height="75"></span></div>
                            <div class="category_name">五分彩</div>
                        </div>
                        <div class="category" @click.stop="lottery(2)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai2.png" width="75" height="75"></span></div>
                            <div class="category_name">江西时时彩</div>
                        </div>
                        <div class="category" @click.stop="lottery(6)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai6.png" width="75" height="75"></span></div>
                            <div class="category_name">新疆时时彩</div>
                        </div>
                        <div class="category" @click.stop="lottery(3)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai3.png" width="75" height="75"></span></div>
                            <div class="category_name">黑龙江时时彩</div>
                        </div>
                        <div class="category" @click.stop="lottery(7)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai7.png" width="75" height="75"></span></div>
                            <div class="category_name">天津时时彩</div>
                        </div>
                         <div class="category" v-show="showNotSsc" @click.stop="lottery(8)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai8.png" width="75" height="75"></span></div>
                            <div class="category_name">广东11选5</div>
                        </div>
                        <div class="category" v-show="showNotSsc" @click.stop="lottery(9)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai9.png" width="75" height="75"></span></div>
                            <div class="category_name">江西11选5</div>
                        </div>
                        <div class="category" v-show="showNotSsc" @click.stop="lottery(10)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai10.png" width="75" height="75"></span></div>
                            <div class="category_name">山东11选5</div>
                        </div>
                        <div class="category" v-show="showNotSsc" @click.stop="lottery(4)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai4.png" width="75" height="75"></span></div>
                            <div class="category_name">福彩3D</div>
                        </div>
                        <div class="category" v-show="showNotSsc" @click.stop="lottery(5)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai5.png" width="75" height="75"></span></div>
                            <div class="category_name">排列3</div>
                        </div> 
                        <div class="category" v-show="showNotSsc" @click.stop="lottery(13)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai13.png" width="75" height="75"></span></div>
                            <div class="category_name">北京赛车PK10</div>
                        </div> 
                        <div class="category" v-show="showNotSsc" @click.stop="lottery(14)">
                            <div class="category_pic"><span><img src="../../images/caipiao/cai14.png" width="75" height="75"></span></div>
                            <div class="category_name">香港六合彩</div>
                        </div>  
                    </div>
                </el-popover>
            </dd>
        </dl>
    </div>
</template>

<script lang="babel">
import { mapActions } from 'vuex'
import {addClass, hasClass, toggleClass, removeClass} from '../../tools/command'
export default {
    name : "history-top",

    data() {
        return {
        }
    },

    computed : {
        showNotSsc(){
            var stype = this.$store.state.history.stype
            if(stype == '0'){
                return true
            }
            return false
        }
    },

    methods : {
        ...mapActions({
          setHisLottery : 'setHisLottery',
          setHisType : 'setHisType',
        }),
        lottery(value) {
            this.setHisLottery("cai"+value)
            this.$root.$emit("getSscHistory")
        },
        zoushi(){
            var zoushi = this.$refs.zoushi
            var haoma = this.$refs.haoma
            if(!hasClass(zoushi,'hover')){
                addClass(zoushi,'hover')
                removeClass(haoma,'hover')
                this.setHisType("1")
            }
        },
        haoma(){
            var zoushi = this.$refs.zoushi
            var haoma = this.$refs.haoma
            if(!hasClass(haoma,'hover')){
                addClass(haoma,'hover')
                removeClass(zoushi,'hover')
                this.setHisType("0")
            }
        }
    },

}
</script>
<style scoped>
    a {
        text-decoration: none;
    }

    * {
        margin: 0;
        padding: 0;
    }
</style>
<template>
    <div class="history-main">
        <div class="balls-hd clearfix">
            <h1 class="tit"> {{lotteryName}}, 
                <span class="chkViewMiss"><input type="checkbox" id="cbFilter1" v-model="yilou"><label class="f-12" for="cbFilter1">遗漏</label></span>
                <span class="chkViewMiss"><input type="checkbox" id="cbFilter2" v-model="zhexian"><label class="f-12" for="cbFilter2">折线</label></span>
            </h1>
            <span class="subs f-12" @click.stop="curDateHandle">
                显示：<a name="sdate0" href="javascript:void(0)" class="cur">近30期</a>
                      <a name="sdate1" href="javascript:void(0)">今日数据</a>
                      <a name="sdate2" href="javascript:void(0)">近2天</a>
                      <a name="sdate3" href="javascript:void(0)">近3天</a>
            </span>
        </div>
        <div ref="trendRef" id="kandaodu" class="trendCont_box">
            <table class="Dtable Old f-12">
                <colgroup class="c_0" span="2"></colgroup>
                <colgroup class="c_1" span="10" style="width:19px"></colgroup>
                <colgroup class="c_2" span="10" style="width:19px"></colgroup>
                <colgroup class="c_1" span="10" style="width:19px"></colgroup>
                <colgroup class="c_2" span="10" style="width:19px"></colgroup>
                <colgroup class="c_1" span="10" style="width:19px"></colgroup>
                <thead style="line-height: 19px;">
                    <tr>
                        <th rowspan="2" class="sort" style="cursor: pointer;width:39px;">期号<b title="排序" class="sup"></b></th>
                        <th rowspan="2" style="width:48px;">开奖号码</th>
                        <th colspan="10" style="width:182px;">万位</th>
                        <th colspan="10" style="width:182px;">千位</th>
                        <th colspan="10" style="width:182px;">百位</th>
                        <th colspan="10" style="width:182px;">十位</th>
                        <th colspan="10" style="width:182px;">个位</th>
                    </tr>
                    <tr class="NBold">
                        <th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>
                    </tr>
                </thead>
                <tbody v-if="hisdata.result" ref="trendBody">
                    <tr v-for="(item,ind) in hisdata.result" :class="{'b-b-stlye' : (ind+1)%5 == 0}">
                        <th>{{item.title.substring(6)}}-{{item.titleCode}}</th>
                        <th><i>{{item.num1}}</i><i>{{item.num2}}</i><i>{{item.num3}}</i><i>{{item.num4}}</i><i>{{item.num5}}</i></th>
                        <td v-for="(elem,index) in item.data[0]" :class="{'b_1': elem == 0}"><span v-show="elem == 0">{{ index }}</span><i  v-show="yilou && elem > 0">{{elem}}</i>
                        </td>
                        <td v-for="(elem,index) in item.data[1]" :class="{'b_2': elem == 0}"><span v-show="elem == 0">{{ index }}</span><i  v-show="yilou && elem > 0">{{elem}}</i>
                        </td>
                        <td v-for="(elem,index) in item.data[2]" :class="{'b_3': elem == 0}"><span v-show="elem == 0">{{ index }}</span><i  v-show="yilou && elem > 0">{{elem}}</i>
                        </td>
                        <td v-for="(elem,index) in item.data[3]" :class="{'b_4': elem == 0}"><span v-show="elem == 0">{{ index }}</span><i  v-show="yilou && elem > 0">{{elem}}</i>
                        </td>
                        <td v-for="(elem,index) in item.data[4]" :class="{'b_5': elem == 0}"><span v-show="elem == 0">{{ index }}</span><i  v-show="yilou && elem > 0">{{elem}}</i>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="hisdata.dataCount">
                    <tr class="yiloude">
                        <th colspan="2" class="sort">当前出现次数</th>
                        <td v-for="item in hisdata.dataCount[0]"><span><em style="height:20px"><b>{{item}}</b></em></span></td>
                        <td v-for="item in hisdata.dataCount[1]"><span><em style="height:20px"><b>{{item}}</b></em></span></td>
                        <td v-for="item in hisdata.dataCount[2]"><span><em style="height:20px"><b>{{item}}</b></em></span></td>
                        <td v-for="item in hisdata.dataCount[3]"><span><em style="height:20px"><b>{{item}}</b></em></span></td>
                        <td v-for="item in hisdata.dataCount[4]"><span><em style="height:20px"><b>{{item}}</b></em></span></td>
                    </tr>
                    <tr class="yiloude">
                        <th colspan="2" class="sort">当前最大连出</th>
                        <td v-for="item in hisdata.dataContinueMax[0]">{{item}}</td>
                        <td v-for="item in hisdata.dataContinueMax[1]">{{item}}</td>
                        <td v-for="item in hisdata.dataContinueMax[2]">{{item}}</td>
                        <td v-for="item in hisdata.dataContinueMax[3]">{{item}}</td>
                        <td v-for="item in hisdata.dataContinueMax[4]">{{item}}</td>
                    </tr> 
                    <tr class="yiloude">
                        <th colspan="2" class="sort">当前最大遗漏</th>
                        <td v-for="item in hisdata.dataMaxLeak[0]">{{item}}</td>
                        <td v-for="item in hisdata.dataMaxLeak[1]">{{item}}</td>
                        <td v-for="item in hisdata.dataMaxLeak[2]">{{item}}</td>
                        <td v-for="item in hisdata.dataMaxLeak[3]">{{item}}</td>
                        <td v-for="item in hisdata.dataMaxLeak[4]">{{item}}</td>
                    </tr>
                    <tr class="foot-head-cls">
                        <th rowspan="2" class="sort" style="width:39px;">期号<b title="排序" class="sup"></b></th>
                        <th rowspan="2" style="width:48px;">开奖号码</th>
                        <th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>
                    </tr>
                    <tr class="NBold foot-head-cls">
                        <th colspan="10" style="width:182px;">万位</th>
                        <th colspan="10" style="width:182px;">千位</th>
                        <th colspan="10" style="width:182px;">百位</th>
                        <th colspan="10" style="width:182px;">十位</th>
                        <th colspan="10" style="width:182px;">个位</th>
                    </tr>
                </tfoot>
            </table>
            <canvas v-show="zhexian" ref="trendCanvas"  :width="canvasWidth" :height="canvasHeight" class="trend-canvas-style"></canvas>
        </div>
        <div class="cssm f-12">参数说明：万千百十个位对应的走势。</div>
    </div>
</template>
<script lang="babel">
import lot from '../lottery/constants'
import {addClass, hasClass, toggleClass, removeClass, errorMsg} from '../../tools/command'
import { mapActions } from 'vuex'
import api from '../../api'
export default {
    name : "mainHistory",

    components : {
    },

    mounted(){
        this.setHisDate('0')
    },

    updated(){
        this.drawTrendExact()
    },

    data() {
        return {
            yilou : true,
            zhexian : true,
            tday : '0',
            hisdata : {},
            canvasHeight : 750,
            canvasWidth : 1000,
        }
    },

    computed: {
        lotteryName(){
            var lottery = this.$store.state.history.lottery
            this.getHisTrend()
            return lot[lottery]
        },
    },

    methods: {
        ...mapActions({
          setHisDate : 'setHisDate',
        }),
        curDateHandle(event){
            var srcElem = event.target
            var curElem = event.currentTarget
            var selected = curElem.querySelector(".cur")
            if(selected){
                removeClass(selected, 'cur')
            }
            if(srcElem && srcElem.tagName.toLowerCase() == 'a'){
                var sdate = srcElem.getAttribute("name")
                this.tday = sdate.substring(5)
                addClass(srcElem, 'cur')
            }
        },
        getHisTrend(){
            var lottery = this.$store.state.history.lottery || 'cai1'
            var para = {}
            para.classId = lottery.substring(3)
            para.day = this.tday
           
            api.ajax('lottery/num/listOpenHistoryTrend', para).then(data => {
                    if(data && data.code == '0'){
                        this.hisdata = data.data || {}
                    } else {
                        errorMsg(data.msg)
                    }
                }, error => {
                    errorMsg("系统出错，请稍后重试", error)
                })
        },
        drawTrendExact(){
            if(!this.hisdata.result){
                return
            }
            this.canvasHeight = 80 + this.hisdata.result.length * 21 + Math.floor(this.hisdata.result.length/5)
            this.canvasWidth = this.$refs.trendBody.getBoundingClientRect().width
            var len = this.hisdata.result.length
            var trendCanvas = this.$refs.trendCanvas
            if(!trendCanvas){
                return
            }

            var ctx = trendCanvas.getContext("2d")
            ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)
            ctx.lineWidth = 2

            var clientRect = trendCanvas.getBoundingClientRect()
            var left  = clientRect.left
            var top = clientRect.top
            var trendBody = this.$refs.trendBody
            var b1 = trendBody.querySelectorAll('.b_1')
            var b2 = trendBody.querySelectorAll('.b_2')
            var b3 = trendBody.querySelectorAll('.b_3')
            var b4 = trendBody.querySelectorAll('.b_4')
            var b5 = trendBody.querySelectorAll('.b_5')
            if(!b1){
                return
            }
            var b1Arr = Array.from(b1)
            var b2Arr = Array.from(b2)
            var b3Arr = Array.from(b3)
            var b4Arr = Array.from(b4)
            var b5Arr = Array.from(b5)

            this.calcLine(b1Arr,'#3366FF', ctx, left, top)
            this.calcLine(b2Arr,'#F79B2C', ctx, left, top)
            this.calcLine(b3Arr,'#3366FF', ctx, left, top)
            this.calcLine(b4Arr,'#F79B2C', ctx, left, top)
            this.calcLine(b5Arr,'#3366FF', ctx, left, top)

        },

        calcLine(barr, lclass, ctx, left, top){
            barr.forEach((element, index) => {
                if(index > barr.length - 2){
                    return
                }
                ctx.beginPath()
                ctx.strokeStyle = lclass
                let curClientRect = element.getBoundingClientRect()
                let nextClientRect = barr[index+1].getBoundingClientRect()

                ctx.moveTo(curClientRect.left - left + Math.floor(curClientRect.width/2) , curClientRect.top - top + Math.floor(curClientRect.height/2))
                ctx.lineTo(nextClientRect.left - left + Math.floor(nextClientRect.width/2) , nextClientRect.top - top + Math.floor(nextClientRect.height/2))
                ctx.stroke()
            })
        },

    }
}
    
</script>
<style scoped>
    a {
        text-decoration: none;
    }

    .foot-head-cls td,
    .foot-head-cls th {
        background: #666b71;
        border-width: 1px;
        border-style: solid;
        border-color: #a7abb6;
        color: #fff;
        white-space: nowrap;
    }

</style>
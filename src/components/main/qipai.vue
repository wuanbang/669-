 <template>
        <div class="GameTab">
            <div class="Menubox">
                <ul class="clearfix" @click="gameTabActive">
                    <li id="one1" onclick="" class="hover"><span>
                        <img src="../../images/leiIco1.png" /></span>全部游戏</li>
                    <li id="one2" onclick=""><span>
                        <img src="../../images/leiIco2.png" /></span>高频彩票</li>
                    <li id="one3" onclick=""><span>
                        <img src="../../images/leiIco3.png" /></span>乐透彩票</li>
                    <li id="one4" onclick=""><span>
                        <img src="../../images/leiIco4.png" /></span>低频彩票</li>
                    <li id="one5" onclick=""><span>
                        <img src="../../images/leiIco5.png" /></span>棋牌游戏</li>
                    <li id="one6" onclick=""><span>
                        <img src="../../images/leiIco6.png" /></span>真人资讯</li>
                </ul>
            </div>
            <div class="Contentbox">
                    <div id="con_one_1" class="side" v-show="currentActive == 1">
                        <div class="scr_con" style="height: 320px;">
                            <div class="dv_scroll" data-id="0">
                                <div class="dv_scroll_text Scroller-Container"  style="left: 0px; top: 0px;" id="id1">
                                    <ul @click.stop="goLottery" ref="gameMain" style="width: 980px;">
                                        <li name="cai1"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai1.png" /></span><p>
                                                重庆时时彩</p>
                                        </a></li>
                                        <li name="cai12"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai12.png" /></span><p>
                                                分分彩</p>
                                        </a></li>
                                        <li name="cai15"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai15.png" /></span><p>
                                                三分彩</p>
                                        </a></li>
                                        <li name="cai11"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai11.png" /></span><p>
                                                五分彩</p>
                                        </a></li>
                                        <li name="cai2"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai2.png" /></span><p>
                                                江西时时彩</p>
                                        </a></li>
                                        <li name="cai6"><a href="javascript:void(0)" onclick=""><span>
                                            <img src="../../images/caipiao/cai6.png" /></span><p>
                                                新疆时时彩</p>
                                        </a></li>
                                        <li name="cai3"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai3.png" /></span><p>
                                                黑龙江时时彩</p>
                                        </a></li>
                                        <li name="cai7"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai7.png" /></span><p>
                                                天津时时彩</p>
                                        </a></li>
                                        <li name="cai13"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai13.png" /></span><p>
                                                北京赛车PK10</p>
                                        </a></li>
                                        <li name="cai14"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai14.png" /></span><p>
                                                香港六合彩</p>
                                        </a></li>
                                        <li name="cai8"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai8.png" /></span><p>
                                                广东11选5</p>
                                        </a></li>
                                        <li name="cai9"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai9.png" /></span><p>
                                                江西11选5</p>
                                        </a></li>
                                        <li name="cai10"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai10.png" /></span><p>
                                                山东11选5</p>
                                        </a></li>
                                        <li name="cai4"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai4.png" /></span><p>
                                                福彩3D</p>
                                        </a></li>
                                        <li name="cai5"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/cai5.png" /></span><p>
                                                排列3</p>
                                        </a></li>
                                          <li name="qp1"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/qp1.png" /></span><p>
                                                百家乐</p>
                                        </a></li>
                                         <li name="qp3"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/qp2.png" /></span><p>
                                                二人牛牛</p>
                                        </a></li>
                                         <li name="qp2"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/qp3.png" /></span><p>
                                                百人牛牛</p>
                                        </a></li>
                                         <li name="qp4"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/qp4.png" /></span><p>
                                                炸金花</p>
                                        </a></li>
                                         <li name="qp5"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/qp5.png" /></span><p>
                                                斗地主</p>
                                        </a></li>
                                         <li name="qp6"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/qp6.png" /></span><p>
                                                港式五张</p>
                                        </a></li>
                                         <li name="qp7"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/qp7.png" /></span><p>
                                                两张牌</p>
                                        </a></li>
                                         <li name="qp8"><a href="javascript:void(0)" ><span>
                                            <img src="../../images/caipiao/qp8.png" /></span><p>
                                                疯狂赛车</p>
                                        </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="con_one_2" v-show="currentActive == 2">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;"  data-id="1">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id2">
                                <ul @click.stop="goLottery">
                                    <li name="cai1"><a href="javascript:void(0)"  onclick=""><span>
                                        <img src="../../images/caipiao/cai1.png" /></span><p>
                                            重庆时时彩</p>
                                    </a></li>
                                    <li name="cai12"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai12.png" /></span><p>
                                            分分彩</p>
                                    </a></li>
                                     <li name="cai15"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai15.png" /></span><p>
                                            三分彩</p>
                                    </a></li>
                                    <li name="cai11"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai11.png" /></span><p>
                                            五分彩</p>
                                    </a></li>
                                    <li name="cai2"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai2.png" /></span><p>
                                            江西时时彩</p>
                                    </a></li>
                                    <li name="cai6"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai6.png" /></span><p>
                                            新疆时时彩</p>
                                    </a></li>
                                    <li name="cai3"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai3.png" /></span><p>
                                            黑龙江时时彩</p>
                                    </a></li>
                                    <li name="cai7"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai7.png" /></span><p>
                                            天津时时彩</p>
                                    </a></li>
                                    <li name="cai13"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai13.png" /></span><p>
                                            北京赛车PK10</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div id="con_one_3" v-show="currentActive == 3">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;"  data-id="2">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id3">
                                <ul @click.stop="goLottery">
                                    <li name="cai8"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai8.png" /></span><p>
                                            广东11选5</p>
                                    </a></li>
                                    <li name="cai9"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai9.png" /></span><p>
                                            江西11选5</p>
                                    </a></li>
                                    <li name="cai10"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai10.png" /></span><p>
                                            山东11选5</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                         
                    </div>
                </div>
                <div id="con_one_4" v-show="currentActive == 4">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;" data-id="3">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id4">
                                <ul @click.stop="goLottery">
                                    <li name="cai14"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai14.png" /></span><p>
                                            香港六合彩</p>
                                    </a></li>
                                    <li name="cai4"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai4.png" /></span><p>
                                            福彩3D</p>
                                    </a></li>
                                    <li name="cai5"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/cai5.png" /></span><p>
                                            排列3</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div id="con_one_5" v-show="currentActive == 5">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;"  data-id="4">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id5">
                                <ul @click.stop="goLottery">
                                    <li name="qp1"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/qp1.png" /></span><p>
                                            百家乐</p>
                                    </a></li>
                                     <li name="qp3"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/qp2.png" /></span><p>
                                            二人牛牛</p>
                                    </a></li>
                                     <li name="qp2"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/qp3.png" /></span><p>
                                            百人牛牛</p>
                                    </a></li>
                                     <li name="qp4"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/qp4.png" /></span><p>
                                            炸金花</p>
                                    </a></li>
                                     <li name="qp5"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/qp5.png" /></span><p>
                                            斗地主</p>
                                    </a></li>
                                     <li name="qp6"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/qp6.png" /></span><p>
                                            港式五张</p>
                                    </a></li>
                                     <li name="qp7"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/qp7.png" /></span><p>
                                            两张牌</p>
                                    </a></li>
                                     <li name="qp8"><a href="javascript:void(0)" onclick=""><span>
                                        <img src="../../images/caipiao/qp8.png" /></span><p>
                                            疯狂赛车</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>     
                <div id="con_one_6" v-show="currentActive == 6">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;"  data-id="5">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id6">
                                <ul>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import {errorMsg,succMsg} from '../../tools/command'
    export default {

        mounted(){
           $(this.$refs.gameMain).mCustomScrollbar()
        },

        components: { 
        },

        data(){
            return {
                currentActive : 1,
            }
        },

        methods: {
            gameTabActive(event){
                var srcElem = event.target
                var telem = srcElem
                if(srcElem.tagName.toLowerCase() === 'img'){
                    telem = srcElem.parentElement.parentElement
                } else if(srcElem.tagName.toLowerCase() === 'span'){
                    telem = srcElem.parentElement
                } else if(srcElem.tagName.toLowerCase() === 'ul'){
                    return
                }
                var clsName = telem.className
                if(clsName || clsName.indexOf("hover") === -1){
                    let activedElem = telem.parentElement.querySelector(".hover")
                    if(activedElem){
                        activedElem.className = null
                    }
                    telem.className = "hover"
                }
                this.currentActive = parseInt(telem.id.replace('one',''))
            },
            goLottery(event){
                var srcElem = event.target
                var curLi = null
                if(srcElem.tagName.toLowerCase() == 'img'){
                   curLi = srcElem.parentElement.parentElement.parentElement
                } else if(srcElem.tagName.toLowerCase() == 'p' || srcElem.tagName.toLowerCase() == 'span'){
                   curLi = srcElem.parentElement.parentElement
                } else if(srcElem.tagName.toLowerCase() == 'a'){
                   curLi = srcElem.parentElement
                } else if(srcElem.tagName.toLowerCase() == 'li'){
                  curLi = srcElem
                }

                if(!curLi){
                    return
                }
                var curLiName = curLi.getAttribute("name")
                if(curLiName && curLiName.indexOf("qp") > -1){
                    this.goGame(curLiName.substring(2))
                    return
                }
                this.setActivedLottery(curLiName)
                this.setCurrentLottery(curLiName)

                this.setCurrentView('lottery')

            },
            goGame(id){
                var newWin = window.open('/#/loading')
                var para = {}
                para.id = id
                api.ajax('game/enter',para).then(data =>{
                   if (data.code == '0') {
                       newWin.location.href = data.data
                   }
                },error =>{
                   errorMsg("数据请求失败")
                })
            },
            ...mapActions({
              setActivedLottery: 'setActivedLottery',
              setCurrentView: 'setCurrentView',
              setCurrentLottery: 'setCurrentLottery',
            }),
        }

    }
</script>
<style scoped>

*{
    margin: 0;
    padding: 0;
}

.GameTab {
    color: #fff;
}

.GameTab .Menubox {
    width: 1000px;
    overflow: hidden;
}

.GameTab .Menubox ul {
    width: 1100px;
    height: 35px;
    padding-bottom: 7px;
}

.GameTab .Menubox li {
    float: left;
    width: 158px;
    height: 35px;
    line-height: 35px;
    margin-right: 10.4px;
    display: block;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    background: url(../../images/dating_lei.png) top center no-repeat;
}

.GameTab .Menubox li.hover,
.GameTab .Menubox li:hover {
    width: 158px;
    height: 35px;
    background: url(../../images/dating_lei.png) bottom center no-repeat;
}

.GameTab .Menubox li span {
    width: 35px;
    height: 35px;
    display: inline-block;
    vertical-align: middle;
    _vertical-align: baseline;
}

.Contentbox {
    height: 330px;
    padding: 15px 10px;
    background: url(../../images/dating_contentbox.png) 0 0 no-repeat;
}

.Contentbox ul {}

.Contentbox ul li {
    float: left;
    width: 124px;
    height: 165px;
    margin: 0 7px;
    text-align: center;
}

.Contentbox ul li a {
    color: #fff;
}

.Contentbox ul li a span {
    width: 124px;
    height: 124px;
    display: block;
    background: url(../../images/caiBox.png) 0 0 no-repeat;
}

.Contentbox ul li a:hover span {
    background: url(../../images/caiBox.png) bottom left no-repeat;
}

.Contentbox ul li a span img {
    width: 124px;
    height: 124px;
}

.Contentbox ul li a p {
    padding-top: 10px;
    font-size: 14px;
}

.Contentbox ul li a:hover {
    text-decoration: none;
    font-weight: bold;
}

ul {
    list-style: none;
}

a {
    text-decoration: none;
    color: inherit;
}

.side {
   position: relative;
   overflow: auto;
   width: 100%;
   height: 100%;
}

</style>
 <template>
 <div id="left">
    <ul ref="leftMenuUL">
        <li class="hover">
            <div class="leftMenu"  @click.stop="showNav">
                <a class="up" href="javascript:void(0)"></a><span>
                    <img src="../../images/leiIco0.png" /></span><span class="menu-title-desc">最近游戏</span></div>
            <div class="leftBlock">
                <div class="scr_con">
                    <div class="dv_scroll"  data-id="0">
                        <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id1">
                            <ul ref="recentLook" style="width: 192px;height: 350px;" @click.stop="addMuneLeft">


                            </ul>
                        </div>
                    </div>
                   
                </div>
            </div>
        </li>
        <li>
            <div class="leftMenu"  @click.stop="showNav">
                <a href="javascript:void(0)"></a><span>
                    <img src="../../images/leiIco2.png" /></span><span class="menu-title-desc">高频彩票</span></div>
            <div class="leftBlock">
                <div class="scr_con" >
                    <div class="dv_scroll" data-id="1">
                        <div class="dv_scroll_text Scroller-Container"  style="left: 0px; top: 0px;" id="id2">
                            <ul ref="heightFreqLottery" style="width: 192px;height: 350px;" @click.stop="addMuneLeft">
                                <li name="cai1"><a href="javascript:void(0)" ><span>
                                    <img src="../../images/caipiao/cai1.png" /></span><p>
                                        重庆时时彩</p>
                                </a></li>
                                <li name="cai12"><a href="javascript:void(0)" ><span>
                                    <img src="../../images/caipiao/cai12.png" /></span><p>
                                        分分彩</p>
                                </a></li>
                                 <li name="cai15"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai15.png" /></span><p>
                                        三分彩</p>
                                </a></li>
                                <li name="cai11"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai11.png" /></span><p>
                                        五分彩</p>
                                </a></li>
                                <li name="cai2"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai2.png" /></span><p>
                                        江西时时彩</p>
                                </a></li>
                                <li name="cai6"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai6.png" /></span><p>
                                        新疆时时彩</p>
                                </a></li>
                                <li name="cai3"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai3.png" /></span><p>
                                        黑龙江时时彩</p>
                                </a></li>
                                <li name="cai7"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai7.png" /></span><p>
                                        天津时时彩</p>
                                </a></li>
                                <li name="cai13"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai13.png" /></span><p>
                                        北京赛车PK10</p>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                   
                </div>
            </div>
        </li>
        <li>
            <div class="leftMenu"  @click.stop="showNav">
                <a href="javascript:void(0)"></a><span>
                    <img src="../../images/leiIco3.png" /></span><span class="menu-title-desc">乐透彩票</span></div>
            <div class="leftBlock">
                <div class="scr_con">
                    <div class="dv_scroll"  data-id="2">
                        <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id3">
                            <ul @click.stop="addMuneLeft">
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
                            </ul>
                        </div>
                    </div>
                   
                </div>
            </div>
        </li>
        <li>
            <div class="leftMenu"  @click.stop="showNav">
                <a href="javascript:void(0)"></a><span>
                    <img src="../../images/leiIco4.png" /></span><span class="menu-title-desc">低频彩票</span></div>
            <div class="leftBlock">
                <div class="scr_con">
                    <div class="dv_scroll"  data-id="3">
                        <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id4">
                            <ul @click.stop="addMuneLeft">
                                <li name="cai14"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai14.png" /></span><p>
                                        香港六合彩</p>
                                </a></li>
                                <li name="cai4"><a href="javascript:void(0)"  ><span>
                                    <img src="../../images/caipiao/cai4.png" /></span><p>
                                        福彩3D</p>
                                </a></li>
                                <li name="cai5"><a href="javascript:void(0)" ><span>
                                    <img src="../../images/caipiao/cai5.png" /></span><p>
                                        排列3</p>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                   
                </div>
            </div>
        </li>
        <li>
            <div class="leftMenu"  @click.stop="showNav">
                <a href="javascript:void(0)"></a><span>
                    <img src="../../images/leiIco5.png" /></span><span class="menu-title-desc">棋牌游戏</span></div>
            <div class="leftBlock">
                <div class="scr_con">
                    <div class="dv_scroll" data-id="4">
                        <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id5">
                            <ul @click.stop="addMuneLeft" ref="boardGames" style="width: 192px;height: 350px;">
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
        </li>
        <li class="last" style="padding-bottom: 0;">
            <div class="leftMenu"  @click.stop="showNav">
                <a href="javascript:void(0)"></a><span>
                    <img src="../../images/leiIco6.png" /></span><span class="menu-title-desc">真人资讯</span></div>
            <div class="leftBlock">
                <div class="scr_con">
                    <div class="dv_scroll"  data-id="5">
                        <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id6">
                            <ul>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import api from '../../api'
  import {errorMsg,succMsg} from '../../tools/command'
  export default {
     mounted(){
        $(this.$refs.heightFreqLottery).mCustomScrollbar()
        $(this.$refs.boardGames).mCustomScrollbar()
        $(this.$refs.recentLook).mCustomScrollbar()

        var activeLottery = this.$store.state.lottery.activedLottery
        var leftMenuUL = this.$refs.leftMenuUL
        if(activeLottery.length > 0){
            var recentLook = this.$refs.recentLook.firstChild.firstChild
            activeLottery.forEach( function(element, index) {
               var lielem = leftMenuUL.querySelector(`li[name=${element}]`)
               if(lielem){
                  recentLook.appendChild(lielem.cloneNode(true))
               }
            })

        }

     },
     data() {
      return {
        recent: [],
        navState: [],
        more: false,
      }
    },
    methods: {
       ...mapActions({
         setActivedLottery: 'setActivedLottery',
         setCurrentLottery: 'setCurrentLottery',
       }),
       showNav(event){
          var curElem = event.currentTarget
          var curParent = curElem.parentElement
          if(curParent.className.indexOf("hover") > -1){
             curParent.className = ''
             curElem.firstElementChild.className = ''
          } else {
              var curActive = curElem.parentElement.parentElement.querySelector(".hover")
              if(curActive){
                  curActive.className = ''
                  curActive.firstElementChild.firstElementChild.className = ''
              }
              curParent.className = "hover"
              curElem.firstElementChild.className = 'up'
          }
         
       },
       addMuneLeft(event){
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

          var recentLook = this.$refs.recentLook.firstChild.firstChild
          var existLi = recentLook.querySelector(`li[name=${curLiName}]`)
          if(existLi){
             recentLook.removeChild(existLi)
          }
          var theFirstChild = recentLook.firstChild
          recentLook.insertBefore(curLi.cloneNode(true), theFirstChild)
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
    }
  }
</script>
<style scoped>

    li {
      list-style: none;
    }

    ul {
      padding: 0;
      margin: 0;
    }

    a {
        font-size: 16px;
        color: #f9fafc;
        margin: 0;
        padding: 0;
        display: block;
        position: relative;
        transition: all .3s;
        text-decoration: none;
    }

    p {
       margin-bottom: 0;
       margin-top: 0;
       font-size: 12px;
    }

    .menu-title-desc {
        position: relative;
        top: -11px;
    }

    .dv_scroll {
      position: absolute;
      height: 350px;
      overflow: hidden;
      width: 190px;
      overflow-y: auto;
  }
 
</style>

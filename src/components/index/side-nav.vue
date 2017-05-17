<template>
  <div class="yiwei-project-side-nav">
    <ul>
      <li class="nav-item" v-for="item in data" :id="item.id" @click.stop="isShow" @mouseover.stop="mouseOver" @mouseout.stop="mouseOut">
        <router-link
          class="link-parent"
          :to="base + item.path"
          exact
          :id="item.id"
          v-text="item.name">
        </router-link><el-button class="arrow-show-class el-icon-arrow-up" type="text"></el-button>
        <div v-show="item.show">
        <ul class="children-list sub-nav" v-if="item.children">
          <li class="sub-item" v-for="navItem in item.children">
            <router-link
              class="link-child"
              :to="base + navItem.path"
              exact
              :id="navItem.id"
              v-text="navItem.name">
            </router-link>
          </li>
        </ul>
        <template v-if="item.groups">
          <div class="nav-group" v-for="group in item.groups">
            <div class="nav-group-title" :id="group.id">{{group.name}}</div>
            <ul class="pure-menu-list" v-show="group.show">
              <li
                class="sub-item"
                v-for="navItem in group.list">
                <router-link
                  class="link-group"
                  :to="base + navItem.path"
                  exact
                  :id="navItem.id"
                  v-text="navItem.name"></router-link>
              </li>
            </ul>
          </div>
        </template>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      data: Array,
      onlyOpenOne: {
        type: String,
        default: 'N'
      },
      base: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        highlights: [],
        navState: []
      }
    },
    methods: {
       mouseOver(event){
         let srcElement = event.target;
         if(srcElement.tagName.toLowerCase() == 'a' && srcElement.className.indexOf("link-parent") === -1){
             srcElement.className = srcElement.className + " mouse-active-li"
         }

       },
       mouseOut(event){
          let srcElement = event.target;
          if(srcElement.tagName.toLowerCase() == 'a' && srcElement.className.indexOf("link-parent") === -1){
            srcElement.className = srcElement.className.replace("mouse-active-li","")
          }
       },
       removeActiveClass(){
          var elem = document.querySelector("div.yiwei-project-side-nav .item-active-a")
          if(elem){
              elem.className = elem.className.replace('item-active-a','')
          }
       },
       isShow(event){
        let srcElementId = event.target.id
        let curElementId = event.currentTarget.id

         if(this.data && this.data){
            for(var ind = 0;ind < this.data.length;ind ++){
               var obj  = this.data[ind]
               if(obj && obj.id == curElementId){
                  if(obj.id == srcElementId){
                      obj.show = !obj.show
                      let arrowStyle = event.currentTarget.querySelector(".arrow-show-class")
                      if(arrowStyle && arrowStyle.className.indexOf("el-icon-arrow-down") !== -1){
                          arrowStyle.className = arrowStyle.className.replace("el-icon-arrow-down", "el-icon-arrow-up")
                      } else {
                          arrowStyle.className = arrowStyle.className.replace("el-icon-arrow-up", "el-icon-arrow-down")
                       }
                      if(this.onlyOpenOne === "Y"){
                         for(var tind = 0;tind < this.data.length;tind ++){
                            if(this.data[tind].id != srcElementId){
                                 this.data[tind].show = false
                            }
                         }
                      }
                      break
                  } else {
                      let isChild = false;
                      if(obj.children && obj.children.length > 0){
                        for(var childInd=0; childInd < obj.children.length;childInd ++){
                          let childObj = obj.children[childInd]
                          if(childObj.id == srcElementId){
                             this.removeActiveClass()
                             event.target.className = event.target.className + " item-active-a"
                             isChild = true
                             break
                          }
                        }
                      }

                      if(!isChild && obj.groups && obj.groups.length > 0){
                        for(var groupInd=0; groupInd < obj.groups.length;groupInd ++){
                          var groupObj = obj.groups[groupInd]
                          if(groupObj.id == srcElementId){
                            groupObj.show = !groupObj.show
                          } else {
                            if(groupObj.list && groupObj.list.length > 0){
                               for(var itemInd=0; itemInd < groupObj.list.length;itemInd ++){
                                  var groupItemObj = groupObj.list[itemInd]
                                  if(groupItemObj.id == srcElementId){
                                    this.removeActiveClass()
                                    event.target.className = event.target.className + " item-active-a"
                                    break
                                  }
                               }
                            }
                          }
                        }
                      }
                   } 

               }

            }
         }
       },
    }
  }
</script>
<style scoped>
    .yiwei-project-side-nav {
      width: 100%;
      box-sizing: border-box;
      text-align: left;
    }

    li {
      list-style: none;
    }

    ul {
      padding: 0;
      margin: 0;
      background-color: #324057;
    }

    a {
        font-size: 16px;
        font-weight: bold;
        color: #107dea;
        line-height: 40px;
        height: 40px;
        margin: 0;
        padding: 0;
        text-decoration: none;
        display: block;
        position: relative;
        transition: all .3s;
    }

    .item-active-a {
       background-color: #90ad90;
    }

    .active-child {
    }

    .link-parent {
        padding-left: 10px;
    }    

    .link-child {
        padding-left: 25px;
    }

    .link-group {
        padding-left: 40px;
    }

    .nav-group-title {
      font-size: 16px;
      font-weight: bold;
      color: #107dea;
      padding-left: 25px;
      line-height: 26px;
      padding-top: 7px;
      padding-bottom: 7px;
      cursor: pointer;
      background-color: #8492A6;
    }

    .children-list {
    }

    .nav-item {
      position: relative;
      font-size: 16px;
      border-bottom-color: #b6bed4;
      border-bottom-style: solid;
      border-bottom-width: 1px;
    }

    .sub-item {
      font-size: 14px;
      background-color: #D3DCE6;
      border-bottom-style: solid;
      border-bottom-color: #83928e;
      border-bottom-width: 1px;
    }

    .nav-group {
      border-bottom-style: solid;
      border-bottom-color: #6e827c;
      border-bottom-width: 1px;
    }

    .mouse-active-li {
       background-color: #90ad90;
    }

    .arrow-show-class {
      font-size: 16px;
      position: absolute;
      top: 2px;
      right: 5px;
    }

</style>

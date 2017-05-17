<template>
    <div class="container">
        <span class="welcome">欢迎使用亿维平台</span>
        <div style="width: 200px;">
            <side-nav :data="sideNavData"></side-nav>
        </div>
    </div>
</template>
<script lang="babel">
    import sideNav from "../side-nav"
	export default {
        components : {
          sideNav
        },

        data() {
            return {
                sideNavData : [
                {
                    name : "彩票",
                    path : "#",
                    id : "caipiao-1",
                    show : true,
                    children : [
                        {
                            name : "222",
                            path : "#",
                            id : "caipiao-c1",
                        },
                        {
                            name : "333",
                            path : "#",
                            id : "caipiao-c2",
                        }
                    ],
                    groups:[
                    {
                        name : "组1",
                        id : "caipiao-g1",
                        show : true,
                        list: [
                            {
                                name : "444",
                                path : "#",
                                id : "caipiao-g1-c1",
                            },
                            {
                                name : "555",
                                path : "#",
                                id : "caipiao-g1-c2",
                            }
                        ]
                    },
                    {
                        name : "组2",
                        show : true,
                        id : "caipiao-g2",
                        list: [
                           {
                               name : "666",
                               path : "#",
                               id : "caipiao-g2-c1",
                           },
                           {
                               name : "777",
                               path : "#",
                                id : "caipiao-g2-c2",
                           }
                        ]
                    },
                    ]
                },
               {
                    name : "游戏",
                    path : "#",
                    id : "youxi-1",
                    show : true,
                    children : [
                        {
                            name : "222",
                            path : "#",
                            id : "youxi-c1",
                        },
                        {
                            name : "333",
                            path : "#",
                            id : "youxi-c2",
                        }
                    ],
                    groups:[
                    {
                        name : "组1",
                        id : "youxi-g1",
                        show : true,
                        list: [
                            {
                                name : "444",
                                path : "#",
                                id : "youxi-g1-c1",
                            },
                            {
                                name : "555",
                                path : "#",
                                id : "youxi-g1-c2",
                            }
                        ]
                    },
                    {
                        name : "组2",
                        show : true,
                        id : "youxi-g2",
                        list: [
                           {
                               name : "666",
                               path : "#",
                               id : "youxi-g2-c1",
                           },
                           {
                               name : "777",
                               path : "#",
                                id : "youxi-g2-c2",
                           }
                        ]
                    },
                    ]
                }
                ],
            }
        }

	}
</script>
<style type="text/css" scoped>
	.container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        font-size: 36px;
        text-align: center;
    }
    .welcome {
       display: inline-block;
    }
</style>
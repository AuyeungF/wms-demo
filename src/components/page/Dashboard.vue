<template>
    <div class="container">
        <!--<div id="allmap" class="allmap"></div>-->
        <baidu-map class="map" :center="{lng: 113.128509, lat: 23.020575}" :zoom="11">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
            <bm-driving :start="begin" :end="finish"  :panel="false" :autoViewport="true" stroke-color="blue"></bm-driving>
            <bml-lushu
                :path="path"
                :rotation="true">
            </bml-lushu>
        </baidu-map>
    </div>
</template>

<script>
    import {BmlLushu} from 'vue-baidu-map'
    export default {
        components: {
            BmlLushu
        },
        data () {
            return {
                play: false,
                path: [],
                begin:'智慧新城',
                finish:'均安'
//                icon: {
//                    url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
//                    size: {width: 52, height: 26},
//                    opts: {anchor: {width: 27, height:13}}
//                }
            }
        },
        methods: {

        }
//        name: 'dashboard',
//        data() {
//            return {
//                name: localStorage.getItem('ms_username'),
//                todoList: [
//                    {
//                        title: '今天要修复100个bug',
//                        status: false,
//                    },
//                    {
//                        title: '今天要修复100个bug',
//                        status: false,
//                    },
//                    {
//                        title: '今天要写100行代码加几个bug吧',
//                        status: false,
//                    }, {
//                        title: '今天要修复100个bug',
//                        status: false,
//                    },
//                    {
//                        title: '今天要修复100个bug',
//                        status: true,
//                    },
//                    {
//                        title: '今天要写100行代码加几个bug吧',
//                        status: true,
//                    }
//                ]
//            }
//        },
//        computed: {
//            role() {
//                return this.name === 'admin' ? '超级管理员' : '普通用户';
//            }
//        }


    }

</script>


<style scoped>
    .map {
        width: 100%;
        height: 600px;
    }
    .bm-view {
        width: 100%;
        height: 300px;
    }
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>

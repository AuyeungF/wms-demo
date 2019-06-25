<template>
    <div class="Vehicle">
        <div class="container">
            <template v-if="show">
                <div class="Vehicle-head clearfloat bottom30">
                    <div class="Vehicle-title">
                        <h5>付运表实时信息</h5>
                    </div>
                    <hr class="hr">
                    <div class="warehousing-header clearfix new-pay-form-btn veh-warehousing-header">
                        <!-- 选择车辆 -->
                        <!--<div class="w-h-div delivery-note">
                            <div class="tab-btn  delivery-note-text">选择车辆</div>
                        </div>
                        &lt;!&ndash;过滤数据&ndash;&gt;
                        <div class="w-h-div filtering-data" @click="tableFile = true">
                            <span class="filtering-data-icon"></span>
                            <span class="filtering-data-text">过滤数据</span>
                        </div>
                        &lt;!&ndash;时间&ndash;&gt;
                        <div class="w-h-div bill-date">
                            <div class="block">
                                <span class="demonstration">入库日期:</span>
                                <el-date-picker
                                    v-model="value1"
                                    type="datetime"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                                <span class="time-to">至</span>
                                <el-date-picker
                                    v-model="value2"
                                    type="datetime"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                        &lt;!&ndash;search&ndash;&gt;
                        <div class="w-h-div header-search" @click="getTime">
                            <div class="box-header-search">
                                <span class="header-search-icon"></span>
                                <span class="header-search-text">查询</span>
                            </div>
                        </div>-->
                        <!-- 新建付运单-->
                        <div class="top10 w-h-div delivery-note delivery-right" @click="show = false">
                            <div class="tab-btn  delivery-note-text">新建付运单</div>
                        </div>
                    </div>
                </div>
                <div class="tab-veh vehicle-tab-height">
                    <el-table
                        :data="vehlist"
                        style="width: 100%;text-align: center;cursor: pointer;"
                        :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center',fontSize:'14px'}"
                        height="560px"
                        :row-style="{height:'50px',fontSize:'16px'}"
                        @row-dblclick="handdle"
                        @row-click="handleclass"
                        :row-class-name="getClass"
                        stripe>
                        <template
                            v-for="(val,index) in tabveh">
                            <el-table-column
                                v-if="val.prop == 'No'"
                                :prop="tabCol[index].prop"
                                :label="val.label"
                                :key="index"
                                width="100"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                v-if="val.prop != 'No'"
                                :prop="tabCol[index].prop"
                                :label="val.label"
                                :key="index"
                                width="180"
                                align="center">
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
            </template>
            <template v-else>
                <payform @changeshow="changeshow"></payform>
            </template>
        </div>
        <div class="map-fine">
            <el-dialog title="Map" :visible.sync="isShow" class="tab-file">
                <baidu-map class="map" :center="{lng: 113.128509, lat: 11.902543}" :zoom="11">
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                    <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
                    <bm-driving :start="begin" :end="finish"  :panel="false" :autoViewport="true" stroke-color="blue"></bm-driving>
                    <bml-lushu
                        :path="path"
                        :rotation="true">
                    </bml-lushu>
                </baidu-map>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Payform from './New-pay-form'
    import {BmlLushu} from 'vue-baidu-map'
    import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component.vue";
    import Sortable from 'sortablejs'
    import {filetime,add} from '~@/../../static/js/index.js'
    export default {
        name: "",
        components: {
            ElDialog, Payform,BmlLushu},
        data() {
            return {
                play: false,
                path: [],
                begin:'佛山市',
                finish:'莆田市',
                isShow:false,
                idx: -1,
                GPS: 2,
                value1: '',
                value2: '',
                show: true,
                carform: {},
                tabveh: [
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop: "applyNo",
                        label: "申请单号"
                    },
                    {
                        prop: "licencePlate",
                        label: "车牌号码"
                    },
                    {
                        prop: "departureTime",
                        label: "出发时间"
                    },
                    {
                        prop: "driverTime",
                        label: "行驶时间"
                    },
                    {
                        prop: "estimate",
                        label: "预计到达时间"
                    },
                    {
                        prop: "gpsStatus",
                        label: "GPS设备状态"
                    },
                    {
                        prop: "carStatus",
                        label: "车辆信息"
                    },
                    {
                        prop: "transportNo",
                        label: "付运单号"
                    },
                    {
                        prop: "driver",
                        label: "司机"
                    },
                    {
                        prop: "phone",
                        label: "联系电话"
                    },
                    {
                        prop: "outboundNum",
                        label: "出库条数"
                    },
                    {
                        prop: "address",
                        label: "送货地址"
                    },
                    {
                        prop: "remark",
                        label: "备注"
                    },
                    {
                        prop: "createDate",
                        label: "录入时间"
                    },
                    {
                        prop: "createBy",
                        label: "录入人"
                    }

                ],
                tabCol: [
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop: "applyNo",
                        label: "申请单号"
                    },
                    {
                        prop: "licencePlate",
                        label: "车牌号码"
                    },
                    {
                        prop: "departureTime",
                        label: "出发时间"
                    },
                    {
                        prop: "driverTime",
                        label: "行驶时间"
                    },
                    {
                        prop: "estimate",
                        label: "预计到达剩余时间"
                    },
                    {
                        prop: "gpsStatus",
                        label: "GPS设备状态"
                    },
                    {
                        prop: "carStatus",
                        label: "车辆信息"
                    },
                    {
                        prop: "transportNo",
                        label: "付运单号"
                    },
                    {
                        prop: "driver",
                        label: "司机"
                    },
                    {
                        prop: "phone",
                        label: "联系电话"
                    },
                    {
                        prop: "outboundNum",
                        label: "出库条数"
                    },
                    {
                        prop: "address",
                        label: "送货地址"
                    },
                    {
                        prop: "remark",
                        label: "备注"
                    },
                    {
                        prop: "createDate",
                        label: "录入时间"
                    },
                    {
                        prop: "createBy",
                        label: "录入人"
                    }

                ],
                vehlist: [],
                times:0,
                max:(10*60*60+10*60)*1000,
                user:"admin",
                pass:"admin",
                topic:"event/transport_complete",
                client:new Messaging.Client("192.168.1.16",61614,"example-"+(Math.floor(Math.random() * 100000))),

            }
        },
        created() {
            this.getTransportLists();
            this.client.connect({
                userName:this.user,
                password:this.pass,
                onSuccess:this.onConnect
            });//连接服务器并注册连接成功处理事件
            this.client.onConnectionLost = this.onConnectionLost;//注册连接断开处理事件
            this.client.onMessageArrived = this.onMessageArrived;//注册消息接收处理事件
        },
        mounted(){
            this.columnDrop();
        },
        methods:  {
            handleclass(row) {
                this.idx = row.index;
            },
            handdle(row, event, column) {
                //点击某一行显示信息
                this.idx = row.index;
                this.isShow = true;
            },
            //根据状态添加类名
            getClass({row, rowIndex}) {
                //添加类名
                row.index = rowIndex
                if (rowIndex == this.idx) {
                    return 'active';
                }
            },
            cellclass({row, column, rowIndex, columnIndex}) {
                //拖动更改columnIndex位置

                if (columnIndex === this.GPS) {
                    if (this.vehlist[rowIndex].GPS == '在线') {
                        return '';
                    } else if (this.vehlist[rowIndex].GPS == '离线') {
                        return 'red';
                    }
                }
            },
            // 查找付运表列表
            getTransportLists() {
                this.$axios({
                    method: "get",
                    url: "/api/vehiclemanager/transportlist/all",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                    this.vehlist = [];
                    let content = res.data;
                    for (let index = 0; index < content.length; index++){
                        let item = content[index];
                        item.No = index+1;
                        item.createDate = filetime(new Date(item.createDate));
                        item.lastModifyDate = filetime(new Date(item.lastModifyDate));
                        item.driver = item.vehicleInfo.driver;
                        item.gpsStatus = (item.vehicleInfo.gpsStatus) === 1 ? "在线" : "离线";
                        item.phone = item.vehicleInfo.phone;
                        item.licencePlate = item.vehicleInfo.licencePlate;
                        if ((item.vehicleInfo.carStatus) === 0) {
                            item.carStatus = "等待安排";
                        } else if ((item.vehicleInfo.carStatus) === 1) {
                            item.carStatus = "等待装货"
                        } else if ((item.vehicleInfo.carStatus) === 2) {
                            item.carStatus = "路途中"
                        } else {
                            item.carStatus = "到达目的地"
                        }
//                        if ((item.vehicleInfo.carStatus) === 1 || (item.vehicleInfo.carStatus) === 0) {
//                            item.driverTime = "--" + "天 " + "--" + "时" + "--" + " 分";
//                            item.estimate = "--" + "天 " + "--" + "时" + "--" + " 分";
//                        }
                        if (item.carStatus != "等待装货") {
                            item.departureTime = filetime(new Date(item.departureTime));
                            this.timeFn(new Date(item.departureTime),index);
                            let willtime = new Date(item.departureTime).getTime() + this.max;
                            let YY = new Date(willtime).getFullYear();
                            let MM = new Date(willtime).getMonth()+1;
                            let DD = new Date(willtime).getDate();
                            let HH = new Date(willtime).getHours();
                            let mm = new Date(willtime).getMinutes();
                            let ss = new Date(willtime).getSeconds();
                            item.driverTime =0 + "天 " + 10 + "时 " + 10 + " 分" ;
                            item.estimate =YY+"-"+add(MM)+"-"+add(DD)+" "+add(HH)+":"+add(mm)+":"+add(ss);
                        }else {
                            item.departureTime = "--";
                            item.driverTime = "--" + "天 " + "--" + "时" + "--" + " 分";
                            item.estimate = "--" ;
                        }
                        this.vehlist.push(item);
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            changeshow() {
                this.show = true;
                this.getTransportLists();

            },
            //行驶时间
            timeFn(d1,index) {
                //开始时间
                var timer = setInterval(()=>{
                    //console.log(d1)
                    let dateBegin = d1;//将-转化为/，使用new Date
                    let dateEnd = new Date();//获取当前时间
                    let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
                    let item = this.vehlist[index];
                    //console.log(dateDiff)
                    this.times = dateDiff;
                    if(dateDiff < this.max) {
                        //this.times = dateDiff;
                        var day = parseInt(dateDiff/1000/3600/24)
                        var hh = parseInt(dateDiff/1000/3600%24);
                        var mm= parseInt(dateDiff/1000/60%60);
                        var ss = parseInt(dateDiff/1000%60);
                        item.driverTime = day + "天 " + add(hh) + "时 " +add(mm) + " 分 " +add(ss) +"秒";
                    } else {
                        item.carStatus = "到达目的地"
                        item.driverTime = 0 + "天 " + 10 + "时 " + 10 + " 分 " ;
                        clearInterval(timer)
                    }
                },1000)
            },
            //实现拖拽效果
             columnDrop() {
                const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
                this.sortable = new Sortable(wrapperTr, {
                    animation: 180,
                    delay: 0,
                    onEnd: evt => {
                        const oldItem = this.tabCol[evt.oldIndex];
                        this.tabCol.splice(evt.oldIndex, 1);
                        this.tabCol.splice(evt.newIndex, 0, oldItem);
                    }
                })
            },
            onConnectionLost(responseObject) {
                if (responseObject.errorCode !== 0) {
                    console.log("onConnectionLost:"+responseObject.errorMessage);
                    console.log("连接已断开");
                }
            },
            onMessageArrived(message) {
                this.$notify({
                    message: '车辆正在出发',
                    type: 'success'
                });
                this.getTransportLists();
            },
            onConnect() {
                this.client.subscribe(this.topic);//订阅主题
            },
            disconnect(){
                this.client.disconnect();
            }
        },
        destroyed(){
            this.disconnect();

        }
    }
</script>


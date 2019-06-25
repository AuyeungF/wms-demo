<template>
    <div class="pay-form new-pay-form">
        <div class="new-pay-form">
            <span>付运表实时信息>新建付运表</span>
            <span class="new-right out-go" @click="go">
            </span>
        </div>
        <div class="top10 pay-form-btn clearfix new-pay-form-btn">
            <div class="warehousing-header clearfix veh-warehousing-header">
                <!-- 选择车辆 -->
                <div class="w-h-div delivery-note delivery-note-box" @click="getVehicleInfos">
                    <div class="tab-btn  delivery-note-text">选择车辆</div>
                </div>
                <!--&lt;!&ndash;过滤数据&ndash;&gt;
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
                </div>
                 生成付运单-->
                <div class=" w-h-div delivery-note delivery-right" @click="save">
                    <div class="tab-btn  delivery-note-text">生成付运单</div>
                </div>
            </div>

            <div class="veh-warehousing-header new-warehousing-header clearfix">
                <div class="new-wareHeader-text">
                    <template>
                        <ul class="nWh-ul">
                            <li class="nWh-ul-list">
                                <span class="nWh-list-text">车牌：</span>
                                <span>{{form.licencePlate}}</span>
                            </li>
                            <li class="nWh-ul-list">
                                <span class="nWh-list-text">司机：</span>
                                <span>{{form.driver}}</span>
                            </li>
                            <li class="nWh-ul-list">
                                <span class="nWh-list-text">联系电话：</span>
                                <span>{{form.phone}}</span>
                            </li>
                            <li class="nWh-ul-list">
                                <span class="nWh-list-text">车辆类型：</span>
                                <span>{{form.carType}}</span>
                            </li>
                            <li class="nWh-ul-list">
                                <span class="nWh-list-text">备注：</span>
                                <span>{{form.remarks}}</span>
                            </li>
                        </ul>
                    </template>

                </div>
            </div>
        </div>

        <div class="new-form top10">
            <div class="new-tab">
                <el-table
                    :data="tabpick"
                    height="500"
                    :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center',fontSize:'14px'}"
                    :row-style="{height:'50px',fontSize:'16px'}"
                    style="width: 100%;"
                    align="center"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    ></el-table-column>

                    <template v-for="(val,index) in  tabHead">
                        <el-table-column
                            :prop="val.prop"
                            :label="val.label"
                            align="center">
                        </el-table-column>
                    </template>
                </el-table>
            </div>
        </div>
        <el-dialog title="选择车辆" :visible.sync="checkedIn" class="tab-file">
            <div class="tab-set" style="margin-top: 5%;">
                <div class="file-box">
                    <div class="car-file">
                        <el-table
                            :data="checkedlist"
                            height="500"
                            :row-style="{height:'50px',fontSize:'16px'}"
                            style="width: 100%;"
                            align="center"
                            :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center',fontSize:'14px'}"
                        >
                            <el-table-column
                            width="50"
                            align="center"
                            label="选择">
                                <template slot-scope="scope">
                                    <el-radio v-model="radio" :label="scope.$index" @change="changeradio"></el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="50"
                                label="编号"
                                prop="id"
                                align="center">
                            </el-table-column>
                            <template v-for="(val,index) in  checkedHead">
                                <el-table-column
                                    :prop="val.prop"
                                    :label="val.label"
                                    align="center"
                                    v-if="val.prop !== 'operation'">
                                </el-table-column>
                            </template>
                        </el-table>
                    </div>
                    <div class="check-btn top20">
                        <span class="tab-btn special-btn2 outline textAlign" @click="outing">取消</span>
                        <span class="tab-btn special-btn2 outline textAlign special-btn3" @click="saveit">保存</span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "pay-form",
        data() {
            return {
                checkedIn: false,
                value1: '',
                value2: '',
                form: {},
                formIndex: {},
                tabpick: [],
                tabHead: [
                    {
                        prop: "outboundApplyNo",
                        label: "申请单号"
                    },
                    {
                        prop: "type",
                        label: "出货类型"
                    },
                    {
                        prop: "quantity",
                        label: "条数"
                    },
                    {
                        prop: "clientName",
                        label: "客户"
                    },
                    {
                        prop: "destination",
                        label: "送货地址"
                    },
                    {
                        prop: "createBy",
                        label: "业务员"
                    },
                    {
                        prop: "remark",
                        label: "备注"
                    }
                ],
                checkedlist: [],
                checkedHead: [
                    {
                        prop: "carType",
                        label: "车型"
                    },
                    {
                        prop: "licencePlate",
                        label: "车牌"
                    },
                    {
                        prop: "driver",
                        label: "司机"
                    },
                    {
                        prop: "phone",
                        label: "电话"
                    }
                ],
                checkthat: [],
                radio: [],
                carid:{},
                transportlist:[],
            }
        },
        props: ['show'],
        created() {
            this.getOutboundApplys();
        },
        watch:{
            checkedIn(){
               if(!this.checkedIn) {
                   this.radio = [];
               }
            }
        },
        methods: {
            //返回上一页
            go() {
                this.$emit('changeshow')
            },
            open() {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            open1(data) {
                    this.$alert(data, '付运单号', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'success',
                                message: `生成成功`
                            });
                            this.go();
                        }
                    });


            },

            /**
             * 查找所有车辆信息
             * /api/vehiclemanager/vehicleinfo
             * @param callback 数据回调
             * @code 新增成功返回true,否则返回false
             */
            getVehicleInfos() {
                this.checkedIn = true;
                this.$axios({
                    method: "get",
                    url: "/api/vehiclemanager/vehicleinfo/all",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {

                    this.checkedlist = [];
                   let content = res.data;
                    this.filetime(content);
                    for(var index=0;index<content.length;index++){
                        if(content[index].carStatus ==0) {
                            this.checkedlist.push(content[index])
                        }
                    }

                }).catch(error => {
                    console.log(error)
                });
            },

            /**
             * 查找出库申请列表
             * /api/outbound/apply
             */
            getOutboundApplys() {
                this.$axios({
                    method: "get",
                    url: "/api/outbound/apply/all",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                    this.tabpick = [];
                    let result = res.data;
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        let quantity = 0;
                        for (let j = 0; j < item.clothOutboundApplyDetlList.length; j++) {
                            let clothOutboundApplyDet = item.clothOutboundApplyDetlList[j];
                            if (clothOutboundApplyDet) {
                                quantity += clothOutboundApplyDet.quantity;
                            }
                        }
                        item.quantity = quantity;
                        this.tabpick.push(item);
                    }
                }).catch(error => {
                    console.log(error)
                });

            },

            //获取数据过滤时间格式
            filetime(res) {
                //过滤时间格式yyyy-MM-dd
                for (let i = 0; i < res.length; i++) {
                    let creatDate = res[i].createDate;
                    let lastModifyDate = res[i].lastModifyDate;
                    let creat = new Date(creatDate);
                    let last = new Date(lastModifyDate);
                    let createtimes = creat.getFullYear() + '-' + this.add(creat.getMonth() + 1) + '-' + this.add(creat.getDate()) + ' ' + this.add(creat.getHours()) + ':' + this.add(creat.getMinutes()) + ':' + this.add(creat.getSeconds());
                    let lasttimes = last.getFullYear() + '-' + this.add(last.getMonth() + 1) + '-' + this.add(last.getDate()) + ' ' + this.add(last.getHours()) + ':' + this.add(last.getMinutes()) + ':' + this.add(last.getSeconds());
                    res[i].createDate = createtimes;
                    res[i].lastModifyDate = lasttimes;
                }
            },
            add(m) {
                return m < 10 ? "0" + m : m;
            },

            changeradio(radio) {
                this.formIndex = this.checkedlist[radio];
            },
            saveit() {
                this.form = this.formIndex;
                this.carid.id=this.form.id;
                this.checkedIn= false;
            },
            outing() {
                this.checkedIn= false;
                this.radio = [];
            },

            handleSelectionChange(val){
                    this.transportlist = [];
               for(var i=0;i<val.length;i++) {
                   var carlist = {id:''};
                   carlist.id = val[i].id;
                   this.transportlist.push(carlist);

               }
            },
            save(){
                let _param = JSON.stringify({"remark":this.form.remark,"vehicleInfo":this.carid,"clothOutboundApplies":this.transportlist});
                if(this.carid.id != undefined && this.transportlist.length >0) {
                    this.$axios({
                        method: "post",
                        data: _param,
                        url: "/api/vehiclemanager/transportlist",
                        headers: {"Content-Type": "application/json"}
                    }).then(res => {
                        this.open1(res.data.transportNo);
                    }).catch(error => {
                        console.log(error)
                    });
                } else if(this.carid.id == undefined && this.transportlist.length ==0){
                    this.$message({
                        message: '请选择车辆信息',
                        type: 'warning'
                    });
                    return;
                } else if(this.carid.id != undefined && this.transportlist.length <=0) {
                    this.$message({
                        message: '请选择出库单号',
                        type: 'warning'
                    });
                    return;
                }
            },

        },

    }
</script>

<style scoped>

</style>

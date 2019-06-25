<template>
    <div class="OutgoingManagement" v-cloak>
        <div class="container">
            <div class="tab-out">
                <template v-if="">
                    <div class="warehousing-header">
                        <!--过滤数据-->
                        <div class="w-h-div filtering-data" @click="tableFile = true">
                            <span class="filtering-data-icon"></span>
                            <span class="filtering-data-text">过滤数据</span>
                        </div>
                        <!--时间-->
                        <div class="w-h-div bill-date">
                            <div class="block">
                                <span class="demonstration">出库日期:</span>
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
                        <!--search-->
                        <div class="w-h-div header-search">
                            <div class="box-header-search" @click="getTime">
                                <span class="header-search-icon"></span>
                                <span class="header-search-text">查询</span>
                            </div>
                        </div>
                    </div>

                    <div class="w-table">
                        <el-table
                            :data="tableData2"
                            style="width: 100%;text-align: center;cursor: pointer;"
                            :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                            @row-dblclick="handdle"
                            @row-click="handleclass"
                            height="560px"
                            :row-style="{height:'50px',fontSize:'16px'}"
                            :row-class-name="getClass"
                            row-key="index"
                        >
                            <template v-for="(val,index) in tabHeader">
                                <el-table-column
                                    :prop="tabCol[index].prop"
                                    :label="val.label"
                                    :key="index"
                                    width="100"
                                    v-if="val.prop == 'No'">
                                </el-table-column>
                                <el-table-column
                                    :prop="tabCol[index].prop"
                                    :label="val.label"
                                    :key="index"
                                    width="180"
                                    v-if="val.prop != 'No'">
                                </el-table-column>
                            </template>
                        </el-table>
                    </div>

                    <!--分页-->
                    <div class="block">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="10"
                            layout="prev, pager, next, jumper"
                            :total="totalElements"
                            v-if="paginationShow">
                        </el-pagination>
                    </div>
                </template>
            </div>
            <el-dialog title="过滤数据" :visible.sync="tableFile" class="tab-file">
                <div class="tab-set">
                    <div class="box-form-text">请在下表中输入过滤条件，按<过滤>按钮进行过滤数据</div>
                    <div class="file-box">
                        <template>
                            <el-table
                                :data="tabfile"
                                height="400"
                                border
                                style="width: 100%;margin: 0 auto;"
                                align="center"
                            >
                                <el-table-column
                                    width='50'
                                    align="center">
                                    <template slot-scope="scope">
                                        <div>#</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="列名"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.listName" placeholder="" size="mini">
                                            <el-option
                                                v-for="item in childList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="compare"
                                    label="比较符号"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.compare" placeholder="请选择" size="mini">
                                            <el-option
                                                v-for="item in compareList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="value"
                                    label="数值"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.value"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="CaseSensitive"
                                    label="区分大小写"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="tabfile[scope.$index].CaseSensitive"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="way"
                                    label="方式"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.way" placeholder="请选择" size="mini">
                                            <el-option
                                                v-for="item in wayList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <div class="wm-table-footer">
                        <div class="wm-footer-box">
                            <el-button type="primary" @click="Addition">增加条件</el-button>
                            <el-button @click="Deleting">删除条件</el-button>
                        </div>
                    </div>
                    <div class="wm-table-last">
                        <div class="wm-last-box2">
                            <el-row>
                                <div class="sub-title">管理默认过滤条件：</div>
                                <el-col :span="6">
                                    <el-input placeholder="预设条件：<新增>"></el-input>
                                </el-col>
                                <el-col :span="5" style="text-align:right">
                                    <el-button>保存</el-button>
                                    <el-button type="danger">删除</el-button>
                                </el-col>
                                <el-col :span="13">
                                    <span class="tab-btn special-btn2 wm-special-position outline textAlign" @click="filterData">过滤</span>
                                    <span class="tab-btn special-btn2 wm-special-position2 outline textAlign" @click="tableFile = false">关闭</span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <el-dialog :visible.sync="Detailed" class="apply-Det">
                <div class="tab-set">
                    <div class="Det-header">
                        <el-row>
                            <el-col :span="8"><h5>出库单明细</h5></el-col>
                            <el-col :span="6">
                                <div class="Warehousing-num"><span>出库单号:</span>{{form.no}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="Det-body">
                        <div class="apply-form">
                            <el-form ref="form" :model="form" label-width="100px" class="form-contant">
                                <el-row class="bottom10 apply-one">
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="出库单号 :">
                                            <el-input v-model="form.no"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="出库类型 :">
                                            <el-input v-model="form.type"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="客户名称 :">
                                            <el-input v-model="form.clientName"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="4" class="left10">
                                        <el-form-item label="备注 :">
                                            <el-input v-model="form.remark"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="bottom10 apply-two">
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="申请人:">
                                            <el-input v-model="form.createBy"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10 Out-left10">
                                        <el-form-item label="申请日期 :">
                                            <el-input v-model="form.createDate"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="修改人 :">
                                            <el-input v-model="form.lastModifyBy"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10 Out-left10">
                                        <el-form-item label="修改日期 :">
                                            <el-input v-model="form.lastModifyDate"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="bottom10 apply-three">

                                    <el-col :span="14" class="left10">
                                        <el-form-item label="调入公司 :">
                                            <el-input v-model="form.destination"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                            </el-form>
                        </div>

                        <div class="Det-tab Outgoing-Det-tab2">
                            <template>
                                <!--- # -->
                                <el-table  class="Outgoing-template"
                                           :data="tableDet"
                                           height="370"
                                           @row-dblclick="detatehand"
                                           :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                                           align="center">
                                    <template v-for="(val,index) in tableData4">
                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            width="80"
                                            v-if="val.prop === 'id'">
                                        </el-table-column>

                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            v-if="val.prop !== 'id' &&val.prop !== 'operation'">
                                        </el-table-column>

                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            v-if="val.prop === 'operation'">
                                            <template slot-scope="scope">
                                                <div class="wm-tableIcon-td">
                                                    <i class="icon-del" style="cursor:pointer" @click="tabdel(scope.$index)"></i>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </template>
                                </el-table>
                                <el-button class="loading-place" type="primary" :loading="false" @click="detatehand()">显示全部</el-button>
                            </template>

                        </div>

                        <div class="Det-tab Outgoing-Det-tab">
                            <template>
                                <el-table
                                    :data="tableDet2"
                                    height="370"
                                    :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                                    align="center">
                                    <template v-for="(val,index) in tableData5">
                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            width="80"
                                            v-if="val.prop === 'id'">
                                        </el-table-column>
                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            v-if="val.prop !== 'id' &&val.prop !== 'operation'">
                                        </el-table-column>
                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            v-if="val.prop === 'operation'">
                                            <template slot-scope="scope">
                                                <div class="wm-tableIcon-td">
                                                    <i class="icon-modify" style="cursor:pointer" @click="edit(scope.$index)"></i>
                                                    <i class="icon-del" style="cursor:pointer" @click="tabdel(scope.$index)"></i>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </template>
                                </el-table>
                            </template>
                        </div>

                        <div class="Det-btn">
                            <span class="tab-btn special-btn2 outline textAlign" @click="Detailed = false">关闭</span>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Sortable from 'sortablejs'
    import {filetime,add} from '~@/../../static/js/index.js'
    export default {
        name: "",
        data(){
            return {
                Detailed:false,
                value1: '',
                value2: '',
                value3: '',
                form:{},
                form1:{},
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                checktime:0,//0 主表 1 过滤时间 2 过滤数据
                tabHeader:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"no",
                        label:"出库单号"
                    },
                    {
                        prop:'destination',
                        label:"调入公司"
                    },{
                        prop:"type",
                        label:"出库类型"
                    },{
                        prop:"clientName",
                        label:"客户名称"
                    },{
                        prop:"remark",
                        label:"备注"
                    },{
                        prop:"createDate",
                        label:"申请日期"
                    },{
                        prop:"createBy",
                        label:"申请人"
                    },{
                        prop:"lastModifyDate",
                        label:"修改日期"
                    },{
                        prop:"lastModifyBy",
                        label:"修改人"
                    }],
                tabCol:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"no",
                        label:"出库单号"
                    },
                    {
                        prop:'destination',
                        label:"调入公司"
                    },{
                        prop:"type",
                        label:"出库类型"
                    },{
                        prop:"clientName",
                        label:"客户名称"
                    },{
                        prop:"remark",
                        label:"备注"
                    },{
                        prop:"createDate",
                        label:"申请日期"
                    },{
                        prop:"createBy",
                        label:"申请人"
                    },{
                        prop:"lastModifyDate",
                        label:"修改日期"
                    },{
                        prop:"lastModifyBy",
                        label:"修改人"
                    }],
                tableData2: [],
                tableDet:[],
                tableDet2:[],
                tableD4 : [],
                tableData4: [
                    {
                        prop:"clothNo",
                        label:"布号"
                    },
                    {
                        prop:"clothName",
                        label:"布种名称"
                    },
                    {
                        prop:"colorName",
                        label:"布匹颜色"
                    },
                    {
                        prop:"colorNo",
                        label:"布匹色号"
                    },
                    {
                        prop:"vatDye",
                        label:"布匹缸号"
                    },
                    {
                        prop:"quantity",
                        label:"申请布匹条数"
                    }
                ],
                tableData5:[
                    {
                        prop:"clothStock.epc",
                        label:"EPC码"
                    },
                    {
                        prop:"clothStock.vatDye",
                        label:"缸号"
                    },
                    {
                        prop:"clothStock.clothNo",
                        label:"布号"
                    },
                    {
                        prop:"clothStock.clothName",
                        label:"布匹名称"
                    },
                    {
                        prop:"clothStock.colorName",
                        label:"颜色"
                    },
                    {
                        prop:"clothStock.colorNo",
                        label:"色号"
                    },
                    {
                        prop:"clothStock.ticketNo",
                        label:"布票号"
                    },
                    {
                        prop:"clothStock.poNO",
                        label:"PO号"
                    },
                    {
                        prop:"clothStock.weight",
                        label:"重量"
                    },
                    {
                        prop:"clothStock.dyeingColor",
                        label:"染厂色号"
                    }
                ],
                //数据过滤
                compareList:[
                    {
                        value:"==",
                        label:"等于"
                    },
                    {
                        value:"<",
                        label:"小于"
                    },
                    {
                        value:"<=",
                        label:"小于等于"
                    },
                    {
                        value:"like",
                        label:"包含"
                    },
                    {
                        value:">",
                        label:"大于"
                    },
                    {
                        value:">=",
                        label:"大于等于"
                    }
                ],
                childList:[
                    {
                        value:"No",
                        label:"编号"
                    },
                    {
                        value:"no",
                        label:"出库单号"
                    },
                    {
                        value:'destination',
                        label:"调入公司"
                    },{
                        value:"type",
                        label:"出库类型"
                    },{
                        value:"clientName",
                        label:"客户名称"
                    },{
                        value:"remark",
                        label:"备注"
                    },{
                        value:"createDate",
                        label:"申请日期"
                    },{
                        value:"createBy",
                        label:"申请人"
                    },{
                        value:"lastModifyDate",
                        label:"修改日期"
                    },{
                        value:"lastModifyBy",
                        label:"修改人"
                    }
                    ],
                wayList:[
                    {
                        value:"||",
                        label:"或者"
                    },
                    {
                        value:"&&",
                        label:"并且"
                    }
                ],
                tabfile:[
                    {
                        listName:"",
                        compare:"==",
                        value:"",
                        CaseSensitive:false,
                        way:"||"

                    },
                    {
                        listName:"",
                        compare:"==",
                        value:"",
                        CaseSensitive:false,
                        way:"||"

                    },
                    {
                        listName:"",
                        compare:"==",
                        value:"",
                        CaseSensitive:false,
                        way:"||"

                    },
                    {
                        listName:"",
                        compare:"==",
                        value:"",
                        CaseSensitive:false,
                        way:"||"

                    },
                    {
                        listName:"",
                        compare:"<=",
                        value:"",
                        CaseSensitive:false,
                        way:"||"

                    },
                    {
                        listName:"",
                        compare:"<=",
                        value:"",
                        CaseSensitive:false,
                        way:"||"

                    },
                    {
                        listName:"",
                        compare:"<=",
                        value:"",
                        CaseSensitive:false,
                        way:"||"

                    }
                ],
                tableFile:false,
                currentPage: 1,
                paginationShow:true,
                totalElements:0,
                num:0,

            }
        },
        created(){
            //自动获取数据
            this.getOutbounds();
        },
        mounted(){
            this.columnDrop();
        },
        watch:{
            //监听过滤数据，初始化
            tableFile(){
                if(this.tableFile) {
                    for(var i=0;i<this.tabfile.length;i++){
                        this.tabfile[i].listName = '';
                        this.tabfile[i].value = '';
                        this.tabfile[i].CaseSensitive = false;
                    }
                }
            },
            //监听设置表头配置，初始化
            tableHeader(){
                if(!this.tableHeader){
                    this.rownum = '';
                }
            },
            Detailed(){
                if(this.Detailed){
                    this.detatehand();
                }
            }
        },
        methods: {
            handleclass(row){
                this.idx = row.index;
            },
            handdle(row, event, column) {
                //点击某一行显示信息
                this.idx = row.index;
                let id = this.tableData2[this.idx].id;
                this.num = this.tableData2[this.idx].clothOutboundDetlList[0].clothOutboundApplyDetl.id;
                this.Detailed = true;

                this.$axios({
                    method: "get",
                    url: "/api/outbound/" + id,
                    headers: {"Content-Type": "application/json"}
                }).then((res)=>{
                        this.tableDet = [];
                        this.$axios({
                            method: "get",
                            url: "/api/outbound/detls/apply/"+res.data.no,
                            headers: {"Content-Type": "application/json"}
                        }).then(res=>{
                            this.tableDet = res.data;
                        }).catch(err=>{
                            console.log(err);
                        });
                        res.data.createDate=filetime(new Date(res.data.createDate));
                        res.data.lastModifyDate=filetime(new Date(res.data.lastModifyDate));
                        this.form = res.data;
                    })
                    .catch((err) =>{console.log(err)});

            },
            detatehand(row) {

            var data
             if(!row) {

                 data = "/api/outbound/detls/"+ this.tableData2[this.idx].no+"/"+ this.num;
             } else {
                 data = "/api/outbound/detls/"+ this.tableData2[this.idx].no+"/"+ row.id;
             }
                    this.$axios({
                        method: "get",
                        url:data,
                        headers: {"Content-Type": "application/json"}
                    }).then(res=>{
                        this.tableDet2 = res.data;
//                        console.log(this.tableDet2);
                    }).catch(err=>{});
            },
            getClass({row,rowIndex}){
                //添加类名
                row.index = rowIndex
                if(rowIndex == this.idx) {
                    return 'active';
                } else if(this.tableData2[rowIndex].isApprove){
                    return 'green';
                } else{
                    return 'gary';
                }

            },
            filetime(res){
                //过滤时间格式yyyy-MM-dd
                for(let i=0;i <res.length;i++){
                    let item  = res[i];
                    item.No = i+1;
                    item.createDate = filetime(new Date(res[i].createDate));
                    item.lastModifyDate = filetime(new Date(res[i].lastModifyDate));
                }
            },
            //控制表头显示隐藏按钮
            change(idx) {
                //按钮效果
                var slideThree = document.getElementsByClassName("slideThree");

                //idx-1统一下标
            },
            seeprint(){
                this.printing = true;
                this.tabprint = this.tableDet;
            },
            DetSave(){
                //保存明细
                let cloth = this.form;
                //修改页面数据
                this.tableData2[this.idx] = cloth;
                //请求修改数据
                this.$axios({
                    method:"put",
                    url:"/api/outbound/apply/"+ cloth.id,
                    data:cloth,
                    headers:{"Content-Type":"application/json"}
                }).then(res => {
                    this.Detailed = false;
                })
            },
            //初始化过滤格式
            Addition(){
                let condition={
                    listName:"",
                    compare:"==",
                    value:"",
                    CaseSensitive:false,
                    way:"||"
                }
                this.tabfile.push(condition);
            },
            Deleting(){
                if(this.tabfile.length < 1){
                    return;
                } else {
                    this.tabfile.pop()
                }
            },
            filterData(){
                this.value1 = '';
                this.value2 ='';
                let str = this.filejson();
                str = JSON.stringify(str);

                if(str.length >2){
                    this.paginationShow = false;
                    this.currentPage = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    })
                    this.checktime = 2;
                    this.$axios({
                        method:"post",
                        url:"/api/outbound/find",
                        data:str,
                        headers:{"Content-Type":"application/json"}
                    })
                        .then((res)=>{
                            //过滤条件格式
                            this.tableData2 = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tableData2 = result
                            this.totalElements = res.data.totalElements;
                        })
                        .catch((err) =>{console.log(err)});
                };
            },
            filejson(){
                let data = {};
                for(var i=0;i<this.tabfile.length;i++){
                    if(this.tabfile[i].listName){
                        let listName = this.tabfile[i].listName;
                        let comparison = this.tabfile[i].compare;
                        let value = this.tabfile[i].value;
                        let way = this.tabfile[i].way;
                        data[listName] = [{"comparison":comparison,"link":way,"value":value}];
                    }
                }
                return data
            },
            //过滤时间
            getTime(){

                var createDate = {
                    "createDate": [{
                        "comparison": ">=",
                        "link": "&&",
                        "value": this.value1
                    }, {"comparison": "<=", "link": "&&", "value": this.value2}]
                }
                if(!/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/.test(this.value1) || !/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/.test(this.value2)){
                    return ;


                } else {
                    this.paginationShow = false;
                    this.currentPage = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    })
                    this.checktime = 1;
                    this.$axios({
                        method: "post",
                        url: "/api/outbound/find",
                        data: createDate,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            //过滤时间格式
                            this.tableData2 = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tableData2 = result;
                            this.totalElements = res.data.totalElements;
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },
            /**
             * 查找出库表
             * /api/outbound
             */
            getOutbounds() {
                this.$axios({
                    method: "get",
                    url: "/api/outbound",
                    headers: {"Content-Type": "application/json"}
                }).
                    then((res)=>{
                        this.totalElements =  res.data.totalElements;
                        let result = res.data.content;
                        this.filetime(result);
                        this.tableData2 = result;

                })
                    .catch((err) =>{
                        this.show = false
                    });
            },

            /**
             * 查找一个出库表
             * /api/outbound/{id}
             */
            handleCurrentChange(val) {
//                console.log(`当前页: ${val}`);
                this.currentPage = val
                let count = val-1;
                var createDate = {
                    "createDate": [{
                        "comparison": ">=",
                        "link": "&&",
                        "value": this.value1
                    }, {"comparison": "<=", "link": "&&", "value": this.value2}]
                }
                if(this.checktime == 0) {
                    //主表数据分页
                    this.$axios({
                        method: "get",
                        url: "/api/outbound/?page=" + count,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            this.idx = -1;
                            this.tableData2 = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tableData2 = result
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                } else if(this.checktime == 1) {
                    //时间过滤后的数据分页
                    this.loading = true;
                    this.$axios({
                        method: "post",
                        url: "/api/outbound/find?page=" +count,
                        data:createDate,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            this.idx = -1;
                            this.tableData2 = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tableData2 = result
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                } else if(this.checktime == 2) {
                    //过滤数据
                    let str = this.filejson();
                    str = JSON.stringify(str);
                    this.$axios({
                        method: "post",
                        url: "/api/outbound/find?page=" +count,
                        data:str,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            this.idx = -1;
                            this.tableData2 = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tableData2 = result
                        })
                        .catch((err) => {
                            console.log(err)
                        });

                }
            },
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

        }
    }
</script>

<style scoped>
    .OutgoingManagement .container{
        margin-left: 5px;
        max-width: 1730px;
        min-width: 1250px;
    }
    .Outgoing-Det-tab {
        width: 54%;
        display: inline-block;
    }
    .Outgoing-Det-tab2 {
        width: 45%;
        display: inline-block;
    }
    .apply-form .el-col-4 {
        width: 20%;
    }
    .Out-left10 {
        width: 20%;
    }
    .Outgoing-template {
        height: 349px!important;
    }
    .loading-place {
        margin-left: 86%;
    }
</style>

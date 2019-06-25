<template>
    <div class="Inventory" v-cloak>
        <div class="container">
            <div class="tab-Inventory">
                <template v-if="show">
                    <div class="warehousing-header">
                        <!--过滤数据-->
                        <div class="w-h-div filtering-data" @click="tableFile = true">
                            <span class="filtering-data-icon"></span>
                            <span class="filtering-data-text">过滤数据</span>
                        </div>
                        <!--时间-->
                        <div class="w-h-div bill-date">
                            <div class="block">
                                <span class="demonstration">盘点日期:</span>
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
                        <div class="w-h-div header-search" @click="getTime">
                            <div class="box-header-search">
                                <span class="header-search-icon"></span>
                                <span class="header-search-text">查询</span>
                            </div>
                        </div>
                    </div>
                    <el-table
                        :data="tabData"
                        style="width: 100%;text-align: center;cursor: pointer;"
                        :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                        @row-dblclick="handdle"
                        @row-click="handleclass"
                        height="545px"
                        :row-style="{height:'50px',fontSize:'16px'}"
                        :row-class-name="getClass"
                    >
                        <template v-for="(val,index) in tabHeader">
                            <el-table-column v-if="val.prop == 'No'"
                            :prop="tabCol[index].prop"
                            :label="val.label"
                            width="100">
                            </el-table-column>
                            <el-table-column
                                v-if="val.prop != 'No'"
                                :prop="tabCol[index].prop"
                                :label="val.label"
                                :key="index"
                            >
                            </el-table-column>
                        </template>
                    </el-table>
                    <div class="block">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage4"
                            :page-size="10"
                            layout="total ,prev, pager, next, jumper"
                            :total=totalElements
                            v-if="paginationShow">
                        </el-pagination>
                    </div>
                </template>
                <template v-else>
                    <Details :tabData='tabData' :id="id" @changeshow="changeshow"></Details>
                </template>
            </div>
          <!--  <el-dialog title="表格列配置" :visible.sync="tableHeader" class="tab-list">
                <div class="tab-set">
                    <template>
                        <el-table
                            :data="tableData3"
                            height="345"
                            border
                            style="width: 80%;margin-left:6%; margin-top: 10%;"
                            @row-click='Movego'
                            :row-class-name="rowClass"
                        >
                            <el-table-column
                                width='50'
                                align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+1}}
                                </template>
                            </el-table-column>
                            <template v-for="(val,index) in tabrow">
                                <template v-if="val.prop !== 'display'">
                                    <el-table-column
                                        :prop="val.prop"
                                        :label="val.label"
                                        align="center">
                                    </el-table-column>
                                </template>
                                <template v-if="val.prop === 'display'">
                                    <el-table-column
                                        :prop="val.prop"
                                        :label="val.label"
                                        align="center">
                                        <template slot-scope="scope">
                                            <div class="slideThree" id="slideThreebox" :class="tableData3[scope.$index].display ? '' : 'active'">
                                                <input type="checkbox" :name="'forname' + index"  v-model="tableData3[scope.$index].display">
                                                <label :for="'forname' + index" id="slideThreeLabel" @click="change(scope.$index+1)"></label>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </template>
                            </template>
                        </el-table>
                    </template>
                    <div class="wm-tableBox-right">
                        <button class="tab-right tableBox-right-one outline textAlign" @click="Moveup" :disabled="rownum === 1  " ></button>
                        <button class="tab-right tableBox-right-two outline textAlign" @click="Movedown" :disabled="rownum === tabHeader.length "></button>
                    </div>
                    <div class="wm-table-last2 wm-special-position3">
                        <a href="javascript:;" class="tab-btn special-btn2 outline textAlign" @click="Setting">恢复默认设置</a>
                        <a href="javascript:;" class="tab-btn special-btn2 outline textAlign" @click="finish">完成</a>
                    </div>
                </div>
            </el-dialog>-->
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
                                    <span class="tab-btn special-btn2 wm-special-position2 outline textAlign" @click="tableFile = false">取消</span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Details from "./Details"
    import Sortable from 'sortablejs'
    import {filetime,add} from '~@/../../static/js/index.js'
    export default {
        name: "",
        components:{Details},
        data(){
            return  {
                //传递ID
                id:0,
                //移动的位置
                move:4,
                show:true,
                tableFile:false,
                paginationShow : true,
                checktime:0,//0 主表 1 过滤时间 2 过滤数据
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
                value1: '',
                value2: '',
                idx:-1,
                num:-1,
                rownum:'',
                del:0,
                //分页
                currentPage4: 1,
                totalElements:0,
//                total:0,
                //主表表头
                tabHeader:[
                    {
                        prop:"No",
                        label:"编码"
                    },
                    {
                        prop:'code',
                        label:"盘点单号"
                    },{
                        prop:"num",
                        label:"账面库存量"
                    },{
                        prop:"realNum",
                        label:"实际库存量"
                    },{
                        prop:'status',
                        label:"盘点状态"
                    },{
                        prop:"createBy",
                        label:"操作人"
                    },{
                        prop:"remark",
                        label:"备注信息"
                    }, {
                        prop:"createDate",
                        label:"盘点时间"
                    }],
                tabCol:[
                    {
                        prop:"No",
                        label:"编码"
                    },
                    {
                        prop:'code',
                        label:"盘点单号"
                    },{
                        prop:"num",
                        label:"账面库存量"
                    },{
                        prop:"realNum",
                        label:"实际库存量"
                    },{
                        prop:'status',
                        label:"盘点状态"
                    },{
                        prop:"createBy",
                        label:"操作人"
                    },{
                        prop:"remark",
                        label:"备注信息"
                    }, {
                        prop:"createDate",
                        label:"盘点时间"
                    }],
                tabData:[],
                //数据过滤
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
                childList:[
                    {
                        value:'code',
                        label:"盘点单号"
                    },{
                        value:"num",
                        label:"账面库存量"
                    },{
                        value:"realNum",
                        label:"实际库存量"
                    },{
                        value:'status',
                        label:"盘点状态"
                    },{
                        value:"remark",
                        label:"备注信息"
                    },{
                        value:"createBy",
                        label:"操作人"
                    },{
                        value:"createDate",
                        label:"盘点时间"
                    }
                ],
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
                //盘点详情
                tableDet:[],
                user:"admin",
                pass:"admin",
                topic:"event/inventory",
                client:new Messaging.Client("192.168.1.16",61614,"example-"+(Math.floor(Math.random() * 100000)))
            }
        },
        created(){
            this.getinventory();
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
            }
        },
        methods:{
            //表头自定义
            //table点击传参
            handleclass(row){
                this.idx = row.index;
            },
            handdle(row) {
                this.show = false;
                //点击某一行显示信息
                this.idx = row.index;
                let id = this.tabData[this.idx].code;
                this.id = id;
                let data = {"no":[{"comparison":"==","link":"&&","value":id}]};
                this.Detailed = true;
                this.$axios({
                    method:"post",
                    url:"/api/inventory/history/detail/find",
                    data:data,
                    headers:{"Content-Type":"application/json"}
                })
                    .then((res)=>{
//                        this.total = res.data.totalElements
                        //初始化明细列表
                        this.tableDet = [];
                        let result = res.data.content;
                        this.filetime(result);
                        this.tabData =result;
                    })
                    .catch((err) =>{console.log(err)});

            },
            handlechange(row) {
                this.num = row.index;
            },
            //改变样式
            change(idx) {
                //按钮效果
                var slideThree = document.getElementsByClassName("slideThree");

                //idx-1统一下标
                this.tableData3[idx - 1].display = !this.tableData3[idx - 1].display;
                if (this.tableData3[idx - 1].display == true) {
                    slideThree[idx - 1].style.backgroundColor = '#0078ff';
                } else {
                    slideThree[idx - 1].style.backgroundColor = '#ff365c';
                }
            },
            //获取每一行下下表
            Movego(row,event,column){
                //获取每一行的下标
                return this.rownum = row.index;
            },
            rowClass({row,rowIndex}){
                if(this.rownum == ''){
                    return ;
                } else if(rowIndex+1 == this.rownum){
                    return "change";
                }

            },
            getClass({row,rowIndex}){
                row.index = rowIndex;
                //添加类名
                if(rowIndex == this.idx) {
                    return 'active';
                }else if(this.tabData[rowIndex].status == '盘盈'){
                    return 'blue';
                }else if(this.tabData[rowIndex].status == '盘亏'){
                    return 'red';
                }
            },
            cellclass({row,column,rowIndex,columnIndex}){
                //拖动更改columnIndex位置
                for(var i = 0;i<this.tabHeader.length;i++) {
                    if(this.tabHeader[i].prop == 'status'){
                        this.move = i+1;
                    }
                }
                if(columnIndex === this.move){
                    if(this.tabData[rowIndex].status == '盘盈'){
                        return 'blue';
                    } else if(this.tabData[rowIndex].status == '盘亏'){
                        return 'red';
                    } else {
                        return'';
                    }
                }
            },
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
                    this.tabfile.pop();
                }
            },
            filejson(){
                let data = {};
                let value;
                for(var i=0;i<this.tabfile.length;i++){
                    if(this.tabfile[i].listName) {
                        let listName = this.tabfile[i].listName;
                        let comparison = this.tabfile[i].compare;
                        if (this.tabfile[i].listName == 'status') {
                            if (this.tabfile[i].value == '正常') {
                                value = 1;
                            } else if (this.tabfile[i].value == '盘亏') {
                                value = 2;
                            } else if (this.tabfile[i].value == '盘盈') {
                                value = 3;
                            } else {
                                value = 4;
                            }
                        } else {
                            value = this.tabfile[i].value;
                        }
                        let way = this.tabfile[i].way;
                        data[listName] = [{"comparison":comparison,"link":way,"value":value}];
                    }

                }
                return data;
            },
            filterData(){
                this.value1 = '';
                this.value2 ='';
                let str = this.filejson();
                str = JSON.stringify(str);
                if(str.length >2) {
                    this.currentPage4 = 1;
                    this.paginationShow = false;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    })
                    this.checktime = 2;
                    this.$axios({
                        method:"post",
                        url:"/api/inventory/history/find",
                        data:str,
                        headers:{"Content-Type":"application/json"}
                    })
                        .then((res)=>{
                            //过滤条件格式
                            this.tabData = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tabData =result;
                            this.totalElements = res.data.totalElements;
                            this.tableFile = false;
                        })
                        .catch((err) =>{console.log(err)});
                }

            },
            //盘点记录数据过滤
            filterInventory(){
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
                let id = this.tabData[this.idx].code;

                data.no =[{"comparison":"==","link":"&&","value":id}];
                JSON.stringify(data);
                this.$axios({
                    method:"post",
                    url:"/api/inventory/history/detail/find",
                    data:data,
                    headers:{"Content-Type":"application/json"}
                })
                    .then((res)=>{
                        //过滤条件格式
                        this.tableDet = [];
                        let result = res.data.content;
                        this.filetime(result);
                        this.tabData =result;
                    })
                    .catch((err) =>{console.log(err)});
            },
            //获取主表/
            getinventory(){
                this.tabData = [];
                //获取信息
                this.$axios({
                    method:"get",
                    url:"/api/inventory/history",
                    headers:{"Content-Type":"application/json"}
                })
                    .then((res)=>{
                        this.tabData=[];
                        let result = res.data.content;
                        this.filetime(result);
                        this.tabData =result;
                        this.totalElements =  res.data.totalElements;
                    })
                    .catch((err) =>{
                    this.show = false
                    });
            },
            //过滤时间
            getTime(){
                if(!/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/.test(this.value1) || !/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/.test(this.value2)){
                    return ;
                }else {
                    this.paginationShow = false;
                    this.currentPage4 = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    })
                    this.checktime = 1;
                    var createDate = {
                        "createDate": [{
                            "comparison": ">=",
                            "link": "&&",
                            "value": this.value1
                        }, {"comparison": "<=", "link": "&&", "value": this.value2}]
                    }
                    this.$axios({
                        method: "post",
                        url: "/api/inventory/history/find",
                        data: createDate,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            //过滤时间格式
                            this.tabData = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tabData =result;
                            this.totalElements = res.data.totalElements;

                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },
            //时间格式处理
            filetime(res){
                //过滤时间格式
                for(let i=0;i <res.length;i++){
                    res[i].No = i+1;
                    res[i].createDate = filetime(new Date(res[i].createDate));
                    res[i].lastModifyDate = filetime(new Date(res[i].lastModifyDate));
                    if(res[i].status == 1){
                        res[i].status = "正常"
                    } else if(res[i].status == 2){
                        res[i].status = '盘亏'
                    } else if(res[i].status == 3) {
                        res[i].status = '盘盈'
                    } else{
                        res[i].status = '布匹信息一致但EPC码不一致'
                    }
                }

            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                var count = val-1;
                if(this.checktime == 0){
                        this.$axios({
                            method:"get",
                            url:"/api/inventory/history?page=" + count,
                            headers:{"Content-Type":"application/json"}
                        })
                .then((res)=>{
                    this.idx = -1;
                    this.tabData = [];
                    let result = res.data.content;
                    this.filetime(result);
                    this.tabData =result;
                })
                .catch((err) =>{console.log(err)});
        } else if(this.checktime == 1){
            var createDate = {
                "createDate": [{"comparison": ">=", "link": "&&", "value": this.value1},
                    {"comparison": "<=", "link": "&&", "value": this.value2}]
            };
            this.$axios({
                method:"post",
                url:"/api/inventory/history/find?page=" + count,
                data:createDate,
                headers:{"Content-Type":"application/json"}
            })
                .then((res)=>{
                    this.idx = -1;
                    this.tabData = [];
                    let result = res.data.content;
                    this.filetime(result);
                    this.tabData =result;
                })
        } else if(this.checktime == 2){
                    var str = this.filejson();
                    str = JSON.stringify(str)
                    this.$axios({
                        method:"post",
                        url:"/api/inventory/history/find?page=" +count,
                        data:str,
                        headers:{"Content-Type":"application/json"}
                    })
                        .then((res)=>{
                            this.idx = -1;
                            this.tabData = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tabData =result;
                        })
                }



            },
            Setting(){
                var slideThree = document.getElementsByClassName("slideThree");
                for(let i=0;i<this.tableData3.length;i++){
                    this.tableData3[i].display = true;
                    slideThree[i].style.backgroundColor = '#0078ff';
                }
                this.rownum = '';
            },
            finish(){
                this.rownum = '';
                this.tableHeader = false;
            },
            changeshow(){
                this.show = true;
                this.getinventory();
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
            onConnectionLost(responseObject) {
                if (responseObject.errorCode !== 0) {
                    console.log("onConnectionLost:"+responseObject.errorMessage);
                    console.log("连接已断开");
                }
            },
            onMessageArrived(message) {
                this.$notify({
                    message: '有新的数据加入',
                    type: 'success'
                });
                this.getinventory();
            },
            onConnect() {
                this.client.subscribe(this.topic);//订阅主题
            }
        }
    }
</script>

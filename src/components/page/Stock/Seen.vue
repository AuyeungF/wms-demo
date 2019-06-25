<template>
    <div class="out-list" v-cloak>
        <div class="container">
            <div class="tab-out">
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
                                <span class="demonstration">库存日期:</span>
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
                    <el-table
                            :data="tableData2"
                            style="width: 100%;text-align: center;cursor: pointer;"
                            :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                            @row-click="handleclass"
                            height="600px"
                            :row-style="{height:'60px',fontSize:'14px'}"
                            :row-class-name="getClass"
                        >
                        <template v-for="(val,index) in tabHeader">
                            <el-table-column
                                :prop="tabCol[index].prop"
                                :label="val.label"
                                :key="index"
                                v-if="val.prop =='No'"
                            width="100">

                            </el-table-column>
                            <el-table-column
                                :prop="tabCol[index].prop"
                                :label="val.label"
                                :key="index"
                            v-if="val.prop !='No'">
                            </el-table-column>
                        </template>

                        </el-table>
                    <div class="block">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage4"
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
                    <div class="box-form-text">请在下表中输入过滤条件，按
                        <过滤>按钮进行过滤数据
                    </div>
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
                                    <span class="tab-btn special-btn2 wm-special-position outline textAlign"
                                          @click="filterData">过滤</span>
                                    <span class="tab-btn special-btn2 wm-special-position2 outline textAlign"
                                          @click="tableFile = false">关闭</span>
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
    import Sortable from 'sortablejs'
    import {filetime,add} from '~@/../../static/js/index.js'
    export default {
        name: "",
        data() {
            return {
                show: true,
                tableFile: false,
                paginationShow: true,
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
                checktime: 0,//0 主表 1 过滤时间 2 过滤数据
                value1: '',
                value2: '',
                idx: -1,
                rownum: '',
                //分页
                currentPage4: 1,
                totalElements: 0,
                //主表表头
                tabHeader: [
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"epc",
                        label:"EPC"
                    },{
                        prop: "vatDye",
                        label: "缸号"
                    },
                    {
                        prop: "poNO",
                        label: "客户PO"
                    }, {
                        prop: "clothNo",
                        label: "布号"
                    }, {
                        prop: 'clothName',
                        label: "布种名称"
                    }, {
                        prop: 'colorName',
                        label: "颜色"
                    },
                    {
                        prop: 'ticketNo',
                        label: "布匹号"
                    },
                    {
                        prop: 'location',
                        label: "系统货位"
                    },
                    {
                        prop: 'status',
                        label: "状态"
                    },
                    {
                        prop: "remark",
                        label: "备注"
                    },
                    {
                        prop:"lastModifyDate",
                        label:"修改时间"
                    }],
                tabCol: [
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"epc",
                        label:"EPC"
                    },{
                        prop: "vatDye",
                        label: "缸号"
                    },
                    {
                        prop: "poNO",
                        label: "客户PO"
                    }, {
                        prop: "clothNo",
                        label: "布号"
                    }, {
                        prop: 'clothName',
                        label: "布种名称"
                    }, {
                        prop: 'colorName',
                        label: "颜色"
                    },
                    {
                        prop: 'ticketNo',
                        label: "布匹号"
                    },
                    {
                        prop: 'location',
                        label: "系统货位"
                    },
                    {
                        prop: 'status',
                        label: "状态"
                    },
                    {
                        prop: "remark",
                        label: "备注"
                    },
                    {
                        prop:"lastModifyDate",
                        label:"修改时间"
                    }],
                tableData2: [],
                //主表信息
                tableData3: [],
                //数据过滤
                tabfile: [
                    {
                        listName: "",
                        compare: "==",
                        value: "",
                        CaseSensitive: false,
                        way: "||"

                    },
                    {
                        listName: "",
                        compare: "==",
                        value: "",
                        CaseSensitive: false,
                        way: "||"

                    },
                    {
                        listName: "",
                        compare: "==",
                        value: "",
                        CaseSensitive: false,
                        way: "||"

                    },
                    {
                        listName: "",
                        compare: "==",
                        value: "",
                        CaseSensitive: false,
                        way: "||"

                    },
                    {
                        listName: "",
                        compare: "<=",
                        value: "",
                        CaseSensitive: false,
                        way: "||"

                    },
                    {
                        listName: "",
                        compare: "<=",
                        value: "",
                        CaseSensitive: false,
                        way: "||"

                    },
                    {
                        listName: "",
                        compare: "<=",
                        value: "",
                        CaseSensitive: false,
                        way: "||"

                    }
                ],
                childList: [
                    {
                        value: 'id',
                        label: "ID"
                    },
                    {
                        value:"epc",
                        label:"EPC"
                    },{
                        value: "vatDye",
                        label: "缸号"
                    },
                    {
                        value: "poNO",
                        label: "客户PO"
                    }, {
                        value: "clothNo",
                        label: "布号"
                    }, {
                        value: 'clothName',
                        label: "布种名称"
                    }, {
                        value: 'colorName',
                        label: "颜色"
                    },
                    {
                        value: 'ticketNo',
                        label: "布匹号"
                    },
                    {
                        value: 'location',
                        label: "系统货位"
                    },
                    {
                        value: 'status',
                        label: "状态"
                    },
                    {
                        value: "remark",
                        label: "备注"
                    },
                    {
                        value:"lastModifyDate",
                        label:"修改时间"
                    }],
                compareList: [
                    {
                        value: "==",
                        label: "等于"
                    },
                    {
                        value: "<",
                        label: "小于"
                    },
                    {
                        value: "<=",
                        label: "小于等于"
                    },
                    {
                        value: "like",
                        label: "包含"
                    },
                    {
                        value: ">",
                        label: "大于"
                    },
                    {
                        value: ">=",
                        label: "大于等于"
                    }
                ],
                wayList: [
                    {
                        value: "||",
                        label: "或者"
                    },
                    {
                        value: "&&",
                        label: "并且"
                    }
                ],

            }
        },
        created() {
            //自动获取数据
            this.getseen();
        },
        mounted(){
            this.columnDrop();
        },
        watch: {
            //监听过滤数据，初始化
            tableFile() {
                if (this.tableFile) {
                    for (var i = 0; i < this.tabfile.length; i++) {
                        this.tabfile[i].listName = '';
                        this.tabfile[i].value = '';
                        this.tabfile[i].CaseSensitive = false;
                    }
                }
            }
        },
        methods: {
            //表头自定义
            renderHeader(createElement, {column}) {
                return createElement(
                    'div', {
                        'class': ['thead-cell'],
                        on: {
                            mousedown: ($event) => {
                                this.handleMouseDown($event, column)
                            },
//                            mouseup: ($event) => { this.handleMouseUp($event, column) },
                            mousemove: ($event) => {
                                this.handleMouseMove($event, column)
                            }
                        }
                    }, [
                        // 添加 <a> 用于显示表头 label
                        createElement('a', column.label),
                        // 添加一个空标签用于显示拖动动画
                        createElement('span', {
                            'class': ['virtual']
                        })
                    ])
            },
            //table点击传参
            handleclass(row) {
                this.idx = row.index;
            },
            //根据状态添加类名
            getClass({row, rowIndex}){
                //添加类名
                row.index = rowIndex;
                if (rowIndex == this.idx) {
                    return 'active';
                } else if(this.tableData2[rowIndex].status == '盘盈'){
                    return 'blue';
                }else if(this.tableData2[rowIndex].status == '盘亏'){
                    return 'red';
                }

            },
            //获取每一行的下标
            Movego(row, event, column) {
                return this.rownum = row.index;
            },
            rowClass({row, rowIndex}) {
                if (this.rownum == '') {
                    return;
                } else if (rowIndex + 1 == this.rownum) {
                    return "change"
                }

            },
            //数据过滤设置
            Addition() {
                let condition = {
                    listName: "",
                    compare: "==",
                    value: "",
                    CaseSensitive: false,
                    way: "||"
                }
                this.tabfile.push(condition);
            },
            Deleting() {
                if (this.tabfile.length < 1) {
                    return;
                } else {
                    this.tabfile.pop()
                }
            },
            filejson() {
                let data = {};
                var value;
                for (var i = 0; i < this.tabfile.length; i++) {
                    if (this.tabfile[i].listName) {
                        let listName = this.tabfile[i].listName;
                        let comparison = this.tabfile[i].compare;
                        if (this.tabfile[i].listName == 'status') {
                            if (this.tabfile[i].value == '正常') {
                                value = 1;
                            } else if (this.tabfile[i].value == '盘盈') {
                                value = 2;
                            } else if (this.tabfile[i].value == '盘亏') {
                                value = 3;
                            } else {
                                value = 4;
                            }
                        } else {
                            value = this.tabfile[i].value;
                        }
                        let way = this.tabfile[i].way;
                        data[listName] = [{"comparison": comparison, "link": way, "value": value}];
                    }
                }
                return data
            },
            filterData() {
                this.value1 = '';
                this.value2 = '';
                this.tableFile = false;

                let str = this.filejson();
                str = JSON.stringify(str)
                if (str.length > 2) {
                    this.paginationShow = false;
                    this.currentPage4 = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    });
                    this.checktime = 2;
                    this.$axios({
                        method: "post",
                        url: "/api/clothStock/find",
                        data: str,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            //过滤条件格式
                            this.tableData2 = [];
                            var result = res.data.content;
                            filetime(result);
                            this.fileDate(result);
                            this.totalElements = res.data.totalElements;
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
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
                            this.tableData2 = [];
                            filetime(res);
                            this.sortData(res.data.content)
                            this.tableData2 = res.data.content;
                            this.totalElements = res.data.totalElements;

                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },

            //获取主表信息
            getseen() {
                //获取信息
                this.$axios({
                    method: "get",
                    url: "/api/clothStock",
                    headers: {"Content-Type": "application/json"}
                }).then((res) => {
                    this.tableData2 = [];
                    this.totalElements = res.data.totalElements;
                    let content = res.data.content;
                    this.filetime(content);
                    this.fileDate(content);
                }).catch((err) => {
                    console.log(err)
                });
            },
            fileDate(res){
                for (let index = 0; index < res.length; index++) {
                    let item = res[index];
                    switch (item.status) {
                        case 1:
                            item.status = '正常';
                            break;
                        case 2:
                            item.status = '盘盈';
                            break;
                        case 3:
                            item.status = '盘亏';
                            break;
                        case 4:
                            item.status = '异常布匹';
                            break;
                    }
                    this.tableData2.push({
                        //编号
                        No:index+1,
                        //EPC
                        epc:item.epc,
                        // 缸号
                        vatDye:item.vatDye,
                        // 客户PO
                        poNO:item.poNO,
                        // 布号
                        clothNo:item.clothNo,
                        // 布种名称
                        clothName:item.clothName,
                        // 颜色
                        colorName:item.colorName,
                        // 布匹号
                        ticketNo:item.ticketNo,
                        // 系统货位
                        location:item.location,
                        // 状态(1为正常 4为异常布匹)
                        status:item.status,
                        // 备注
                        remark:item.remark,
                        //修改时间
                        lastModifyDate:item.lastModifyDate
                    })
                }
            },
            //时间格式的过滤
            filetime(res){
                //过滤时间格式
                for(let i=0;i <res.length;i++){
                    let creatDate = res[i].createDate;
                    let lastModifyDate = res[i].lastModifyDate;
                    let unloadDate = res[i].unloadDate;
                    let inboundDate= res[i].inboundDate;
                    let creat = new Date(creatDate);
                    let last = new Date(lastModifyDate);
                    let unload = new Date(unloadDate);
                    let inbound = new Date(inboundDate);
                    let createtimes=creat.getFullYear() + '-' + this.add(creat.getMonth()+1) + '-' + this.add(creat.getDate())+ ' ' + this.add(creat.getHours()) + ':' + this.add(creat.getMinutes()) + ':' + this.add(creat.getSeconds());
                    let lasttimes = last.getFullYear() + '-' + this.add(last.getMonth()+1) + '-' + this.add(last.getDate())+ ' ' + this.add(last.getHours()) + ':' + this.add(last.getMinutes()) + ':' + this.add(last.getSeconds());
                    let unloadtimes = unload.getFullYear() + '-' + this.add(unload.getMonth()+1) + '-' + this.add(unload.getDate())+ ' ' + this.add(unload.getHours()) + ':' + this.add(unload.getMinutes()) + ':' + this.add(unload.getSeconds());
                    let inboundtimes = inbound.getFullYear() + '-' + this.add(inbound.getMonth()+1) + '-' + this.add(inbound.getDate())+ ' ' + this.add(inbound.getHours()) + ':' + this.add(inbound.getMinutes()) + ':' + this.add(inbound.getSeconds());
                    res[i].inboundDate = inboundtimes;
                    res[i].createDate = createtimes;
                    res[i].lastModifyDate = lasttimes;
                    res[i].unloadDate = unloadtimes;
                }

            },
            add(m){
                return m <10? "0"+ m :m;
            },
//            getcookie(){
//                var arr, reg = new RegExp("(^| )" + "Seenheader" + "=([^;]*)(;|$)");
//                if (arr = document.cookie.match(reg)){
//                    var Data = JSON.parse(arr[2]);
//                    this.tabHeader = [];
//                    this.tabHeader = Data;
//                } else {
//                    return null;
//                }
//            },
            handleCurrentChange(val) {
                this.currentPage4 = val
                let count = val - 1;
                let createDate = {
                    "createDate": [{
                        "comparison": ">=",
                        "link": "&&",
                        "value": this.value1
                    }, {"comparison": "<=", "link": "&&", "value": this.value2}]
                };
                if (this.checktime == 0) {
                    //主表数据分页
                    this.$axios({
                        method: "get",
                        url: "/api/clothStock?page=" + count,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            this.idx = -1;
                            this.tableData2 = [];
                            var result = res.data.content;
                            this.filetime(result);
                            this.fileDate(result);
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                } else if (this.checktime == 1) {
                    //时间过滤后的数据分页
                    this.loading = true;
                    this.$axios({
                        method: "post",
                        url: "/api/clothStock/find?page=" + count,
                        data: createDate,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            this.idx = -1;
                            this.tableData2 = [];
                            var result = res.data.content;
                            this.filetime(result);
                            this.fileDate(result);
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                } else if (this.checktime == 2) {
                    //过滤数据
                    let str = this.filejson();
                    str = JSON.stringify(str);
                    this.$axios({
                        method: "post",
                        url: "/api/clothStock/find?page=" + count,
                        data: str,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            this.idx = -1;
                            this.tableData2 = [];
                            var result = res.data.content;
                            this.filetime(result);
                            this.fileDate(result);
                        })
                        .catch((err) => {
                            console.log(err)
                        });

                }
            },
            handleSelectionChange(val) {
                this.porterMGT = [];
                let id = {id:""};
                for(let i=0;i<val.length;i++) {
                    id = {id:val[i].id}
                    this.porterMGT.push(id);
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
            }
        },
    }

</script>
<style lang="scss">
    .w-table {
        　.el-table .darg_start {
            background-color: #f3f3f3;
        }
        .el-table th {
            padding: 0;
            .virtual{
                position: fixed;
                display: block;
                width: 0;
                height: 0;
                margin-left: -60px;
                background: none;
                border: none;
            }
            &.darg_active_left {
                .virtual {
                    z-index: 99;
                }
            }
            &.darg_active_right {
                .virtual {
                    z-index: 99;
                }
            }
        }
        .thead-cell {
            padding: 0;
            display: inline-flex;
            flex-direction: column;
            align-items: left;
            cursor: pointer;
            overflow: initial;
            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
            }
        }
        &.w-table_moving {
            .el-table th .thead-cell{
                cursor: move !important;
            }
            .el-table__fixed {
                cursor: not-allowed !important;
            }
        }
    }
</style>


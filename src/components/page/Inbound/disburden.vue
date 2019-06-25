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
                        <!-- 导入送货单 -->
                        <div class="w-h-div delivery-note delivery-right top10" @click="createNo">
                            <span class="tab-btn  delivery-note-text">生成卸货单</span>
                        </div>
                    </div>
                        <el-table
                            :data="tableData2"
                            style="width: 100%;text-align: center;"
                            stripe
                            :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                            @row-click="handleclass"
                            height="600px"
                            :row-style="{height:'60px',fontSize:'16px'}"
                            :row-class-name="getClass"
                            row-key="id"
                        >
                            <template v-for="(val,index) in tabHeader">
                                <el-table-column
                                    v-if="val.prop == 'No'"
                                    :prop="tabCol[index].prop"
                                    :label="val.label"
                                    :key="index"
                                width="100">
                                </el-table-column>
                                <el-table-column
                                    v-if="val.prop != 'No'"
                                    :prop="tabCol[index].prop"
                                    :label="val.label"
                                    :key="index">
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
            <el-dialog title="生成卸车单" :visible.sync="disburden" class="dis-car">
                <div class="tab-set">
                    <div class="Det-body">
                        <div class="car-box">
                            <el-row>
                                <el-col :span="6">
                                    <el-table
                                        :data="carlist"
                                        height="500"
                                        style="width:100%"
                                        border
                                        stripe
                                        :row-style="{height:'50px',fontSize:'15px'}"
                                        :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center',border:'0'}"
                                        @selection-change="handleSelectionChange"
                                        align="center"
                                        ref="multipleTable"
                                    >
                                        <el-table-column
                                            type="selection"
                                            width="55"
                                            align="center"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            v-for="(val,index) in car"
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            :key="index">
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                                <el-col :span="18" class="carlist">
                                    <el-table
                                        :data="car1list"
                                        height="500"
                                        style="width:100%"
                                        :row-style="{height:'50px',fontSize:'15px'}"
                                        :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center',border:'0'}"
                                        border
                                        align="center"
                                        stripe
                                    >
                                        <el-table-column
                                            width="55"
                                            align="center"
                                            >
                                            <template slot-scope="scope">
                                                <el-radio-group v-model="radio">
                                                    <el-radio :label="car1list[scope.$index].id" @change="checkSelectable"></el-radio>
                                                </el-radio-group>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            v-for="(val,index) in car1"
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            width="160"
                                            :key="index">
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                            <div class="wm-table-last2 top20">
                                <button class="tab-btn special-btn2 outline textAlign" @click="toggleSelection()">取消</button>
                                <button class="tab-btn special-btn2 outline textAlign" @click="saveUnload" style="margin-left:0;float:right;margin-right:30px;">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Sortable from 'sortablejs'

    export default {
        name: "",
        data() {
            return {
                show: true,
                disburden: false,
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
                        prop: 'unloadNo',
                        label: "卸车单号"
                    }, {
                        prop: "unloadDate",
                        label: "卸车日期"
                    }, {
                        prop: "quantity",
                        label: "条数"
                    }, {
                        prop: 'porterMGTs',
                        label: "卸车搬运"
                    }, {
                        prop: 'dyeingFactory',
                        label: "入仓搬运"
                    }, {
                        prop: "createBy",
                        label: "录入人"
                    }, {
                        prop: "createDate",
                        label: "录入时间"
                    }, {
                        prop: "remark",
                        label: "备注"
                    }],
                tabCol:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop: 'unloadNo',
                        label: "卸车单号"
                    }, {
                        prop: "unloadDate",
                        label: "卸车日期"
                    }, {
                        prop: "quantity",
                        label: "条数"
                    }, {
                        prop: 'porterMGTs',
                        label: "卸车搬运"
                    }, {
                        prop: 'dyeingFactory',
                        label: "入仓搬运"
                    }, {
                        prop: "createBy",
                        label: "录入人"
                    }, {
                        prop: "createDate",
                        label: "录入时间"
                    }, {
                        prop: "remark",
                        label: "备注"
                    }],
                tableData2: [],
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
                        value: 'unloadNo',
                        label: "卸车单号"
                    }, {
                        value: "unloadDate",
                        label: "卸车日期"
                    }, {
                        value: "quantity",
                        label: "条数"
                    }, {
                        value: 'porterMGTs',
                        label: "卸车搬运"
                    }, {
                        value: 'dyeingFactory',
                        label: "入仓搬运"
                    }, {
                        value: "createBy",
                        label: "录入人"
                    }, {
                        value: "createDate",
                        label: "录入时间"
                    }, {
                        value: "remark",
                        label: "备注"
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

                car: [
                    {
                        prop: "id",
                        label: "ID"
                    },
                    {
                        prop: "code",
                        label: "搬运工编号"
                    },
                    {
                        prop: "name",
                        label: "搬运工名称"
                    }
                ],
                carlist: [],
                car1: [
                    {
                        prop: "inboundNo",
                        label: "入仓单号"
                    },
                    {
                        prop: "inboundDate",
                        label: "入仓时间"
                    },
                    {
                        prop: "vatDye",
                        label: "缸号"
                    },
                    {
                        prop: "clothNo",
                        label: "布号"
                    },
                    {
                        prop: "colorName",
                        label: "颜色"
                    },
                    {
                        prop: "dyeingColor",
                        label: "染厂色号"
                    },
                    {
                        prop: "dyeingFactory",
                        label: "染厂名称"
                    },
                    {
                        prop: "totalWeight",
                        label: "入仓重量"
                    },
                    {
                        prop: "totalNum",
                        label: "入仓条数"
                    },
                    {
                        prop: "clothUnload",
                        label: "卸车单号"
                    }
                ],
                car1list: [],
                //存储搬运工ID
                porterMGT:[],
                radio:0,
                clothInbound:{},
                multipleSelection: [],

            }
        },
        created() {
            //自动获取数据
            this.getdisburden();
//            this.getcookie();
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
            },
        },
        methods: {
            //table点击传参
            handleclass(row) {
                this.idx = row.index;
            },
            createNo() {
                this.disburden = true;
                this.$axios({
                    method: "get",
                    url: "/api/porter_mgt",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {

                    for (let i = 0; i < res.data.content.length; i++) {
                        let item = res.data.content[i];
                        this.carlist.push({
                            // ID
                            id: item.id,
                            // 搬运工编号
                            code: item.code,
                            // 搬运工名称
                            name: item.name
                        });
                    }
                    this.$axios({
                        method: "get",
                        url: "/api/inbound/unload/inbound",
                        headers: {"Content-Type": "application/json"}
                    }).then(res => {
                        var result = res.data;
                        this.filetime(result);
                        for (let i = 0; i < result.length; i++) {
                            let item = result[i];
                            this.car1list.push({
                                // ID(不显示,后面保存卸车单信息时使用)
                                id:item.id,
                                // 入仓单号
                                inboundNo: item.inboundNo,
                                // 入仓时间
                                inboundDate: item.inboundDate,
                                // 缸号
                                vatDye: item.vatDye,
                                // 布号
                                clothNo: item.clothNo,
                                // 颜色
                                colorName: item.colorName,
                                // 染厂色号
                                dyeingColor: item.dyeingColor,
                                // 染厂名称
                                dyeingFactory: item.dyeingFactory,
                                // 入仓重量
                                totalWeight: item.totalWeight,
                                // 入仓条数
                                totalNum: item.totalNum,
                                // 卸车单号(值为'--')
                                clothUnload: '--'
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }).catch(error => {
                    console.log(error);
                });
            },
            //根据状态添加类名
            getClass({row, rowIndex}){
                //添加类名
                row.index = rowIndex;
                if (rowIndex == this.idx) {
                    return 'active';
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
                for (var i = 0; i < this.tabfile.length; i++) {
                    if (this.tabfile[i].listName) {
                        let listName = this.tabfile[i].listName;
                        let comparison = this.tabfile[i].compare;
                        let value = this.tabfile[i].value;
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
                    this.currentPage4 = 1;
                    this.paginationShow = false;
                    this.currentPage4 = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    });
                    this.checktime = 2;
                    this.$axios({
                        method: "post",
                        url: "/api/inbound/unload/find",
                        data: str,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            //过滤条件格式
                            this.tableData2 = [];
                            var result = res.data.content;
                            this.filetime(result);
                            this.fileDate(result);
                            this.totalElements = res.data.totalElements;
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },
            //过滤时间
            getTime() {
                let createDate = {
                    "createDate": [{
                        "comparison": ">=",
                        "link": "&&",
                        "value": this.value1
                    }, {"comparison": "<=", "link": "&&", "value": this.value2}]
                };
                if (!/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/.test(this.value1) || !/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/.test(this.value2)) {
                    return false;
                } else {
                    this.paginationShow = false;
                    this.currentPage4 = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    });
                    this.checktime = 1;
                    this.$axios({
                        method: "post",
                        url: "/api/inbound/unload/find",
                        data: createDate,
                        headers: {"Content-Type": "application/json"}
                    }).then((res) => {
                        console.log(res)
                        //过滤时间格式
                        this.tableData2 = [];
                        var result = res.data.content;
                        this.filetime(result);
                        this.fileDate(result);
                        this.totalElements = res.data.totalElements;
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            },
            //获取主表信息
            getdisburden() {
                //获取信息
                this.$axios({
                    method: "get",
                    url: "/api/inbound/unload",
                    headers: {"Content-Type": "application/json"}
                }).then((res) => {
                   this.tableData2 = [];
                    this.totalElements = res.data.totalElements;
                    var result = res.data.content;
                    this.filetime(result);
                    this.fileDate(result);
                }).catch((err) => {
                    console.log(err)
                });
            },
            fileDate(res){
                for (let i = 0; i < res.length; i++) {
                    let item = res[i];
                    let porterMGTs = '';
                    for (let j = 0; j < item.porterMGT.length; j++) {
                        porterMGTs += item.porterMGT[j].name + '，';
                    }
                    this.tableData2.push({
                        //编号
                        No:i+1,
                        // 卸车单号
                        unloadNo: item.unloadNo,
                        // 卸车日期
                        unloadDate: item.unloadDate,
                        // 条数
                        quantity: item.clothInbound.totalNum,
                        // 卸车搬运
                        porterMGTs: porterMGTs,
                        // 入仓搬运
                        dyeingFactory: item.clothInbound.dyeingFactory,
                        // 备注
                        remark: item.remark,
                        // 录入人
                        createBy: item.createBy,
                        // 录入时间
                        createDate: item.createDate
                    });
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
                        url: "/api/inbound/unload/?page=" + count,
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
                        url: "/api/inbound/unload/find?page=" + count,
                        data: createDate,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                        console.log(res)
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
                        url: "/api/inbound/unload/find?page=" + count,
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
            getcookie(){
                var arr, reg = new RegExp("(^| )" + "disheader" + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)){
                    var Data = JSON.parse(arr[2]);
                    this.tabHeader = [];
                    this.tabHeader = Data;
                } else {
                    return null;
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
            checkSelectable(radio){
               this.clothInbound.id=radio;
            },
            saveUnload(){
                let param = {
                    // 选中搬运工的ID
                    porterMGT:this.porterMGT,
                    // 选中入库单的ID
                    clothInbound:this.clothInbound
                };
                console.log(param)
                this.$axios({
                    method: "post",
                    url: "/api/inbound/unload",
                    data: JSON.stringify(param),
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                    // 提交成功
                    this.getdisburden();
                    this. toggleSelection();
                }).catch(error => {
                    // 提交失败
                    console.log(error);
                });

            },
            toggleSelection(row){
                this.disburden = false;
                if(!row) {
                    this.$refs.multipleTable.clearSelection();
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


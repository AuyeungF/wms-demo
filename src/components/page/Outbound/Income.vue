<template>
    <div class="picking-list">
        <div class="container">
            <div class="warehousing-header">
                <!--过滤数据-->
                <div class="w-h-div filtering-data" @click="tableFile = true">
                    <span class="filtering-data-icon"></span>
                    <span class="filtering-data-text">过滤数据</span>
                </div>
                <!--时间-->
                <div class="w-h-div bill-date">
                    <div class="block">
                        <span class="demonstration">单据日期:</span>
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                        <span class="time-to">至</span>
                        <el-date-picker
                            v-model="value2"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <!--search-->
                <div class="w-h-div header-search">
                    <div class="box-header-search">
                        <span class="header-search-icon"></span>
                        <span class="header-search-text">查询</span>
                    </div>
                </div>
                <!-- 导入送货单 -->
                <div class="w-h-div delivery-note">
                    <span class="filtering-data-icon"></span>
                    <span class="delivery-note-text">打印预览</span>
                </div>
            </div>
            <template>
                <el-table
                    :data="tableData2"
                    style="width: 100%;text-align: center;cursor: pointer;"
                    :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                    @row-click="handdle"
                    height="600px"
                    :row-style="{height:'70px'}"
                    :row-class-name="getClass"
                    >
                    <el-table-column :render-header="renderHeader" width="50" prop=""  border="1">
                        <template slot-scope="scope">
                             {{scope.$index}}
                         </template>
                    </el-table-column>
                    <template v-for="(val,index) in tabHeader">
                        <template v-if="val.prop !== 'checked'" >
                            <el-table-column
                                :prop="val.prop"
                                :label="val.label"
                                width="150"
                                v-if="tableData3[index].display"  border="1">
                            </el-table-column>
                        </template>
                        <template v-if="val.prop === 'checked'">
                            <el-table-column
                                :prop="val.prop"
                                :label="val.label"
                                v-if="tableData3[index].display"  border="1">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="tableData2[scope.$index].checked"></el-checkbox>
                                </template>
                            </el-table-column>
                        </template>
                    </template>
                </el-table>
            </template>
            <el-dialog title="表格列配置" :visible.sync="tableHeader" class="tab-list">
                <div class="tab-set">
                    <template>
                        <el-table
                            :data="tableData3"
                            height="345"
                            border
                            style="width: 80%;margin-left:6%; margin-top: 10%;"
                            @row-click='Movego'
                            :row-style="rowClass"
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
                        <span class="tab-right tableBox-right-one outline textAlign" @click="Moveup" :disabled="rownum === 1 " ></span>
                        <span class="tab-right tableBox-right-two outline textAlign" @click="Movedown" :disabled="rownum === tabHeader.length "></span>
                    </div>
                    <div class="wm-table-last2 wm-special-position3">
                        <a href="javascript:;" class="tab-btn special-btn2 outline textAlign">恢复默认设置</a>
                        <a href="javascript:;" class="tab-btn special-btn outline textAlign">完成</a>
                    </div>
                </div>
            </el-dialog>
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
                            <el-button type="primary" @click="Addition">增加条件[A]</el-button>
                            <el-button @click="Deleting">删除条件[D]</el-button>
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
                                    <span class="tab-btn special-btn wm-special-position outline textAlign">过滤[F]</span>
                                    <span class="tab-btn special-btn2 wm-special-position2 outline textAlign">说明[H]</span>
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
    export default {
        name: "",
        data(){
            return {
                tableHeader: false,
                tableFile:false,
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
                value3: '',
                num:'-1',
                rownum:'',
                form:{
                    name:''
                },
                tabHeader:[
                    {
                        prop:'num',
                        label:"出仓单号"
                    },{
                        prop:"seedType",
                        label:"布匹种"
                    },{
                        prop:"company",
                        label:"发货公司"
                    },{
                        prop:'transferIn',
                        label:"调入公司"
                    },{
                        prop:'applyType',
                        label:"申请类型"
                    },{
                        prop:"count",
                        label:"打印次数"
                    },{
                        prop:"time",
                        label:"打印时间"
                    },{
                        prop:"person",
                        label:"打单人"
                    },{
                        prop:"name",
                        label:"客户名称"
                    },{
                        prop:"remarks",
                        label:"备注"
                    },{
                        prop:"applycount",
                        label:"申请单号"
                    },{
                        prop:"checked",
                        label:"批准"
                    },{
                        prop:"applyDate",
                        label:"申请时间"
                    }],
                tabrow:[
                    {
                        prop:"ColumnName",
                        label:"列名称"
                    },{
                        prop:"alias",
                        label:"别名"
                    },{
                        prop:"display",
                        label:"是否显示"
                    }],
                tableData2: [
                    {
                        id:"0",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:false,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"1",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:false,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"2",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:false,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"3",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'5',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:true,
                        applyDate: '2016-05-02 10:50'
                    },{
                        id:"4",
                        num:'UIQ99777',
                        company:'坪洲仓库',
                        seedType:'大布',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:true,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"5",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:true,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"6",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:true,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"7",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:true,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"8",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:true,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"9",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:true,
                        applyDate: '2016-05-02 10:50',
                    },{
                        id:"10",
                        num:'UIQ99777',
                        seedType:'大布',
                        company:'坪洲仓库',
                        transferIn:'中山销售',
                        applyType:'调拨',
                        count:'0',
                        time:'2018/08/06',
                        person: '朱某某',
                        name:'粤焦东',
                        remarks:'急单',
                        applycount:'JG82817523',
                        checked:true,
                        applyDate: '2016-05-02 10:50',
                    }],
                tableData3: [
                    {
                        index:'1',
                        ColumnName: '出仓单号',
                        alias: '出仓单号',
                        display: true
                    },{
                        index:'2',
                        ColumnName: '布种匹配',
                        alias: '布种匹配',
                        display: true
                    }, {
                        index:'3',
                        ColumnName: '发货公司',
                        alias: '发货公司',
                        display: true
                    }, {
                        index:'4',
                        ColumnName: '调入公司',
                        alias: '调入公司',
                        display:true
                    }, {
                        index:'5',
                        ColumnName: '申请类型',
                        alias: '申请类型',
                        display:true
                    }, {
                        index:'6',
                        ColumnName: '打印次数',
                        alias: '打印次数',
                        display:true
                    }, {
                        index:'7',
                        ColumnName: '打印时间',
                        alias: '打印时间',
                        display:true
                    }, {
                        index:'8',
                        ColumnName: '打单人',
                        alias: '打单人',
                        display:true
                    },{
                        index:'9',
                        ColumnName: '客户名称',
                        alias: '客户名称',
                        display:true
                    },{
                        index:'10',
                        ColumnName: '备注',
                        alias: '备注',
                        display:true
                    },{
                        index:'11',
                        ColumnName: '申请单号',
                        alias: '申请单号',
                        display:true
                    },{
                        index:'12',
                        ColumnName: '批准',
                        alias: '批准',
                        display:true
                    },{
                        index:'13',
                        ColumnName: '申请时间',
                        alias: '申请时间',
                        display:true
                    }],
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
                        value:"num",
                        label:"出仓单号"
                    },
                    {
                        value:"seedType",
                        label:"布匹种"
                    },
                    {
                        value:"company",
                        label:"发货公司"
                    },
                    {
                        value:"transferIn",
                        label:"调入公司"
                    },
                    {
                        value:"applyType",
                        label:"申请类型"
                    },
                    {
                        value:"count",
                        label:"打印次数"
                    },
                    {
                        value:"time",
                        label:"打印时间"
                    },
                    {
                        value:"person",
                        label:"大单人"
                    },
                    {
                        value:"name",
                        label:"客户名称"
                    },
                    {
                        value:"remarks",
                        label:"备注"
                    },
                    {
                        value:"applycount",
                        label:"申请单号"
                    },
                    {
                        value:"checked",
                        label:"批准"
                    },
                    {
                        value:"applyDate",
                        label:"申请时间"
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
                ]

            }
        },
        methods: {
            renderHeader(createElement, {column}) {
                /*return (
                    //添加自定义样式
                    <span class='set-up'></span>
                )*/
                return createElement("span", {
                    "class": {
                        "set-up": true
                    },
                    on: {
                        click: () => {
                            this.tableHeader = true;
                        }
                    }
                })
            },
            handdle(row, event, column) {
                //点击某一行显示信息
//                console.log(row, event, column)
               this.num = row.id;

            },
            getClass({row,rowIndex}){
                //添加类名
                if(rowIndex == this.num) {
                    return 'active';
                } else if(this.tableData2[rowIndex].checked){
                    return 'green';
                } else{
                    return 'gary';
                }

            },
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
            Movego(row, event,column){
                //获取每一行的下标
                return this.rownum = row.index;
            },
            rowClass({row,rowIndex}){
                if(rowIndex+1 == ''){
                    return ;
                } else if(rowIndex+1 == this.rownum){
                    return {"background":"#0078FF","color":"#FFF"}
                }

            },
            Moveup(){
                console.log(this.rownum)
                --this.rownum;
                console.log(this.rownum)
                if(this.rownum > 0) {
                    //获取指定的数据
                    let upDate = this.tabHeader[this.rownum-1];
                    //切割指定的数据
                    this.tabHeader.splice(this.rownum-1,1);
                    //添加数据
                    this.tabHeader.splice(this.rownum,0,upDate);

                    let upRow = this.tableData3[this.rownum-1];
                    this.tableData3.splice(this.rownum-1,1);
                    this.tableData3.splice(this.rownum,0,upRow);
                } else {
                    alert('已经是第一条，不可以上移');

                }
            },
            Movedown(){
                ++this.rownum;
                if(this.rownum-1 === this.tableData3.length){
                   alert('已经是最后条，不可以下移');
               } else {
                    let downDate = this.tabHeader[this.rownum-2];
                    this.tabHeader.splice(this.rownum-2,1);
                    this.tabHeader.splice(this.rownum-1,0,downDate);
                    let downrow = this.tableData3[this.rownum-2];
                    this.tableData3.splice(this.rownum-2,1);
                    this.tableData3.splice(this.rownum-1,0,downrow);
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
                    this.tabfile.pop()
                }
            },
        }
    }

</script>

<style scoped>
    .el-table .warning-row {
        background: #CCC;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>

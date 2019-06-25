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
                        <div class="w-h-div delivery-note delivery-right top10" @click="show = false">
                            <span class="tab-btn  delivery-note-text">新建备货单</span>
                        </div>
                    </div>
                    <el-table
                            :data="tableData2"
                            style="width: 100%;text-align: center;cursor: pointer;"
                            :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                            @row-dblclick="handdle"
                            @row-click="handleclass"
                            height="560px"
                            :row-style="{height:'50px',fontSize:'16px'}"
                            :row-class-name="getClass"
                            row-key="id"
                        >
                        <template  v-for="(val,index) in tabHeader">
                            <el-table-column
                                :prop="tabCol[index].prop"
                                :label="val.label"
                                width="90"
                                :key="index"
                                v-if="val.prop == 'No'">
                            </el-table-column>
                            <el-table-column
                                :prop="tabCol[index].prop"
                                :label="val.label"
                                width="180"
                                :key="index"
                                v-if="val.prop != 'No'">
                            </el-table-column>
                        </template>
                        </el-table>
                    <div class="tab-show">
                        <span class="tab-success">已打印</span>
                        <span class="tab-info">未打印</span>
                    </div>
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
                <template v-else>
                    <out @changeshow="changeshow"></out>
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
                            <el-col :span="8"><h5>申请单明细</h5></el-col>
                            <el-col :span="6">
                                <div class="Warehousing-num"><span>申请单号:</span>A18032914</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="Det-body">
                        <div class="apply-form">
                            <el-form ref="form" :model="form" label-width="100px" class="form-contant">
                                <el-row class="bottom10 apply-one">
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="申请单号 :">
                                            <el-input v-model="form.id"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="申请类型 :">
                                            <el-input v-model="form.type"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="客户名称 :">
                                            <el-input v-model="form.clientName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="开单时间 :">
                                            <el-date-picker
                                                v-model="form.createDate"
                                                type="date"
                                                placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="申请编号 :">
                                            <el-input v-model="form.clientNo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="bottom10 apply-two">
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="申请备注 :">
                                            <el-input v-model="form.remark"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="创建人:">
                                            <el-input v-model="form.createBy"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="创建时间 :">
                                            <el-input v-model="form.createDate"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="修改人 :">
                                            <el-input v-model="form.lastModifyBy"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="修改时间 :">
                                            <el-input v-model="form.lastModifyDate"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="bottom10 apply-three">
                                    <el-col :span="14" class="left10">
                                        <el-form-item label="出库目的地 :">
                                            <el-input v-model="form.destination"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10">
                                        <el-form-item label="批准申请 :">
                                            <el-checkbox-group v-model="form.isApprove">
                                                <el-checkbox name="type"></el-checkbox>
                                            </el-checkbox-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="left10 apply-print">
                                        <div class="w-h-div delivery-note printing-btn" @click="seeprint">
                                            <span class="printing-data-icon"></span>
                                            <span class="delivery-note-text">打印预览</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <div class="Det-tab">
                            <template>
                                <el-table
                                    :data="tableDet"
                                    height="430"
                                    :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                                    :row-style="{height:'50px',fontSize:'16px'}"
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
                            <span class="tab-btn special-btn2 outline textAlign" @click="Detailed = false">取消</span>
                            <span class="tab-btn special-btn2 outline textAlign" @click="DetSave">保存</span>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <el-dialog title="打印单" :visible.sync="printing" class="tab-print">
                <div class="PackingList-box-form">
                    <div class="PackingList-box-header">
                        <div class="packingList-print">
                            <h4 class="PackingList-box-text">配货申请单</h4>
                            <span class="PackingList-box-text2">调拨</span>
                        </div>
                        <span class="PackingList-box-text3">J80730982</span>
                    </div>
                    <div class="PackingList-box-surface">
                        <div class="PackingList-surface-head">
                            <div class="PackingList-surfaceHead-one">
                                <ul class="PackingList-surfaceHead-ul">
                                    <li class="Packing-ulList Packing-List-one">
                                        <span>跟单：</span>
                                        <span class="Packing-List-line Packing-List-line1">{{form.createBy}}</span>
                                    </li>
                                    <li class="Packing-ulList Packing-List-two">
                                        <span>申请日期：</span>
                                        <span class="Packing-List-line Packing-List-line2">{{form.createDate}}</span>
                                    </li>
                                    <li class="Packing-ulList Packing-List-two">
                                        <span>优先级：</span>
                                        <span class="Packing-List-line Packing-List-line2" style="margin-left: 20px"></span>
                                    </li>
                                    <li class="Packing-ulList Packing-List-two ">
                                        <span>去空加：</span>
                                        <span class="Packing-List-line Packing-List-line2">0</span>
                                    </li>
                                    <li class="Packing-ulList Packing-List-two">
                                        <span>去纸管：</span>
                                        <span class="Packing-List-line Packing-List-line2">0</span>
                                    </li>
                                    <li class="Packing-ulList Packing-List-six">
                                        <span>开单人：</span>
                                        <span class="Packing-List-line Packing-List-line6">{{form.lastModifyBy}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="PackingList-surface-body">
                            <template>
                                <el-table
                                    :data="tabprint"
                                    border
                                >
                                    <template v-for="(val,index) in printList">
                                        <el-table-column
                                        :prop="val.prop"
                                        :label="val.label"
                                        width="100"
                                        align="center"
                                        v-if="val.prop === 'id'">
                                        </el-table-column>
                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center" v-if="val.prop !== 'id'">
                                        </el-table-column>
                                    </template>
                                </el-table>
                            </template>
                            <!--<div class="total-box">-->
                                <!--<div class="print-list print-total">合算 <span>19D16</span></div>-->
                                <!--<div class="print-list print-weight">库存重量<span>186.20KG</span></div>-->
                                <!--<div class="print-list print-count">6条</div>-->
                            <!--</div>-->
                        </div>

                        <div class="PackingList-surface-footer">
                            <div class="PackingSsurface-footer-head">
                                <ul class="PS-footerHead-ul">
                                    <li class="PS-footerHead-list1">
                                        备注/联络单号：
                                    </li>
                                    <li class="PS-footerHead-list2 left15">
                                        {{form.remark}} /
                                    </li>
                                    <li class="PS-footerHead-list4 left15">
                                        {{form.id}}
                                    </li>
                                </ul>
                            </div>
                            <div class="PackingSsurface-footer-foot">
                                <div class="PS-footerFoot-text">
                                    <span>送货地址：</span>
                                    <span class="PS-footerFoot-span">{{form.destination}} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="PackingList-box-footer">
                    <button class=" tab-btn special-btn2 PLfoot-btn-A outline textAlign" @click="printing = false">取消</button>
                    <button class="tab-btn special-btn2 PLfoot-btn-B outline textAlign" @click="printing = false">
                        <span class="PLfoot-btnB-icon"></span>
                        <span class="PLfoot-btnB-text">打印</span>
                    </button>
                </div>
            </el-dialog>
            <el-dialog title="明细修改" :visible.sync="Detailfrom" class="tab-form">
                <div class="tab-set">
                    <el-form ref="form" :model="editform" label-width="80px">
                        <el-form-item label="出库单号">
                            <el-input v-model="editform.id" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="布号">
                            <el-input v-model="editform.clothNo"></el-input>
                        </el-form-item>
                        <el-form-item label="布号名称">
                            <el-input v-model="editform.clothName"></el-input>
                        </el-form-item>
                        <el-form-item label="布匹名称">
                            <el-input v-model="editform.colorName"></el-input>
                        </el-form-item>
                        <el-form-item label="布匹颜色">
                            <el-input v-model="editform.colorNo"></el-input>
                        </el-form-item>
                        <el-form-item label="布匹缸号">
                            <el-input v-model="editform.vatDye"></el-input>
                        </el-form-item>
                        <el-form-item label="布匹条数">
                            <el-input v-model="editform.quantity"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="Det-btn">
                        <span class="tab-btn special-btn2 outline textAlign" @click="Detailfrom = false">取消</span>
                        <span class="tab-btn special-btn2 outline textAlign" @click="Detfrom">保存</span>
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="删除"
                :visible.sync="visible2"
                width="30%"
                center>
                <span>你确定要删除这条数据吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible2 = false">取 消</el-button>
                <el-button type="primary" @click="Deletions">确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Out from './Out'
    import Sortable from 'sortablejs'
    import {filetime,add} from '~@/../../static/js/index.js'
    export default {
        name: "",
        components:{Out},
        data(){
            return {
                show:true,
                visible2: false,
                tableHeader: false,
                tableFile:false,
                Detailed:false,
                Detailfrom:false,
                printing:false,
                paginationShow:true,
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
                value1: '',
                value2: '',
                value3: '',
                idx:-1,
                num:'-1',
                Det:0,
                rownum:'',
                del:0,
                //详情页表单
                form:{},
                form1:{},
                //修改详细页
                editform:{},
                //分页
                currentPage4: 1,
                totalElements:0,
                //主表表头
                tabHeader:[
                    {
                        prop:"No",
                        label:"编号"
                    },{
                        prop:"createDate",
                        label:"创建时间"
                    },
                    {
                        prop:"outboundApplyNo",
                        label:"申请单号"
                    },{
                        prop:"type",
                        label:"申请类型"
                    },{
                        prop:'clientName',
                        label:"客户名称"
                    },{
                        prop:'clientNo',
                        label:"客户编码"
                    },
                    {
                        prop:"destination",
                        label:"出库目的地"
                    },
                    {
                        prop:"isApprove",
                        label:"批准"
                    },
                    {
                        prop:"remark",
                        label:"备注"
                    },{
                        prop:"createBy",
                        label:"创建人"
                    },{
                        prop:"lastModifyBy",
                        label:"修改人"
                    },{
                        prop:"lastModifyDate",
                        label:"修改时间"
                    }],
                tabCol:[
                    {
                        prop:"No",
                        label:"编号"
                    },{
                        prop:"createDate",
                        label:"创建时间"
                    },
                    {
                        prop:"outboundApplyNo",
                        label:"申请单号"
                    },{
                        prop:"type",
                        label:"申请类型"
                    },{
                        prop:'clientName',
                        label:"客户名称"
                    },{
                        prop:'clientNo',
                        label:"客户编码"
                    },
                    {
                        prop:"destination",
                        label:"出库目的地"
                    },
                    {
                        prop:"isApprove",
                        label:"批准"
                    },
                    {
                        prop:"remark",
                        label:"备注"
                    },{
                        prop:"createBy",
                        label:"创建人"
                    },{
                        prop:"lastModifyBy",
                        label:"修改人"
                    },{
                        prop:"lastModifyDate",
                        label:"修改时间"
                    }],
                tableData2: [],
                //设置表头
                tabrow:[
                    {
                        prop:"ColumnName",
                        label:"列名称"
                    },{
                        prop:"alias",
                        label:"别名"
                    },/*{
                        prop:"display",
                        label:"是否显示"
                    }*/],
                //主表信息
                tableData3: [
                    {
                        index:'1',
                        ColumnName: '出库单号',
                        alias: '出库单号',
                        display: true
                    },{
                        index:'2',
                        ColumnName: '申请单号',
                        alias: '申请单号',
                        display: true
                    }, {
                        index:'3',
                        ColumnName: '申请类型',
                        alias: '申请类型',
                        display: true
                    }, {
                        index:'4',
                        ColumnName: '客户名称',
                        alias: '客户名称',
                        display:true
                    }, {
                        index:'5',
                        ColumnName: '客户编码',
                        alias: '客户编码',
                        display:true
                    }, {
                        index:'6',
                        ColumnName: '出库目的地',
                        alias: '出库目的地',
                        display:true
                    }, {
                        index:'7',
                        ColumnName: '备注',
                        alias: '备注',
                        display:true
                    },{
                        index:'8',
                        ColumnName: '创建人',
                        alias: '创建人',
                        display:true
                    },{
                        index:'9',
                        ColumnName: '创建时间',
                        alias: '创建时间',
                        display:true
                    },{
                        index:'10',
                        ColumnName: '修改人',
                        alias: '修改人',
                        display:true
                    },{
                        index:'11',
                        ColumnName: '修改时间',
                        alias: '修改时间',
                        display:true
                    },{
                        index:'12',
                        ColumnName: '批准',
                        alias: '批准',
                        display:true
                    }],
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
                        value:"isApprove",
                        label:"批准"
                    },
                    {
                        value:"outboundApplyNo",
                        label:"申请单号"
                    },{
                        value:"type",
                        label:"申请类型"
                    },{
                        value:'clientName',
                        label:"客户名称"
                    },{
                        value:'clientNo',
                        label:"客户编码"
                    },{
                        value:"destination",
                        label:"出库目的地"
                    },{
                        value:"remark",
                        label:"备注"
                    },{
                        value:"createBy",
                        label:"创建人"
                    },{
                        value:"createDate",
                        label:"创建时间"
                    },{
                        value:"lastModifyBy",
                        label:"修改人"
                    },{
                        value:"lastModifyDate",
                        label:"修改时间"
                    }],
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
                //明细表
                tableData4: [
                    {
                        prop:"id",
                        label:"编号"
                    },
                    {
                        prop:"clothNo",
                        label:"布号"
                    },
                    {
                        prop:"clothName",
                        label:"布号名称"
                    },
                    {
                        prop:"clothNo",
                        label:"布匹名称"
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
                        label:"布匹条数"
                    },
                    {
                        prop:"operation",
                        label:"操作"
                    }
                ],
                //明细表数据源
                tableDet:[],

                //打印单数据
                tabprint:[],
                //打印单列表
                printList:[
                    {
                        prop:"id",
                        label:"#"
                    },
                    {
                        prop:"clothNo",
                        label:"布号"
                    },
                    {
                        prop:"clothName",
                        label:"布号名称"
                    },
                    {
                        prop:"clothNo",
                        label:"布匹名称"
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
                        label:"布匹条数"
                    }
                ],
                user:"admin",
                pass:"admin",
                topic:"event/outbound",
                client:new Messaging.Client("192.168.1.16",61614,"example-"+(Math.floor(Math.random() * 100000)))
            }
        },
        created(){
            //自动获取数据
            this.getoutbound();
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
        methods: {
            //table点击传参
            handleclass(row){
                this.idx = row.index;
            },
            handdle(row, event, column) {
                //点击某一行显示信息
                this.idx = row.index;
                let id = this.tableData2[this.idx].id;
                this.Detailed = true;
                this.$axios({
                    method:"get",
                    url:"/api/outbound/apply/" + id ,
                    headers:{"Content-Type":"application/json"}
                })
                    .then((res)=>{
                        this.tableDet = [];
                        for(let i=0;i<res.data.clothOutboundApplyDetlList.length;i++){
                            let a = res.data.clothOutboundApplyDetlList[i];
                            this.tableDet.push(a);
                        }
                        let creatDate = res.data.createDate;
                        let lastModifyDate = res.data.lastModifyDate;
                        res.data.createDate = filetime(new Date(creatDate));
                        res.data.lastModifyDate = filetime(new Date(lastModifyDate));
                        this.form = res.data
                    })
                    .catch((err) =>{console.log(err)});

            },
            //根据状态添加类名
            getClass({row,rowIndex}){
                //添加类名
                row.index = rowIndex
                if(rowIndex == this.idx) {
                    return 'active';
                } else if(this.tableData2[rowIndex].isApprove == '批准'){
                    return 'green';
                } else if(this.tableData2[rowIndex].isApprove == '未批准'){
                    return 'gary';
                }

            },
            //控制表头显示隐藏按钮
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
            //获取每一行的下标
            Movego(row, event,column){
                return this.rownum = row.index;
            },
            rowClass({row,rowIndex}){
                if(this.rownum == ''){
                    return ;
                } else if(rowIndex+1 == this.rownum){
                    return "change"
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
            filterData(){
                this.value1 = '';
                this.value2 ='';
                let str = this.filejson();
                str = JSON.stringify(str)
                if(str.length >2){
                    this.currentPage4 = 1;
                    this.paginationShow = false;
                    this.currentPage4 = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    })
                    this.checktime = 2;
                    this.$axios({
                        method:"post",
                        url:"/api/outbound/apply/find",
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
                }
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
                    this.currentPage4 = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    })
                    this.checktime = 1;
                    this.$axios({
                        method: "post",
                        url: "/api/outbound/apply/find",
                        data: createDate,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            //过滤时间格式
                            this.tableData2 = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tableData2 = result
                            this.totalElements = res.data.totalElements;
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },
            //获取主表信息
            getoutbound(){
                //获取信息
                this.$axios({
                    method:"get",
                    url:"/api/outbound/apply",
                    headers:{"Content-Type":"application/json"}
                })
                    .then((res)=>{
                        this.tableData2=[];
                        this.totalElements =  res.data.totalElements
                        let result = res.data.content;
                        this.filetime(result);
                        this.tableData2 = result

                    })
                    .catch((err) =>{
                    console.log(err)
                    this.show = false
                });
            },
            //获取数据过滤时间格式
            filetime(res){
                //过滤时间格式yyyy-MM-dd
                for(let i=0;i <res.length;i++){
                    let creatDate = res[i].createDate;
                    let lastModifyDate = res[i].lastModifyDate;
                    res[i].createDate = filetime(new Date(creatDate));
                    res[i].lastModifyDate = filetime(new Date(lastModifyDate));
                    res[i].No = i+1;
                    if(res[i].isApprove) {
                        res[i].isApprove = '批准'
                    } else {
                        res[i].isApprove = '未批准'
                    }
                }
            },
            //修改明细
            edit(idx){
                this.Detailfrom = true;
                this.editform = this.tableDet[idx];
                return this.Det = idx;
            },
            tabdel(idx){
                //删除明细
                this.del = idx;
                this.visible2  = true;

            },
            Deletions(){
                this.visible2  = false;
                let id = this.tableDet[this.del].id
                this.$axios({
                    method:"delete",
                    url:"/api/outbound/apply/detl/" + id,
                    headers:{"Content-Type":"application/json"}
                }).then( res =>{
                    this.tableDet.shift();
                }).catch(res => {console.log(res)})
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
                    this.getoutbound();
                })
            },
            Detfrom(){
                let clothStock= this.tableDet[this.Det];
                this.$axios({
                    method:"put",
                    url:"/api/outbound/apply/detl/"+ clothStock.id,
                    data:clothStock,
                    headers:{"Content-Type":"application/json"}
                }).then(() =>{
                   this.Detailfrom = false;
                }).catch(res=>{
                    console.log(res)
                })

            },
            handleCurrentChange(val) {
                this.currentPage4 = val
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
                        url: "/api/outbound/apply?page=" + count,
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
                        url: "/api/outbound/apply/find?page=" +count,
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
                        url: "/api/outbound/apply/find?page=" +count,
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
            seeprint(){
                this.printing = true;
                this.tabprint = this.tableDet;
            },
            changeshow(){
                this.show = true;
                this.getoutbound();
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
            onConnectionLost (responseObject) {
                if (responseObject.errorCode !== 0) {
                    console.log("onConnectionLost:"+responseObject.errorMessage);
                    console.log("连接已断开");
                }
            },
            onMessageArrived (message) {
                this.$notify({
                    message: '有新的数据加入',
                    type: 'success'
                });
                this.getoutbound();
            },
            onConnect () {
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



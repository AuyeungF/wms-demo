<template>
    <div class="allocation" v-cloak>
        <div class="container">
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
                    <!--search-->
                    <div class="w-h-div header-search" @click="getTime">
                        <div class="box-header-search">
                            <span class="header-search-icon"></span>
                            <span class="header-search-text">查询</span>
                        </div>
                    </div>
                </div>
                <div class="tab-inbound">
                            <el-table
                                :data="tableData2"
                                style="width: 100%;text-align: center;cursor: pointer"
                                stripe
                                :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                                @row-dblclick="handdle"
                                @row-click="handleclass"
                                height="545px"
                                :row-style="{height:'50px',fontSize:'16px'}"
                                :row-class-name="getClass"
                                row-key="index"
                            >
                                <template v-for="(val,index) in tabHeader">
                                    <el-table-column
                                    v-if="val.prop == 'No'"
                                    :prop="tabCol[index].prop"
                                    :label="val.label"
                                    width="100"
                                    :key="index"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        v-if="val.prop != 'No'"
                                        :prop="tabCol[index].prop"
                                        :label="val.label"
                                        width="170"
                                        :key="index">
                                    </el-table-column>
                                </template>
                            </el-table>

                    <div class="block">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage4"
                                layout="total ,prev, pager, next, jumper"
                                :total=totalElements
                                v-if="paginationShow">
                            </el-pagination>
                    </div>
                </div>
            </template>
            <template v-else>
            </template>
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
            <el-dialog :visible.sync="Detailed" class="tab-Det">
                <div class="tab-set">
                    <div class="Det-header">
                        <el-row>
                            <el-col :span="8"><h5>申请单明细</h5></el-col>
                            <el-col :span="6">
                                <div class="Warehousing-num"><span>申请单号:</span>{{form.inboundNo}}</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="Warehousing-time"><span>入库时间:</span> {{form.createDate}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="Det-body">
                        <div class="Det-form">
                            <el-row>
                                <el-col :span="16">
                                    <el-form ref="form" :model="form" label-width="80px">
                                        <el-row class="form-one">
                                            <el-col :span="14" class="Det-form-item">
                                                <div class="form-finished">成品入仓:</div>
                                            </el-col>
                                            <el-col :span="10" class="Det-form-item">
                                                <el-row>
                                                    <el-col :span="12"><div class="form-save">存 放 点:<span class="form-area">平洲仓库</span></div></el-col>
                                                    <el-col :span="12"> <div class="form-save">归 属 公 司:<span class="form-company">平洲仓库</span></div></el-col>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                        <el-row class="form-two bottom10">
                                            <el-col :span="6" class="Det-form-item" style="margin-right: 3%;">
                                                <el-form-item label="进仓单号:">
                                                    <el-input v-model="form.inboundNo"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" class="Det-form-item" style="margin-right: 12%;">
                                                <el-form-item label="进仓类型:">
                                                    <el-input v-model="form.type"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" class="Det-form-item Det-Date">
                                                <el-form-item label="进仓日期:">
                                                    <el-date-picker
                                                        v-model="form.createDate"
                                                        type="date"
                                                        placeholder="选择日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row class="form-three bottom10">
                                            <el-col :span="6" class="Det-form-item" style="margin-right: 3%;">
                                                <el-form-item label="客 户 P O:">
                                                    <el-input v-model="form.inboundPO"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" class="Det-form-item" style="margin-right: 12%;">
                                                <el-form-item label="染厂名称:">
                                                    <el-input v-model="form.dyeingFactory"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" class="Det-form-item">
                                                <el-form-item label="缸号:">
                                                    <el-input v-model="form.vatDye"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row class="form-four bottom10">
                                            <el-col :span="6" class="Det-form-item" style="margin-right: 3%;">
                                                <el-form-item label="布号:">
                                                    <el-input v-model="form.clothNo"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" class="Det-form-item" style="margin-right: 12%;">
                                                <el-form-item label="名称:">
                                                    <el-input v-model="form.clothName"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" class="Det-form-item">
                                                <el-form-item label="颜色:">
                                                    <el-input v-model="form.colorName"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                    </el-form>
                                </el-col>
                                <el-col :span="7" style="margin-left: 20px;">
                                    <el-form ref="form1" :model="form" label-width="100px">
                                        <el-row class="bottom10 form1-check">
                                            <el-col class="form-first">
                                                <el-form-item label="首次入仓时间:">
                                                    <el-col :span="23">
                                                        <el-date-picker
                                                            v-model="form.createDate"
                                                            type="date"
                                                            placeholder="选择日期">
                                                        </el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row class="bottom10">
                                            <el-col>
                                                <el-form-item label="录入">
                                                    <el-col :span="10">
                                                        <el-input v-model="form.createBy"></el-input>
                                                    </el-col>
                                                    <el-col :span="12" style="margin-left: 15px;">
                                                        <el-input v-model="form.createDate"></el-input>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row class="bottom10">
                                            <el-col>
                                                <el-form-item label="修改">
                                                    <el-col :span="10">
                                                        <el-input v-model="form.lastModifyBy"></el-input>
                                                    </el-col>
                                                    <el-col :span="12" style="margin-left: 15px;">
                                                        <el-input v-model="form.lastModifyDate"></el-input>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="Det-form Det-location">
                            <el-row>
                                <el-col :span="6">
                                    <div class="demo-input-suffix">
                                        库位：
                                        <el-input placeholder="请输入库位"  v-model="location" @keyup.native="completion"></el-input>
                                        <div class="autocomplete" v-if="locationShow">
                                            <ul>
                                                <li v-for="(val,index) in auto"
                                                    :key="index" @click="autoshow(index)" >
                                                    <a href="javascript:;" :class="{'active':index == focusList}">{{val.code}}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="primary" round @click="addlocation">添加库位</el-button>
                                </el-col>
                            </el-row>


                        </div>
                        <div class="Det-tab">
                            <template>
                                <el-table
                                    :data="tableDet"
                                    height="370"
                                    :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                                    :row-style="{height:'50px',fontSize:'16px'}"
                                    align="center">
                                    <template v-for="(val,index) in tableData4">
                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            width="80"
                                            v-if="val.prop === 'No'">
                                        </el-table-column>
                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                        width="180" v-if="val.prop !== 'No' && val.prop !=='isoutbound' &&val.prop !== 'operation'">
                                        </el-table-column>
                                        <el-table-column
                                            :prop="val.prop"
                                            :label="val.label"
                                            align="center"
                                            width="100"
                                            v-if="val.prop === 'isoutbound'">
                                            <template slot-scope="scope">
                                                <el-checkbox v-model="tableDet[scope.$index].isoutbound" disabled></el-checkbox>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        :prop="val.prop"
                                        :label="val.label"
                                        align="center"
                                        width="180"
                                        v-if="val.prop === 'operation'">
                                            <template slot-scope="scope">
                                                <div class="wm-tableIcon-td">
                                                    <i class="icon-modify" style="cursor:pointer" @click="edit(scope.$index)"></i>
                                                    <i slot="reference" class="icon-del" style="cursor:pointer" @click="tabdel(scope.$index)"></i>
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
            <el-dialog title="明细修改" :visible.sync="Detailfrom" class="tab-form">
                <div class="tab-set">
                    <el-form ref="form" :model="editform" label-width="80px">
                        <el-form-item label="EPC码">
                            <el-input v-model="editform.epc" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="缸号">
                            <el-input v-model="editform.vatDye"></el-input>
                        </el-form-item>
                        <el-form-item label="布号">
                            <el-input v-model="editform.clothNo"></el-input>
                        </el-form-item>
                        <el-form-item label="布匹名称">
                            <el-input v-model="editform.clothName"></el-input>
                        </el-form-item>
                        <el-form-item label="布匹色号">
                            <el-input v-model="editform.colorName"></el-input>
                        </el-form-item>
                        <el-form-item label="布票号">
                            <el-input v-model="editform.ticketNo"></el-input>
                        </el-form-item>
                        <el-form-item label="库位">
                            <el-input v-model="editform.location" @keyup.native="completion"></el-input>
                            <div class="autocomplete" v-if="localtionShow">
                                <ul>
                                    <li v-for="(val,index) in auto"
                                        :key="index" @click="autoshow(index)" >
                                        <a href="javascript:;" :class="{'active':index == focusList}">{{val.code}}</a>
                                    </li>
                                </ul>
                            </div>
                        </el-form-item>
                        <el-form-item label="布匹重量">
                            <el-input v-model="editform.weight"></el-input>
                        </el-form-item>
                        <el-form-item label="是否出库">
                            <el-checkbox-group v-model="editform.isOutbound">
                                <el-checkbox  name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="入库时间">
                            <el-input v-model="editform.inboundDate"></el-input>
                        </el-form-item>
                        <el-form-item label="出库时间">
                            <el-input v-model="editform.outboundDate"></el-input>
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
    import Sortable from 'sortablejs'
    import {filetime,add} from '~@/../../static/js/index.js'
    export default {
        name: "",
        data(){
            return  {
                show:true,
                visible2: false,
                tableHeader: false,
                tableFile:false,
                Detailed:false,
                Detailfrom:false,
                paginationShow:true,
                localtionShow:false,
                locationShow:false,
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
                value3: '',
                idx:-1,
                num:'-1',
                Det:0,
                rownum:'',
                del:0,
                //详情页表单
                form:{},
                //修改详细页
                editform:{},
                //库位
                location:'',
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
                    },{
                        prop:'inboundNo',
                        label:"入库单号"
                    },{
                        prop:"type",
                        label:"入库类型"
                    },{
                        prop:"inboundPO",
                        label:"客户PO号"
                    },{
                        prop:'vatDye',
                        label:"缸号"
                    },{
                        prop:'clothNo',
                        label:"布号"
                    },{
                        prop:"clothName",
                        label:"布种名称"
                    },{
                        prop:"colorNo",
                        label:"布匹色号"
                    },{
                        prop:"colorName",
                        label:"布匹颜色"
                    },{
                        prop:"dyeingFactory",
                        label:"布匹染厂"
                    },{
                        prop:"createBy",
                        label:"创建人"
                    },{
                        prop:"lastModifyDate",
                        label:"修改时间"
                    },{
                        prop:"lastModifyBy",
                        label:"修改人"
                    }],
                tabCol:[
                    {
                        prop:"No",
                        label:"编号"
                    },{
                        prop:"createDate",
                        label:"创建时间"
                    },{
                        prop:'inboundNo',
                        label:"入库单号"
                    },{
                        prop:"type",
                        label:"入库类型"
                    },{
                        prop:"inboundPO",
                        label:"客户PO号"
                    },{
                        prop:'vatDye',
                        label:"缸号"
                    },{
                        prop:'clothNo',
                        label:"布号"
                    },{
                        prop:"clothName",
                        label:"布种名称"
                    },{
                        prop:"colorNo",
                        label:"布匹色号"
                    },{
                        prop:"colorName",
                        label:"布匹颜色"
                    },{
                        prop:"dyeingFactory",
                        label:"布匹染厂"
                    }, {
                        prop: "createBy",
                        label: "创建人"
                    },{
                        prop:"lastModifyDate",
                        label:"修改时间"
                    },{
                        prop:"lastModifyBy",
                        label:"修改人"
                    }],
                tableData2: [],
                //设置主表信息
                tableData3: [
                    {
                        index:'1',
                        ColumnName: '入库单号',
                        alias: '入库单号',
                        display: true
                    },{
                        index:'2',
                        ColumnName: '入库类型',
                        alias: '入库类型',
                        display: true
                    }, {
                        index:'3',
                        ColumnName: '客户PO号',
                        alias: '客户PO号',
                        display: true
                    }, {
                        index:'4',
                        ColumnName: '缸号',
                        alias: '缸号',
                        display:true
                    }, {
                        index:'5',
                        ColumnName: '布号',
                        alias: '布号',
                        display:true
                    }, {
                        index:'6',
                        ColumnName: '布种名称',
                        alias: '布种名称',
                        display:true
                    }, {
                        index:'7',
                        ColumnName: '布匹色号',
                        alias: '布匹色号',
                        display:true
                    }, {
                        index:'8',
                        ColumnName: '布匹颜色',
                        alias: '布匹颜色',
                        display:true
                    },{
                        index:'9',
                        ColumnName: '布匹染厂',
                        alias: '布匹染厂',
                        display:true
                    },{
                        index:'10',
                        ColumnName: '创建人',
                        alias: '创建人',
                        display:true
                    },{
                        index:'11',
                        ColumnName: '创建时间',
                        alias: '创建时间',
                        display:true
                    },{
                        index:'12',
                        ColumnName: '修改时间',
                        alias: '修改时间',
                        display:true
                    },{
                        index:'13',
                        ColumnName: '修改人',
                        alias: '修改人',
                        display:true
                    }],
                //设置表头
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
                        value:'inboundNo',
                        label:"入库单号"
                    },{
                        value:"type",
                        label:"入库类型"
                    },{
                        value:"inboundPO",
                        label:"客户PO号"
                    },{
                        value:'vatDye',
                        label:"缸号"
                    },{
                        value:'clothNo',
                        label:"布号"
                    },{
                        value:"clothName",
                        label:"布种名称"
                    },{
                        value:"colorNo",
                        label:"布匹色号"
                    },{
                        value:"colorName",
                        label:"布匹颜色"
                    },{
                        value:"dyeingFactory",
                        label:"布匹染厂"
                    },{
                        value:"createBy",
                        label:"创建人"
                    },{
                        value:"createDate",
                        label:"创建时间"
                    },{
                        value:"lastModifyDate",
                        label:"修改时间"
                    },{
                        value:"lastModifyBy",
                        label:"修改人"
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
                //明细表
                tableData4: [
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"epc",
                        label:"EPC编码"
                    },
                    {
                        prop:"vatDye",
                        label:"缸号"
                    },
                    {
                        prop:"clothNo",
                        label:"布号"
                    },
                    {
                        prop:"clothName",
                        label:"布匹名称"
                    },
                    {
                        prop:"colorName",
                        label:"布匹色号"
                    },
                    {
                        prop:"ticketNo",
                        label:"布票号"
                    },
                    {
                        prop:"location",
                        label:"库位"
                    },
                    {
                        prop:"weight",
                        label:"布匹重量"
                    },
                    {
                        prop:"isoutbound",
                        label:"是否出库"
                    },
                    {
                        prop:"inboundDate",
                        label:"入库时间"
                    },
                    {
                        prop:"outboundDate",
                        label:"出库时间"
                    },
                    {
                        prop:"operation",
                        label:"操作"
                    }
                ],
                tableDet:[],
                focusList:-1,
                auto:[],
                user:"admin",
                pass:"admin",
                topic:"event/inbound",
                client:new Messaging.Client("192.168.1.16",61614,"example-"+(Math.floor(Math.random() * 100000)))
            }
        },
        created(){
            this.getinbound();
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
        watch:{ //监听过滤数据，初始化
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
                if(!this.Detailed){
                    this.locationShow = false;
                    this.location = '';
                }
            }
        },
        methods:{
            //表头自定义
            renderHeader(createElement, {column}) {
                return createElement(
                    'div', {
                        'class': ['thead-cell'],
                        on: {
                            mousedown: ($event) => { this.handleMouseDown($event, column) },
//                            mouseup: ($event) => { this.handleMouseUp($event, column) },
                            mousemove: ($event) => { this.handleMouseMove($event, column) }
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
            handleclass(row){
                this.idx = row.index;
            },
            handdle(row) {
                //点击某一行显示信息
                this.idx = row.index;
                let id = this.tableData2[this.idx].id;
                this.Detailed = true;
                this.$axios({
                    method:"get",
                    url:"/api/inbound/" + id ,
                    headers:{"Content-Type":"application/json"}
                })
                    .then((res)=>{
                        //初始化明细列表
                        let result =  res.data;
                        result.createDate = filetime(new Date(result.createDate));
                        result.lastModifyDate = filetime(new Date(result.lastModifyDate));
                        this.form = result;
                        this.tableDet = [];
                        for(let i=0;i<result.clothInboundDetls.length;i++){
                        let item = res.data.clothInboundDetls[i].clothStock;
                            item.No = i+1;
                            item.inboundDate = filetime(new Date(item.inboundDate));
                            item.outboundDate = filetime(new Date(item.outboundDate));
                        this.tableDet.push(item);
                    }
                })
                    .catch((err) =>{console.log(err)});

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
            getClass({row,rowIndex}){
                row.index = rowIndex
                //添加类名
                if(rowIndex == this.idx) {
                    return 'active';
                } else {
                    return '';
                }

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
                this.tableFile = false;
                let str = this.filejson();
                str = JSON.stringify(str)
                if(str.length >2){
                    this.paginationShow = false;
                    this.currentPage4 = 1;
                    this.$nextTick(function () {
                        this.paginationShow = true;
                    })
                    this.checktime = 2;
                    this.$axios({
                        method:"post",
                        url:"/api/inbound/find",
                        data:str,
                        headers:{"Content-Type":"application/json"}
                    })
                        .then((res)=>{
                            //过滤条件格式
                            this.tableData2 = [];
                            let result = res.data.content
                            for(var i=0;i<result.length;i++){
                                let item = result[i];
                                item.No = i+1;
                                item.createDate = filetime(new Date(item.createDate));
                                item.lastModifyDate = filetime(new Date(item.lastModifyDate));
                                this.tableData2.push(item)
                            }
                            this.totalElements = res.data.totalElements;
                        })
                        .catch((err) =>{console.log(err)});
                }

            },
            //获取主表
            getinbound(){
                //获取信息
                this.$axios({
                            method:"get",
                            url:"/api/inbound",
                            headers:{"Content-Type":"application/json"}
                        })
                            .then((res)=>{
                        this.tableData2=[];
                       this.totalElements =  res.data.totalElements;
                       let result = res.data.content;
                       for(var i=0;i<result.length;i++){
                           let item = result[i];
                           item.No = i+1;
                           item.createDate = filetime(new Date(item.createDate));
                           item.lastModifyDate = filetime(new Date(item.lastModifyDate));
                           this.tableData2.push(item)
                       }

                    })
                            .catch((err) =>{console.log(err)});
            },
            //过滤时间
            getTime(){

                if(!/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/.test(this.value1) || !/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/.test(this.value2)){
                    return ;
                } else {
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
                        url: "/api/inbound/find",
                        data: createDate,
                        headers: {"Content-Type": "application/json"}
                    })
                        .then((res) => {
                            //过滤时间格式
                            this.tableData2 = [];
                            let result = res.data.content
                            for(var i=0;i<result.length;i++){
                                let item = result[i];
                                item.No = i+1;
                                item.createDate = filetime(new Date(item.createDate));
                                item.lastModifyDate = filetime(new Date(item.lastModifyDate));
                                this.tableData2.push(item)
                            }
                            this.totalElements = res.data.totalElements;
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },
            //修改明细
            edit(idx){
                //获取某一条明细
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
                    url:"/api/clothStock/" + id,
                    headers:{"Content-Type":"application/json"}
                }).then(res =>{
                    this.tableDet.shift();
                }).catch(res => {console.log(res)})
            },
            DetSave(){
                //保存明细
                let cloth = this.form;

                //修改页面数据
               for(var index = 0;index<cloth.clothInboundDetls.length;index++){
                   let  loca = "3A00000000"+cloth.clothInboundDetls[index].clothStock.location;
                   cloth.clothInboundDetls[index].clothStock.location = loca;
               }
                this.tableData2[this.idx] = cloth;
                console.log(cloth)
                //请求修改数据
                this.$axios({
                    method:"put",
                    url:"/api/inbound/"+ cloth.id,
                    data:cloth,
                    headers:{"Content-Type":"application/json"}
                }).then(res => {
                    this.getinbound();
                    this.Detailed = false;
                })
            },
            Detfrom(){
              let clothStock= this.tableDet[this.Det];
                this.$axios({
                    method:"put",
                    url:"/api/clothStock/"+ clothStock.id,
                    data:clothStock,
                    headers:{"Content-Type":"application/json"}
                }).then((res)=>{
                    this.Detailfrom = false;
                })

            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                let count = val-1;
                if(this.checktime == 0){
                    this.$axios({
                        method:"get",
                        url:"/api/inbound?page=" + count,
                        headers:{"Content-Type":"application/json"}
                    })
                        .then((res)=>{
                            this.idx = -1;
                            this.tableData2 = [];
                            let result = res.data.content
                            for(var i=0;i<result.length;i++){
                                let item = result[i];
                                item.No = i+1;
                                item.createDate = filetime(new Date(item.createDate));
                                item.lastModifyDate = filetime(new Date(item.lastModifyDate));
                                this.tableData2.push(item)
                            }

                        })
                        .catch((err) =>{console.log(err)});
                } else if(this.checktime == 1){
                    var createDate = {
                        "createDate": [{
                            "comparison": ">=",
                            "link": "&&",
                            "value": this.value1
                        }, {"comparison": "<=", "link": "&&", "value": this.value2}]
                    };
                    this.$axios({
                        method:"post",
                        url:"/api/inbound/find?page=" + count,
                        data:createDate,
                        headers:{"Content-Type":"application/json"}
                    })
                        .then((res)=>{
                            this.idx = -1;
                            this.tableData2 = [];
                            let result = res.data.content
                            for(var i=0;i<result.length;i++){
                                let item = result[i];
                                item.No = i+1;
                                item.createDate = filetime(new Date(item.createDate));
                                item.lastModifyDate = filetime(new Date(item.lastModifyDate));
                                this.tableData2.push(item)
                            }

                        })
                } else if(this.checktime == 2) {
                    let str = this.filejson();
                    str = JSON.stringify(str)
                    this.$axios({
                        method:"post",
                        url:"/api/inbound/find?page=" + count,
                        data:str,
                        headers:{"Content-Type":"application/json"}
                    })
                        .then((res)=>{
                            this.idx = -1;
                            this.tableData2 = [];
                            let result = res.data.content
                            for(var i=0;i<result.length;i++){
                                let item = result[i];
                                item.No = i+1;
                                item.createDate = filetime(new Date(item.createDate));
                                item.lastModifyDate = filetime(new Date(item.lastModifyDate));
                                this.tableData2.push(item)
                            }
                        })
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
            completion(e){
                let key = e.keyCode;
                var param
                if(this.Detailfrom) {
                     param = JSON.stringify({code:[{comparison:'like',link:'&&',value:this.editform.location}]});
                    switch (key) {
                        case 38:
                            //上
                            this.focusList <= 0? 0 : this.focusList--;
                            this.editform.location = this.auto[this.focusList].code;
                            break;
                        case 40:
                            //下
                            this.focusList >= this.auto.length-1 ? this.auto.length-1 :  this.focusList++;
                            this.editform.location = this.auto[this.focusList].code;
                            break;
                        case 13:
                            //回车
                            //初始化
                            this.focusList = -1;
                            this.localtionShow = false;
                            break;
                        case 8:
                            //删除
                            if(this.editform.location == '') {
                                this.localtionShow = false;
                            } else {
                                this.$axios({
                                    method: "post",
                                    url: "/api/inventory/lattice/find",
                                    data: param,
                                    headers: {"Content-Type": "application/json"}
                                }).then(res=>{
                                    this.auto = res.data.content;
                                    if(this.editform.location != '') {
                                        this.localtionShow = true;
                                    }
                                })
                                    .catch(err=>{console.log(err)})
                            }
                            break;
                        default:
                            this.$axios({
                                method: "post",
                                url: "/api/inventory/lattice/find",
                                data: param,
                                headers: {"Content-Type": "application/json"}
                            }).then(res=>{
                                this.auto = res.data.content;

                                    if(this.editform.location != '') {
                                        this.localtionShow = true;
                                    }
                            })
                                .catch(err=>{console.log(err)})
                            break;
                    }
                } else {
                    param = JSON.stringify({code:[{comparison:'like',link:'&&',value:this.location}]});
                    switch (key) {
                        case 38:
                            //上
                            this.focusList <= 0? 0 : this.focusList--;
                            this.location = this.auto[this.focusList].code;
                            break;
                        case 40:
                            //下
                            this.focusList >= this.auto.length-1 ? this.auto.length-1 :  this.focusList++;
                            this.location = this.auto[this.focusList].code;
                            break;
                        case 13:
                            //回车
                            //初始化
                            this.focusList = -1;
                            this.locationShow = false;
                            break;
                        case 8:
                            //删除
                            if(this.location == '') {
                                this.locationShow = false;
                            } else {
                                this.$axios({
                                    method: "post",
                                    url: "/api/inventory/lattice/find",
                                    data: param,
                                    headers: {"Content-Type": "application/json"}
                                }).then(res=>{
                                    this.auto = res.data.content;
                                    if(this.location != '') {
                                        this.locationShow = true;
                                    }
                                })
                                    .catch(err=>{console.log(err)})
                            }
                            break;
                        default:
                            this.$axios({
                                method: "post",
                                url: "/api/inventory/lattice/find",
                                data: param,
                                headers: {"Content-Type": "application/json"}
                            }).then(res=>{
                                this.auto = res.data.content;

                                if(this.location != '') {
                                    this.locationShow = true;
                                }
                            })
                                .catch(err=>{console.log(err)})
                            break;
                    }
                }



            },
            autoshow(idx){
                if(this.localtionShow) {
                    this.localtionShow = false;
                    this.editform.location = this.auto[idx].code;
                } else {
                    this.locationShow = false;
                    this.location = this.auto[idx].code;
                }
            },
            addlocation(){
                this.locationShow = false;
                for(var i = 0;i<this.tableDet.length;i++){
                    this.tableDet[i].location = this.location;
                }
            },
            onConnectionLost(responseObject) {
                if (responseObject.errorCode !== 0) {
                    console.log("onConnectionLost:"+responseObject.errorMessage);
                    console.log("连接已断开");
                }
            },
            onMessageArrived(message) {
                this.$notify({
                    message: '入库单号'+ message.payloadString,
                    type: 'success'
                });

                this.getinbound();
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
       /* sockets:{
            connect(){
                console.log('创建成功')
            },
            reject_inbound (data) {
               if(data) {
                   this.$notify({
                       message: '入库单号'+ data,
                       type: 'success'
                   });
                   this.getinbound();
               }
            }
        }*/
    }
</script>

<template>
   <div class="Details">
       <div class="Det-go">
           <span class="out-go" @click="go"></span>
       </div>
       <div class="Det-header inventory-tab">
           <el-row>
               <el-col :span="8">
                   <div class="w-h-div filtering-data" @click="InventoryFile = true">
                       <span class="filtering-data-icon"></span>
                       <span class="filtering-data-text">过滤数据</span>
                   </div>
               </el-col>
               <el-col :span="6">
                   <div class="Warehousing-num"><span>盘点记录详情</span></div>
               </el-col>
               <el-col :span="10">
                   <div class="w-h-div filtering-data filtering-right" @click="diff">
                       <span class="filtering-data-text">差异调整</span>
                   </div>
               </el-col>
           </el-row>
       </div>
       <div class="Inventory-body">
           <div class="Inventory-tab">
               <template>
                    <el-table
                       :data="tableDet"
                       height="600"
                       :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                       align="center"
                       :row-style="{height:'70px',fontSize:'16px'}"
                       :row-class-name="getchange"
                       @row-click="handlechange">
                       <template v-for="(val,index) in tableData4">
                           <el-table-column
                               :prop="tabCol[index].prop"
                               :label="val.label"
                               align="center"
                               width="130"
                               :key="index">
                           </el-table-column>
                       </template>
                   </el-table>

                   <div class="block">
                       <el-pagination
                           @current-change="handleCurrentChange"
                           :current-page.sync="currentPage"
                           :page-size="10"
                           layout="total ,prev, pager, next, jumper"
                           :total=totalElements
                           v-if="paginationShow">
                       </el-pagination>
                   </div>
               </template>
           </div>
       </div>
       <el-dialog title="过滤数据" :visible.sync="InventoryFile" class="tab-file">
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
                                           v-for="item in childList1"
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
                               <span class="tab-btn special-btn2 wm-special-position outline textAlign" @click="filterInventory">过滤</span>
                               <span class="tab-btn special-btn2 wm-special-position2 outline textAlign" @click="InventoryFile = false">取消</span>
                           </el-col>
                       </el-row>
                   </div>
               </div>
           </div>
       </el-dialog>
        <el-dialog title="差异调整" :visible.sync="difference" class="tab-diff">
            <div class="tab-set">
                <el-table
                :data="tabdiff"
                :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                :row-style="{height:'50px',fontSize:'16px'}"
                height="500"
                >
                    <div v-for="(val,index) in diffHeader">
                        <el-table-column
                            :prop="val.prop"
                            :label="val.label"
                            :key="index"
                            align="center"
                        v-if="val.prop !== 'operation'">
                        </el-table-column>
                    </div>
                    <el-table-column
                    prop="operation"
                    label="状态调整"
                    align="center">
                        <template slot-scope="scope">
                            <el-button :type="scope.row.status === '盘盈' ?'primary' : 'danger'" @click="changearea(scope.$index)">{{scope.row.status === '盘盈' ?'调整货位' : '标记异常'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="diff-btn top20">
                <span class="tab-btn special-btn2 outline textAlign" @click="difference = false">取消</span>
                <span class="tab-btn special-btn2 outline textAlign" :plain="true" @click="save">保存</span>
            </div>
        </el-dialog>
       <el-dialog
           title="货位编码"
           :visible.sync="dialogVisible"
           width="20%">
           <el-input v-model="info" @keyup.native="completion"></el-input>
           <div class="autocomplete" v-if="show">
               <ul>
                   <li v-for="(val,index) in auto"
                   :key="index" @click="autoshow(index)">
                       <a href="javascript:;" :class="{'active':index == focusList}">{{val.code}}</a>
                   </li>
               </ul>
           </div>

           <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
       </el-dialog>
   </div>
</template>

<script>
    import Sortable from 'sortablejs'
    export default {
        name: "",
        props:['tabData','id'],
        data(){
            return {
                info:"",
                move:10,
                num:-1,
                focusList:-1,
                idx:0,
                InventoryFile:false,
                difference:false,
                dialogVisible:false,
                paginationShow : true,
                currentPage: 1,
                totalElements:0,
                show:true,
                checktime:0,
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
                childList1:[
                    {
                        value:"epc",
                        label:"EPC编码"
                    },
                    {
                        value:"poNo",
                        label:"客户PO"
                    },
                    {
                        value:"cylinderNo",
                        label:"缸号"
                    },
                    {
                        value:"no",
                        label:"盘点单号"
                    },
                    {
                        value:"name",
                        label:"名称"
                    },
                    {
                        value:"color",
                        label:"颜色"
                    },
                    {
                        value:"ticketNo",
                        label:"布票号"
                    },
                    {
                        value:"area",
                        label:"所在区域"
                    },
                    {
                        value:"lattice",
                        label:"所在货位"
                    },
                    {
                        value:"status",
                        label:"盘点状态"
                    },
                    {
                        value:"createBy",
                        label:"操作人"
                    },
                    {
                        value:"createDate",
                        label:"创建时间"
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
                //盘点记录详情
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
                        prop:"poNo",
                        label:"客户PO"
                    },
                    {
                        prop:"cylinderNo",
                        label:"缸号"
                    },
                    {
                        prop:"no",
                        label:"盘点单号"
                    },
                    {
                        prop:"name",
                        label:"名称"
                    },
                    {
                        prop:"color",
                        label:"颜色"
                    },
                    {
                        prop:"ticketNo",
                        label:"布票号"
                    },
                    {
                        prop:"area",
                        label:"所在区域"
                    },
                    {
                        prop:"lattice",
                        label:"所在货位"
                    },
                    {
                        prop:"status",
                        label:"盘点状态"
                    },
                    {
                        prop:"createBy",
                        label:"操作人"
                    },
                    {
                        prop:"createDate",
                        label:"创建时间"
                    }
                ],
                tabCol: [
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"epc",
                        label:"EPC编码"
                    },
                    {
                        prop:"poNo",
                        label:"客户PO"
                    },
                    {
                        prop:"cylinderNo",
                        label:"缸号"
                    },
                    {
                        prop:"no",
                        label:"盘点单号"
                    },
                    {
                        prop:"name",
                        label:"名称"
                    },
                    {
                        prop:"color",
                        label:"颜色"
                    },
                    {
                        prop:"ticketNo",
                        label:"布票号"
                    },
                    {
                        prop:"area",
                        label:"所在区域"
                    },
                    {
                        prop:"lattice",
                        label:"所在货位"
                    },
                    {
                        prop:"status",
                        label:"盘点状态"
                    },
                    {
                        prop:"createBy",
                        label:"操作人"
                    },
                    {
                        prop:"createDate",
                        label:"创建时间"
                    }
                ],
                //差异
                diffHeader:[
                    {
                        prop:"ticketNo",
                        label:"布票号"
                    },
                    {
                        prop:"epc",
                        label:"EPC"
                    },
                    {
                        prop:"name",
                        label:"产品名称"
                    },
                    {
                        prop:"color",
                        label:"颜色"
                    },
                    {
                        prop:"cylinderNo",
                        label:"缸号"
                    },
                    {
                        prop:"status",
                        label:"布匹状态"
                    },
                    {
                        prop:"lattice",
                        label:"系统货位"
                    },
                    {
                        prop:"remark",
                        label:"备注"
                    },
                    {
                        prop:"operation",
                        label:"状态调整"
                    }
                ],
                tabdiff:[],
                clothsbox:[],
                //补全
                auto:[],
                tableDet:[],
                tabcount:[],

            }
        },
        watch:{
            InventoryFile(){
                //监听详情过滤数据，初始化
                if(this.InventoryFile){
                    for(var i=0;i<this.tabfile.length;i++){
                        this.tabfile[i].listName = '';
                        this.tabfile[i].value = '';
                        this.tabfile[i].CaseSensitive = false;
                    }
                }
            },
            info(){
                if(this.info == '') {
                    this.show = false;
                }
            },
            dialogVisible(){
                if(this.dialogVisible == false){
                    this.info = '';
                }
            },
            difference(){
                this.clothsbox = [];
            }
        },
        created(){
            this.getDet();
        },
        mounted(){
            this.columnDrop();
        },
        methods:{
            handleclass(row){
                this.idx = row.index;
            },
            handlechange(row) {
                this.num = row.index;
            },
            getchange({row,rowIndex}){
                row.index = rowIndex;
                //添加类名
                if(rowIndex == this.num) {
                    return 'active';
                } else if(this.tableDet[rowIndex].status == '盘盈'){
                    return 'blue';
                }else if(this.tableDet[rowIndex].status == '盘亏'){
                    return 'red';
                } else if(this.tableDet[rowIndex].status == '布匹信息一致但EPC码不一致'){
                    return 'gary';
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
            //盘点记录数据过滤
            filterInventory(){
                let data = {};
                var value;
                for(var i=0;i<this.tabfile.length;i++){
                    if(this.tabfile[i].listName){
                        let listName = this.tabfile[i].listName;
                        let comparison = this.tabfile[i].compare;
                        if(this.tabfile[i].listName == 'status') {
                            if(this.tabfile[i].value == '正常') {
                                value = 1;
                            } else if(this.tabfile[i].value == '盘亏'){
                                value = 2;
                            }else if(this.tabfile[i].value == '盘盈'){
                                value = 3;
                            }else{
                                value = 4;
                            }
                        } else{
                            value = this.tabfile[i].value;
                        }
                        let way = this.tabfile[i].way;
                        data[listName] = [{"comparison":comparison,"link":way,"value":value}];
                    }
                };
                let id = this.tabcount[this.idx].code;
                data.no =[{"comparison":"==","link":"&&","value":id}];
                console.log(data)
                this.paginationShow = false;
                this.currentPage4 = 1;
                this.$nextTick(function () {
                    this.paginationShow = true;
                })
                this.checktime = 2;
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
                        this.tableDet = result;
                        this.InventoryFile = false;
                        this.totalElements = res.data.totalElements
                    })
                    .catch((err) =>{console.log(err)});
            },
            getDet(){
                this.tabcount=this.tabData;
                let data = {"no":[{"comparison":"==","link":"&&","value":this.id}]};
                this.$axios({
                    method:"post",
                    url:"/api/inventory/history/detail/find",
                    data:data,
                    headers:{"Content-Type":"application/json"}
                })
                    .then((res)=>{
                        this.totalElements = res.data.totalElements
                        //初始化明细列表
                        this.tableDet = [];
                        let result = res.data.content;
                        this.filetime(result);
                        this.tableDet = result;

                    })
                    .catch((err) =>{console.log(err)});
            },
            cellClassName ({column,rowIndex, columnIndex}) {
                for(var i = 0;i<this.tableData4.length;i++) {
                    if(this.tableData4[i].prop == 'status'){
                        this.move = i;
                    }
                }
                if(columnIndex === this.move){
                    if(this.tableDet[rowIndex].status == '盘盈'){
                        return 'blue';
                    } else if(this.tableDet[rowIndex].status == '盘亏'){
                        return 'red';
                    } else {
                        return'';
                    }
                }
            },
            filetime(res){
                //过滤时间格式
                for(let i=0;i <res.length;i++){
                    res[i].No =i+1;
                    let creat = new Date(res[i].createDate);
                    let last = new Date(res[i].lastModifyDate);
                    res[i].createDate =creat.getFullYear() + '-' + this.add(creat.getMonth()+1) + '-' + this.add(creat.getDate())+ ' ' + this.add(creat.getHours()) + ':' + this.add(creat.getMinutes()) + ':' + this.add(creat.getSeconds());
                    res[i].lastModifyDate = last.getFullYear() + '-' + this.add(last.getMonth()+1) + '-' + this.add(last.getDate())+ ' ' + this.add(last.getHours()) + ':' + this.add(last.getMinutes()) + ':' + this.add(last.getSeconds());
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
            add(m){
                return m <10? "0"+ m :m;
            },
            go() {
                this.$emit('changeshow');
            },
            diff(){1
                this.$axios({
                    method:"get",
                    url: "/api/inventory/history/cloth/error/" + this.id,
                    headers: {"Content-Type": "application/json"}
                })
                    .then((res)=>{
                    this.changestatus(res);
                    this.difference = true;
                    })
                    .catch((err) =>{
                    });
            },
            //过滤数据状态
            changestatus(res){
                for(var i=0;i<res.data.length;i++) {
                    switch (res.data[i].status){
                        case 1:
                            res.data[i].status = "正常";
                            break;
                        case 2:
                            res.data[i].status = "盘亏";
                            break;
                        case 3:
                            res.data[i].status = "盘盈";
                            break;
                    }
                }
                this.tabdiff = res.data;
            },
            changearea(idx){
                this.idx = idx;
                if(this.tabdiff[this.idx].status == "盘盈") {
                    this.dialogVisible = true;
                } else {
                    this.$message({
                        message: '标记为异常',
                        type: 'warning'
                    });
                    var cloths = {
                        epc:this.tabdiff[idx].epc,
                        status:4
                    };
                   this.clothsbox.push(cloths);
                }
            },
            completion(e){
                let key = e.keyCode;
                switch (key) {
                    case 38:
                        //上
                        this.focusList <= 0? 0 : this.focusList--;
                        this.info = this.auto[this.focusList].code;
                        break;
                    case 40:
                        //下
                        this.focusList >= this.auto.length-1 ? this.auto.length-1 :  this.focusList++;
                        this.info = this.auto[this.focusList].code;
                        break;
                    case 13:
                        //回车
                        //初始化
                        this.focusList = -1;
                        this.show = false;
                        break;
                    default:
                        let param = JSON.stringify({code:[{comparison:'like',link:'&&',value:this.info}]});
                        this.$axios({
                            method: "post",
                            url: "/api/inventory/lattice/find",
                            data: param,
                            headers: {"Content-Type": "application/json"}
                        }).then(res=>{
                            this.auto = res.data.content;
                            if(this.info != '') {
                                this.show = true;
                            }
                        })
                            .catch(err=>{console.log(err)})
                        break;
                }

            },
            autoshow(idx){
                this.show = false;
                this.info = this.auto[idx].code;
            },
            confirm(){
                if(this.info != '') {
                    this.tabdiff[this.idx].lattice = this.info;
                }
                var cloth = {
                    epc:this.tabdiff[this.idx].epc,
                    location:this.tabdiff[this.idx].lattice
                };
                this.clothsbox.push(cloth);
                this.dialogVisible = false;
            },
            save(){
                let param =JSON.stringify(this.clothsbox);
                this.$axios({
                    method: "put",
                    data: param,
                    url: "/api/inventory/history/cloth/status/" + this.id,
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                    this.difference = false;
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });

                }).catch(error => {console.log(error)});

            },
            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
                let num = val-1;
                if(this.checktime == 0){
                    this.$axios({
                        methods:"get",
                        url: "/api/inventory/history/detail?page=" + num + "&no="+this.id,
                        headers: {"Content-Type": "application/json"},
                    }).then(res=>{
                        this.tableDet = [];
                        let result = res.data.content;
                        this.filetime(result);
                        this.tableDet =result;
                    }).catch(err=>{console.log(err)});
                } else if(this.checktime == 2) {
                    let data = {};
                    var value;
                    for(var i=0;i<this.tabfile.length;i++){
                        if(this.tabfile[i].listName){
                            let listName = this.tabfile[i].listName;
                            let comparison = this.tabfile[i].compare;
                            if(this.tabfile[i].listName == 'status') {
                                if(this.tabfile[i].value == '正常') {
                                    value = 1;
                                } else if(this.tabfile[i].value == '盘盈'){
                                    value = 2;
                                }else if(this.tabfile[i].value == '盘亏'){
                                    value = 3;
                                }else{
                                    value = 4;
                                }
                            } else{
                                value = this.tabfile[i].value;
                            }
                            let way = this.tabfile[i].way;
                            data[listName] = [{"comparison":comparison,"link":way,"value":value}];
                        }
                    };
                    let id = this.tabcount[this.idx].code;
                    data.no =[{"comparison":"==","link":"&&","value":id}];
                    this.$axios({
                        method:"post",
                        url:"/api/inventory/history/detail/find?page="+ num + "&no="+this.id,
                        data:data,
                        headers:{"Content-Type":"application/json"}
                    })
                        .then((res)=>{
                            //过滤条件格式
                            this.tableDet = [];
                            let result = res.data.content;
                            this.filetime(result);
                            this.tableDet = result;
                            this.totalElements = res.data.totalElements
                        })
                        .catch((err) =>{console.log(err)});
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
        }
    }
</script>
<!--0B001705160198-->

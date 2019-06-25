<template>
    <div class="genre">
        <div class="container">
             <el-row>
                 <el-col :span="9">
                     <div class="genre-block">
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
                 </el-col>
                 <el-col :span="3">
                     <div class="genre-block">
                         <el-select v-model="value" placeholder="请选择">
                             <el-option
                                 v-for="item in operationName"
                                 :key="item.value"
                                 :label="item.value"
                                 :value="item.value">
                             </el-option>
                         </el-select>
                     </div>
                 </el-col>
                 <el-col :span="3" :offset="1">
                     <el-input v-model="username" placeholder="请输入姓名"></el-input>
                 </el-col>
                 <el-col :span="4" :offset="4">
                     <div class="w-h-div delivery-note delivery-right" @click="checkdata">
                         <span class="tab-btn  delivery-note-text">查询</span>
                     </div>
                 </el-col>
             </el-row>
            <div class="genre-tab top10">
                <el-table
                :data="tablist"
                style="width: 100%;text-align: center;cursor: pointer;"
                :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                height="545px"
                :row-style="{height:'50px',fontSize:'16px'}">
                    <el-table-column
                        prop="No"
                        label="编号"
                    width="120">
                    </el-table-column>
                    <template v-for="(val,index) in tabHead">
                        <el-table-column
                            :prop="tabCol[index].prop"
                            :label="val.label"
                            :key="index"
                            v-if="val.prop != 'No'">
                        </el-table-column>
                    </template>
                </el-table>
            </div>
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
        </div>
    </div>
</template>

<script>
    import Sortable from 'sortablejs'
    import {filetime,add} from '~@/../../static/js/index.js'
    export default {
        name: "genre",
        data() {
            return {
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
                operationName: [],
                value: '',
                username:"",
                tabHead:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"username",
                        label:"操作人"
                    },
                    {
                        prop:"operationName",
                        label:"操作分类标识"
                    },
                    {
                        prop:"operationContext",
                        label:"操作内容"
                    },
                    {
                        prop:"operationDate",
                        label:"操作时间"
                    }
                ],
                tabCol:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"username",
                        label:"操作人"
                    },
                    {
                        prop:"operationName",
                        label:"操作分类标识"
                    },
                    {
                        prop:"operationContext",
                        label:"操作内容"
                    },
                    {
                        prop:"operationDate",
                        label:"操作时间"
                    }
                ],
                tablist:[],
                //分页
                currentPage: 1,
                totalElements:0,
                paginationShow : true,
                checkpage:1
            }
        },
        created() {
            //调用主表
            this.getOperational();
            //调用管理下拉信息
            this.getOperationalMark();

        },
        mounted(){
            //调用拖拽效果
            this.columnDrop();

        },
        methods: {
            //获取主表
            getOperational(){
                this.$axios({
                    method:"get",
                    url:"/api/operational",
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    this.tablist=[];
                    this.addData(res);
                    this.totalElements = res.data.totalElements;
                }).catch(err=>{
                    console.log(err)
                })
            },
            //获取管理下拉信息
            getOperationalMark(){
                 this.$axios({
                     method:"get",
                     url:"/api/operational/mark",
                     headers:{"Content-Type":"application/json"}
                 }).then(res=>{
                     for(var index=0;index<res.data.length;index++){
                         let str = {};
                         let item = res.data[index];
                         str.value = item;
                        this.operationName.push(str)
                     }
                 }).catch(err=>{
                     console.log(err)
                 })
             },
            //拖拽效果
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
            //查询
            checkdata(){
                this.currentPage = 1;
                this.paginationShow = false;
                this.$nextTick(function () {
                    this.paginationShow = true;
                });
                this.checkpage = 2;
                let  str = this.checkupdata();
               this.$axios({
                   method:"post",
                   url:"/api/operational/find",
                   data:str,
                   headers:{"Content-Type":"application/json"}
               }).then(res=>{
                this.tablist=[];
                this.addData(res);
                this.totalElements = res.data.totalElements;
               }).catch(err=>{
                console.log(err)
               })
            },
            //查询格式
            checkupdata(){
                let operationval ={};
                let operationDate=[{"comparison": ">=", "link": "&&", "value": this.value1}, {"comparison": "<=", "link": "&&", "value": this.value2}];
                let username=[{"comparison": "==", "link": "&&", "value": this.username}];
                let operationName=[{"comparison": "==", "link": "&&", "value": this.value}];
                if(this.value1 != '' && this.value2 !='') {
                    operationval.operationDate =operationDate;
                    if(this.value !=''){
                        operationval.operationName = operationName
                    } else if(this.username != ''){
                        operationval.username =username;
                    }
                } else if(this.value != ''){
                    operationval.operationName = operationName;
                    if(this.username != ''){
                        operationval.username = username;
                    }
                } else if(this.username != ''){
                    operationval.username = username;
                } else if((this.value1 != '' && this.value2 == '') || (this.value1 == '' && this.value2 != '')){
                    this.$message({
                        message: '请输入正确的时间范围',
                        type: 'warning'
                    });
                } else {
                    return;
                }
                return operationval;
            },
            //获取数据过滤
            addData(res){
                let result = res.data.content;
                for(var index=0;index<result.length;index++) {
                    let item = result[index];
                    item.No = index+1;
                    item.operationDate = filetime(new Date(item.operationDate));

                }
                this.tablist = result;
            },
            //分页处理
            handleCurrentChange(val){
                this.currentPage =val;
                 let count = val-1;
                 if(this.checkpage == 1){
                     this.$axios({
                         method:"get",
                         url:"/api/operational?page=" + count,
                         headers:{"Content-Type":"application/json"}
                     }).then(res=>{
                         this.tablist=[];
                         this.addData(res);
                     }).catch(err=>{
                         console.log(err)
                     })
                 } else {
                        let  str = this.checkupdata();
                        this.$axios({
                            method:"post",
                            url:"/api/operational/find?page=" + count,
                            data:str,
                            headers:{"Content-Type":"application/json"}
                        }).then(res=>{
                            this.tablist=[];
                            this.addData(res);
                        }).catch(err=>{
                            console.log(err)
                        })
                 }
            },
        }
    }
</script>


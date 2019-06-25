<template>
    <div class="department">
       <div class="container">
            <div class="Structure-search">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-input
                            v-model="value"
                            placeholder="#部门名称"
                            @keyup.native="checkName"
                            suffix-icon="el-icon-search">
                        </el-input>
                    </el-col>
                    <el-col :span="6" :offset="12">
                        <div class="w-h-div delivery-note delivery-right">
                            <div class="tab-btn  delivery-note-text" @click="visible=true">+添加部门</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
           <div class="Structure-tab top20">
               <el-table
                   :data="tablist"
                   style="width: 100%;text-align: center;cursor: pointer;"
                   :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center',fontSize:'14px'}"
                   :row-style="{height:'50px',fontSize:'16px'}"
                   height="560px"
               >
                   <template v-for="(val,index) in tabHead">
                       <el-table-column
                           :prop="tabCol[index].prop"
                           :label="val.label"
                           :key="index"
                           v-if="tabCol[index].prop != 'Operation'">
                       </el-table-column>
                   </template>
                       <el-table-column
                           prop="Operation"
                           label="操作"
                       >
                           <template slot-scope="scope">
                               <div class="wm-tableIcon-td">
                                   <i class="icon-modify"  @click="edit(scope.$index)"></i>
                                   <i class="icon-del"  @click="tabdel(scope.$index)"></i>
                               </div>
                           </template>
                       </el-table-column>
               </el-table>
               <div class="block">
                   <el-pagination
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       layout="total ,prev, pager, next, jumper"
                       :total=totalElements
                       v-if="paginationShow">
                   </el-pagination>
               </div>
           </div>
       </div>
        <!--添加部门-->
        <el-dialog
            title="添加部门"
            :visible.sync="visible"
            width="35%">
            <div class="add-Structure">
                <div class="form-Structure">
                    <el-form ref="form" :model="form" label-width="90px">
                        <el-form-item label="部门名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="部门管理员">
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btn-Structure">
                    <span class="tab-btn special-btn2" @click="visible = false">取消</span>
                    <span class="tab-btn special-btn2" @click="addsave">保存</span>
                </div>
            </div>
        </el-dialog>
        <!--修改-->
        <el-dialog
            title="修改信息"
            :visible.sync="visible2"
            width="35%">
            <div class="add-Structure">
                <div class="form-Structure">
                    <el-form ref="form" :model="form" label-width="90px">
                        <el-form-item label="部门名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="部门管理员">
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btn-Structure">
                    <span class="tab-btn special-btn2" @click="visible2 = false">取消</span>
                    <span class="tab-btn special-btn2" @click="editsave">保存</span>
                </div>
            </div>
        </el-dialog>
        <!--删除-->
        <el-dialog
            title="删除"
            :visible.sync="del"
            width="30%"
            center>
            <div class="del-list">你确定要删除这条数据吗</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="del = false">取 消</el-button>
                <el-button type="primary" @click="Deletions">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Sortable from 'sortablejs'
    import {filetime,add} from '~@/../../static/js/index.js'
    export default {
        name: "Structure",
        data() {
            return {
                value:"",
                tabHead:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"name",
                        label:"部门名称"
                    },
                    {
                        prop:"code",
                        label:"部门管理员"
                    },
                    {
                        prop:"createDate",
                        label:"创建时间"
                    },
                    {
                        prop:"createBy",
                        label:"创建人"
                    },
                    {
                        prop:"lastModifyDate",
                        label:"修改时间"
                    },
                    {
                        prop:"lastModifyBy",
                        label:"修改人"
                    }/*,
                    {
                        prop:"Operation",
                        label:"操作"
                    }*/],
                tabCol:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"name",
                        label:"部门名称"
                    },
                    {
                        prop:"code",
                        label:"部门管理员"
                    },
                    {
                        prop:"createDate",
                        label:"创建时间"
                    },
                    {
                        prop:"createBy",
                        label:"创建人"
                    },
                    {
                        prop:"lastModifyDate",
                        label:"修改时间"
                    },
                    {
                        prop:"lastModifyBy",
                        label:"修改人"
                    }/*,
                    {
                        prop:"Operation",
                        label:"操作"
                    }*/
                ],
                tablist:[],
                currentPage:1,
                totalElements:0,
                paginationShow:true,
                visible:false,
                form:{
                    name:'',
                    code:''
                },
                visible2:false,
                del:false,
                editNo:0,
                delNo:0,
            }
        },
        created() {
        },
        mounted(){
            this.columnDrop();
        },
        watch:{
            visible(){
                if(!this.visible){
                    //初始化
                    this.form={
                        name:'',
                        user:'',
                        remarks:''
                    }
                }
            },
            visible2(){
                if(!this.visible2){
                    //初始化
                    this.form={
                        name:'',
                        user:'',
                        remarks:''
                    }
                }
            }
        },
        created(){
            this.getdepartment();
        },
        methods: {
            columnDrop() {
                const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
                this.sortable = new Sortable(wrapperTr, {
                    animation: 180,
                    delay: 0,
                    filter:".ignore-elements",
                    onEnd: evt => {
                        const oldItem = this.tabCol[evt.oldIndex];
                        this.tabCol.splice(evt.oldIndex, 1);
                        this.tabCol.splice(evt.newIndex, 0, oldItem);
                    }
                })
            },
            edit(idx){
                this.visible2 = true;
                this.editNo = idx;
                this.form = {
                    name:this.tablist[idx].name,
                    code:this.tablist[idx].code
                }
            },
            tabdel(idx) {
                this.del = true;
                this.delNo = idx;
            },
            //获取主表
            getdepartment(){
                this.$axios({
                    method:"get",
                    url:"/api/group",
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                   let result = res.data.content;
                   this.pushlist(result);
                    this.currentPage = res.data.currentPage;
                    this.totalElements = res.data.totalElements;
                }).catch(err=>{
                    console.log(err)
                })
            },
            pushlist(result){
                for(var index=0;index<result.length;index++) {
                    let item = result[index];
                    item.No = index+1;
                    item.createDate = filetime(new Date(item.createDate));
                    item.lastModifyDate = filetime(new Date(item.lastModifyDate));
                    this.tablist.push(item);
                }
            },
            //分页
            handleCurrentChange(val){
                this.currentPage = val;
                var count = val-1;
                this.$axios({
                    method:"get",
                    url:"/api/group?page=" + count,
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    let result = res.data.content;
                    this.tablist = [];
                    this.pushlist(result);
                    this.totalElements = res.data.totalElements;
                }).catch(err=>{
                    console.log(err)
                })
            },
            //添加部门
            addsave (){
                this.visible = false;
                let params = {
                    code:this.form.code,
                    name:this.form.name
                }
                let obj = JSON.stringify(params);
                //添加部门数据刷新页面（axios）
                this.$axios({
                    method:'post',
                    url:"/api/group",
                    data:obj,
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    //初始化数据
                    this.tablist = [];
                    this.form={
                        name:'',
                        code:''
                    }
                    this.getdepartment();
                }).catch(err=>{
                    console.log(err)
                })

            },
            //修改部门信息
            editsave (){
                this.visible2 = false;
                //添加部门数据刷新页面（axios）editNo
                let params = {
                    name:this.form.name,
                    code:this.form.code,
                    id:this.tablist[this.editNo].id
                };
                let obj = JSON.stringify(params);
                this.$axios({
                    method:'put',
                    url:"/api/group/" + this.tablist[this.editNo].id,
                    data:obj,
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    this.tablist = [];
                    this.form={
                        name:'',
                        code:''
                    }
                    this.getdepartment();
                }).catch(err=>{
                    console.log(err)
                })
            },
            //删除部门信息
            Deletions(){
                this.del = false;
                //删除该条信息delNo
                this.$axios({
                    method:"Delete",
                    url:"/api/group/" + this.tablist[this.delNo].id,
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    this.tablist = [];
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getdepartment();
                }).catch(err=>{
                    console.log(err)
                })

            },
            //查询部门名称
            checkName(){
            var name = {"name":[{"comparison":"like","link":"&&","value":this.value}]};
            if(this.value.length>0){
                this.$axios({
                    method:"post",
                    url:"/api/group/find",
                    data:name,
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    let result = res.data.content;
                    this.tablist=[];
                    this.pushlist(result);
                }).catch(err=>{
                    console.log(err)
                })
            } else {
                this.tablist=[];
                this.getdepartment()
            }

            }
        }
    }
</script>


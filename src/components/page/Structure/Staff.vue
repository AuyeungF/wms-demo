<template>
    <div class="staff">
        <div class="container">
            <div class="Structure-search">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-input
                            v-model="value"
                            placeholder="#员工姓名"
                            @keyup.native="checkName"
                            suffix-icon="el-icon-search">
                        </el-input>
                    </el-col>
                    <el-col :span="6" :offset="12">
                        <div class="w-h-div delivery-note delivery-right">
                            <div class="tab-btn  delivery-note-text" @click="addStaff">+添加员工</div>
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
                            v-if="tabCol[index].prop != 'operation'">
                        </el-table-column>
                        <el-table-column
                            :prop="tabCol[index].prop"
                            :label="val.label"
                            :key="index"
                            v-if="tabCol[index].prop == 'operation'">
                            <template slot-scope="scope">
                                <div class="wm-tableIcon-td">
                                    <i class="icon-modify"  @click="edit(scope.$index)"></i>
                                    <i class="icon-del"  @click="tabdel(scope.$index)"></i>
                                </div>
                            </template>
                        </el-table-column>
                    </template>
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
            title="添加员工"
            :visible.sync="visible"
            width="35%">
            <div class="add-Structure">
                <div class="form-Structure">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="员工名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="账号名">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="所在部门">
                            <el-select v-model="form.group.id" placeholder="所在部门">
                                <template v-for="(val,index) in groupName">
                                    <el-option :label="val.label" :value="val.value" :key="index"></el-option>
                                </template>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否启用账号">
                            <el-radio v-model="form.isEnable" label="启动">启动</el-radio>
                            <el-radio v-model="form.isEnable" label="禁止">禁止</el-radio>
                        </el-form-item>
                        <el-form-item label="账号是否锁定">
                            <el-radio v-model="form.isLock" label="锁定">锁定</el-radio>
                            <el-radio v-model="form.isLock" label="解锁">解锁</el-radio>
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
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="员工名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="账号名">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="所在部门">
                            <el-select v-model="form.group.id" placeholder="所在部门">
                                <template v-for="(val,index) in groupName">
                                    <el-option :label="val.label" :value="val.value" :key="index"></el-option>
                                </template>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否启用账号">
                            <el-radio v-model="form.isEnable" label="启动">启动</el-radio>
                            <el-radio v-model="form.isEnable" label="禁止">禁止</el-radio>
                        </el-form-item>
                        <el-form-item label="账号是否锁定">
                            <el-radio v-model="form.isLock" label="锁定">锁定</el-radio>
                            <el-radio v-model="form.isLock" label="解锁">解锁</el-radio>
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
                        label:"员工名称"
                    },
                    {
                        prop:"username",
                        label:"账户名"
                    },
                    {
                        prop:"groupName",
                        label:"所在部门"
                    },
                    {
                        prop:"isEnable",
                        label:"是否启用账号"
                    },
                    {
                        prop:"isLock",
                        label:"账户是否被锁定"
                    },
                    {
                        prop:"lastLoginTime",
                        label:"最后登录时间"
                    },
                    {
                        prop:"operation",
                        label:""
                    }],
                tabCol:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"name",
                        label:"员工名称"
                    },
                    {
                        prop:"username",
                        label:"账户名"
                    },
                    {
                        prop:"groupName",
                        label:"所在部门"
                    },
                    {
                        prop:"isEnable",
                        label:"是否启用账号"
                    },
                    {
                        prop:"isLock",
                        label:"账户是否被锁定"
                    },
                    {
                        prop:"lastLoginTime",
                        label:"最后登录时间"
                    },
                    {
                        prop:"operation",
                        label:""
                    }],
                //数据源
                tablist:[],
                currentPage:1,
                totalElements:0,
                paginationShow:true,
                visible:false,
                form:{
                    name:'',
                    username:'',
                    group:{
                        id:""
                    },
                    isEnable:'启动',
                    isLock:'解锁',
                    password:' '
                },
                groupName:[],
                visible2:false,
                del:false,
                editNo:0,
                delNo:0,
            }
        },
        created() {
            console.log(this.$msg)
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
                        username:'',
                        group:{
                            id:""
                        },
                        isEnable:'启动',
                        isLock:'解锁',
                        password:' '
                    }
                }
            },
            visible2(){
                if(!this.visible2){
                    //初始化
                    this.form={
                        name:'',
                        username:'',
                        group:{
                            id:""
                        },
                        isEnable:'启动',
                        isLock:'解锁',
                        password:' '
                    }
                }
            }
        },
        created(){
            this.getstaff();
        },
        methods: {
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
            edit(idx){
                this.visible2 = true;
                this.editNo = idx;
                let obj = this.tablist[idx];
                this.checkgroup();
                this.form = {
                    name:obj.name,
                    username:obj.username,
                    group:{
                        id:obj.group.id
                    },
                    isEnable:obj.isEnable,
                    isLock:obj.isLock,
                    password:' '
                }
            },
            tabdel(idx) {
                this.del = true;
                this.delNo = idx;
            },
            //获取主表
            getstaff(){
                this.$axios({
                    method:"get",
                    url:"/api/user",
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    this.tablist = [];
                    let result = res.data.content;
                    this.totalElements = res.data.totalElements;
                    this.currentPage = res.data.totalPages;
                   this.pushlist(result);
                }).catch(err=>{
                    console.log(err)
                })
            },
            pushlist(result){
                for (var index = 0; index<result.length;index++){
                    let item = result[index];
                    item.No = index+1;
                    item.lastLoginTime = filetime(new Date(item.lastLoginTime));
                    item.groupName = item.group.name;
                    item.isEnable = item.isEnable ? '启动' : "禁止";
                    item.isLock = item.isLock ? '锁定' : "解锁";
                    this.tablist.push(item);
                };
            },
            //分页
            handleCurrentChange(val){
                this.currentPage = val;
                let count = val-1;
                this.$axios({
                    method:"get",
                    url:"/api/user?page=" + count,
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            },
            addStaff(){
                this.visible = true;
                this.checkgroup();
            },
            //查看部门
            checkgroup(){
                this.$axios({
                    method:"get",
                    url:"/api/group",
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    this.groupName = [] ;
                    let result = res.data.content;
                    for(var index = 0 ;index<result.length;index++){
                        let   item  = result[index];
                        let   list = {
                            value :item.id,
                            label : item.name
                        };
                        this.groupName.push(list)
                    }
                }).catch(err=>{
                    console.log(err)
                });
            },
            //添加员工
            addsave (){
                this.visible = false;
                //添加部门数据刷新页面（axios）
                this.form.isEnable = this.form.isEnable == '启动' ? true: false;
                this.form.isLock = this.form.isLock == '锁定' ? true: false;
                let obj = JSON.stringify(this.form);
                this.$axios({
                    method:"post",
                    url:"/api/user",
                    data:obj,
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    this.tablist = [];
                    this.getstaff();
                }).catch(err=>{
                    console.log(err)
                });
            },
            //修改员工信息
            editsave (){
                this.visible2 = false;
                //添加部门数据刷新页面（axios）editNo
                this.form.id = this.tablist[this.editNo].id;
                this.form.roles = this.tablist[this.editNo].roles;
                this.form.isEnable = this.form.isEnable == '启动' ? true: false;
                this.form.isLock = this.form.isLock == '锁定' ? true: false;
                let params = JSON.stringify(this.form);
                this.$axios({
                    method:"put",
                    url:"/api/user/"+this.tablist[this.editNo].id,
                    data:params,
                    headers:{"Content-Type":"application/json"}
                }).then(res=>{
                    this.tablist=[];
                    this.getstaff();
                }).catch(err=>{
                    console.log(err)
                })
            },
            //删除员工信息
            Deletions(){

                this.del = false;
                //删除该条信息delNo
                this.$axios({
                    method:"delete",
                    url:"/api/user/" + this.tablist[this.delNo].id,
                    headers:{"Content-Type":"application/json"}
                }).then(err=>{
                    this.tablist = [];
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getstaff();
                }).catch(err=>{
                    console.log(err)
                })

            },
            //查询员工
            checkName(e){
                var name = {"name":[{"comparison":"like","link":"&&","value":this.value}]};
                if(this.value.length>0){
                    this.$axios({
                        method:"post",
                        url:"/api/user/find",
                        data:name,
                        headers:{"Content-Type":"application/json"}
                    }).then(res=>{
                        let result = res.data.content;
                        this.tablist=[];
                       this.pushlist(result);
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.tablist=[];
                    this.getstaff();
                }

            }
        }
    }
</script>


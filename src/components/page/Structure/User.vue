<template>
    <div class="User">
        <div class="container">
            <div class="Structure-search User-Structure-search">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-input
                            suffix-icon="el-icon-search"
                            v-model="value2"
                            placeholder="#角色名称">
                        </el-input>
                    </el-col>

                <!--添加角色-->
                    <el-col :span="6" :offset="12">
                        <div class="w-h-div delivery-note delivery-right">
                            <div class="tab-btn  delivery-note-text" @click="addUser()">+添加角色</div>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <el-dialog :visible.sync="visible" class="User-dialog">
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="添加角色名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用角色" prop="delivery">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                    </el-form-item>
                </el-form>
                <div class="User-Preservation-User delivery-note">
                    <div class="tab-btn  delivery-note-text" @click="onSubmit()">保存</div>
                </div>
            </el-dialog>

            <div class="Structure-tab top20">
                <div class="User-list">

                <!--角色名称菜单栏-->
                    <div class="User-list-left">
                        <h6 class="list-select-top">角色名称</h6>
                        <ul class="list-left-select">
                            <template v-for="(item,index) in select" >
                                <li :class="{selected:index == tabIndex}"
                                    @click="showthat(index)" >{{item.name}}
                                    <i class="el-icon-delete" @click="deletethat()"></i>
                                </li>
                            </template>
                        </ul>

                    </div>

                <!--权限设置勾选-->
                    <div class="User-table-right">
                        <h6 class="list-select-top">权限设置</h6>
                        <template>
                            <el-tree
                                :data="datatable"
                                show-checkbox
                                node-key="id"
                                ref="tree"
                                @check-change="checkChange"
                                :default-expanded-keys="[2, 3]"
                                :default-checked-keys="[]"
                                :props="defaultProps">
                            </el-tree>
                        </template>
                    </div>

                <!--保存数据-->
                    <div class="User-table-Preservation delivery-note">
                        <div class="tab-btn  delivery-note-text" @click="changeChannel()">保存</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component.vue";

    export default {
        components: {ElDialog},
        name: "Structure",
        data() {
            return {
                value:"",
                value2:"",
                tabHead:[
                    {
                        prop:"No",
                        label:"编号"
                    },
                    {
                        prop:"Name",
                        label:"角色名称"
                    },
                    {
                        prop:"Iphone",
                        label:"角色权限"
                    },
                    {
                        prop:"CreateDate",
                        label:"创建时间"
                    },
                    {
                        prop:"Remarks",
                        label:"备注"
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
                        prop:"Name",
                        label:"角色名称"
                    },
                    {
                        prop:"Iphone",
                        label:"角色权限"
                    },
                    {
                        prop:"CreateDate",
                        label:"创建时间"
                    },
                    {
                        prop:"Remarks",
                        label:"备注"
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
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    region: [
                        { required: true }
                    ],
                },
                form:{
                    Name:'',
                    Remarks:'',
                    name:'',
                },
                visible2:false,
                del:false,
                //权限内容
                datatable: [],
                checkArray:[],
                defaultProps: {
                    children: 'child',
                    label: 'name',
                },
                //全部数据
                select:[],
                tabIndex:0,
                currentRole:null,
                authorityChangeEvent:false,
                roleChangeEvent:false,
                alertonce:1,
                textone:false,
            }
        },
        created() {
            this.getRole();
            this.getAuthority();
        },
        mounted(){},
        watch: {
            visible() {
                if (!this.visible) {
                    //初始化
                    this.form = {
                        Name: '',
                        Remarks: ''
                    }
                }
            },
            visible2() {
                if (!this.visible2) {
                    //初始化
                    this.form = {
                        Name: '',
                        Remarks: ''
                    }
                }
            },
        },
        methods: {
            columnDrop() {
                const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
                /*this.sortable = new Sortable(wrapperTr, {
                    animation: 180,
                    delay: 0,
                    onEnd: evt => {
                        const oldItem = this.tabCol[evt.oldIndex];
                        this.tabCol.splice(evt.oldIndex, 1);
                        this.tabCol.splice(evt.newIndex, 0, oldItem);
                    }
                })*/
            },
            edit(idx){
                this.visible2 = true;
                this.editNo = idx;
            },
            tabdel(idx) {
                this.del = true;
                this.delNo = idx;
            },
            //添加员工
            addsave (){
                this.visible = false;
                //初始化
                this.form={
                    Name:'',
                    Remarks:'',
                }
                //添加部门数据刷新页面（axios）

            },
            addUser() {
                this.visible = true;
            },
            //添加角色名称
            onSubmit() {
                this.visible = false;
                var getnames = this.form.name;
                var isEnable =  this.ruleForm.delivery;
                var Usernames = {"name": getnames,"isEnable":isEnable};
//                console.log(Usernames)
                this.$axios({
                    method: "post",
                    url: "/api/role/",
                    headers: {"Content-Type": "application/json"},
                    data:Usernames
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.getRole();
                    this.getAuthority();
                }).catch(error =>{});
            },
            // 点击角色名称显示勾选权限
            showthat(index) {
                if(this.textone === true){
                    this.checkChangeyet();
                    this.textone = false;
                }else{
                    this.tabIndex = index;
                    this.currentRole = this.select[index]
                    // this.select[index]所有权限 authorities
                    this.showAllauthorities(this.select[index].authorities);
                }
//                console.log(this.textone)
            },
            showAllauthorities(authorities) {
                this.$refs.tree.setCheckedKeys([]);
                this.checkArray = [];
                for(var i=0; i<authorities.length; i++) {
                    var currendId = authorities[i].id;
                    this.checkArray.push(currendId);
                }
                this.$refs.tree.setCheckedKeys(this.checkArray);
            },
            //删除请求
            deletethat() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: "Delete",
                        url: "/api/role/" + this.currentRole.id ,
                        headers: {"Content-Type": "application/json"},
                    }).then(res => {
                        this.getRole();
                        this.getAuthority();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(error =>{});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            checkChange(data){
                var keys = this.$refs.tree.getCheckedKeys();
                if((keys != this.checkArray.toString()) && (keys!= null)){
                    this.textone = true;
                }
            },
            //提示
            checkChangeyet() {
                this.$confirm('修改未保存，保存请按确定', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.changeChannel();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            /**
             * 获取所有角色的权限
             * /api/role
             * @param callback 数据回调
             * @code 新增成功返回true,否则返回false
             */
            getRole(callback){
                this.$axios({
                    method: "get",
                    url: "/api/role",
                    headers: {"Content-Type": "application/json"}

                }).then(res => {
                this.select = res.data.content;
//                console.log(res.data.content)
                    this.showthat(0)
                }).catch(error =>{});
            },
            /**
             * 获取所有权限
             * /api/authority
             * @param callback 数据回调
             * @code 新增成功返回true,否则返回false
             */
            getAuthority() {
                this.$axios({
                    method: "get",
                    url: "/api/authority/",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                   this.datatable =res.data;
                }).catch(error =>{});
            },

            //提交数据
            changeChannel() {
                this.textone = false;
                var roleJson = this.currentRole;
                var keys = this.$refs.tree.getCheckedKeys();
                var value = [];
                for(var k in keys) {
                    value.push({"id": keys[k]})
                };
                roleJson.authorities = value;
                roleJson = JSON.stringify(roleJson);
//                console.log(roleJson)
                this.$axios({
                    method: "put",
                    url: "/api/role/" + this.currentRole.id ,
                    headers: {"Content-Type": "application/json"},
                    data:roleJson
                }).then(res => {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }).catch(error =>{});
            }
        }
    }
</script>

<style scoped>
    .User-list {
        width: 99%;
        height: 800px;
        border: 1px solid #D4D6E2;
        position: relative;
    }
    .User-list-left {
        width: 16%;
        height: 100%;
        display: inline-block;
        border-right: 1px solid #D4D6E2;
    }
    .list-select-top {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px solid #D4D6E2;
        margin-bottom: 0px;
    }
    .list-left-select li {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
    }
    .list-left-select li:hover {
        background: linear-gradient(to right, #0090ff,#00b9ff);
        color: #fff;
    }
    .User-table-right {
        width: 84%;
        height:100%;
        display: inline-block;
        position: absolute;
    }
    .container {
        padding: 30px 15px 65px 30px;
    }
    .User-table-Preservation {
        position: absolute;
        bottom: 4%;
        right: 3%;
    }
    .User-Preservation-User {
        position: absolute;
        top: 60%;
        right: 12%;
    }
</style>

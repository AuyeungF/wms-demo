<template>
    <div class="header">
        <el-row :gutter="20">
            <el-col :span="4"><div class="logo"><img src="static/img/logo.png" alt="Ridko"></div></el-col>
            <el-col :span="15"><div class="header-center"><span>智能仓储管理系统</span></div></el-col>
            <el-col :span="5">
                <div class="Handle"><a id="applyNo"  @click="jump">有{{applyNo}}张待处理申请单</a></div>
                <div class="header-right">
                <div class="header-user-con">
                    <!-- 全屏显示 -->
                    <!--<div class="btn-fullscreen" @click="handleFullScreen">-->
                        <!--<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">-->
                            <!--<i class="el-icon-rank"></i>-->
                        <!--</el-tooltip>-->
                    <!--</div>-->
                    <!-- 消息中心 -->
                    <!-- <div class="btn-bell">
                         <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                             <router-link to="/tabs">
                                 <i class="el-icon-bell"></i>
                             </router-link>
                         </el-tooltip>
                         <span class="btn-bell-badge" v-if="message"></span>
                     </div>-->
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div></el-col>
        </el-row>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'root',
                message: 2,
                applyNo:0
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('params');
                let name = JSON.parse(username)
                return username ? name.username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {

                if(command == 'loginout'){
                    let str = JSON.parse(localStorage.getItem('params'));
                    if(!str.rememberMe) {
                        localStorage.removeItem('params')
                    }
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            getApplyHandle(){

                this.$axios({
                    method:"get",
                    url:"/api/outbound/apply/count/isOutbound/false",
                    headers: {"Content-Type": "application/json"}
                }).then(res=>{
                    this.applyNo = res.data;
                }).catch(err=>{
                    console.log(err)
                })
            },
            jump(){
                bus.$emit('up',3)
                this.$router.push("/Outbound/outbound")
            }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            };
            this.getApplyHandle();
        }
    }
</script>
<style scoped>
    .header {
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        font-size: 22px;
        color: #000;
        background: #FFF;
        top:0;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        /*line-height: 70px;*/
    }
    .header .logo{
        width:150px;
        line-height: 56px;
        margin-top:5px;
    }
    .header .logo > img{
        max-width:120px;
        display: block;
        margin:0 auto;
    }
    .header-center span{
        text-align: center;
        display: block;
        line-height:56px;
        color: #7d7d7d;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 56px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #000;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>

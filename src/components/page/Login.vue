<template>
    <div class="login-wrap">
        <div class="container">
            <el-row>
                <el-col :span="12" class="login-left">
                    <div class="login-box">
                        <div class="login-title">登录</div>
                        <div class="login-logo">
                            <img src="static/img/logo.png" alt="">
                        </div>
                        <div class="login-introduce">亿锋智能仓库管理系统</div>
                        <div class="ms-login">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                                <el-form-item prop="username">
                                   <div class="login-icon login-user"></div>
                                    <el-input type="text" v-model="ruleForm.username" placeholder="请输入账号"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <div class="login-icon login-password"></div>
                                    <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <el-form-item prop="remember">
                                    <el-checkbox-group v-model="ruleForm.rememberMe">
                                        <el-checkbox label="记住我" name="remember"></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <div class="login-btn">
                                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" class="login-right">
                    <div class="login-bg">
                        <img src="static/img/login-BG.png" alt="">
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {

            /*
            rule validator方法
           value password的值
           callback 回调函数提示信息
           */

            /* 账号验证*/
            let validatename = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };

            /* 密码验证 */
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    //初始化登录信息
                    username: '',
                    password: '',
                    rememberMe: false
                },
                rules: {
                    //验证提示信息
                    username: [
                        {validator: validatename, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                },

            }
        },
        methods:{
            //提交验证信息
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let str1 = {
                            username: this.ruleForm.username,
                            password: this.ruleForm.password,
                            rememberMe: this.ruleForm.rememberMe
                        };
                      /*  localStorage.setItem('params', JSON.stringify(str1));
                        this.$router.push('/');*/
                        //api/ajax请求数
                        this.$axios({
                            method: "post",
                            url: "/api/authenticate/loginTo",
                            data: str1,//字段内容不能重复
                            headers: {"Content-Type": "application/json"}
                        })
                            .then((res) => {
                                localStorage.setItem('params', JSON.stringify(str1));
                                this.$router.push('/');
                            })
                            .catch((err) => {
                                console.log(err)
                            });
//


                    } else {
                        //提交不通过
                        return false;
                    }
                });
            },
            getItem() {
                let obj = JSON.parse(localStorage.getItem('params'));
                if(obj){
                    this.ruleForm = obj;
                }else {
                    return;
                }
            }
        },
        created() {
            this.getItem();
            let _this = this;
            document.onkeydown = (e) => {
                let code = e.keyCode;
                if(code == 13) {
                    _this.submitForm('ruleForm');
                } else {
                    return;
                }
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        overflow: hidden;
    }
    .login-wrap>.container{
        padding:0;
        max-width:1000px;
        overflow: hidden;
        border:0;
        -webkit-box-shadow: 0px 0px 50px #c1daff;
        -moz-box-shadow: 0px 0px 50px #c1daff;
        box-shadow: 0px 0px 50px #c1daff;
    }
    .ms-login{
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>

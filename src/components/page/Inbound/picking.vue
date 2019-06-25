<template>
    <div class="picking">
        <div class="new-inbound">
            <h4>新建备货单</h4>
            <span class="new-right" @click="go">
                < 返回
            </span>
        </div>
        <div class="new-form">
            <div class="Det-form">
                <el-row>
                    <el-col>
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-row class="form-two buttom10">
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="入仓单号:">
                                        <el-input v-model="form.inboundNo"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                        <el-form-item label="进仓日期:">
                                            <el-date-picker
                                                v-model="form.createDate"
                                                type="date"
                                                placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="存放点:">
                                        <el-input v-model="form.type"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="进仓类型:">
                                        <el-input v-model="form.type"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="客户po:">
                                        <el-input v-model="form.type"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="form-three buttom10">
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="客户名称:">
                                        <el-input v-model="form.inboundNo"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="染厂名称:">
                                        <el-input v-model="form.type"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="染厂色号:">
                                        <el-input v-model="form.type"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="缸号:">
                                        <el-input v-model="form.type"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <div class="w-h-div delivery-note" @click="checkedIn = true">
                                        <span class="tab-btn delivery-note-text">查看库存</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <div class="Det-tab buttom10">
                <template>
                    <el-table
                        :data="tabpick"
                        height="370"
                        :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                        align="center">
                        <template v-for="(val,index) in tabHead">
                            <el-table-column
                                :prop="val.prop"
                                :label="val.label"
                                align="center"
                                width="180">
                            </el-table-column>
                        </template>
                    </el-table>
                </template>
            </div>
            <div class="Det-btn">
                <span class="tab-btn special-btn2 outline textAlign">取消</span>
                <span class="tab-btn special-btn2 outline textAlign" :plain="true" @click="open">保存</span>
            </div>
        </div>
        <el-dialog title="查看库存" :visible.sync="checkedIn" class="tab-file">
            <div class="tab-set" style="margin-top: 5%;">
                <div class="file-box">
                    <template>
                        <el-table
                            :data="checkedlist"
                            height="500"
                            border
                            style="width: 100%;"
                            align="center"
                        >
                            <template v-for="(val,index) in  checkedHead">
                                <el-table-column
                                :prop="val.prop"
                                :label="val.label"
                                align="center">
                                </el-table-column>
                            </template>
                        </el-table>
                    </template>
                    <div class="check-btn">
                        <span class="tab-btn special-btn2 outline textAlign">取消</span>
                        <span class="tab-btn special-btn2 outline textAlign">保存</span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "picking",
        data(){
            return {
                checkedIn:false,
                form:{},
                tabpick:[],
                tabHead:[
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
                        label:"布种名称"
                    },
                    {
                        prop:"colorNo",
                        label:"销售色号"
                    },
                    {
                        prop:"color",
                        label:"颜色"
                    },
                    {
                        prop:"GramWeight",
                        label:"克重"
                    },
                    {
                        prop:"Sealdegree",
                        label:"封度"
                    },
                    {
                        prop:"EdgeSeal",
                        label:"至边封度"
                    },
                    {
                        prop:"Delivery",
                        label:"送货单号"
                    },
                    {
                        prop:"Entry",
                        label:"录入人"
                    },
                    {
                        prop:"EntryTime",
                        label:"录入时间"
                    },
                    {
                        prop:"ticketNo",
                        label:"布票号"
                    },
                    {
                        prop:"StorageWeight",
                        label:"入库重量"
                    },
                    {
                        prop:"entriesNo",
                        label:"入库条数"
                    },
                    {
                        prop:"remarks",
                        label:"备注"
                    }
                ],
                checkedlist:[],
                checkedHead:[
                    {
                        prop:"clothNo",
                        label:"布号"
                    },
                    {
                        prop:"captionName",
                        label:"产品名称"
                    },
                    {
                        prop:"color",
                        label:"颜色"
                    },
                    {
                        prop:"colorNo",
                        label:"色号"
                    },
                    {
                        prop:"vatDye",
                        label:"缸号"
                    },
                    {
                        prop:"num",
                        label:"库存数量"
                    },
                    {
                        prop:"checked",
                        label:"选择"
                    },
                    {
                        prop:"applyNum",
                        label:"申请数量"
                    }
                ]


            }
        },
        props:['show'],
        methods :{
            //返回上一页
            go(){
               this.$emit('changeshow')
            },
            open (){
                this.$message({
                    message:'保存成功',
                    type:'success'
                });
            }

        }

    }
</script>

<style scoped>

</style>

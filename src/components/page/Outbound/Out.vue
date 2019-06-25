<template>
    <div class="Out-Stock" v-cloak>
        <div class="new-outbound bottom10">
            <h4>新建备货单</h4>
            <span class="new-right out-go" @click="go">
            </span>
        </div>
        <div class="new-form ">
            <div class="Det-form">
                <el-row>
                    <el-col>
                        <el-form   label-width="80px" :model="ruleForm" ref="ruleForm" :rules="rules">
                            <el-row class="form-two buttom10">
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="申请类型:"  prop="type">
                                        <el-select v-model="ruleForm.type" placeholder="请选择" size="mini">
                                            <el-option
                                                v-for="item in outType"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="客户名称:"  prop="clientName">
                                        <el-input v-model="ruleForm.clientName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="客户编号:" prop="clientNo">
                                        <el-input v-model="ruleForm.clientNo"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="目的地:" prop="destination">
                                        <el-input v-model="ruleForm.destination"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="form-three buttom10">
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="发货公司:" prop="shipCompany">
                                        <el-input v-model="ruleForm.shipCompany"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="接货公司:" prop="acceptCompany">
                                        <el-input v-model="ruleForm.acceptCompany"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date">
                                    <el-form-item label="备注:" prop="remark">
                                        <el-input v-model="ruleForm.remark"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="Det-form-item Det-Date out-checked">
                                    <div class="w-h-div delivery-note" @click="seen">
                                        <span class="tab-btn delivery-note-text">查看库存</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <div class="Out-tab top20">
                <template>
                    <el-table
                        :data="tabpick"
                        height="515"
                        stripe
                        :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                        align="center"
                        :row-style="{height:'50px',fontSzie:'16px'}"
                        :summary-method="getSummaries"
                        show-summary>
                        <template v-for="(val,index) in tabHead">
                            <el-table-column
                                :prop="val.prop"
                                :label="val.label"
                                align="center"
                            >
                            </el-table-column>
                        </template>
                    </el-table>
                </template>
            </div>
            <div class="Det-btn top20">
                <span class="tab-btn special-btn2 outline textAlign" @click="go">取消</span>
                <span class="tab-btn special-btn2 outline textAlign" :plain="true" @click="open('ruleForm')">保存</span>
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
                            style="width: 100%"
                            align="center"
                        >
                            <el-table-column :render-header="renderHeader" width="50" prop="isApprove">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="checkedlist[scope.$index].isApprove"></el-checkbox>
                                </template>
                            </el-table-column>
                            <template v-for="(val,index) in  checkedHead">
                                <el-table-column
                                    :prop="val.prop"
                                    :label="val.label"
                                    align="center"
                                    v-if="val.prop !== 'amount'">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="数量"
                                    v-if="val.prop === 'amount'"
                                >
                                    <template slot-scope="scope">
                                        <el-input type="number" :min="0" v-model="checkedlist[scope.$index].amount"
                                                  :max="checkedlist[scope.$index].maxValue"
                                                  @input="amountChanged(checkedlist[scope.$index],val)"
                                                  :disabled="!checkedlist[scope.$index].isApprove"></el-input>
                                    </template>
                                </el-table-column>
                            </template>
                        </el-table>
                    </template>
                    <div class="check-btn">
                        <span class="tab-btn special-btn2 outline textAlign" @click="checkedIn = false">取消</span>
                        <span class="tab-btn special-btn2 outline textAlign" @click="save">保存</span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "picking",
        watch: {
            checkedIn() {
                if (this.checkedIn) {
                    this.flag = false;
                    for (let i = 0; i < this.checkedlist.length; i++) {
                        this.checkedlist[i].isApprove = false;
                    }
                }
            }
        },
        data() {
            let  validateclientName= (rule,value,callback) => {
                if(value === '') {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };
            let  validateclientNo= (rule,value,callback) => {
                if(value === '') {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };
            let  validatedestination= (rule,value,callback) => {
                if(value === '') {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };
            let  validateshipCompany= (rule,value,callback) => {
                if(value === '') {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };
            let  validateacceptCompany= (rule,value,callback) => {
                if(value === '') {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };
            return {
                id: -1,
                flag: false,
                checkedIn: false,
                outType: ['调拨出库', '调拨出库(办)', '代发货出库', '代发货出库(办)', '盘点出库', '退货出库', '出库类型'],
                tabpick: [],
                tabHead: [
                    {
                        prop: "cloth_no",
                        label: "布号"
                    },
                    {
                        prop: "cloth_name",
                        label: "布匹名称"
                    },
                    {
                        prop: "color_name",
                        label: "布匹色号"
                    },
                    {
                        prop: "dyeing_color",
                        label: "染厂色号"
                    },
                    {
                        prop: "vat_dye",
                        label: "缸号"
                    },
                    {
                        prop: "weight",
                        label: "重量"
                    },
                    {
                        prop: "amount",
                        label: "数量"
                    }
                ],
                checkedlist: [],
                checkedHead: [
                    {
                        prop: "cloth_no",
                        label: "布号"
                    },
                    {
                        prop: "cloth_name",
                        label: "布匹名称"
                    },
                    {
                        prop: "color_name",
                        label: "布匹色号"
                    },
                    {
                        prop: "dyeing_color",
                        label: "染厂色号"
                    },
                    {
                        prop: "vat_dye",
                        label: "缸号"
                    },
                    {
                        prop: "weight",
                        label: "重量"
                    },
                    {
                        prop: "amount",
                        label: "数量"
                    }
                ],
                arr: [],
                ruleForm:{
                    shipCompany: '平洲仓库',
                    isApprove: false,
                    type: '调拨出库',
                    clientName:'',
                    clientNo:'',
                    destination:'',
                    remark:'无',
                    acceptCompany:''
                },
                rules: {
                    //验证提示信息
                    clientName: [
                        {  validator: validateclientName, trigger: 'blur' }
                    ],
                    clientNo: [
                        {  validator: validateclientNo, trigger: 'blur' }
                    ],
                    destination: [
                        {  validator: validatedestination, trigger: 'blur' }
                    ],
                    shipCompany: [
                        {  validator: validateshipCompany, trigger: 'blur' }
                    ],
                    acceptCompany: [
                        {  validator: validateacceptCompany, trigger: 'blur' }
                    ]
                }
            }
        },
        props: ['show'],
        methods: {
            renderHeader(h, {column, $index}) {
                return h('el-checkbox', {
                    attrs: {
                        value: this.flag
                    },
                    on: {change: this.change}
                })
            },
            // 判断布匹输入数量是否大于实际库存数量
            amountChanged(realVal, inputVal) {
                if (realVal.amount > realVal.maxValue) {
                    realVal.amount = realVal.maxValue;
                }
            },
            //返回上一页
            go() {
                this.$emit('changeshow')
            },
            // 保存出库申请单
            open(formName) {

                this.$refs[formName].validate((valid) => {
                    if(valid) {
                       let param = this.ruleForm;
                       param.clothOutboundApplyDetlList = [];
                       if(this.tabpick.length>0) {
                           for(let i = 0;i<this.tabpick.length;i++){
                               let item = this.tabpick[i];
                               param.clothOutboundApplyDetlList.push({
                                   clothNo:item.cloth_no,
                                   clothName:item.cloth_name,
                                   colorName:item.color_name,
                                   colorNo:item.dyeing_color,
                                   vatDye:item.vat_dye,
                                   quantity:item.amount
                               });
                           }
                           this.$axios({
                               method: "post",
                               data: JSON.stringify(param),
                               url: "/api/outbound/apply",
                               headers: {"Content-Type": "application/json"}
                           }).then((res) => {

                               this.$message({
                                   message: '保存成功',
                                   type: 'success'
                               });
                               this.tabpick=[];
                               this.$emit('changeshow')
//                               this.$router.go(0);

                           });
                       } else {
                           this.$message({
                               message: '请添加数据',
                               type: 'info'
                           });
                       }
                   } else {
                      return false;
                   }
                });

            },
            seen() {
                // 查看库存
                this.checkedIn = true;
                this.$axios({
                    method: "get",
                    url: "/api/outbound/apply/getStoreList",
                    headers: {"Content-Type": "application/json"}
                }).then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        let obj = res.data[i];
                        res.data[i].weight = res.data[i].weight.toFixed(2);
                        obj.isApprove = false;
                        obj.maxValue = res.data[i].amount;
                        for (let j = 0; j < this.tabpick.length; j++) {
                            // 判断响应回来的数据是否已被添加到备货单列表中
                            if (this.tabpick[j].cloth_no == res.data[i].cloth_no && this.tabpick[j].vat_dye == res.data[i].vat_dye && this.tabpick[j].weight == res.data[i].weight) {
                                obj.isApprove = true;
                            }
                        }
                    }
                    this.checkedlist = res.data;
                }).catch((err) => {
                    console.log(err)
                })
            },
            change(val) {
                this.flag = val;
                for (let i = 0; i < this.checkedlist.length; i++) {
                    this.checkedlist[i].isApprove = val;
                }
            },
            save() {
                this.checkedIn = false;
                // 先清除之前选中的，然后添加后选中的
                this.tabpick.splice(0, this.tabpick.length);
                for (var i = 0; i < this.checkedlist.length; i++) {
                    // 如果选择的布匹数量 > 0 并且被选中则添加到申请单列表中
                    if (this.checkedlist[i].amount > 0 && this.checkedlist[i].isApprove) {
                        this.tabpick.push(this.checkedlist[i])
                    }
                };
            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    switch (column.property) {
                        case "weight":
                            var weight = 0;
                            for (var i = 0; i < this.tabpick.length; i++) {
                                weight = weight + Number(this.tabpick[i].weight);
                            }
                            sums[index] = weight.toFixed(2) + '/Kg'
                            break;
                        case "amount":
                            var amount = 0;
                            for (var i = 0; i < this.tabpick.length; i++) {
                                amount = amount + this.tabpick[i].amount;
                            }
                            sums[index] = amount + '/条'
                            break;
                        default:
                            sums[index] = '--';
                            break
                    }
                });

                return sums;
            }
        }

    }
</script>
<style>

</style>


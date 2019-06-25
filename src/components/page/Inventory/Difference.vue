<template>
    <div class="Difference">
        <div class="dif-title">
            <h5>布匹盘点差异调整</h5>
        </div>
        <div class="w-table" :class="{'w-table_moving': dragState.dragging}">
            <el-table
                :data="dislist"
                :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                height="545px">
                <el-table-column v-for="(val,index) in disHeader"
                                 :prop="val.prop"
                                 :label="val.label"
                                 :key="index"
                    >
                </el-table-column>
                </el-table>
            </div>
    </div>
</template>

<script>
    export default {
        name: "Difference",
        data(){
            return {
                tableOption: {
                    border: true,
                    maxHeight: 500
                },
                dragState: {
                    start: -1, // 起始元素的 index
                    end: -1, // 结束元素的 index
                    move: -1, // 移动鼠标时所覆盖的元素 index
                    dragging: false, // 是否正在拖动
                    direction: undefined // 拖动方向
                },
                disHeader:[
                    {
                        prop:"ticketNo",
                        label:"布票号"
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
                        label:"状态"
                    },
                    {
                        prop:"lattice",
                        labek:"系统货位"
                    },
                    {
                        prop:"remark",
                        label:"备注"
                    }
                ],
                dislist:[
                    {}
                ]

            }
        }
    }
</script>

<style scoped>

</style>

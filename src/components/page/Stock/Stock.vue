<template>
    <div class="allocation" v-cloak>
        <div class="container">
            <div style="width:100%;overflow: hidden;">
                <div style="padding: 13px 15px 15px 0;border-bottom: 1px #e2e3e5 solid;">
                    库存布种统计
                </div>
                <div id="chartBar" style="height:400px;background: #007bff;margin-top: 35px;"></div>
            </div>
        </div>

        <div class="container" style="margin-top: 20px;margin-bottom:20px;">
            <div style="background: #FFF">
                <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#0078ff',color:'#FFF',textAlign:'center'}"
                    :row-style="{height:'60px',fontSize:'16px'}"
                    style="width: 100%;text-align: center;cursor: pointer;"
                    height="400"
                    :summary-method="getSummaries"
                    show-summary>
                    <el-table-column
                        v-for="(val,index) in tabHead"
                        :key="index"
                        :prop="tabCol[index].prop"
                        :label="val.label"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import Sortable from 'sortablejs'
    export default {
        data() {
            return {
                chartBar: null,
                tabHead:[
                    {
                        prop:"clothNo",
                        label:"布号"
                    },
                    {
                        prop:"colorNo",
                        label:"色号"
                    },
                    {
                        prop:"colorName",
                        label:"颜色"
                    },
                    {
                        prop:"count",
                        label:"库存条数"
                    },
                    {
                        prop:"num",
                        label:"库存重量"
                    }
                ],
                tabCol:[
                    {
                        prop:"clothNo",
                        label:"布号"
                    },
                    {
                        prop:"colorNo",
                        label:"色号"
                    },
                    {
                        prop:"colorName",
                        label:"颜色"
                    },
                    {
                        prop:"count",
                        label:"库存条数"
                    },
                    {
                        prop:"num",
                        label:"库存重量"
                    }
                ],
                tableData: [],
                emptyData: [],

            }
        },
        mounted() {
            this.columnDrop();
            this.drawBarChart();
            this.getStockDetailCount();
        },
        methods: {
//            renderHeader(createElement, {column}) {
//                return createElement(
//                    'div', {
//                        'class': ['thead-cell'],
//                        on: {
//                            mousedown: ($event) => { this.handleMouseDown($event, column) },
////                            mouseup: ($event) => { this.handleMouseUp($event, column) },
//                            mousemove: ($event) => { this.handleMouseMove($event, column) }
//                        }
//                    }, [
//                        // 添加 <a> 用于显示表头 label
//                        createElement('a', column.label),
//                        // 添加一个空标签用于显示拖动动画
//                        createElement('span', {
//                            'class': ['virtual']
//                        })
//                    ])
//            },
            drawBarChart() {
                let _this = this;
                _this.dataAxis = [];
                _this.data = [];
                this.$axios({
                    method: "get",
                    url: "/api/report/stock/clothNo/all/now",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                    this.chartBar = echarts.init(document.getElementById('chartBar'));

                    for (let index = 0; index < res.data.length; index++) {
                        _this.dataAxis.push(res.data[index].clothNo);
                        _this.data.push(res.data[index].count);

                        this.chartBar.setOption({
                            grid: {
                                show: false
                            },
                            markLine: {
                                lineStyle: {
                                    color: '#FFF'
                                }
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    lineStyle: {
                                        color: '#FFF'
                                    },
                                    crossStyle: {
                                        color: '#FFF',
                                        type: 'solid'
                                    }
                                }
                            },
                            xAxis: {
                                data: this.dataAxis,
                                axisLabel: {
                                    inside: false,
                                    textStyle: {
                                        color: '#FFF'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: true,
                                    onZero: true,
                                    onZeroAxisIndex: 0,
                                    lineStyle: {
                                        color: "#60abff"
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: '#60abff'
                                    }
                                },
                                z: 10
                            },
                            yAxis: {
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "#60abff"
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#60abff'
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: '#60abff'
                                    }
                                }
                            },
                            dataZoom: [
                                {
                                    type: 'inside'
                                }
                            ],
                            series: [
                                {
                                    type: 'bar',
                                    barGap: '100%',
                                    barWidth: 15,
                                    label: {
                                        normal: {
                                            show: true,
                                            position:'top',
                                            color:"#fff",
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(
                                                0, 0, 0, 1,
                                                [
                                                    {offset: 0, color: '#fff'},
                                                    {offset: 1, color: '#0793FF'}
                                                ]
                                            ),
                                            barBorderRadius: [10, 10, 0, 0]
                                        },
                                        emphasis: {
                                            color: new echarts.graphic.LinearGradient(
                                                0, 0, 0, 1,
                                                [
                                                    {offset: 0, color: '#fff'},
                                                    {offset: 1, color: '#fff'}
                                                ]
                                            )
                                        }
                                    },
                                    data: this.data,
                                }
                            ]
                        });
                    }
                });
            },
            getStockDetailCount() {
                this.$axios({
                    method: "get",
                    url: "/api/report/stock/detail/all/now",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                    this.tableData = res.data;
                });
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    };
                   switch(column.property) {
                       case "count":
                           var  count = 0;
                           for(var i = 0; i<this.tableData.length;i++) {
                               count = count + this.tableData[i].count;
                           }
                           sums[index] = count + "条"
                           break;
                       case "num":
                           var  num = 0;
                           for(var i = 0; i<this.tableData.length;i++) {
                               num = num + Number(this.tableData[i].num);
                           }
                           sums[index] = num.toFixed(2) + 'KG'
                           break;
                       default:
                           sums[index] = '--';
                           break
                   }
                });
                return sums;
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
           /* getcookie(){
                var arr, reg = new RegExp("(^| )" + "Stockheader" + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)){
                    var Data = JSON.parse(arr[2]);
                    this.tabHead = [];
                    this.tabHead = Data;
                } else {
                    return null;
                }
            },
            handleMouseDown (e, column) {
                this.dragState.dragging = true
                this.dragState.start = parseInt(column.columnKey)
                // 给拖动时的虚拟容器添加宽高
                let table = document.getElementsByClassName('w-table')[0];
                let virtual = document.getElementsByClassName('virtual');
                for (let item of virtual) {
                    item.style.height = table.clientHeight - 1 + 'px'
                    item.style.width = item.parentElement.parentElement.clientWidth + 'px'
                }
                document.addEventListener('mouseup', this.handleMouseUp);
            },
            // 鼠标放开结束拖动
            handleMouseUp () {
                this.dragColumn(this.dragState);

                var d = new Date();
                d.setTime(d.getTime() + 30*24*60*60*1000);
                var expires = "expires=" + d.toUTCString();
                var cvalue = this.tabHead;
                document.cookie = "Stockheader" + "=" + JSON.stringify(cvalue) + "; " + expires;

                // 初始化拖动状态
                this.dragState = {
                    start: -1,
                    end: -1,
                    move: -1,
                    dragging: false,
                    direction: undefined
                }
                document.removeEventListener('mouseup', this.handleMouseUp);
            },
            // 拖动中
            handleMouseMove (e, column) {
                if (this.dragState.dragging) {
                    let index = parseInt(column.columnKey) // 记录起始列
                    if (index - this.dragState.start !== 0) {
                        this.dragState.direction = index - this.dragState.start < 0 ? 'left' : 'right' // 判断拖动方向
                        this.dragState.end = parseInt(column.columnKey)
                    } else {
                        this.dragState.end = index;
                        this.dragState.direction = undefined;
                    }
                } else {
                    return false
                }
            },
            // 拖动易位
            dragColumn ({start, end, direction}) {
                let tempData = []
                let left = direction === 'left'
                let min = left ? end : start - 1
                let max = left ? start + 1 : end
                for (let i = 0; i < this.tabHead.length; i++){
                    if (i === end) {
                        tempData.push(this.tabHead[start])
                    } else if (i > min && i < max) {
                        tempData.push(this.tabHead[ left ? i - 1 : i + 1 ])
                    } else {
                        tempData.push(this.tabHead[i])
                    }
                }
                this.tabHead = tempData;
            },

            headerCellClassName ({column, columnIndex}) {
                let active = columnIndex - 1 === this.dragState.end ? `darg_active_${this.dragState.direction}` : ''
                let start = columnIndex - 1 === this.dragState.start ? `darg_start` : ''
                return `${active} ${start}`
            },

            cellClassName ({column, columnIndex}) {
                return (columnIndex - 1 === this.dragState.start ? `darg_start` : '')
            },*/
        }
    }
</script>


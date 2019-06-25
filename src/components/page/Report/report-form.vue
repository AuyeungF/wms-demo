<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <h5 class="chart-text">本周入库统计</h5>
                <div class="chartColumn" id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <h5 class="chart-text">本周出库统计</h5>
                <div class="chartColumn" id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <h5 class="chart-text">当月入库供应商统计</h5>
                <div class="chartColumn" id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <h5 class="chart-text">当月出库客户统计</h5>
                <div class="chartColumn" id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                num:[],
                week:[],
                num1:[],
                week1:[],
                factory:[],
                client:[]
            }
        },

        methods: {
            /**
             * 本周入库统计
             * @param callback 数据回调
             * @code [{'week':'周几','count':'入库量'}]
             */
            findInboundCountByClothOfWeekDay(callback){
                this.$axios({
                    method: "get",
                    url: "/api/report/inbound/cloth/week/now",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                    for(var i=0; i<res.data.length;i++) {
                        this.num.push(res.data[i].count);
                        this.week.push(res.data[i].week);
                    }
                    this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                    var symbolSize = 20;
//                var data = [[-90], [-20], [46.5], [86.5], [200]];
                    this.chartColumn.setOption({
                        title: {
                            text: ''
                        },
                        tooltip : {
                            trigger: 'axis',
                            backgroundColor:'rgba(255,255,255,0)',
                            axisPointer : {
                                type : 'shadow',
                                shadowStyle: {
                                    color: 'rgb(15,145,255,0.4)'
                                }
                            }
                        },
                        backgroundColor: ['#0078ff'],
                        color: ['#33ccff'],
                        xAxis: {
                            type: 'category',
                            axisLine:{
                                lineStyle:{
                                    color:'#66aeff'
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: ['#1a86ff']
                                }
                            },
                            data:this.week
                        },
                        yAxis: {
                            type: 'value',
                            axisLine:{
                                lineStyle:{
                                    color:'#66aeff'
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: ['#1a86ff']
                                }
                            }
                        },
                        series: [{
                            data: this.num,
                            type: 'line',
                            symbol: '',
                            symbolSize: 15,
                            smooth: true,
                            label: {
                                normal: {
                                    show: true,
                                    // position: 'left'
                                    color:"#fff",
                                }
                            },
                            lineStyle: {
                                normal: {
                                    // color: '#33ccff',
                                    width: 4,
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 4,
                                    borderColor: '#fff',
                                    color: '#33ccff'
                                }
                            }
                        }]
                    });
                });
            },

            /**
             * 本周出库统计
             * @param callback 数据回调
             * @code [{'week':'周几','count':'出库量'}]
             */
            findOutboundCountByClothOfWeekDay(callback){
                this.$axios({
                    method: "get",
                    url: "/api/report/outbound/cloth/week/now",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
                    for(var i=0; i<res.data.length;i++) {
                        this.num1.push(res.data[i].count);
                        this.week1.push(res.data[i].week);
//                        console.log(this.week)
                    }
                    this.chartBar = echarts.init(document.getElementById('chartBar'));
                    var symbolSize = 20;
                    var data = this.num;
                    this.chartBar.setOption({
                        title: {
                            text: ''
                        },
                        tooltip : {
                            trigger: 'axis',
                            backgroundColor:'rgba(255,255,255,0)',
                            axisPointer : {
                                type : 'shadow',
                                shadowStyle: {
                                    color: 'rgb(15,145,255,0.4)'
                                }
                            }
                        },
                        backgroundColor: ['#0078ff'],
                        color: ['#33ccff'],
                        xAxis: {
                            type: 'category',
                            axisLine:{
                                lineStyle:{
                                    color:'#66aeff'
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: ['#1a86ff']
                                }
                            },
                            data:this.week1
                        },
                        yAxis: {
                            type: 'value',
                            axisLine:{
                                lineStyle:{
                                    color:'#66aeff'
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: ['#1a86ff']
                                }
                            }
                        },
                        series: [{
                            data: this.num1,
                            type: 'line',
                            symbol: '',
                            symbolSize: 15,
                            smooth: true,
                            label: {
                                normal: {
                                    show: true,
                                    // position: 'left'
                                    color:"#fff",
                                    border:"1px solid #ccc",
                                }
                            },
                            lineStyle: {
                                normal: {
                                    // color: '#33ccff',
                                    width: 4,
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 4,
                                    borderColor: '#fff',
                                    color: '#33ccff'
                                }
                            }
                        }]
                    });
//                    console.log(res.data)
                }).catch(err=>{console.log(err)});
            },
            /**
             * 当月入库供应商统计
             * @param callback 数据回调
             * @code [{'dyeingFactory':'供应商名称','count':'入库量'}]
             */
            findOutboundCountByDyeingFactoryOfMonth(callback){
                this.$axios({
                    method: "get",
                    url: "/api/report/inbound/dyeingFactory/month/now",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
//                    console.log(res.data)

                    for(var i=0; i < res.data.length;i++) {
                        res.data[i].dyeingFactory = res.data[i].dyeingFactory.replace(/\s*/g,"");
                        this.factory.push({name:res.data[i].dyeingFactory,value:res.data[i].count + 80})
                    }

                    var scaleData = this.factory;

                    var rich = {
                        white: {
                            color: scaleData,
                            align: 'center',
                            padding: [3, 0]
                        }
                    };

                    var ata = [];
                    var color=['#0078ff', '#2400ff','#ff1e62','#fcd63b','#5cdcb5',]
                    for (var i = 0; i < scaleData.length; i++) {
                        ata.push({
                            value: scaleData[i].value,
                            name: scaleData[i].name,
                            itemStyle: {
                                normal: {
                                    shadowColor: color[i]
                                }
                            }
                        });
                    }
                    var seriesObj = [{
                        name:'面积模式',
                        type:'pie',
                        radius : [60, 110],
                        center : ['50%', '50%'],
                        roseType : 'area',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: function(aee) {
                                        var percent = 0;
                                        var total = 0;
                                        for (var i = 0; i < scaleData.length; i++) {
                                            total += scaleData[i].value;
                                        }
                                        percent = ((aee.value / total) * 100).toFixed(0);
                                        if(aee.name !== '') {
                                            return aee.name + '\n{white|' + '占比' + percent + '%}';
                                        }else {
                                            return '';
                                        }
                                    },
                                    rich: rich
                                },

                            }
                        },
                        data: ata
                    }];
                    this.chartLine = echarts.init(document.getElementById('chartLine'));
                    this.chartLine.setOption({
                        title : {
                            text: '',
                            subtext: '',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            x : 'center',
                            y : 'bottom',
                            data:this.factory
                        },
                        margin:['0 auto'],
                        color:['#0078ff', '#2400ff','#ff1e62','#fcd63b','#5cdcb5'],
                        calculable : true,
                        series : seriesObj
                    });
                }).catch(err=>{console.log(err)});
            },
            /**
             * 当月出库客户统计
             * @param callback 数据回调
             * @code [{'clientName':'客户名称','count':'出库量'}]
             */
            findOutboundCountByClientNameOfMonth(callback){
                this.$axios({
                    method: "get",
                    url: "/api/report/outbound/clientName/month/now",
                    headers: {"Content-Type": "application/json"}
                }).then(res => {
//                    console.log(res.data)
                    for(var i=0; i < res.data.length;i++) {
                        this.client.push({name:res.data[i].clientName,value:res.data[i].count + 80})
                    }

                    var scaleData = this.client;
                    var rich = {
                        white: {
                            color: scaleData,
                            align: 'center',
                            padding: [3, 0]
                        }
                    };

                    var ata = [];
                    var color=['#0078ff', '#2400ff','#ff1e62','#fcd63b','#5cdcb5',]
                    for (var i = 0; i < scaleData.length; i++) {
                        ata.push({
                            value: scaleData[i].value,
                            name: scaleData[i].name,
                            itemStyle: {
                                normal: {
                                    shadowColor: color[i]
                                }
                            }
                        });
                    }
                    var seriesObj = [{
                        name:'面积模式',
                        type:'pie',
                        radius : [60,110],
                        center : ['50%', '50%'],
                        roseType : 'area',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: function(aee) {
                                        var percent = 0;
                                        var total = 0;
                                        for (var i = 0; i < scaleData.length; i++) {
                                            total += scaleData[i].value;
                                        }
                                        percent = ((aee.value / total) * 100).toFixed(0);
                                        if(aee.name !== '') {
                                            return aee.name + '\n{white|' + '占比' + percent + '%}';
                                        }else {
                                            return '';
                                        }
                                    },
                                    rich: rich
                                },

                            }
                        },
                        data: ata,
                    }];
                    this.chartLine = echarts.init(document.getElementById('chartPie'));
                    this.chartLine.setOption({
                        title : {
                            text: '',
                            subtext: '',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            x : 'center',
                            y : 'bottom',
                            data:this.client
                        },
                        margin:['0 auto'],
                        color:['#0078ff', '#2400ff','#ff1e62','#fcd63b','#5cdcb5'],
                        calculable : true,
                        series : seriesObj
                    });
//                    console.log(this.client)

                }).catch(err=>{console.log(err)});
            },
            drawCharts() {
                this.findInboundCountByClothOfWeekDay()
                this.findOutboundCountByClothOfWeekDay()
                this.findOutboundCountByDyeingFactoryOfMonth()
                this.findOutboundCountByClientNameOfMonth()
            },
        },


        mounted: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    .el-col {
        padding: 30px 20px;
    }
</style>

methods: {
    drawBarChart() {
        let _this = this;
        _this.dataAxis = [];
        _this.data = [];
        this.$axios({
            method: "get",
            url: "/axios/report/stock/clothNo/all/now",
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
                        barCategoryGap: '90%',
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
                        data: this.data
                    }
                ]
            });
        }
    });
    },


    /**
     * 新增车辆
     * /axios/vehiclemanager/vehicleinfo
     * @param vehicleInfo 新增格式 {"licencePlate":"粤B123456","carStatus":"0","gpsStatus":"1","driver":"陈胜","phone":"13078214991","carType":"大货车"}
     * @param callback 数据回调
     * @code 新增成功返回true,否则返回false
     */
    crateVehicleInfo(vehicleInfo, callback) {
        let _param = JSON.stringify(vehicleInfo);
        this.$axios({
            method: "post",
            data: _param,
            url: "/axios/vehiclemanager/vehicleinfo",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (callback) {
                callback(true);
            }
        }).catch(error => callback(false));
    },


    /**
     * 查找所有车辆信息
     * /axios/vehiclemanager/vehicleinfo
     * @param callback 数据回调
     * @code 新增成功返回true,否则返回false
     */
    getVehicleInfos(callback) {
        this.$axios({
            method: "get",
            url: "/axios/vehiclemanager/vehicleinfo",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (callback) {
                callback(true);
            }
        }).catch(error => callback(false));
    },

    /**
     * 查找一个车辆信息
     * /axios/vehiclemanager/vehicleinfo/{id}
     * @param id 车辆的ID
     * @param callback 数据回调
     * @code 新增成功返回true,否则返回false
     */
    getVehicleInfo(id, callback) {
        this.$axios({
            method: "get",
            url: "/axios/vehiclemanager/vehicleinfo/" + id,
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (callback) {
                callback(true);
            }
        }).catch(error => callback(false));
    },

    /**
     * 更新车辆信息
     */
    updateVehicleInfo(id,vehicleInfo) {
        let _param = JSON.stringify(vehicleInfo);
        this.$axios({
            method: "put",
            data: _param,
            url: "/axios/vehiclemanager/vehicleinfo/"+id,
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (callback) {
                callback(true);
            }
        }).catch(error => callback(false));
    },

    /**
     * 删除车辆信息
     */
    deleteVehicleInfo(id) {
        this.$axios({
            method: "delete",
            url: "/axios/vehiclemanager/vehicleinfo/"+id,
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (callback) {
                callback(true);
            }
        }).catch(error => callback(false));
    },


    /**
     * 新增附运表
     * /axios/vehiclemanager/transportlist
     * @param vehicleInfo 新增格式 {"transportNo":"A1809151423","outboundNo":"1536115820129","outboundNum":"50","address":"广东省佛山市禅城区智慧新城T15栋1103 傻猪猪锋（收）","departureTime":Date.now(),"remark":"没啥好备注的鸭",{"licencePlate":"粤B123456","carStatus":"0","gpsStatus":"1","driver":"陈胜","phone":"13078214991","carType":"大货车"}}
     * @param callback 数据回调
     * @code 新增成功返回true,否则返回false
     */
    createTransportList(transportList, callback) {
        let _param = JSON.stringify(transportList);
        this.$axios({
            method: "post",
            data: _param,
            url: "/axios/vehiclemanager/transportlist",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (callback) {
                callback(true);
            }
        }).catch(error => callback(false));
    },

    /**
     * 查找付运表列表
     */
    getTransportLists() {
        this.$axios({
            method: "get",
            url: "/axios/vehiclemanager/transportlist",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (callback) {
                callback(true);
            }
        }).catch(error => callback(false));
    },

    /**
     * 查找一张付运表列表
     */
    getTransportList(id) {
        this.$axios({
            method: "get",
            url: "/axios/vehiclemanager/transportlist/" + id,
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if (callback) {
                callback(true);
            }
        }).catch(error => callback(false));
    }


},
mounted: function () {
    this.drawBarChart();
    this.getStockDetailCount();

    /**
     * 测试新增车辆信息
     */

    // this.crateVehicleInfo({"licencePlate":"粤B123456","carStatus":"0","gpsStatus":"1","driver":"陈锦","phone":"13078214991","carType":"大货车"},(data)=>{
    //     return true;
    // });
    /**
     * 测试查找所有车辆信息
     */
    // this.getVehicleInfos((data)=>{
    //     return true;
    // })


    /**
     * 测试查找一个车辆信息
     */
    // this.getVehicleInfo(1,(data)=>{return true})

    /**
     * 测试更新车辆信息
     */
    // this.updateVehicleInfo(2,
    //     {"id":2,"licencePlate":"粤B123456","carStatus":"1","gpsStatus":"1","driver":"陈锦","phone":"020-2215973","carType":"小火车"})

    /**
     * 测试删除车辆信息
     */
    // this.deleteVehicleInfo(5)

    /**
     * 创建一张付运表
     *{"transportNo":"A1809151423",
             * "applyNo":"1536115820129、", （此处要查出所关联的申请单的申请单号并拼接字符串，用'、'隔开）
             * "outboundNum":50,（此处要查出所关联的申请单里面的出库条数并相加起来）
             * "address":"广东省佛山市禅城区智慧新城T15栋1103 傻猪猪锋（收）",
             * "departureTime":"2018-09-15T06:52:55.138+0000",
             * "remark":"没啥好备注的鸭",
             * "vehicleInfo":{"id":3},
             * "clothOutboundApplies":[{"id":2}, {"id":4}](此处为查出的关联的申请单id)
             * }
     *
     */
    this.createTransportList(
        {"applyNo":"1536115820130、1536115820131、1536115820132","outboundNum":60,"address":"广东省佛山市禅城区智慧新城T15栋1103 傻猪猪锋2（收）","departureTime":Date.now(),"remark":"没啥好备注的鸭2","vehicleInfo":{"id":6},"clothOutboundApplies":[{"id":2}, {"id":4}]},(data)=>{
    })

    /**
     * 获取所有付运表信息
     */
    // this.getTransportLists()

    /**
     * 获取一张付运表信息
     */
    // this.getTransportList(5)
}

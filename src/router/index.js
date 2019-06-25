import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Report/report-form'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    // component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/page/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '出入库类别管理' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    // 用户管理
                    path: '/Structure/User',
                    component: resolve => require(['../components/page/Structure/User.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    // 部门管理
                    path: '/Structure/Department',
                    component: resolve => require(['../components/page/Structure/Department.vue'], resolve),
                    meta: { title: '部门管理' }
                },
                {
                    // 员工管理
                    path: '/Structure/Staff',
                    component: resolve => require(['../components/page/Structure/Staff.vue'], resolve),
                    meta: { title: '员工管理' }
                },
                {
                    // 权限管理
                    path: '/Structure/Jurisdiction',
                    component: resolve => require(['../components/page/Structure/Jurisdiction.vue'], resolve),
                    meta: { title: '权限管理' }
                },
                {
                    // 出入库类别管理
                    path: '/Structure/genre',
                    component: resolve => require(['../components/page/Structure/genre.vue'], resolve),
                    meta: { title: '出入库类别管理' }
                },
                {
                    // 货品分类管理
                    path: '/classify',
                    component: resolve => require(['../components/page/Cut/classify.vue'], resolve),
                    meta: { title: '货品分类管理' }
                },
                {
                    // 货品信息管理
                    path: '/Cut-list',
                    component: resolve => require(['../components/page/Cut/goods-list.vue'], resolve),
                    meta: { title: '货品信息管理' }
                },
                {
                    //剪布管理
                    path: '/Cut/Cut-cloth',
                    component: resolve => require(['../components/page/Cut/Cut-cloth.vue'], resolve),
                    meta: { title: '剪布管理' }
                },
                {
                    // 计量单位管理
                    path: '/metering',
                    component: resolve => require(['../components/page/Cut/Metering.vue'], resolve),
                    meta: { title: '计量单位管理' }
                },
                {
                    // 货品入库
                    path: '/Outbound/outbound',
                    component: resolve => require(['../components/page/Outbound/outbound.vue'], resolve),
                    meta: { title: '货品入库' }
                },
                {
                    // 货品出库
                    path: '/Out',
                    component: resolve => require(['../components/page/Outbound/Out.vue'], resolve),
                    meta: { title: '货品出库' }
                },
                {
                    // 出入库明细
                    path: '/Detailed',
                    component: resolve => require(['../components/page/Outbound/Detailed.vue'], resolve),
                    meta: { title: '出入库明细' }
                },
                {
                    // 出入库查询
                    path: '/Outbound/Checked',
                    component: resolve => require(['../components/page/Outbound/checked.vue'], resolve),
                    meta: { title: '出入库查询' }
                },
                {
                    // 出库单管理
                    path: '/Outbound/OutgoingManagement',
                        component: resolve => require(['../components/page/Outbound/OutgoingManagement.vue'], resolve),
                    meta: { title: '出库单管理' }
                },
                {
                    // 库存调拨
                    path: '/Inbound/Inbound',
                    component: resolve => require(['../components/page/Inbound/Inbound.vue'], resolve),
                    meta: { title: '库存调拨' }
                },
                {
                    // 卸货记录
                    path: '/Inbound/disburden',
                    component: resolve => require(['../components/page/Inbound/disburden.vue'], resolve),
                    meta: { title: '卸货记录' }
                },
                {
                    // 备货单管理
                    path: '/Inbound/Allocation',
                    component: resolve => require(['../components/page/Inbound/Allocation.vue'], resolve),
                    meta: { title: '备货单管理' }
                },

                {
                    // 操作用户设置
                    path: '/Inventory/Difference',
                    component: resolve => require(['../components/page/Inventory/Difference.vue'], resolve),
                    meta: { title: '操作用户设置' }
                },
                {
                    // 数据备份
                    path: '/Backups',
                    component: resolve => require(['../components/page/Inventory/Backups.vue'], resolve),
                    meta: { title: '数据备份' }
                },
                {
                    // 盘点
                    path: '/Inventory/Inventory',
                    component: resolve => require(['../components/page/Inventory/Inventory.vue'], resolve),
                    meta: { title: '数据还原' }
                },
                {
                    // 查看数据日志
                    path: '/Journal',
                    component: resolve => require(['../components/page/Inventory/Details.vue'], resolve),
                    meta: { title: '查看数据日志' }
                },
                {
                    // 查看数据日志
                    path: '/Report/report-form',
                    component: resolve => require(['../components/page/Report/report-form.vue'], resolve),
                    meta: { title: '报表管理' }
                },
                {
                    // 库存管理
                    path: '/Stock/Stock',
                    component: resolve => require(['../components/page/Stock/Stock.vue'], resolve),
                    meta: { title: '库存管理' }
                },
                {
                    // 库存管理
                    path: '/Stock/Seen',
                    component: resolve => require(['../components/page/Stock/Seen.vue'], resolve),
                    meta: { title: '库存查询' }
                },
                {
                    // 车辆管理
                    path: '/Vehicle/Vehicle',
                    component: resolve => require(['../components/page/Vehicle/Vehicle.vue'], resolve),
                    meta: { title: '车辆管理' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

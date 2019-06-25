<template>
    <div class="sidebar">
        <div class="menu-img">
            <ul>
                <li v-for="(data,index) in lists">
                    <!--<a class="route-go" @click="go(index)"><img :src="data.img"alt=""></a>-->
                    <router-link class="route-go active"  :to="data.link" @click.native="go(index)">
                        <template v-if="index == num">
                            <img :src="data.img1"alt="">
                        </template>
                        <template v-else="index == !num">
                            <img :src="data.img"alt="">
                        </template>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                num : 0,
                lists:[
                    {
                        link:'/dashboard',
                        img:'static/img/parts/menu.png',
                        img1:'static/img/parts/menu.png',
                    },
                    {
                        link:'/Report/report-form',
                        img: 'static/img/parts/Report-form-default.png',
                        img1: 'static/img/parts/Report-form-selected.png',
                        childs:[{
                            name:"报表管理",
                            url:"/Report/report-form"
                        }]
                    },
                    {
                        link:'/Inbound/Inbound',
                        img:'static/img/parts/GO-default.png',
                        img1:"static/img/parts/GO-selected.png",
                        childs:[{
                            name:"入库单管理",
                            url:"/Inbound/Inbound"
                        },{
                            name:"卸货记录",
                            url:"/Inbound/disburden"
                        }]
                    },
                    {
                        link:'/Outbound/outbound',
                        img: 'static/img/parts/Out-default.png',
                        img1: 'static/img/parts/Out-selected.png',
                        childs:[{
                            name:"申请出库单管理",
                            url:"/Outbound/outbound"
                        },{
                            name:"出库单管理",
                            url:"/Outbound/OutgoingManagement"
                        }]
                    },
                    {
                        link:'/Inventory/Inventory',
                        img:'static/img/parts/Inventory-default.png',
                        img1:'static/img/parts/Inventory-selected.png',
                        childs:[{
                            name:"盘点记录",
                            url:"/Inventory/Inventory"
                        }]
                    },
                    {
                        link:'/Stock/Stock',
                        img: 'static/img/parts/Stock-default.png',
                        img1: 'static/img/parts/Stock-selected.png',
                        childs:[{
                            name:"库存管理",
                            url:"/Stock/Stock"
                        },{
                            name:"库存查询",
                            url:"/Stock/Seen"
                        }]
                    },
                    {
                        link:'/Vehicle/Vehicle',
                        img: 'static/img/parts/vehicle-default.png',
                        img1: 'static/img/parts/vehicle-selected.png',
                        childs:[{
                            name:"车辆管理",
                            url:"/Vehicle/Vehicle"
                        }]
                    },
                  /*  {
                        link:'/Structure/Department',
                        img: 'static/img/parts/System-default.png',
                        img1: 'static/img/parts/System-selected.png',
                        childs:[{
                            name:"部门管理",
                            url:"/Structure/Department"
                        },{
                            name:"员工管理",
                            url:"/Structure/Staff"
                        },{
                            name:"用户管理",
                            url:"/Structure/User"
                        },{
                            name:"系统日志",
                            url:"/Structure/genre"
                        }]
                    }*/
                ]

            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        mounted (){
            this.up();
            bus.$on('up',(msg)=>{
                this. go(msg);
            })

        },
        methods:{
            go(index){
                this.num = index;
                bus.$emit('list',this.lists[index].childs);
            },
            up(){
                let str = window.location.href.split('/')[4];
                switch (str) {
                    case "dashboard":
                        this.num = 0;
                        break;
                    case "Report":
                        this.num = 1;
                        break;
                    case "Inbound":
                        this.num = 2;
                        break;
                    case "Outbound":
                        this.num = 3;
                        break;
                    case "Inventory":
                        this.num = 4;
                        break;
                    case "Stock":
                        this.num = 5;
                        break;
                    case "Vehicle":
                        this.num = 6;
                        break;
                    case "Structure":
                        this.num = 7;
                        break;
                    default:
                        this.num = 0;
                        break;
                }
                bus.$emit('name',this.lists[this.num].childs);
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 56px;
        bottom:0;
        height:max-content;
        background: #FFF;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }

    .sidebar > ul {
        height:100%;
    }
    </style>

<template>
    <div class="menu-list">
        <div class="menu-box">
            <ul class="clearfix">
                <li v-for="(data,index) in Img">
                    <router-link :to="data.url" class="go-link" :class="{active: data.url == link}" @click.native="check(data.url)">
                        {{data.name}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        name: "Route",
        data(){
            return {
                Img:[],
                link:""
            }
        },
        created (){
            this.up();
            this.go();
            this.upDate();
        },
        methods:{
            go() {
                //点击侧边栏改变导航栏的参数
                bus.$on('list', (Img) => {
                    if(Img) {
                        this.Img = Img;
                        this.link = Img[0].url
                    } else {
                        this.Img = [];
                    }
                })
            },
            up(){
                //刷新页面自己添加数据
                bus.$on('name',(Img) =>{
                    this.Img = Img;
                })
            },
            upDate(){
                const str = window.location.href;
                const str1 = str.split('#')[str.split('#').length - 1];
                this.link = str1;

            },
            check(data){
               this.link = data;
            }

        }

    }
</script>

<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>

        <div class="content-box BaseCharts-content-box" :class="{'content-collapse':collapse}">
            <!--<v-tags></v-tags>-->
            <v-route></v-route>
            <router-view></router-view>
           <!-- <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">

                    </keep-alive>
                </transition>
            </div>-->
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
//    import bus from './bus';
    import vRoute from './Route.vue';

    export default {

        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead, vSidebar, vTags,vRoute
        },
        destroyed(){
            this.$router.push('/login');
        }
    }
</script>

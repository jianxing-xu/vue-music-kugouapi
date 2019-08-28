<template>
  <div class="app">
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="tab-wrapper">
      <Tab :items="tabItem" />
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Header from '@/base/header/header.vue'
import Tab from "@/base/tab/tab.vue"
export default {
  data(){
    return {
      tabItem:[
        { name: '推荐', url: '/recommend' },
        { name: '歌手', url: '/singer' },
        { name: '榜单', url: '/rank' },
        { name: 'MV', url: '/mv'}
      ]
    }
  },

  components:{
    Header,
    Tab
  }
}
document.addEventListener('DOMContentLoaded', ()=>{
  const html = document.querySelector('html');
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 60 ? 60 : fontSize;
  html.style.fontSize = fontSize + 'px'; 
})

</script>
<style lang="scss">
.app{
  width:100%;
  height:100%;
  background-color: $bg-color;
  color: $text-color;
  .header-wrapper{
    padding: 5px 15px;
  }
}
</style>


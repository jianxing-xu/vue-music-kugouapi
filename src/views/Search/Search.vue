<template>
  <!--根组件-->
  <div class="search">
    <div class="header">
      <div class="back" @click="$router.back()">
        <i class="iconfont icon-leftarrow"></i>
      </div>
      <div class="search-box-wrapper">
        <SearchBox @exportKey="getKey" />
      </div>
    </div>
    <div class="search-history">
        
    </div>
    <div class="suggest-wrapper">
        <Suggest :keyword="key" />
    </div>
  </div>
</template>

<script>
import SearchBox from "@/base/search-box/search-box.vue";
import Suggest from '@/components/Suggest/Suggest.vue'
export default {
  name: 'search',
  data(){
      return {
          key: '',
      }
  },
  methods:{
      getKey(key){
          this.key = key;
      }
  },
  components: {
    SearchBox,
    Suggest
  }
};
</script>

<style scoped lang='scss'>
.search {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $bg-color;
  top: 0;
  left: 0;
  .suggest-wrapper{
      width: 100%;
      position: fixed;
      top: 60px;
      bottom: 0;
      padding: 0 20px;
      box-sizing: border-box;
  }
  .header{
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 5px;
      box-sizing: border-box;
  }
  .search-box-wrapper {
    box-sizing: border-box;
    width: 100%;
  }
  .back {
    .iconfont{
        font-size: 25px;
    }
    color: $text-color-d;
    padding: 0 15px 0 10px;
  }
}
</style>
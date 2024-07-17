<script setup>
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/userInfo';
const active = ref("")
const store = useUserInfoStore()
</script>

<template>

  <div style="width: auto;">
    <van-tabbar v-model="active">
      <van-tabbar-item :to="store.isUserLoggedIn ? '/realhome' : '/login'" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item :to="store.isUserLoggedIn ? '/myfriend' : '/login'" icon="friends-o">联系人</van-tabbar-item>
      <!-- <van-tabbar-item to="/my" icon="setting-o">标签</van-tabbar-item> -->
      <van-tabbar-item :to="store.isUserLoggedIn ? '/my' : '/login'" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
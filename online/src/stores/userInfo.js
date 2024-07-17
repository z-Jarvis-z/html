import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useUserInfoStore = defineStore('userInfo', {

    state:()=>{
      return {
        user:{
          accountId:"",
          identityName:""
        },
        isUserLoggedIn: false,
      }
    },
    getters: {
      getAccountId: (state) => state.user.accountId,
      getIdentityName: (state) => state.user.identityName,
      getisLoggedIn: (state) => state.isUserLoggedIn, 
      
    },
    actions: {
      setAccountId(accountId){
        this.user.accountId = accountId
      },
      setIdentityName(identityName){
        this.user.identityName = identityName
      },
      setLoggedIn(isLoggedIn){
        this.isUserLoggedIn = isLoggedIn
      }},
    persist:{
      enabled:true, // 需要开启才可以持久化
      strategies:[
        {
          key:"user", // 自定义缓存的key
          paths:["user"], // 默认会缓存所有state数据，可以指定名称进行缓存
          storage:window.localStorage // 缓存地址
        }
      ]
    }
  })
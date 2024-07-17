<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { showNotify } from 'vant';
import { useUserInfoStore } from '@/stores/userInfo';
const accountId = ref('')
const password = ref('')
const store = useUserInfoStore()
const onSubmit = (values) => {
    console.log('submit', values);
    axios.post('/api/login', {
    accountId:accountId.value,
    password: password.value,
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            console.log('登录成功');
            store.user.accountId = response.data.data.accountId;
            store.user.identityName = response.data.data.identityName;
            store.isUserLoggedIn = true;
            console.log(response.data.data);    
            showNotify("登录成功");
        }
        else {
            console.log('登录失败');
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);});

}
const images = [
    //   '../image/2.jpg',
    //   '../image/3.png',
    //   '../image/4.png',
    //   '../image/5.jpg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ];

</script>

<template>
    <main>
        <van-swipe :autoplay="3000" lazy-render width="50%">
            <van-swipe-item v-for="image in images" :key="image">
                <img :src="image"  style="width:70%; height: 70%; object-fit: cover;"/>
            </van-swipe-item>
        </van-swipe>

        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="accountId" name="银行账户" label="银行账户" placeholder="银行账户"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
            <div style="margin: 16px;">
                <van-button round  to="/register" plain block type="primary" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>

    </main>
</template>
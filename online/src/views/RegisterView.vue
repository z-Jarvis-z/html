<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { showNotify } from 'vant';
import { useUserInfoStore } from '@/stores/userInfo';
const accountId = ref('')
const password = ref('')
const identityName= ref('')
const mobile = ref('')
const store = useUserInfoStore()
const onClickLeft = () => history.back()
const onSubmit = (values) => {
    console.log('submit', values);
    axios.post('/api/account/register', {
    accountId:accountId.value,
    password: password.value,
    identityName: identityName.value,
    mobile: mobile.value
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            console.log('注册成功');
            store.user.accountId = response.data.data.accountId;
            store.user.identityName = response.data.data.identityName;
            store.isUserLoggedIn = true;
            console.log(response.data.data);    
            showNotify("注册成功");
        }
        else {
            console.log('注册失败');
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);});

}

</script>

<template>
    <main>
        <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
       
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="accountId" name="银行账户" label="银行账户" placeholder="银行账户"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-field v-model="identityName" name="姓名" label="姓名" placeholder="姓名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="mobile" type="password" name="手机号" label="手机号" placeholder="手机号"
                    :rules="[{ required: false, message: '请填写手机号' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>

    </main>
</template>
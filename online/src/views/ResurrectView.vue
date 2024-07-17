<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { showNotify } from 'vant';
import { useUserInfoStore } from '@/stores/userInfo';
const depositId = ref('')
const password = ref('')
const store = useUserInfoStore()
const onClickLeft = () => history.back()
const onSubmit = (values) => {
    console.log('submit', values);
    axios.post('/api/resurrect', {
    accountId:store.user.accountId,
    password: password.value,
    depositId: depositId.value
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            console.log('成功');
            store.user.accountId = response.data.data.accountId;
            store.user.identityName = response.data.data.identityName;
            store.isUserLoggedIn = true;
            console.log(response.data.data);    
            showNotify("恢复成功");
        }
        else {
            console.log('失败');
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);});

}

</script>

<template>
    <main>
        <van-nav-bar title="死期转活期" left-text="返回" left-arrow @click-left="onClickLeft" />
       
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="depositId" name="存款ID" label="存款ID" placeholder="存款ID"
                    :rules="[{ required: true, message: '请填写存款ID' }]" />
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    转活期
                </van-button>
            </div>
        </van-form>

    </main>
</template>
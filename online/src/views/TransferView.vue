<script setup>
import {ref} from 'vue'
import axios from 'axios'
import { useUserInfoStore } from '@/stores/userInfo';
const store = useUserInfoStore();
const toAccountId = ref('')
const money = ref('')
const remark = ref('')
const onClickLeft = () => history.back()
const onSubmit = (values) => {
    console.log('submit', values);
    axios.post('/api/deposit/trade', {
    fromAccountId:store.user.accountId,
    toAccountId:toAccountId.value,
    money:money.value,
    remark:remark.value
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            console.log('转账成功');
            showNotify('转账成功');
        }
        else {
            console.log('转账失败');
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);});

}
money
</script>
<template>
    <van-nav-bar title="转账" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="toAccountId" name="转入账户" label="转入账户" placeholder="转入账户"
                :rules="[{ required: true, message: '请填写转入账户' }]" />
            <van-field v-model="money"  name="金额" label="金额" placeholder="金额"
                :rules="[{ required: true, message: '请填写转出金额' }]" />
            <van-field v-model="remark" name="备注" label="备注" placeholder="备注"
                :rules="[{ required: false, message: '请填写备注' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
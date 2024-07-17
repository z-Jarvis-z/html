<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { showNotify } from 'vant';
import { useUserInfoStore } from '@/stores/userInfo';
const remain = ref('')
const years = ref('')
const remark = ref('')
const store = useUserInfoStore()
const onClickLeft = () => history.back()
const onSubmit = (values) => {
    console.log('submit', values);
    axios.post('/api/adddeadproperty', {
        accountId: store.user.accountId,
        years: years.value,
        remaining: remain.value,
        depositType: '死期',
        remark: remark.value

    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            console.log('成功');
            showNotify("成功");
        }
        else {
            console.log('失败');
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);
    });

}

</script>

<template>
    <main>
        <van-nav-bar title="活期转死期" left-text="返回" left-arrow @click-left="onClickLeft" />

        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="remain" name="存款大小" label="存款大小" placeholder="存款大小"
                    :rules="[{ required: true, message: '请填写存款大小' }]" />
                <van-field v-model="years"  name="年限" label="年限" placeholder="年限"
                    :rules="[{ required: true, message: '请填写年限' }]" />
                <van-field v-model="remark"  name="备注" label="备注" placeholder="备注"
                    :rules="[{ required: false, message: '请填写备注' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    存死期
                </van-button>
            </div>
        </van-form>

    </main>
</template>
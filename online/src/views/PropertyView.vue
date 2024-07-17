<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const property = ref('')
const deadproperty = ref('')
const deadlist = ref([])
import { useUserInfoStore } from '@/stores/userInfo';

const store = useUserInfoStore();
const isshow = ref(false)

const show = () => {
    isshow.value = true
}
const itemtostring = (item) => {
    return item.depositTime.substring(0, 10) + "------" +item.expireTime.substring(0, 10)+ "\n利率 "+ item.interestRate
}
const onClickLeft = () => history.back()
onMounted(() => {
    axios.post('/api/property', {
        accountId: store.user.accountId,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            property.value = response.data.data;
        }
        else {
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);
    })

    axios.post('/api/deadpropertys', {
        accountId: store.user.accountId,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            deadproperty.value = response.data.data;
        }
        else {
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);
    })

    axios.post('/api/deadproperty', {
        accountId: store.user.accountId,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            deadlist.value = response.data.data;
            console.log(deadlist);
        }
        else {
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);
    })
})

</script>

<template>
    <van-nav-bar title="资产" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell title="活期" :value="property" />
    <van-cell title="死期" @click="show" :value="deadproperty" label="详情请点击"/>
    <van-popup v-model:show="isshow" closeable position="bottom" :style="{ height: '70%' }" >
        <van-list style="overflow-y: auto;">

        </van-list>
        <van-cell style="margin-top: 30px; " title="按时间降序"></van-cell>
        <van-cell v-for="item in deadlist" :title="item.depositId" :label="itemtostring(item)" :value="item.remaining" />
    </van-popup>

</template>
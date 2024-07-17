<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useUserInfoStore } from '@/stores/userInfo';

const store = useUserInfoStore()
const fromlist = ref([])
const tolist = ref([])
const setlist = () => {
    axios.post('/api/tradesto', {
        accountId: store.user.accountId,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {

        console.log(response.data);
        console.log(response.data.data);
        if (response.data.code === 0) {
            tolist.value = response.data.data;
            console.log(tolist.value);
        }
        else {
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);
    });

    axios.post('/api/tradesfrom', {
        accountId: store.user.accountId,

    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        console.log(response.data);
        if (response.data.code === 0) {
            fromlist.value = response.data.data;
        }
        else {
            showNotify(response.data.msg);
        }
    }).catch(function (error) {
        console.log(error);
    });
}
onMounted(() => {
    setlist()

})


</script>

<template>
    <van-nav-bar title="最近联系过的账户" />
    <van-list style="height: 310px;overflow-y: auto;">
        <van-nav-bar title="收款" />
        <van-list style="overflow-y: auto;">
            <van-cell v-for="(item, index) in fromlist" :key="index" title="收款" :value="item" />
        </van-list>
        <van-nav-bar title="转账" />
        <van-list style="overflow-y: auto;">
            <van-cell v-for="(item, index) in tolist" :key="index" title="转账" :value="item" />
        </van-list>
    </van-list>

</template>

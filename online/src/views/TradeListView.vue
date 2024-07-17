<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useUserInfoStore } from '@/stores/userInfo';
import moment from 'moment';
const onClickLeft = () => history.back()
const store = useUserInfoStore()
const page = ref(1)
const pages = ref(1)
const total = ref(0)
const size = ref(0)
const tradelist = ref([])
const swapTransferDescription = (description) => {
    // 定义分隔符
    const direction = "向";
    const transferKeyword = "转账";

    // 检查字符串中是否包含分隔符和关键字
    if (description.includes(direction) && description.includes(transferKeyword)) {
        // 分割字符串
        const parts = description.split(direction);
        const beforeDirection = parts[0];
        const afterDirection = parts[1].split(transferKeyword)[0]; // 获取"向"和"转账"之间的部分

        // 构造新的描述
        const newDescription = `${afterDirection}向${beforeDirection}转账`;

        return newDescription;
    }

    // 如果不符合格式，返回原字符串
    return description;
}
const getTransferDescription = (item) => {
    if (item.toAccount == store.user.accountId) {
        return swapTransferDescription(item.summary);
    }
    return item.summary;
}

const pageTradeInfo =()=>{
    axios.get('/api/@' + store.user.accountId + '/trades/' + page.value)
        .then(function (response) {
            if (response.data.code == 0) {
                console.log('交易记录获取成功');
                console.log(response.data.data);
                tradelist.value = response.data.data.records;
                total.value = response.data.data.total;
                pages.value = response.data.data.pages;
                size.value = response.data.data.size;
            }
            else {
                console.log('交易记录获取失败');
                console.log(response.data.msg);
            }
        }).catch(function (error) {
            console.log(error);
        });
}

onMounted(() => {
    pageTradeInfo()
    console.log('mounted');
})

</script>

<template>
    <van-nav-bar title="转账" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-list style="height: 310px;overflow-y: auto;">

        <van-card v-for="item, index in tradelist" :key="index" tag="标签" :price="item.tradeMoney"
        :num="moment(item.tradeTime).format('YYYY-MM-DD HH:mm:ss')" :desc="getTransferDescription(item)"
        :title="item.tradeType" thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
    </van-list>
    <van-pagination v-model="page" :page-count="pages" :total-items="total" :show-page-size="3" @change="pageTradeInfo" force-ellipses />


</template>
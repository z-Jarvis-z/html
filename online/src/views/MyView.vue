<script setup>
import { useUserInfoStore } from '@/stores/userInfo';
const store = useUserInfoStore();
</script>
<template>
    <div class="my-view">
        <van-nav-bar title="我的" />
        <van-card :desc="store.user.accountId" :title="store.user.identityName"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
        <van-grid>
            <van-grid-item icon="manager-o" text="账户" />
            <van-grid-item :to="store.isUserLoggedIn ? '/property' : '/login'" icon="cashier-o" text="资产" />
            <van-grid-item to="/tradelist" icon="ecard-pay" text="交易记录" />
            <van-grid-item icon="peer-pay" text="支付记录" />
        </van-grid>
    </div>
</template>
<template>
    <HeaderComponent />
    <RouterView />

    <OrderComponent />
</template>

<script setup>
    import HeaderComponent from "@/components/HeaderComponent.vue";
    import OrderComponent from "@/components/OrderComponent.vue";
    import { RouterView } from 'vue-router';
</script>

<style scoped>

</style>

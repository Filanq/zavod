<template>
    <section class="section menu__section">
        <div class="container menu__container grid-row jc-sb">
            <router-link to="/" class="link menu__logo">
                <img src="@/assets/img/logo/logo.png" alt="Деловая Клякса" class="menu__logo_img">
            </router-link>
            <nav class="grid menu__nav grid-row jc-sb gap-10 ai-c">
                <router-link to="/" class="link">Главная</router-link>
                <router-link to="/order" class="link">Заказ</router-link>
            </nav>
            <nav class="grid menu__nav grid-row jc-sb gap-10 ai-c">
                <router-link to="/register" class="btn-white">Регистрация</router-link>
                <router-link to="/login" class="btn-main">Вход</router-link>
            </nav>
        </div>
    </section>
</template>

<script setup>
    import { RouterLink } from "vue-router";
</script>

<style scoped>
    .menu__section{
        padding: 30px 0;
        background-color: var(--colorWhite);
    }
    .menu__logo_img{
        width: 250px;
    }
</style>
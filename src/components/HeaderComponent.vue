<template>
    <header>
        <section class="section menu__section">
            <div class="container menu__container grid-row jc-sb">
                <router-link to="/" class="link menu__logo">
                    <img src="@/assets/img/logo/logo.png" alt="Деловая Клякса" class="menu__logo_img">
                </router-link>
                <nav class="grid menu__nav grid-row jc-sb gap-10 ai-c">
                    <router-link to="/" class="link menu__link w-600">Главная</router-link>
                    <router-link to="/order" class="link menu__link w-600">Заказ</router-link>
                    <router-link to="/#reviews" class="link menu__link w-600">Отзывы</router-link>
                </nav>
                <nav class="grid menu__nav grid-row jc-sb gap-25 ai-c">
                    <router-link to="/register" class="link menu__link w-600">Регистрация</router-link>
                    <router-link to="/login" class="btn-white w-600 border-2">Вход</router-link>
                </nav>
            </div>
        </section>
    </header>
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
    .menu__link{
        transition: color .3s ease;
    }
    .menu__link:hover, .menu__link:focus-visible{
        color: var(--colorMain);
        outline: none;
    }
</style>
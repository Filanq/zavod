<template>
    <header>
        <section class="section menu__section">
            <div class="container menu__container grid-row jc-sb ai-c">
                <router-link to="/" class="link menu__logo">
                    <img src="@/assets/img/logo/logo.png" alt="Деловая Клякса" class="menu__logo_img">
                </router-link>
                <nav class="grid menu__nav grid-row jc-sb gap-10 ai-c">
                    <router-link to="/" class="link menu__link w-600">Главная</router-link>
                    <router-link to="/order" class="link menu__link w-600">Заказ</router-link>
                    <router-link to="/#reviews" class="link menu__link w-600">Отзывы</router-link>
                    <router-link v-if="user.user_data.is_admin && user.user_data.is_auth" to="/admin" class="link menu__link w-600">Админ панель</router-link>
                    <router-link v-if="user.user_data.is_auth" to="/profile" class="link menu__link w-600">Профиль</router-link>
                </nav>
                <nav class="grid menu__nav grid-row jc-sb gap-25 ai-c">
                    <router-link v-if="!user.user_data.is_auth" to="/register" class="link menu__link w-600">Регистрация</router-link>
                    <router-link v-if="!user.user_data.is_auth" to="/login" class="btn-white w-600 border-2">Вход</router-link>
                    <a v-if="user.user_data.is_auth" @click="logout()" class="btn-white w-600 border-2">Выход</a>
                </nav>
                <svg id="burger" class="burger__btn link" @click="burger_is_open = true" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                <div :class="{'menu__nav_burger_active': burger_is_open}" class="menu__nav_burger grid grid-column ji-c ac-s gap-25">
                    <div class="burger__close w-700 h3 link mb-10" @click="burger_is_open = false">&cross;</div>
                    <nav class="grid grid-column ji-c gap-10 ac-s">
                        <router-link to="/" class="link menu__link w-600">Главная</router-link>
                        <router-link to="/order" class="link menu__link w-600">Заказ</router-link>
                        <router-link to="/#reviews" class="link menu__link w-600">Отзывы</router-link>
                        <router-link v-if="user.user_data.is_admin" to="/admin" class="link menu__link w-600">Админ панель</router-link>
                        <router-link v-if="user.user_data.is_auth" to="/profile" class="link menu__link w-600">Профиль</router-link>
                    </nav>
                    <nav class="grid grid-column ji-c gap-10 ac-s">
                        <router-link v-if="!user.user_data.is_auth" to="/register" class="link menu__link w-600 ta">Регистрация</router-link>
                        <router-link v-if="!user.user_data.is_auth" to="/login" class="btn-white w-600 border-2">Вход</router-link>
                        <a v-if="user.user_data.is_auth" @click="logout()" class="btn-white w-600 border-2">Выход</a>
                    </nav>
                </div>
            </div>
        </section>
    </header>
</template>

<script setup>
    import { RouterLink } from "vue-router";
    import {useUserStore} from "@/stores/UserStore.js";
    import {onMounted, ref} from "vue";
    import router from "@/router/index.js";

    let user = useUserStore();

    let burger_is_open = ref(false);

    const logout = () => {
        user.deleteCookie('token');
        user.logout();
        router.push('/').then(()=>{router.forward()});
    };
</script>

<style scoped>
    .menu__section{
        padding: 30px 0;
        background-color: var(--colorWhite);
        height: 100px;
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
    .menu__nav_burger{
        display: none !important;
    }
    .burger__btn{
        display: none;
    }
    @media(max-width: 1024px){
        .burger__btn{
            display: block;
        }
        .menu__nav{
            display: none !important;
        }
        .menu__nav_burger{
            top: 0;
            display: grid !important;
            position: fixed;
            width: 320px;
            height: 100vh;
            right: -320px;
            background-color: var(--colorWhite);
            z-index: 999;
            padding: 20px;
            transition: right .5s ease, box-shadow .5s ease;
            box-shadow: rgba(31, 39, 73, 0) 0 0 150px 100vw;
        }
        .menu__nav_burger_active{
            right: 0;
            box-shadow: rgba(31, 39, 73, 0.5) 0 0 150px 100vw;
        }
        .menu__link{
            font-size: 18px;
        }
    }
</style>
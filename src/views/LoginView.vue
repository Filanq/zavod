<template>
    <section class="section auth__section">
        <div class="container auth__container gap-50 ac-c">
            <form @submit.prevent="loginUser()" class="form auth__form" enctype="application/x-www-form-urlencoded">
                <h2 class="h3 auth__title w-700 ta-c mb-25">Вход</h2>
                <label for="email" class="label">
                    <input v-model="data.email.value" type="email" class="input auth__input" id="email" placeholder="">
                    <span>Ваша email*</span>
                </label>
                <label for="password" class="label mb-25">
                    <input v-model="data.password.value" type="password" class="input auth__input" id="password" placeholder="">
                    <span>Ваш пароль*</span>
                </label>
                <span class="color-red ta-c" v-show="error">{{ error }}</span>
                <button type="submit" class="btn-main">Войти</button>
            </form>
        </div>
    </section>
</template>

<script setup>
    import axios from "axios";
    import router from "@/router/index.js";
    import {useUserStore} from "@/stores/UserStore.js";
    import {ref} from "vue";

    let error = ref('');

    let data =  {
        email: ref(''),
        password: ref(''),
    };

    let user = useUserStore();

    const loginUser = () => {
        axios.post('http://localhost:3000/api/login', {
            email: data.email.value,
            password: data.password.value,
        }).then(async res => {
            console.log(res.data);
            if(res.data.success){
                console.log('success');
                user.setCookie('token', res.data.token);
                user.login();
                await router.push('/');
                setTimeout(()=>{
                    router.forward();
                }, 50)
            }
            else{
                error.value = res.data.message;
            }
        });
    };
</script>

<style scoped>
    .auth__section{
        min-height: 100vh;
        background-image: linear-gradient(120deg, var(--colorDark), var(--colorMain), var(--colorDark));
    }
    .auth__form{
        padding: 50px;
        background-color: var(--colorWhite);
        border-radius: var(--borderRadiusBig);
    }
</style>
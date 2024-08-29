<template>
    <section class="section auth__section">
        <div class="container auth__container gap-50 ac-c">
            <form action="#" class="form auth__form" enctype="application/x-www-form-urlencoded">
                <h2 class="h2 auth__title w-700 ta-c mb-25 js-s">Вход</h2>
                <label for="email" class="label">
                    <input type="email" class="input auth__input" id="email" placeholder="">
                    <span>Ваша email*</span>
                </label>
                <label for="password" class="label mb-25">
                    <input type="password" class="input auth__input" id="password" placeholder="">
                    <span>Ваш пароль*</span>
                </label>
                <button type="submit" class="btn-main js-s">Регистрация</button>
            </form>
        </div>
        <div class="container auth__container auth__container_img"></div>
    </section>
</template>

<script setup>

</script>

<style scoped>
    .auth__section{
        grid-auto-flow: unset;
        grid-template-columns: 2fr 3fr;
        min-height: 100vh;
        align-items: unset;
        align-content: unset;
        padding-bottom: 0;
    }
    .auth__container_img{
        background-image: url("@/assets/img/auth/login.jpg");
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
        height: 100%;
        background-color: var(--colorMain);
    }
</style>
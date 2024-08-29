<template>
    <section class="section auth__section">
        <div class="container auth__container gap-50 ac-c">
            <form action="#" class="form auth__form" enctype="application/x-www-form-urlencoded">
                <h2 class="h3 auth__title w-700 ta-c mb-25">Регистрация</h2>
                <label for="firstname" class="label">
                    <input type="text" class="input auth__input" id="firstname" placeholder="">
                    <span>Ваше имя*</span>
                </label>
                <label for="lastname" class="label">
                    <input type="text" class="input auth__input" id="lastname" placeholder="">
                    <span>Ваша фамилия*</span>
                </label>
                <label for="email" class="label">
                    <input type="email" class="input auth__input" id="email" placeholder="">
                    <span>Ваша email*</span>
                </label>
                <label for="password" class="label mb-25">
                    <input type="password" class="input auth__input" id="password" placeholder="">
                    <span>Ваш пароль*</span>
                </label>
                <button type="submit" class="btn-main">Регистрация</button>
            </form>
        </div>
    </section>
</template>

<script setup>

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
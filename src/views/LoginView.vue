<template>
    <section class="section auth__section">
        <div class="container auth__section gap-50">
            <h2 class="h2 auth__title w-700 ta-c">Вход</h2>
            <form action="#" class="form auth__form" enctype="application/x-www-form-urlencoded">
                <label for="email" class="label">
                    <input type="email" class="input auth__input" id="email" placeholder="">
                    <span>Ваша почта*</span>
                </label>
                <label for="password" class="label">
                    <input type="password" class="input auth__input" id="password" placeholder="">
                    <span>Ваш пароль*</span>
                </label>
            </form>
            <button type="submit" class="btn-main">Войти</button>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>

</style>
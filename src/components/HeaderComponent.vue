<template>
    <section class="section menu__section">
        <div class="container menu__container">
            <nav class="grid menu__nav grid-row jc-sb gap-10 ai-c">
                <router-link to="/" class="link">Главная</router-link>
                <router-link to="/order" class="link">Заказ</router-link>
            </nav>
        </div>
    </section>
</template>

<script setup>
    import { RouterLink } from "vue-router";
</script>

<style scoped>

</style>
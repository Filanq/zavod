<script setup>
    import {ref} from "vue"
    // почему то не работает(
    // defineProps({
    //     title: String,
    //     price: [String, Number],
    //     description: String,
    //     options1: Array,
    //     options2: Array,
    //     imgsrc: string
    // })
    defineProps(["title", "price", "description", "options1", "options2", "imgsrc, id"])
    defineEmits(["showDetails"])
    const showDetails = ref(false);
</script>

<template>
    <div class="card__wrap" @click="$emit('showDetails')" :data-id="id">
        <img src="../assets/images/musorka/zaglushka.jpg" alt="заглушка">
        <h5 class="h7 text w-200">{{ title }}</h5>
        <h4 class="h6 text w-600">${{ price }}</h4>
    </div>
    <!-- product details block -->
</template>

<style scoped>
    .card__wrap{
        height: 300px;
        width: 300px;
        padding: 10px;
        border-radius: var(--borderRadiusSmall);
        box-shadow:#0b2b9e26 0 6px 20px -6px;
        cursor: pointer;
        transition: .3s;
    }
    .card__wrap img{
        width: 100%;
        height: 200px;
        object-fit: cover;
        margin-bottom: 10px;
    }
    .card__wrap h5{
        margin-bottom: 5px;
    }
    .card__wrap:hover{
        transform: translateY(-5px);
        box-shadow: #0134eeb8;
        transition: .3s;
    }
</style>
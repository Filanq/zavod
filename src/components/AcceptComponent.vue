<template>
    <section class="section modal__section">
        <div class="modal__close w-700 h4 color-white" @click="emits('close')">&cross;</div>
        <div class="container modal__container grid-column gap-25 ac-c">
            <h3 class="h3 modal__title w-600 ta-c">Дата завершения</h3>
            <input v-model="date" type="date" id="date" class="input" placeholder="">
            <div class="color-red ta-c" v-show="error">{{ error }}</div>
            <button @click="accept()" class="btn-main">Принять</button>
        </div>
    </section>
</template>

<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import {useUserStore} from "@/stores/UserStore.js";

    let date = ref('');

    const emits = defineEmits(['close', 'update']);
    const props = defineProps(['id']);

    let error = ref('');

    const accept = () => {
        console.log(date.value);
        if(date.value.trim()){
            axios.put('http://localhost:3000/api/order/' + props.id, {
                date: date.value
            }).then(res => {
                if(res.data.success){
                    emits('update');
                    emits('close');
                }
            });
        }
        else{
            error.value = 'Заполните дату!';
        }
    };
</script>

<style scoped>
    .modal__section{
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        background-color: rgba(37, 37, 37, 0.65);
    }
    #date{
        max-width: 50%;
    }
    .modal__container{
        position: absolute;
        margin: auto;
        max-width: 768px;
        border-radius: var(--borderRadiusBig);
        padding: 20px;
        height: 35vh;
        top: 0;
        bottom: 0;
        background-color: var(--colorWhite);
    }
    .modal__close{
        position: absolute;
        top: 30px;
        right: 30px;
        cursor: pointer;
    }
</style>
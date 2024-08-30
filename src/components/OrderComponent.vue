<template>
    <section class="section order-item__section ">
        <iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;source=constructor-api&amp;um=constructor%3A35de66029325a0e22a48b8100d0c5c40d8e90b450093d5ff7e8d3414afe360a9" frameborder="0" allowfullscreen="true" width="100%" height="100%" style="display: block;"></iframe>
        <div class="container order-item__container ac-c">
            <form @submit.prevent="sendOrder()" class="form order-item__form gap-10">
                <span @click="emits('close')" class="h3 modal__close">&cross;</span>
                <h2 class="h3 w-700 order-item__title js-s mb-25">{{ pdata.title }}</h2>
                    <div class="grid grid-column gap-10 ji-s ac-s width-100">
                        <label for="count" class="label mb-10">
                            <input v-model="data.count.value" type="number" class="input auth__input" id="count" placeholder="">
                            <span>Тираж*</span>
                        </label>
                        <label for="tel" class="label mb-10">
                            <input v-model="data.tel.value" type="tel" class="input auth__input" id="tel" placeholder="">
                            <span>Телефон*</span>
                        </label>
                        <label for="tg" class="label mb-10">
                            <input v-model="data.tg.value" type="text" class="input auth__input" id="tg" placeholder="">
                            <span>Telegram*</span>
                        </label>
                        <label for="office" class="label mb-10">
                            <select v-model="data.address.value" class="input" name="office" id="office">
                                <option value="0">Выберете офис</option>
                                <option value="Проспект имени 60-летия СССР, 34">Проспект имени 60-летия СССР, 34</option>
                                <option value="улица Замятина, 4">улица Замятина, 4</option>
                                <option value="Советская улица, 25">Советская улица, 25</option>
                            </select>
                        </label>
                    </div>
                    <div class="grid grid-column gap-10 ji-s ac-s width-100">
                        <input class="form-upload__input js-c" id="uploadForm_File" type="file" name="file_name" accept="image/*" aria-describedby="hint">
                    </div>
                <span class="js-s w-600 h5 txt-gradient mb-25">Стоимость: {{ cost }}</span>
                <span class="color-red ta-c js-s mb-25" v-show="error">{{ error }}</span>
                <button type="submit" class="btn-main js-s">Заказать</button>
            </form>
        </div>
    </section>
</template>

<script setup>
    import Inputmask from "inputmask";
    import {onMounted, ref, watch} from "vue";
    import axios from "axios";
    import {useUserStore} from "@/stores/UserStore.js";
    import router from "@/router/index.js";

    const props = defineProps(['pdata']);
    const emits = defineEmits(['close']);

    const data = {
        count: ref(),
        tel: ref(''),
        tg: ref(''),
        address: ref(0)
    };

    const cost = ref(0);

    watch(data.count, () => {
        cost.value = data.count.value * props.pdata.sale
    });

    let error = ref('');

    let user = useUserStore();

    const sendOrder = () => {
        axios.post('http://localhost:3000/api/order', {
            count: data.count.value,
            tel: data.tel.value,
            tg: data.tg.value,
            address: data.address.value,
            file: document.querySelector('#uploadForm_File').files[0],
            cost: cost.value,
            type: props.pdata.title,
            token: user.getCookie('token')
        }, {
            headers: {"Content-Type": 'multipart/form-data'}
        }).then(async res => {
            if(res.data.success){
                error.value = '';
                await router.push('/profile');
                setTimeout(()=>{
                    router.forward();
                }, 50)
            }
            else{
                error.value = res.data.message;
            }
        });
    };

    onMounted(()=>{
        let selector = document.getElementById("tel");

        let im = new Inputmask("+7 (999) 999 99-99", {"placeholder": '_'});
        im.mask(selector);


        // DragNDrop
        const dropFileZone = document.querySelector(".form-upload__input")
        const statusText = document.getElementById("uploadForm_Status")
        const sizeText = document.getElementById("uploadForm_Size")
        const uploadInput = document.querySelector(".form-upload__input")

        let setStatus = (text) => {
            statusText.textContent = text
        }

        const uploadUrl = "/unicorns";

        ["dragover", "drop"].forEach(function(event) {
            document.addEventListener(event, function(evt) {
                evt.preventDefault()
                return false;
            })
        })

        dropFileZone.addEventListener("dragenter", function() {
            dropFileZone.classList.add("_active")
        })

        dropFileZone.addEventListener("dragleave", function() {
            dropFileZone.classList.remove("_active")
        })

        dropFileZone.addEventListener("drop", function() {
            dropFileZone.classList.remove("_active")
            const file = event.dataTransfer?.files[0]
            if (!file) {
                return
            }


            uploadInput.files = event.dataTransfer.files
        })
    });


</script>

<style scoped>
    .grid-2c{
        grid-template-columns: 1fr 1fr;
    }
    .order-item__form{
        max-width: unset;
    }
    .modal__close{
        position: absolute;
        top: 30px;
        right: 30px;
        cursor: pointer;
    }
    .order-item__section{
        z-index: 8;
        padding: 0;
        grid-template-columns: 1fr 1fr;
        grid-auto-flow: unset;
        position: fixed;
        left: 0;
        top: 100vh;
        height: calc(100vh - 100px);
        background-color: var(--colorGrey);
    }
    .order-item__section_active{
        top: 100px;
    }
    .order-item__container{
        padding: 50px;
        height: calc(100vh - 100px);
        overflow: overlay;
    }
    .form-upload {
        display: grid;
        align-items: center;
        width: 100%;
    }

    select{
        cursor: pointer;
    }
    .order-item__form{
        gap: 10px;
    }
    .form-upload__input{
        width: 100%;
        cursor: default;
    }

    .form-upload__input::file-selector-button{
        display: grid;
        height: 200px;
        min-height: 100px;
        margin-bottom: 25px;
        color: black;
        font-weight: 500;
        font-size: 18px;
        place-content: center;
        text-align: center;
        width: 100%;
        border: 3px dashed var(--colorMain);
        border-radius: var(--borderRadiusBig);
        justify-self: center;
        position: relative;
        cursor: pointer;
        transition: background-color .3s ease, color .3s ease;
    }
    .form-upload__input._active::file-selector-button{
        background-color: rgba(99, 126, 255, 0.1);
    }

    .upload-zone_dragover svg {
        width: 50px;
        height: 50px;
        margin: auto;
        pointer-events: none;
    }

    .form-upload__hint {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
    }

    .upload-zone_dragover {
        color: var(--colorWhite);
        background-color: rgba(20, 140, 252, 0.43);
    }

    .form-upload__label {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 10px;
    }

    .form-upload__title {
        margin-right: 55px;
        font-size: 18px;
        font-weight: 500;
    }

    .form-upload__input {
        font-family: inherit;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
    }

    .form-upload__input::file-selector-button:hover {
        background-color: var(--colorMain);
        color: var(--colorWhite);
    }

    .form-upload__container {
        margin-top: 10px;
        font-size: 16px;
    }

    .upload-zone_gragover {
        background-color: #593273;
    }

    .upload-hint,
    .upload-status {
        width: 75%;
    }

    .upload-hint {
        display: none;
    }

    .upload-hint_visible {
        display: block;
        pointer-events: none;
    }

    .upload-loader {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .upload-loader_visible {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #593273;
    }

    .upload-loader__image {
        width: 150px;
        height: 150px;
    }
</style>
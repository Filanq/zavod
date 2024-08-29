<template>
    <section class="section order-item__section">
        <iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;source=constructor-api&amp;um=constructor%3A35de66029325a0e22a48b8100d0c5c40d8e90b450093d5ff7e8d3414afe360a9" frameborder="0" allowfullscreen="true" width="100%" height="100%" style="display: block;"></iframe>
        <div class="container order-item__container">
            <form action="#" class="form order-item__form gap-10">
                <h2 class="h2 w-700 order-item__title js-s">Title</h2>
                <label for="count" class="label mb-25">
                    <input type="number" class="input auth__input" id="count" placeholder="">
                    <span>Тираж*</span>
                </label>
                <label for="tel" class="label mb-25">
                    <input type="tel" class="input auth__input" id="tel" placeholder="">
                    <span>Телефон*</span>
                </label>
                <label for="tg" class="label mb-25">
                    <input type="text" class="input auth__input" id="tg" placeholder="">
                    <span>Telegram*</span>
                </label>
                <label for="office" class="label mb-25">
                    <select class="input" name="office" id="office">
                        <option value="0">Выберете офис</option>
                        <option value="1">Проспект имени 60-летия СССР, 34</option>
                        <option value="2">улица Замятина, 4</option>
                        <option value="3">Советская улица, 25</option>
                    </select>
                </label>
                <div class="upload-zone_dragover">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" class="upload-loader__image">
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9"/>
                        <path d="m16 16-4-4-4 4"/>
                    </svg>
                    <p>Перетащи файл сюда</p>
                </div>
                <label class="form-upload__label" for="uploadForm_file">
                    <span class="form-upload__title">Или нажми кнопку</span>
                    <input class="form-upload__input" id="uploadForm_File" type="file" name="file_name" accept="image/*" aria-describedby="hint">
                </label>
                <div class="form-upload__container">
                    <span class="form-upload__hint" id="uploadForm_Hint"></span>
                </div>
                <button type="submit" class="btn-main js-s">Заказать</button>
            </form>
        </div>
    </section>
</template>

<script setup>
    import Inputmask from "inputmask";
    import {onMounted} from "vue";

    onMounted(()=>{
        let selector = document.getElementById("tel");

        let im = new Inputmask("+7 (999) 999 99-99");
        im.mask(selector);

        // DragNDrop
        const dropFileZone = document.querySelector(".upload-zone_dragover")
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
            processingUploadFile()
        })
    });


</script>

<style scoped>
    .order-item__section{
        padding: 0;
        grid-template-columns: 1fr 1fr;
        grid-auto-flow: unset;
    }
    .order-item__container{
        padding: 50px;
    }
    .form-upload {
        display: grid;
        align-items: center;
        width: 80vw;
        min-width: 360px;
    }

    select{
        cursor: pointer;
    }
    .order-item__form{
        gap: 10px;
    }

    .upload-zone_dragover {
        display: grid;
        height: 150px;
        min-height: 100px;
        margin-bottom: 25px;
        color: #FFFFFF;
        font-weight: 500;
        font-size: 18px;
        place-content: center;
        text-align: center;
        width: 100%;
        border: 3px dashed var(--colorMain);
        border-radius: var(--borderRadiusBig);
    }

    .upload-zone_dragover svg {
        width: 75px;
        height: 75px;
        margin: auto;
        pointer-events: none;
    }

    .form-upload__hint {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
    }

    .upload-zone_dragover._active {
        color: var(--colorWhite);
        background-color: rgba(20, 140, 252, 0.43);
    }

    .form-upload__label {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .form-upload__title {
        margin-right: 55px;
        font-size: 18px;
        font-weight: 500;
    }

    .form-upload__input {
        font-family: inherit;
        font-size: 18px;
    }

    .form-upload__input::file-selector-button {
        margin-right: 30px;
        border: none;
        border-radius: 6px;
        padding: 9px 15px;
        font-family: inherit;
        font-weight: inherit;
        transition: background-color 0.2s linear;
        cursor: pointer;
    }

    .form-upload__input::file-selector-button:hover {
        background-color: var(--colorMain);
    }

    .form-upload__container {
        width: 360px;
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
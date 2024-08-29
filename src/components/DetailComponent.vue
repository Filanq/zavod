<script setup>
    defineProps(["title", "price", "description", "options1", "options2", "imgsrc"]);
    defineEmits(["closeDetails"])
</script>

<template>
    <div class="product__details__wrap">
        <div class="close_button" @click="$emit('closeDetails')">X</div>
        <div class="details__img__wrap">
            <img src="../assets/images/musorka/zaglushka.jpg" alt="заглушка">
        </div>
        <div class="details__description__wrap">
            <h3 class="h4 w-600 text">{{ title }}</h3>
            <h2 class="h3 w-800 text">${{ price }}</h2>
            <h5 class="h6 w-200 text">{{ description }}
            </h5>
            <form action="">
                <div class="form__description__wrap">
                    <div class="form__description__inner">
                        <label for="" class="text w-200 h6">Label</label>
                        <select class="text w-200 h6" v-for="option in options1" :key="option">
                            <option value="">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                    <div class="form__description__inner">
                        <label for="" class="text w-200 h6">Label</label>
                        <select class="text w-200 h6" v-for="option in options2" :key="option">
                            <option value="">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
                <input type="submit" class="btn-main description__submit">
                <textarea type="text" placeholder="Enter your comment" class="text h6 w-200 description__comment"></textarea>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .product__details__wrap{
        width: 100%;
        height: 550px;
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 10;
    }
    .details__img__wrap{
        width: 45%;
        height: 100%;
    }
    .details__img__wrap img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .details__description__wrap{
        width: 50%;
        height: 100%;
    }
    .details__description__wrap h3{
        margin-bottom: 30px;
    }
    .details__description__wrap h2{
        margin-bottom: 30px;
    }
    .details__description__wrap h5{
        margin-bottom: 30px;
    }
    .form__description__wrap{
        display: flex;
        margin-bottom: 30px;
        justify-content: space-between;
    }
    .form__description__inner{
        width: 47%;
        display: flex;
        flex-direction: column;
    }
    .form__description__inner label{
        margin-bottom: 5px;
    }
    .form__description__inner select{
        border: .5px solid var(--colorMainLight);
        border-radius: var(--borderRadiusSmall);
        width: 100%;
        height: 40px;
    }
    .description__submit{
        width: 100%;
        margin-bottom: 30px;
    }
    .description__comment{
        height: 150px;
        width: 100%;
        padding: 10px;
        border: .5px solid var(--colorMainLight);
        border-radius: var(--borderRadiusSmall);
        resize: none;
    }
    .close_button{
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        font-size: 36px;
    }
</style>
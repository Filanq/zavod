<script setup>
    import {ref} from "vue";
    import ProductComponent from "../components/ProductComponent.vue"
    import DetailComponent from "@/components/DetailComponent.vue";
    import OrderComponent from "@/components/OrderComponent.vue";
    // массив с карточками из бд
    const products = ref([
        {
        title: "test1",
        price: 10,
        description: "description1",
        options1: ["option1", "option2", "option22"],
        options2: ["option1", "option3", "option32"],
        imgsrc: "../assets/images/musorka/zaglushka.jpg",
        id: 0
        },
        {
        title: "test2",
        price: 20,
        description: "description2",
        options1: ["option2", "option4", "option22"],
        options2: ["option1", "option3", "option32"],
        imgsrc: "assets/images/musorka/zaglushka.jpg",
        id: 1
        },
        {
        title: "test2",
        price: 20,
        description: "description2",
        options1: ["option2", "option4", "option22"],
        options2: ["option1", "option3", "option32"],
        imgsrc: "assets/images/musorka/zaglushka.jpg",
        id: 1
        },
        {
        title: "test2",
        price: 20,
        description: "description2",
        options1: ["option2", "option4", "option22"],
        options2: ["option1", "option3", "option32"],
        imgsrc: "assets/images/musorka/zaglushka.jpg",
        id: 1
        },
        {
        title: "test2",
        price: 20,
        description: "description2",
        options1: ["option2", "option4", "option22"],
        options2: ["option1", "option3", "option32"],
        imgsrc: "assets/images/musorka/zaglushka.jpg",
        id: 1
        },
        {
        title: "test2",
        price: 20,
        description: "description2",
        options1: ["option2", "option4", "option22"],
        options2: ["option1", "option3", "option32"],
        imgsrc: "assets/images/musorka/zaglushka.jpg",
        id: 1
        }
    ])
    const detailsShow = ref(false)
    const idProps = ref()
    function detailsShowFunc(event){
        detailsShow.value = true
        idProps.value = Number(event.target.getAttribute("data-id"))
    }
</script>

<template>
    <div class="section">
        <div class="container">
            <div class="products__title">
                <h3 class="h3 title">Форматы печати</h3>
            </div> 
            <div class="products__wrap">
                <div class="filters__wrap">
                    <div class="filter__inner">
                        <h4 class="h4 w-200 text">Цена, р</h4>
                        <form action="" class="price__form">
                            <div class="price__text__wrap">
                                <input type="number" name="" id="" placeholder="от">
                                <input type="number" name="" id="" placeholder="до">
                            </div>
                            <input type="range" name="" id="" class="price__range">
                        </form>
                    </div>
                    <div class="filter__inner">
                        <h4 class="h4 w-200 text">Материал</h4>
                        <form action="" class="material__form">
                            <div class="material__input__wrap">
                                <input type="checkbox" name="" id=""> <label class="h6 text w-200" for="">Бумага</label>
                            </div>
                            <div class="material__input__wrap">
                                <input type="checkbox" name="" id=""> <label class="h6 text w-200" for="">Картон</label>
                            </div>
                            <div class="material__input__wrap">
                                <input type="checkbox" name="" id=""> <label class="h6 text w-200" for="">Текстиль</label>
                            </div>
                            <div class="material__input__wrap">
                                <input type="checkbox" name="" id=""> <label class="h6 text w-200" for="">Фотобумага</label>
                            </div>
                            <div class="material__input__wrap">
                                <input type="checkbox" name="" id=""> <label class="h6 text w-200" for="">Кружки</label>
                            </div>
                        </form>
                    </div>
                    <div class="filter__inner">
                        <h4 class="h4 w-200 text">Срок доставки</h4>
                        <form action="" class="material__form">
                            <div class="material__input__wrap">
                                <input type="radio" name="date" id=""> <label class="h6 text w-200" for="">Сегодня</label>
                            </div>
                            <div class="material__input__wrap">
                                <input type="radio" name="date" id=""> <label class="h6 text w-200" for="">Завтра</label>
                            </div>
                            <div class="material__input__wrap">
                                <input type="radio" name="date" id=""> <label class="h6 text w-200" for="">На неделе</label>
                            </div>
                            <div class="material__input__wrap">
                                <input type="radio" name="date" id=""> <label class="h6 text w-200" for="">В этом месяце</label>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="products__list__wrap">
                    <div class="products__inner grid gap-25" v-if="!detailsShow">
                        <ProductComponent v-for="product in products" :key="product"
                        v-bind="product" @showDetails="detailsShowFunc"
                        />
                    </div>
                    <DetailComponent v-else :v-bind="products[idProps]" @closeDetails="detailsShow = false"/>        
                </div>
            </div>
        </div>
    </div>
    <OrderComponent/>
</template>

<style scoped>
    .products__wrap{
        width: 100%;
        display: flex;
    }
    .filters__wrap{
        width: 20%;
    }
    .products__list__wrap{
        width: 80%;
        border: .5px solid var(--colorMain);
        padding: 10px;
        border-radius: var(--borderRadius);
    }
    .products__inner{
        width: 100%;
        grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
    }
    .products__title{
        width: 100%;
        margin-bottom: 20px;
    }
    .filter__inner{
        border: 1px solid var(--colorMain);
        padding: 20px;
        width: 90%;
        box-shadow: 11px 11px 13px 4px rgba(37, 119, 182, 0.15);
        margin-bottom: 50px;
        border-radius: var(--borderRadiusSmall);
    }
    .filter__inner h4{
        margin-bottom: 10px;
    }
    .price__form{
        width: 100%;
    }
    .price__text__wrap{
        width: 100%;
        display: flex;
        margin-bottom: 10px;
    }
    .price__text__wrap input{
        padding: 10px;
        border: 1px solid var(--colorMain);
        width: 50%;
    }
    .price__range{
        width: 100%;
    }
    .material__form{
        display: flex;
        flex-direction: column;
    }
</style>
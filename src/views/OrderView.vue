<template>
    <section class="section order__section">
        <div class="container order__container gap-50">
            <h2 class="h2 order__title w-700 ta-c txt-gradient">
                Заказ печати
            </h2>
            <div class="order__inner grid gap-25 width-100">
                <div @click="openOrderModal(Object.assign(card, Object))" v-for="card in order_data" class="order__card grid grid-column ji-s ac-s gap-10">
                    <img :src="card.img" class="order-card__img" :alt="card.title">
                    <h3 class="h4 order-card__title w-600">{{ card.title }}</h3>
                    <span class="order-card__sale color-main-light h6">от {{ card.sale }}₽</span>
                </div>
            </div>
        </div>
    </section>

    <OrderComponent
        :pdata="order_component_data"
        :class="{'order-item__section_active': order_item_is_open}"
        @close="closeOrderModal()"
    />
</template>

<script setup>
    import OrderComponent from "@/components/OrderComponent.vue";
    import {ref} from "vue";

    const order_data = [
        {
            title: 'Фотографии',
            img: '/img/order/photo.png',
            sale: 14.90
        },
        {
            title: 'Открытки',
            img: '/img/order/postcard.png',
            sale: 100.00
        },
        {
            title: 'Плакаты',
            img: '/img/order/poster.png',
            sale: 9900.00
        },
        {
            title: 'Большие фотографии',
            img: '/img/order/big_photo.png',
            sale: 105.00
        },
        {
            title: 'Календари',
            img: '/img/order/calendars.png',
            sale: 100.00
        },
    ];

    let order_component_data = ref({});
    let order_item_is_open = ref(false);
    const openOrderModal = (data) => {
        if(!order_item_is_open.value){
            order_component_data.value = data;
            document.body.style.overflowY = 'hidden';
            order_item_is_open.value = true;
        }
    };
    const closeOrderModal = () => {
        document.body.style.overflowY = '';
        order_item_is_open.value = false;
    };
</script>

<style scoped>
    .order__inner{
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
    .order-card__img{
        width: 100%;
        object-fit: contain;
        object-position: center center;
        height: 250px;
    }
    .order__section{
        padding-top: 150px;
    }
    .order__card{
        padding: 20px;
        border-radius: var(--borderRadius);
        background-color: var(--colorWhite);
        cursor: pointer;
    }
    @media(max-width: 1024px){
        .order__inner{
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
    }
    @media(max-width: 576px){
        .order__inner{
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
</style>
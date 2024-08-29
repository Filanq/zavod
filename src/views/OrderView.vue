<script setup>
import { ref } from "vue";

const orderCards = ref([
  {
    id: 0,
    title: "Чернила для рисования",
    description:
      "Высококачественные чернила, идеально подходящие для художественного рисования и каллиграфии.",
    price: 10,
    imgUrl: "@/assets/img/page-main/ikn.png",
  },
  {
    id: 1,
    title: "Фломастеры Клякса",
    description:
      "Набор фломастеров с яркими цветами, подходящие для детей и взрослых.",
    price: 15,
    imgUrl: "./assets/img/page-main/marker.png",
  },
  {
    id: 2,
    title: "Краски акварельные",
    description: "Набор акварельных красок для создания удивительных картин.",
    price: 20,
    imgUrl: "./assets/img/page-main/watercolor.png",
  },
  {
    id: 3,
    title: "Блокнот для заметок",
    description:
      "Удобный блокнот с качественной бумагой для записей и заметок.",
    price: 8,
    imgUrl: "./assets/img/page-main/notebook.png",
  },
  {
    id: 4,
    title: "Ластик Клякса",
    description:
      "Эффективный ластик, который легко стирает следы ручки и карандаша.",
    price: 2,
    imgUrl: "./assets/img/page-main/eraser.png",
  },
  {
    id: 5,
    title: "Картон для творчества",
    description: "Набор цветного картона для поделок и аппликаций.",
    price: 12,
    imgUrl: "./assets/img/page-main/cardstock.png",
  },
]);
</script>

<template>
  <section class="order-card__section flex">
    <div
      v-for="orderCard in orderCards"
      :key="orderCard.id"
      class="order-card__wrap"
    >
      <img :src="orderCard.imgUrl" alt="" class="order-card__img" />
      <div class="order-card__title">{{ orderCard.title }}</div>
      <p class="order-card__description">{{ orderCard.description }}</p>
      <div class="order-card__price">{{ orderCard.price }}$</div>
    </div>
  </section>
</template>


<style scoped>
.order-card__section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  border-radius: var(--borderRadius);
  border: 0.5px solid var(--colorMain);
  padding: 10px;
}

.order-card__wrap {
  border: 0.5px solid var(--colorMain); /* Цвет границы карточки */
  border-radius: var(--borderRadius); /* Радиус границы карточки */
  padding: 10px; /* Внутренний отступ для карточек */
  box-sizing: border-box; /* Учитываем отступы и границы в ширине */
}

.order-card__inner {
  display: flex; /* Используем Flexbox для вертикального расположения содержимого карточки */
  flex-direction: column; /* Вертикальное расположение */
  align-items: center; /* Центрируем содержимое по горизонтали */
}

.order-card__img {
  width: 100%; /* Устанавливаем изображение на всю ширину карточки */
  height: auto; /* Автоматическая высота */
}

.order-card__title {
  font-weight: bold; /* Жирный текст для заголовка */
  margin: 10px 0; /* Отступы сверху и снизу */
}

.order-card__description {
  color: #555; /* Серый цвет для описания */
  margin: 5px 0; /* Отступы сверху и снизу */
}

.order-card__price {
  font-weight: bold; /* Жирный текст для цены */
  color: #16a34a; /* Зеленый цвет для цены */
}

</style>
<template>
 <section class="w-full py-10 grid justify-items-center items-center z-20 relative overflow-hidden">
    <div class="flex flex-col md:flex-row w-full px-10">
      <div class="w-full md:w-1/2  bg-white flex items-center justify-center">
        <img class="p-5 md:p-10" src="@/assets/img/page-main/ikn2.jpg" alt="Изображение" />
      </div>
      <div class="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
        <h2 class="text-4xl md:text-6xl mb-5">Лучшие чернила в Кляксе!!!</h2>
        <p class="mb-5 text-gray-700 text-sm">
         В компании "Клякса" мы гордимся тем, что предлагаем только лучшие чернила. Наша продукция отличается высоким качеством, насыщенными цветами и отличной стойкостью на бумаге. Чернила "Клякса" идеально подходят для рисования, письма и каллиграфии, позволяя вам создавать настоящие шедевры.
        </p>
        <button class="w-min bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Подробнее
        </button>
      </div>
    </div>
  </section>

   <section class="w-full py-10 grid justify-items-center items-center z-20 relative overflow-hidden">
    <div class="w-full">
      <h2 class="text-4xl md:text-6xl flex justify-center mb-6">Best Product</h2>
    </div>
    <div class="w-full p-5 md:px-20 md:py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id" class="bg-white border border-gray-300 rounded-md shadow-lg flex flex-col justify-center p-5">
        <img :src="product.icon" alt="Icon" class="h-12 w-12 mb-2" />
        <h3 class="font-semibold text-lg mb-2">{{ product.title }}</h3>
        <p class="text-gray-600 text-sm">{{ product.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
    { 
        id: 1, 
        title: "Чернила для рисования", 
        description: "Высококачественные чернила, идеально подходящие для художественного рисования и каллиграфии. Яркие цвета и отличная стойкость на бумаге.", 
        icon: "path/to/icon1.png" 
    },
    { 
        id: 2, 
        title: "Фломастеры Клякса", 
        description: "Набор фломастеров с яркими цветами и удобным корпусом. Подходят для детей и взрослых, не токсичны и легко смываются с кожи.", 
        icon: "path/to/icon2.png" 
    },
    { 
        id: 3, 
        title: "Краски акварельные", 
        description: "Набор акварельных красок для создания удивительных картин. Легко смешиваются и наносятся, обеспечивая плавные переходы цвета.", 
        icon: "path/to/icon3.png" 
    },
    { 
        id: 4, 
        title: "Блокнот для заметок", 
        description: "Удобный блокнот с качественной бумагой, идеально подходит для записей, заметок и творчества. Компактный размер для удобства.", 
        icon: "path/to/icon4.png" 
    },
    { 
        id: 5, 
        title: "Ластик Клякса", 
        description: "Эффективный ластик, который легко стирает следы ручки и карандаша. Не оставляет следов и подходит для любого типа бумаги.", 
        icon: "path/to/icon5.png" 
    },
    { 
        id: 6, 
        title: "Картон для творчества", 
        description: "Набор цветного картона различных оттенков. Идеален для поделок, аппликаций и других творческих проектов.", 
        icon: "path/to/icon6.png" 
    },
]);
</script>

<style scoped>
.height-50vh {
  height: 80vh;
}
</style>

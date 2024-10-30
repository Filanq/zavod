<template>
    <section class="section admin__section">
        <div class="container admin__container gap-50">
            <h2 class="h2 admin__title js-s w-700">
                Управление заказами
            </h2>
            <div v-for="(order, index) in orders" :class="{'admin__inner_red': order.status === 'Отклонено', 'admin__inner_yellow': order.status === 'На рассмотрении', 'admin__inner_green': order.status === 'Выполнено'}" class="admin__inner grid grid-column ji-s ac-s gap-50 width-100" data-aos="fade-up">
                <div class="admin__card grid grid-row gap-25 ai-c jc-sb width-100">
                    <div class="admin-card__first grid grid-row gap-25 jc-s ai-e">
                        <div class="admin-card__column grid grid-column gap-25 ac-s ji-s">
                            <h3 class="h4 w-600 admin-card__title">Заказ #00{{ index + 1 }}</h3>
                            <div class="admin-card__text w-200 grid grid-column gap-10">
                            <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h6">Тип:</span>
                                <span class="admin-card__txt2 w-400">{{ order.title }}</span>
                            </span>
                                <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h6">Дата:</span>
                                <span class="admin-card__txt2 w-400">{{ order.date.split('T')[0] }}</span>
                            </span>
                                <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h6">Дата заверш.:</span>
                                <span class="admin-card__txt2 w-400">{{ order.date_end ? order.date_end.split('T')[0] : '__.__.____' }}</span>
                            </span>
                                <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h6">Адрес:</span>
                                <span class="admin-card__txt2 w-400">{{ order.address }}</span>
                            </span>
                                <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h5">Стоимость:</span>
                                <span class="admin-card__txt2 w-600 h6 color-dark">{{ order.cost }}Р.</span>
                            </span>
                            </div>
                        </div>
                        <div class="admin-card__column grid grid-column gap-25 ac-s ji-s">
                            <div class="admin-card__text w-200 grid grid-column gap-10">
                            <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h6">Кол-во:</span>
                                <span class="admin-card__txt2 w-400">{{ order.count }}</span>
                            </span>
                                <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h6">Файл:</span>
                                <a :href="order.path.split('/usr/src/app/dist')[1]" target="_blank" class="admin-card__txt2 w-400">{{ order.path.split(`/`)[order.path.split(`/`).length - 1] }}</a>
                            </span>
                                <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h6">Контакт:</span>
                                <span class="admin-card__txt2 w-400">{{ order.contact }}</span>
                            </span> <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h6">TG:</span>
                                <span class="admin-card__txt2 w-400">{{ order.tg }}</span>
                            </span>
                                <span class="grid grid-row gap-10 jc-s ai-c">
                                <span class="w-600 h5 txt-gradient">Статус:</span>
                                <span class="admin-card__txt2 w-600 h6 ">{{ order.status }}</span>
                            </span>
                            </div>
                        </div>
                        <div class="admin-card__column grid grid-column gap-25 ac-s ji-s">
                            <div class="admin-card__text w-200 grid grid-column gap-10">
                                <button @click="openAcceptWindow(order.id)" class="btn-main">{{ order.status !== 'Отклонено' ? 'Назначить дату' : 'Возобновить' }}</button>
                                <button v-if="order.status !== 'Отклонено'" @click="deleteOrder(order.id)" class="btn-white">Отклонить</button>
                            </div>
                        </div>
                    </div>

                    <div class="admin-card__column grid grid-column gap-25 ac-s ji-s js-e">
                        <div :class="{'progress-red': order.status === 'Отклонено', 'progress-yellow': order.status === 'На рассмотрении', 'progress-green': order.status === 'Выполнено'}" class="progress-circle admin-card__progress admin">
                            <span>{{ progresses[index] + '%' }}</span>
                            <div class="left-half-clipper">
                                <div class="first50-bar"></div>
                                <div class="value-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <AcceptComponent
        v-if="acceptWindowIsOpened"
        @close="closeAcceptWindow()"
        @update="update()"
        :id="acceptId"
    />
</template>

<script setup>
    import AOS from 'aos';
    import 'aos/dist/aos.css';
    import {onMounted, onUpdated, ref} from "vue";
    import {useUserStore} from "@/stores/UserStore.js";
    import axios from "axios";
    import AcceptComponent from "@/components/AcceptComponent.vue";
    let orders = ref([]);

    let progresses = ref([]);

    let user = useUserStore();

    let acceptWindowIsOpened = ref(false);
    let acceptId = ref(0);

    const update = () => {
        let i = 0

        axios.get(window.origin + '/api/order/').then(res => {
            orders.value = res.data['orders'];
            orders.value.forEach(order => {
                let now = 0;
                if(order.status === 'Выполнено'){
                    now = 100;
                }
                else if(order.status === 'Отклонено' || order.status === 'На рассмотрении'){
                    now = 0;
                }
                else if(order.date_end){
                    let full = 100 / ((new Date(order.date_end) - new Date(order.date)) / 1000 / 60 / 60);
                    now = Math.ceil(Math.abs(full * ((new Date(order.date_end) - new Date()) / 1000 / 60 / 60) - 100));
                    console.log(now);
                    if(now > 100) now = 100;
                    if(now < 0) now = 0;
                }
                progresses.value.push(now);
            });

            document.querySelectorAll('.progress-circle').forEach(el => {
                el.classList.add('p' + progresses.value[i]);
                if(progresses.value[i] >= 50){
                    el.classList.add('over50');
                }
                i++;
            });
        });
    };

    const openAcceptWindow = (id) => {
        acceptWindowIsOpened.value = true;
        document.body.style.overflowY = 'hidden';
        acceptId.value = id;
    };
    const deleteOrder = (id) => {
        axios.delete(window.origin + "/api/order/" + id).then(res=>{
            update();
        });
    }
    const closeAcceptWindow = () => {
        acceptWindowIsOpened.value = false;
        document.body.style.overflowY = '';
    };

    axios.get(window.origin + '/api/order/').then(res => {
        orders.value = res.data['orders'];
        orders.value.forEach(order => {
            console.log(order.date_end);
            let now = 0;
            if(order.status === 'Выполнено'){
                now = 100;
            }
            else if(order.status === 'Отклонено' || order.status === 'На рассмотрении'){
                now = 0;
            }
            else if(order.date_end){
                console.log(new Date(order.date));
                let full = 100 / ((new Date(order.date_end) - new Date(order.date)) / 1000 / 60 / 60);
                now = Math.ceil(Math.abs(full * ((new Date(order.date_end) - new Date()) / 1000 / 60 / 60) - 100));
                if(now > 100) now = 100;
                if(now < 0) now = 0;
            }
            progresses.value.push(now);
        });
    });

    onUpdated(() => {
        AOS.init();

        let i = 0;

        document.querySelectorAll('.progress-circle').forEach(el => {
            el.classList.add('p' + progresses.value[i]);
            if(progresses.value[i] >= 50){
                el.classList.add('over50');
            }
            i++;
        });
    });
</script>

<style scoped>
    .admin__section{
        padding-top: 150px;
    }
    .admin__card{
        background-color: var(--colorWhite);
        padding: 20px;
        border-radius: var(--borderRadius);
    }
    .admin-card__txt2{
        position: relative;
        bottom: -2px;
    }
    .admin-card__text{
        margin-left: 10px;
    }
    .admin-card__progress{
        transform: scale(2);
        margin: 70px;
    }
    .admin__inner{
        box-shadow: var(--colorMain) 0 0 50px -25px;
    }
    .admin__inner_red{
        box-shadow: #ef4f4f 0 0 50px -25px;
    }
    .admin__inner_green{
        box-shadow: #33d555 0 0 50px -25px;
    }
    .admin__inner_yellow{
        box-shadow: #e8d13d 0 0 50px -25px;
    }
    .admin__inner_green .status-color{
        color: #33d555;
    }
    .admin__inner_red .status-color{
        color: #ef4f4f;
    }
    .admin__inner_yellow .status-color{
        color: #e8d13d;
    }

    /* Progress Bar */
    .progress-circle {
        font-size: 20px;
        position: relative; /* so that children can be absolutely positioned */
        padding: 0;
        width: 5em;
        height: 5em;
        border-radius: 50%;
        line-height: 5em;
        float: left;
        background-color: #e8e8e8;
    }

    .progress-circle:after{
        border: none;
        position: absolute;
        top: 0.5em;
        left: 0.5em;
        text-align: center;
        display: block;
        border-radius: 50%;
        width: 4em;
        height: 4em;
        background-color: white;
        content: " ";
    }
    /* Text inside the control */
    .progress-circle span {
        position: absolute;
        line-height: 5em;
        width: 5em;
        text-align: center;
        display: block;
        color: var(--colorMain);
        z-index: 2;
        top: 5px;
        left: 5px;
    }
    .progress-red span{
        color: #ef4f4f;
    }
    .progress-green span{
        color: #33d555;
    }
    .progress-yellow span{
        color: #e8d13d;
    }
    .left-half-clipper {
        /* a round circle */
        border-radius: 50%;
        width: 5em;
        height: 5em;
        position: absolute;
        clip: rect(0, 5em, 5em, 2.5em);
        left: 5px;
        top: 5px;
        transform: scale(1.1);
    }
    /* when p>50, don't clip left half*/
    .progress-circle.over50 .left-half-clipper {
        clip: rect(auto,auto,auto,auto);
    }
    .value-bar {
        /*This is an overlayed square, that is made round with the border radius,
        then it is cut to display only the left half, then rotated clockwise
        to escape the outer clipping path.*/
        position: absolute; /*needed for clipping*/
        clip: rect(0, 2.5em, 5em, 0);
        width: 5em;
        height: 5em;
        border-radius: 50%;
        border: 0.45em solid var(--colorMain); /*The border is 0.35 but making it larger removes visual artifacts */
        /*background-color: #4D642D;*/ /* for debug */
        box-sizing: border-box;

    }
    .progress-green .value-bar {
        border: 0.45em solid #33d555;
    }
    .progress-red .value-bar {
        border: 0.45em solid #ef4f4f;
    }
    .progress-yellow .value-bar {
        border: 0.45em solid #e8d13d;
    }
    /* Progress bar filling the whole right half for values above 50% */
    .progress-circle.over50 .first50-bar {
        /*Progress bar for the first 50%, filling the whole right half*/
        position: absolute; /*needed for clipping*/
        clip: rect(0, 5em, 5em, 2.5em);
        background-color: var(--colorMain);
        border-radius: 50%;
        width: 5em;
        height: 5em;
    }
    .progress-green.over50 .first50-bar {
        background-color: #33d555;
    }
    .progress-red.over50 .first50-bar {
        background-color: #ef4f4f !important;
    }
    .progress-yellow.over50 .first50-bar {
        background-color: #e8d13d !important;
    }
    .progress-circle:not(.over50) .first50-bar{ display: none; }


    /* Progress bar rotation position */
    .progress-circle.p0 .value-bar { display: none; }
    .progress-circle.p1 .value-bar { transform: rotate(4deg); }
    .progress-circle.p2 .value-bar { transform: rotate(7deg); }
    .progress-circle.p3 .value-bar { transform: rotate(11deg); }
    .progress-circle.p4 .value-bar { transform: rotate(14deg); }
    .progress-circle.p5 .value-bar { transform: rotate(18deg); }
    .progress-circle.p6 .value-bar { transform: rotate(22deg); }
    .progress-circle.p7 .value-bar { transform: rotate(25deg); }
    .progress-circle.p8 .value-bar { transform: rotate(29deg); }
    .progress-circle.p9 .value-bar { transform: rotate(32deg); }
    .progress-circle.p10 .value-bar { transform: rotate(36deg); }
    .progress-circle.p11 .value-bar { transform: rotate(40deg); }
    .progress-circle.p12 .value-bar { transform: rotate(43deg); }
    .progress-circle.p13 .value-bar { transform: rotate(47deg); }
    .progress-circle.p14 .value-bar { transform: rotate(50deg); }
    .progress-circle.p15 .value-bar { transform: rotate(54deg); }
    .progress-circle.p16 .value-bar { transform: rotate(58deg); }
    .progress-circle.p17 .value-bar { transform: rotate(61deg); }
    .progress-circle.p18 .value-bar { transform: rotate(65deg); }
    .progress-circle.p19 .value-bar { transform: rotate(68deg); }
    .progress-circle.p20 .value-bar { transform: rotate(72deg); }
    .progress-circle.p21 .value-bar { transform: rotate(76deg); }
    .progress-circle.p22 .value-bar { transform: rotate(79deg); }
    .progress-circle.p23 .value-bar { transform: rotate(83deg); }
    .progress-circle.p24 .value-bar { transform: rotate(86deg); }
    .progress-circle.p25 .value-bar { transform: rotate(90deg); }
    .progress-circle.p26 .value-bar { transform: rotate(94deg); }
    .progress-circle.p27 .value-bar { transform: rotate(97deg); }
    .progress-circle.p28 .value-bar { transform: rotate(101deg); }
    .progress-circle.p29 .value-bar { transform: rotate(104deg); }
    .progress-circle.p30 .value-bar { transform: rotate(108deg); }
    .progress-circle.p31 .value-bar { transform: rotate(112deg); }
    .progress-circle.p32 .value-bar { transform: rotate(115deg); }
    .progress-circle.p33 .value-bar { transform: rotate(119deg); }
    .progress-circle.p34 .value-bar { transform: rotate(122deg); }
    .progress-circle.p35 .value-bar { transform: rotate(126deg); }
    .progress-circle.p36 .value-bar { transform: rotate(130deg); }
    .progress-circle.p37 .value-bar { transform: rotate(133deg); }
    .progress-circle.p38 .value-bar { transform: rotate(137deg); }
    .progress-circle.p39 .value-bar { transform: rotate(140deg); }
    .progress-circle.p40 .value-bar { transform: rotate(144deg); }
    .progress-circle.p41 .value-bar { transform: rotate(148deg); }
    .progress-circle.p42 .value-bar { transform: rotate(151deg); }
    .progress-circle.p43 .value-bar { transform: rotate(155deg); }
    .progress-circle.p44 .value-bar { transform: rotate(158deg); }
    .progress-circle.p45 .value-bar { transform: rotate(162deg); }
    .progress-circle.p46 .value-bar { transform: rotate(166deg); }
    .progress-circle.p47 .value-bar { transform: rotate(169deg); }
    .progress-circle.p48 .value-bar { transform: rotate(173deg); }
    .progress-circle.p49 .value-bar { transform: rotate(176deg); }
    .progress-circle.p50 .value-bar { transform: rotate(180deg); }
    .progress-circle.p51 .value-bar { transform: rotate(184deg); }
    .progress-circle.p52 .value-bar { transform: rotate(187deg); }
    .progress-circle.p53 .value-bar { transform: rotate(191deg); }
    .progress-circle.p54 .value-bar { transform: rotate(194deg); }
    .progress-circle.p55 .value-bar { transform: rotate(198deg); }
    .progress-circle.p56 .value-bar { transform: rotate(202deg); }
    .progress-circle.p57 .value-bar { transform: rotate(205deg); }
    .progress-circle.p58 .value-bar { transform: rotate(209deg); }
    .progress-circle.p59 .value-bar { transform: rotate(212deg); }
    .progress-circle.p60 .value-bar { transform: rotate(216deg); }
    .progress-circle.p61 .value-bar { transform: rotate(220deg); }
    .progress-circle.p62 .value-bar { transform: rotate(223deg); }
    .progress-circle.p63 .value-bar { transform: rotate(227deg); }
    .progress-circle.p64 .value-bar { transform: rotate(230deg); }
    .progress-circle.p65 .value-bar { transform: rotate(234deg); }
    .progress-circle.p66 .value-bar { transform: rotate(238deg); }
    .progress-circle.p67 .value-bar { transform: rotate(241deg); }
    .progress-circle.p68 .value-bar { transform: rotate(245deg); }
    .progress-circle.p69 .value-bar { transform: rotate(248deg); }
    .progress-circle.p70 .value-bar { transform: rotate(252deg); }
    .progress-circle.p71 .value-bar { transform: rotate(256deg); }
    .progress-circle.p72 .value-bar { transform: rotate(259deg); }
    .progress-circle.p73 .value-bar { transform: rotate(263deg); }
    .progress-circle.p74 .value-bar { transform: rotate(266deg); }
    .progress-circle.p75 .value-bar { transform: rotate(270deg); }
    .progress-circle.p76 .value-bar { transform: rotate(274deg); }
    .progress-circle.p77 .value-bar { transform: rotate(277deg); }
    .progress-circle.p78 .value-bar { transform: rotate(281deg); }
    .progress-circle.p79 .value-bar { transform: rotate(284deg); }
    .progress-circle.p80 .value-bar { transform: rotate(288deg); }
    .progress-circle.p81 .value-bar { transform: rotate(292deg); }
    .progress-circle.p82 .value-bar { transform: rotate(295deg); }
    .progress-circle.p83 .value-bar { transform: rotate(299deg); }
    .progress-circle.p84 .value-bar { transform: rotate(302deg); }
    .progress-circle.p85 .value-bar { transform: rotate(306deg); }
    .progress-circle.p86 .value-bar { transform: rotate(310deg); }
    .progress-circle.p87 .value-bar { transform: rotate(313deg); }
    .progress-circle.p88 .value-bar { transform: rotate(317deg); }
    .progress-circle.p89 .value-bar { transform: rotate(320deg); }
    .progress-circle.p90 .value-bar { transform: rotate(324deg); }
    .progress-circle.p91 .value-bar { transform: rotate(328deg); }
    .progress-circle.p92 .value-bar { transform: rotate(331deg); }
    .progress-circle.p93 .value-bar { transform: rotate(335deg); }
    .progress-circle.p94 .value-bar { transform: rotate(338deg); }
    .progress-circle.p95 .value-bar { transform: rotate(342deg); }
    .progress-circle.p96 .value-bar { transform: rotate(346deg); }
    .progress-circle.p97 .value-bar { transform: rotate(349deg); }
    .progress-circle.p98 .value-bar { transform: rotate(353deg); }
    .progress-circle.p99 .value-bar { transform: rotate(356deg); }
    .progress-circle.p100 .value-bar { transform: rotate(360deg); }

    @media(max-width: 1280px){
        .admin__card{
            width: 100%;
            justify-content: center;
            justify-items: center;
            grid-auto-flow: row !important;
        }
        .admin-card__column{
            justify-self: start;
        }
        .admin-card__first{
            width: 100%;
            justify-content: space-between;
        }
        .progress-circle span{
            left: 5px;
            top: 5px;
        }
    }
    @media (max-width: 1024px){

        .left-half-clipper {
            left: 10px;
            top: 10px;
            transform: scale(1.25);
        }
        .admin-card__first {
            grid-auto-flow: row;
            justify-items: center;
            justify-content: center;
        }
        .admin-card__column:last-child {
            justify-self: start;
        }
        .admin-card__text{
            justify-self: start;
            margin: 0;
        }
        .progress-circle span{
            left: 10px;
            top: 10px;
        }
    }
    @media (max-width: 576px){
        .admin-card__first {
            grid-auto-flow: row;
            justify-items: center;
        }
        .admin-card__column:last-child {
            justify-self: start;
        }
        .admin-card__text{
            margin: 0;
        }
    }
</style>
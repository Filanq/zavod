<script setup>

</script>

<template>
    <div class="section">
        <div class="container">
            <div class="order__wrap">
                <div class="map__wrap"></div>
                <div class="description__wrap">
                    <h2 class="title h2">Title</h2>
                    <form action="">
                        <div class="radio__order__wrap">
                            <div><input type="radio" name="order"> <label for="">Text</label></div>
                            <div><input type="radio" name="order"> <label for="">Text</label></div>
                            <div><input type="radio" name="order"> <label for="">Text</label></div>
                            <div><input type="radio" name="order"> <label for="">Text</label></div>
                        </div>
                        <select name="" id="">
                            <option value="">Option1</option>
                            <option value="">Option2</option>
                            <option value="">Option3</option>
                        </select>
                        <button class="btn-main">Заказать</button>
                        <textarea placeholder="Введите ваш комментарий"></textarea>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .order__wrap{
        width: 100%;
        display: flex;
        border: 1px solid var(--colorMain);
        border-radius: 5px;
    }
    .map__wrap{
        width: 50%;
    }
    .description__wrap{
        width: 50%;
    }
    .description__wrap h2{
        margin-bottom: 20px;
    }
    .description__wrap form{
        width: 90%;
        display: flex;
        flex-direction: column;
    }
    .description__wrap textarea{
        resize: none;
        padding: 20px;
        height: 100px;
        overflow-y: scroll;
    }
    .radio__order__wrap{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    .description__wrap select{
        margin-bottom: 20px;
        padding: 5px;
    }
    .description__wrap button{
        margin-bottom: 20px;
        border-radius: var(--borderRadiusSmall);
    }
</style>
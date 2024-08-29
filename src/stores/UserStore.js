import {ref} from "vue";
import axios from "axios";
import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', () => {
    const user_data = {
        is_auth: ref(true),
        id: ref(0),
        email: ref('')
    };
    function login() {
        axios.get(window.origin + '/api/is_auth').then(data => {
            if(data.data['is_auth']){
                user_data.email.value = data.data['email'];
                user_data.id.value = data.data['id'];
                user_data.is_auth.value = true;
            }
        });
    }
    function logout() {
        user_data.email.value = '';
        user_data.id.value = 0;
        user_data.is_auth.value = false;
    }

    return { login, logout, user_data }
})
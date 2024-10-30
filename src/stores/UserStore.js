import {ref} from "vue";
import axios from "axios";
import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', () => {
    const user_data = {
        is_auth: ref(false),
        id: ref(0),
        email: ref(''),
        is_admin: ref(false)
    };
    function setCookie(name, value, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function login() {
        axios.post(window.origin + '/api/is_auth', {
            token: getCookie('token')
        }).then(data => {
            if(data.data['is_auth']){
                user_data.email.value = data.data['email'];
                user_data.id.value = data.data['id'];
                user_data.is_auth.value = true;
                user_data.is_admin.value = data.data['is_admin'];
                tried.value = true;
            }
        });
    }

    login();

    function deleteCookie(name) {
        setCookie(name, "", {
            'max-age': -1
        })
    }

    function logout() {
        user_data.email.value = '';
        user_data.id.value = 0;
        user_data.is_auth.value = false;
    }

    let tried = ref(false);

    return { login, logout, user_data, setCookie, getCookie, deleteCookie, tried }
})
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    login: '',
    email: '',
    token: '',
  });

  const isLoggedIn = computed(() => !!user.value.token);

  const setLogin = (login: string) =>
    (user.value.login = login);
  const setEmail = (email: string) =>
    (user.value.email = email);
  const setToken = (token: string) =>
    (user.value.token = token);

  const logout = () => {
    user.value = {
      login: '',
      email: '',
      token: '',
    };
  };

  return {
    user,
    isLoggedIn,
    setToken,
    setEmail,
    setLogin,
    logout,
  };
},{
  persist: {
    enabled: true,
    restore: true,
    storage: 'local'
}});

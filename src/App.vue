<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  beforeMount() {
    this.$router.push('/login');  // Redirigir a /home antes de montar
  }
};
</script>

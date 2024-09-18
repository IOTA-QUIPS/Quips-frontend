<template>
  <div class="login">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Ingresa tu nombre de usuario"
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Ingresa tu contraseña"
        />
      </div>

      <button type="submit" :disabled="isLoading">Iniciar Sesión</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <div v-if="isLoading">Cargando...</div>
  </div>
</template>

<script>
import authService from '@/auth/services/authService';

export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        // Realizar la solicitud de login
        const response = await authService.login(this.username, this.password);

        // Si hay un error, mostrar el mensaje
        if (response.error) {
          this.errorMessage = response.error;
          this.isLoading = false;
          return;
        }

        // Obtener el token
        const token = response.token;
        localStorage.setItem('token', token);

        // Obtener la información del usuario
        const userInfo = await authService.getUserInfo(token);

        if (userInfo.error) {
          this.errorMessage = userInfo.error;
          this.isLoading = false;
          return;
        }

        // Verificar si el usuario tiene el rol ROLE_ADMIN (verificando la propiedad "name" en los objetos de roles)
        const isAdmin = userInfo.roles.some(role => role.name === 'ROLE_ADMIN');
        const isUser = userInfo.roles.some(role => role.name === 'ROLE_USER');

        if (isAdmin) {
          // Redirigir al Admin Dashboard o Home
          this.$router.push('/home');
        } else if (isUser) {
          // Mostrar mensaje si el usuario tiene el rol USER
          this.errorMessage = 'No tienes acceso a esta página';
        } else {
          // Si el usuario no tiene ni ROLE_ADMIN ni ROLE_USER
          this.errorMessage = 'No tienes el rol adecuado para acceder a esta página';
        }
      } catch (error) {
        // Mostrar más detalles del error capturado
        this.errorMessage = `Ocurrió un error inesperado: ${error.message || error}`;
        console.error('Detalles del error:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.error {
  color: red;
}
</style>

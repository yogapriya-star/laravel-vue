<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">User CRUD</router-link>
      <div class="ml-auto">
        <router-link 
          v-if="isCreateOrEditPage" 
          class="btn btn-secondary btn-sm text-white" 
          to="/"
        >
          Back
        </router-link>
        <router-link 
          v-else 
          class="btn btn-primary btn-sm text-white" 
          to="/create"
        >
          Create User
        </router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isCreateOrEditPage() {
      return this.$route.fullPath === '/create' || this.$route.fullPath.startsWith('/edit') || this.$route.fullPath.startsWith('/detail');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navbar {
  margin-bottom: 20px;
}
</style>

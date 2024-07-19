<template>
  <div>
    <h1>User Details</h1>
    <table>
      <tr>
        <th>Name</th>
        <td>{{ user.name }}</td>
      </tr>
      <tr>
        <th>Age</th>
        <td>{{ user.age }}</td>
      </tr>
      <tr>
        <th>Photo</th>
        <td v-if="user.photo">
          <img :src="`http://localhost:8000/storage/${user.photo}`" alt="Photo" width="100">
        </td>
        <td v-else>No photo available</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios.get(`http://localhost:8000/api/users/${this.$route.params.id}`)
        .then(response => {
          this.user = response.data;
        });
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>

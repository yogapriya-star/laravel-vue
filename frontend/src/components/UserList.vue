<template>
  <div>
    <h1>All Users</h1>
    <div class="d-flex justify-content-between mb-3">
      <div class="d-flex">
        <button @click="exportToCSV" class="btn btn-secondary btn-sm mr-3" v-if="selectedUsers.length">Export to CSV</button>
        <button @click="exportToExcel" class="btn btn-success btn-sm" v-if="selectedUsers.length">Export to Excel</button>
      </div>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>
            <input type="checkbox" @change="toggleSelectAll" />
          </th>
          <th>Name</th>
          <th>Age</th>
          <th>Photo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <input type="checkbox" v-model="selectedUsers" :value="user.id" />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>
            <img :src="`http://localhost:8000/storage/${user.photo}`" v-if="user.photo" alt="Photo" width="100">
          </td>
          <td>
            <router-link :to="`/detail/${user.id}`" class="btn btn-info btn-sm mr-1">View</router-link>
            <router-link :to="`/edit/${user.id}`" class="btn btn-warning btn-sm mr-1">Edit</router-link>
            <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      users: [],
      selectedUsers: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost:8000/api/users')
        .then(response => {
          this.users = response.data;
        });
    },
    deleteUser(id) {
      axios.delete(`http://localhost:8000/api/users/${id}`)
        .then(() => {
          this.fetchUsers();
        });
    },
    toggleSelectAll(event) {
      if (event.target.checked) {
        this.selectedUsers = this.users.map(user => user.id);
      } else {
        this.selectedUsers = [];
      }
    },
    deleteSelectedUsers() {
      this.selectedUsers.forEach(id => {
        this.deleteUser(id);
      });
      this.selectedUsers = [];
    },
    exportToCSV() {
      const selectedUserData = this.users.filter(user => this.selectedUsers.includes(user.id));
      const csv = Papa.unparse(selectedUserData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'users.csv');
    },
    exportToExcel() {
      const selectedUserData = this.users.filter(user => this.selectedUsers.includes(user.id));
      const ws = XLSX.utils.json_to_sheet(selectedUserData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Users');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      saveAs(blob, 'users.xlsx');
    }
  }
};
</script>

<style>
.table img {
  border-radius: 5px;
}

.d-flex {
  display: flex;
}

.justify-content-between {
  justify-content: space-between;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mr-3 {
  margin-right: 1rem;
}

.mr-1 {
  margin-right: 0.25rem;
}
</style>

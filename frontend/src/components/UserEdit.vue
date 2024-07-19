<template>
  <div class="container mt-5">
    <h1>Edit User</h1>
    <Form :validation-schema="userSchema" @submit="handleSubmit">
      <div class="form-group row mb-3">
        <label for="name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <Field id="name" name="name" class="form-control" v-model="user.name" />
          <ErrorMessage name="name" class="text-danger" />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="age" class="col-sm-2 col-form-label">Age</label>
        <div class="col-sm-10">
          <Field id="age" name="age" type="number" class="form-control" v-model="user.age" />
          <ErrorMessage name="age" class="text-danger" />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="photo" class="col-sm-2 col-form-label">Photo</label>
        <div class="col-sm-10">
          <input type="file" id="photo" @change="onFileChange" class="form-control-file" />
          <div v-if="user.photo" class="mt-2">
            <p><strong>Current Photo:</strong></p>
            <img :src="`http://localhost:8000/storage/${user.photo}`" alt="Current Photo" width="100" />
            <p class="mt-1">{{ user.photo }}</p>
          </div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <div class="col-sm-10 offset-sm-2">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { userSchema } from '../validationSchemas';
import axios from 'axios';

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      userId: this.$route.params.id, // Get userId from route parameters
      user: {
        name: '',
        age: '',
        photo: ''
      },
      photoFile: null
    };
  },
  created() {
    if (this.userId) {
      this.fetchUser();
    }
  },
  methods: {
    fetchUser() {
      axios.get(`http://localhost:8000/api/users/${this.userId}`)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          alert('Error fetching user data.');
        });
    },
    onFileChange(e) {
      this.photoFile = e.target.files[0];
    },
 handleSubmit(values) {
    const userData = {
      name: values.name,
      age: values.age,
    };

    if (this.photoFile) {
      userData.photo = this.photoFile;
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('age', userData.age);
    if (userData.photo) {
      formData.append('photo', userData.photo);
    }
 for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log('FormData:', formData);

    axios.put(`http://localhost:8000/api/users/${this.userId}`, formData, config)
      .then(response => {
        console.log('User updated:', response.data);
        this.$router.push('/');
      })
      .catch(error => {
        console.error('Error updating user:', error.response ? error.response.data : error.message);
        alert('There was an error updating the user.');
      });
  }



  },
  computed: {
    userSchema() {
      return userSchema;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-1 {
  margin-top: 0.25rem;
}
</style>

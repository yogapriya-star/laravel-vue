<template>
  <div class="container mt-5">
    <h1>Create User</h1>
    <Form :validation-schema="userSchema" @submit="createUser">
      <div class="form-group row mb-3">
        <label for="name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <Field id="name" name="name" v-model="user.name" class="form-control" />
          <ErrorMessage name="name" class="text-danger" />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="age" class="col-sm-2 col-form-label">Age</label>
        <div class="col-sm-10">
          <Field id="age" name="age" type="number" v-model="user.age" class="form-control" />
          <ErrorMessage name="age" class="text-danger" />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="photo" class="col-sm-2 col-form-label">Photo</label>
        <div class="col-sm-10">
          <input type="file" id="photo" @change="onFileChange" class="form-control-file" />
        </div>
      </div>
      <div class="form-group row mb-3">
        <div class="col-sm-10 offset-sm-2">
          <button type="submit" class="btn btn-primary">Create</button>
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
      user: {
        name: '',
        age: null,
        photo: ''
      },
      photoFile: null
    };
  },
  methods: {
    onFileChange(e) {
      this.photoFile = e.target.files[0];
    },
    createUser(values) {
      let formData = new FormData();
      formData.append('name', values.name);
      formData.append('age', values.age);
      if (this.photoFile) {
        formData.append('photo', this.photoFile);
      }

      axios.post('http://localhost:8000/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        this.$router.push('/');
      }).catch(error => {
        console.error('Error creating user:', error.response.data);
        alert('There was an error creating the user.');
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

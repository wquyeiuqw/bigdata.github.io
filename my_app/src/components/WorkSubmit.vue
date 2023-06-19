<template>
    <div>
      <input type="file" @change="handleFileUpload" />
      <select v-model="selectedContainer">
        <option v-for="container in containers" :value="container.name" :key="container.name">
          {{ container.name }}
        </option>
      </select>
      <button @click="uploadFile">Upload</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        file: null,
        selectedContainer: '',
        containers: [
          { name: 'hadoop-docker-3.0.0' },
          { name: 'spark-docker-3.0.0' },
          // Add more containers as needed
        ],
      };
    },
    methods: {
      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      uploadFile() {
        if (this.file && this.selectedContainer) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('container', this.selectedContainer);
  
          // Send the file and selected container to the backend
          // using an HTTP request (e.g., Axios)
  
          // Example using Axios:
            const backendUrl = 'http://localhost:3000';
        //   axios.post('/api/upload', formData)
            axios.post(`${backendUrl}/api/upload`, formData)
            .then(response => {
              // Handle the response
              console.log(response.data);
            })
            .catch(error => {
              // Handle the error
              console.error(error);
            });
        }
      },
    },
  };
  </script>
  
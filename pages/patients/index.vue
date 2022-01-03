<template>
    <div>
      <patient-nav-bar/>
    </div>
 </template>

<script>
  export default {
    methods: {
    },
    created(){
      this.$axios.$put('/api/prescriptions/update', {
          
      })
      .then()
      .catch()
    }
  }
</script>
<template>
    <prof-health-nav-bar/>
 </template>

<script>
import ProfHealthNavBar from '../../components/ProfHealthNavBar.vue'
  export default {
    methods: {
    },
    created(){
      this.$axios.$put('/api/prescriptions/update', {
          
      })
      .then(console.log('success'))
      .catch(console.log('failed'))
    }
  }
</script>

<template>
    <prof-health-nav-bar/>
 </template>

<script>
import ProfHealthNavBar from '../../components/ProfHealthNavBar.vue'
  export default {
    methods: {
      signOut(){
        
        ProfHealthNavBarthis.$auth.logout()
        this.$router.push('/')
      }
    }
  }
</script>

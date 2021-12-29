<template>
    <div>
      <admin-nav-bar/>
    </div>
 </template>

<script>
  export default {
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
  }
</script>

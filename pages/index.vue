<template>
  <div>
    <!--<nuxt-link to="/patients" class="btn btn-link">Patients</nuxt-link>
    <nuxt-link to="/profhealthcare" class="btn btn-link">Healthcare Professionals</nuxt-link>
    <nuxt-link to="/admin" class="btn btn-link">Admin</nuxt-link>-->

    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/auth/login">Login</b-nav-item>
          <b-nav-item href="#">Sign In</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>

  </div>
 </template>

<script>
  export default {
    
  }
</script>

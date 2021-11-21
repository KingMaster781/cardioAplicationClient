<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <b-table striped over :items="admins" :fields="fields">
      </b-table>
      <nuxt-link to="/admin">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fields: ['username', 'name', 'email'],
      admins: []
    }
  },
  created(){
    this.$axios.$get('api/admin/')
        .then((admin) => {
          this.admins = admin
        })
  }
}
</script>
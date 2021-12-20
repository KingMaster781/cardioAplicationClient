<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
          <b-nav-item @click.prevent="signOut">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <br><br>
    <b-container>
      <b-table striped over :items="patients" :fields="fields">
      </b-table>
      <nuxt-link to="/">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fields: ['username', 'name', 'email'],
      patients: []
    }
  },
  created(){
    this.$axios.$get('api/patientusers/')
        .then((patient) => {
          this.patients = patient
        })
  },
  methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
}
</script>
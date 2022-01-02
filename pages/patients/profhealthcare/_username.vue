<template>
    <div>
      <patient-nav-bar/>
    <br><br>
        <b-container>
            <h4>Detalhes do Profissional de Saúde:</h4>
              <p>Username: {{ healthcare.username}}</p>
              <p>Name: {{ healthcare.name}}</p>
              <p>Email: {{ healthcare.email}}</p>
            <nuxt-link to="/patients/profhealthcare">Back</nuxt-link>
        </b-container>
    </div>
 </template>

<script>
  export default {
      data() {
        return {
          healthcare: {},
          fieldhealthcare:['username','password','name','email','actions'],
        }
    },
    computed: {
        username() {
          return this.$route.params.username
        },
    },
    created() {
        this.$axios.$get(`/api/profhealthcares/${this.username}`)
        .then(healthcare => this.healthcare = healthcare || {})
    },
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
  }
</script>
<template>
    <div>
      <patient-nav-bar/>
    <br><br>
        <b-container>
            <h2>Detalhes do Profissional de Saúde {{ healthcare.username}}</h2>
            <br>
            <h4>Detalhes do Profissional de Saúde:</h4>
              <p>Username: {{ healthcare.username}}</p>
              <p>Name: {{ healthcare.name}}</p>
              <p>Email: {{ healthcare.email}}</p>
              <br>
            <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
        </b-container>
    </div>
 </template>

<script>
  export default {
      data() {
        return {
          healthcare: {},
          fieldhealthcare:['username','name','email','actions'],
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
<template>
    <div>
        <admin-nav-bar/>
        <b-container>
            <h4>Detalhes do Profissional de Saúde:</h4>
              <p>Username: {{ healthcare.username}}</p>
              <p>Name: {{ healthcare.name}}</p>
              <p>Email: {{ healthcare.email}}</p>
              <p>Password: {{ healthcare.password}}</p>
            <b-table v-if="patients.length" striped over :items="patients" :fields="fieldPatients" />
            <h5 v-else>Não tem utentes associados</h5>
            <br>
            <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
        </b-container>
    </div>
 </template>

<script>
  export default {
      data() {
        return {
          healthcare: {},
          fieldhealthcare:['username','password','name','email','actions'],
          fieldPatients:['username','name','email']
        }
    },
    computed: {
        username() {
          return this.$route.params.username
        },
        patients(){
          return this.healthcare.patients || []
        }
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
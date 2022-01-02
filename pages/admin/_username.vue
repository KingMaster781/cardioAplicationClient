<template>
    <div>
        <admin-nav-bar/>
        <b-container>
            <h2>Detalhes do Admin {{ admin.username}}</h2>
            <br>
            <h4>Detalhes do Admin</h4>
                <p>Username: {{ admin.username}}</p>
                <p>Name: {{ admin.name}}</p>
                <p>Email: {{ admin.email}}</p>
                <p>Password: {{ admin.password}}</p>
                <br>
            <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
        </b-container>
    </div>
 </template>

<script>
  export default {
      data() {
        return {
        admin: {},
        fieldAdmins:['username','password','name','email','actions'],
        }
    },
    computed: {
        username() {
        return this.$route.params.username
        }
    },
    created() {
        this.$axios.$get(`/api/admin/${this.username}`)
        .then(admin => this.admin = admin || {})
    },
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
  }
</script>
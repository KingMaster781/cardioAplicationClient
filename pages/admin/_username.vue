<template>
    <div>
        <admin-nav-bar/>
        <b-container>
            <h4>Detalhes do Admin</h4>
                <p>Username: {{ admin.username}}</p>
                <p>Name: {{ admin.name}}</p>
                <p>Email: {{ admin.email}}</p>
                <p>Password: {{ admin.password}}</p>
            <nuxt-link to="/admin">Back</nuxt-link>
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
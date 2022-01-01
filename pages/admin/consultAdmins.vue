<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <h2>Consultar Todos os Admins</h2>
      <br>
      <b-table striped over :items="admins" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/admin/${row.item.username}`">Detalhes</nuxt-link>
        </template>
      </b-table>
      <br>
      <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fields: ['username', 'name', 'email', 'actions'],
      admins: []
    }
  },
  created(){
    this.$axios.$get('api/admin/')
        .then((admin) => {
          this.admins = admin
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
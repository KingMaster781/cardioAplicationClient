<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <h2>Consultar todos os Profissionais de Saúde</h2>
      <br>
      <b-table striped over :items="healthcares" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/admin/healthcares/${row.item.username}`">Detalhes</nuxt-link>
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
      healthcares: []
    }
  },
  created(){
    this.$axios.$get('api/profhealthcares/')
        .then((healthcare) => {
          this.healthcares = healthcare
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
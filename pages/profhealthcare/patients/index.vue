<template>
  <div>
    <prof-health-nav-bar/>
    <br><br>
    <b-container>
      <h2>Consultar Todos os seus Pacientes</h2>
      <br>
      <b-table v-if = "patients.length" striped over :items="patients" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/profhealthcare/patients/${row.item.username}`">Detalhes</nuxt-link>
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
      patients: []
    }
  },
  created(){
    this.$axios.$get(`/api/profhealthcares/${this.$auth.user.sub}/patients`)
        .then(patients =>  {
          this.patients = patients || []
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
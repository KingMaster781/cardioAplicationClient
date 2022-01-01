<template>
  <div>
    <prof-health-nav-bar/>
    <br><br>
    <b-container>
      <b-table striped over :items="patients" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/profhealthcare/patients/${row.item.username}`">Detalhes</nuxt-link>
        </template>
      </b-table>
      <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
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
    this.$axios.$get(`/api/profhealthcares/${this.$auth.user.sub}`)
        .then(healthcare =>  {
          this.patients = healthcare.patients || []
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
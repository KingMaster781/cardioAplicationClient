<template>
  <div>
    <prof-health-nav-bar/>
    <br><br>
    <b-container>
      <b-table striped over :items="patients" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/profhealthcare/patients/${row.item.username}`">Details</nuxt-link>
        </template>
      </b-table>
      <nuxt-link to="/profhealthcare">Back</nuxt-link>
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
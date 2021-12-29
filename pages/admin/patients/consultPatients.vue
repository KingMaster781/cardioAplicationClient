<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <b-table striped over :items="patients" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/admin/patients/${row.item.username}`">Details</nuxt-link>
        </template>
      </b-table>
      <nuxt-link to="/admin">Back</nuxt-link>
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
    this.$axios.$get('api/patientusers/')
        .then((patient) => {
          this.patients = patient
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
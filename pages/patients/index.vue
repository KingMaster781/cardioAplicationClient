<template>
  <div>
    <b-container>
      <b-table striped over :items="patients" :fields="fields">
      </b-table>
      <nuxt-link to="/">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fields: ['username', 'name', 'email'],
      patients: []
    }
  },
  created(){
    this.$axios.$get('api/patientusers/')
        .then((patient) => {
          this.patients = patient
        })
  }
}
</script>
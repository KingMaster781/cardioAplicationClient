<template>
  <div>
    <nuxt-link to="/patients" class="btn btn-link">Patients</nuxt-link>
    <nuxt-link to="/profhealthcare" class="btn btn-link">Healthcare Professionals</nuxt-link>
    <nuxt-link to="/admin" class="btn btn-link">Admin</nuxt-link>
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

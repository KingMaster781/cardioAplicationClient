<template>
    <div>
        <admin-nav-bar/>
        <b-container>
            <h4>Detalhes do Paciente:</h4>
                <p>Username: {{ patient.username}}</p>
                <p>Name: {{ patient.name}}</p>
                <p>Email: {{ patient.email}}</p>
                <p>Password: {{ patient.password}}</p>
            <b-table v-if="profHealthcares.length" striped over :items="profHealthcares" :fields="fieldProfHealthcare" />
            <nuxt-link to="/admin/patients/consultPatients">Back</nuxt-link>
        </b-container>
    </div>
 </template>

<script>
  export default {
      data() {
        return {
        patient: {},
        fieldpatient:['username','password','name','email','actions'],
        fieldProfHealthcare:['username','name','email']
        }
    },
    computed: {
        username() {
            return this.$route.params.username
        },
        profHealthcares()
        {
          return this.patient.profHealthcareDTOList || []
        }
    },
    created() {
        this.$axios.$get(`/api/patientusers/${this.username}`)
        .then(patient => this.patient = patient || {})
    },
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
  }
</script>
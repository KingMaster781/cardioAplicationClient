<template>
    <div>
      <patient-nav-bar/>
      <br><br>
      <b-container>
          <b-table v-if="profHealthcares.length" striped over :items="profHealthcares" :fields="fieldProfHealthcare">
            <template v-slot:cell(actions)="row">
                <b-button variant="info" :to="`/patients/profhealthcare/${row.item.username}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
            </template>
          </b-table>
          <nuxt-link to="/patients">Back</nuxt-link>
      </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            profHealthcares: {},
            fieldProfHealthcare:['username','name','email', 'actions']
        }
    },
    computed: {
        username(){
            return this.$auth.user.sub
        }
    },
    created() {
        this.$axios.$get('/api/patientusers/' + this.username + '/profHealthcares/')
        .then(profHealthcare => this.profHealthcares = profHealthcare || {})
    },
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
  }
</script>
<template>
    <div>
      <patient-nav-bar/>
      <br><br>
      <b-container>
          <b-table v-if="profHealthcares.length" striped over :items="profHealthcares" :fields="fieldProfHealthcare">
            <template v-slot:cell(actions)="row">
                <nuxt-link class="btn btn-link" :to="`/patients/profhealthcare/${row.item.username}`">Details</nuxt-link>
            </template>
          </b-table>
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
<template>
    <div>
      <patient-nav-bar/>
      <br><br>
      <b-container>
        <b-table striped over :items="prescriptions" :fields="fields">
            <template v-slot:cell(actions)="row">
                <nuxt-link class="btn btn-link" :to="`/patients/prescriptions/${row.item.code}`">Details</nuxt-link>
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
            fields: ['code', 'duracao', 'insertionDate', 'vigor', 'programCode', 'actions'],
            prescriptions: [],
        }
    },
    computed: {
        username(){
             return this.$auth.user.sub
        }
    },
    created(){
        this.$axios.$get('/api/patientusers/' + this.username + '/prescription')
            .then((prescription) => {
                this.prescriptions = prescription
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
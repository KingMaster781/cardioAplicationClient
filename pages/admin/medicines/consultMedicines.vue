<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
      <b-container>
        <b-table striped over :items="medicines" :fields="fields">
            <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/medicines/${row.item.code}`">Details</nuxt-link>
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
            fields: ['code','name','description', 'warning', 'actions'],
            medicines: []
        }
    },
    created(){
        this.$axios.$get('api/medicine/')
            .then((medicine) => {
            this.medicines = medicine
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
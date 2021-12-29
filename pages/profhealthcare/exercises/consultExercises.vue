<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
      <b-container>
        <b-table striped over :items="exercises" :fields="fields">
            <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/exercises/${row.item.code}`">Details</nuxt-link>
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
            fields: ['code', 'name', 'descExercise', 'actions'],
            exercises: []
        }
    },
    created(){
        this.$axios.$get('api/exercise/')
            .then((exercise) => {
            this.exercises = exercise
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
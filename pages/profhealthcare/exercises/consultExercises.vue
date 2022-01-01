<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
      <b-container>
        <b-table striped over :items="exercises" :fields="fields">
            <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/exercises/${row.item.code}`">Detalhes</nuxt-link>
            </template>
        </b-table>
        <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
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
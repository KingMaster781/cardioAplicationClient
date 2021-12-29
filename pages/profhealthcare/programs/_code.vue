<template>
    <div>
      <prof-health-nav-bar/>
      <br>
      <b-container>
            <h4>Detalhes da Prescrição:</h4>
                <p>Codigo: {{ program.code}}</p>
                <p>Nome: {{ program.name}}</p>
                <p>Descrição: {{ program.descProgram}}</p>
            <h5>Exercicios associados ao Programa:</h5>
            <b-table v-if="exercises.length" striped over :items="exercises" :fields="fieldExercises">
                <template v-slot:cell(actions)="row">
                    <nuxt-link class="btn btn-link" :to="`/profhealthcare/exercises/${row.item.code}`">Details</nuxt-link>
                </template>
            </b-table>
            <nuxt-link to="/profhealthcare">Back</nuxt-link>
        </b-container>
    </div>
 </template>

<script>
  export default {
    data() {
        return {
            program: {},
            fieldPrescription:['code','name','descExercise','actions'],
            fieldExercises:['code','name','descExercise', 'actions']
        }
    },
    computed: {
        code() {
            return this.$route.params.code
        },

        exercises(){
            return this.program.exercises || []
        }
    },
    created() {
        this.$axios.$get('/api/program/' + this.code)
        .then(program => {
            this.program = program
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
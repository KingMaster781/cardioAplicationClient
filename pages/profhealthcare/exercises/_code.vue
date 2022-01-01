<template>
    <div>
      <prof-health-nav-bar/>
      <br>
      <b-container>
            <h4>Detalhes do Exercicio:</h4>
                <p>Codigo: {{ exercise.code}}</p>
                <p>Nome: {{ exercise.name}}</p>
                <p>Descrição: {{ exercise.descExercise}}</p>
            <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
        </b-container>
    </div>
 </template>

<script>
  export default {
    data() {
        return {
            exercise: {},
            fieldExercise:['code','name','descExercise', 'actions'],
        }
    },
    computed: {
        code() {
            return this.$route.params.code
        }
    },
    created() {
        this.$axios.$get('/api/exercise/' + this.code)
        .then(exercises => {
            this.exercise = exercises
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
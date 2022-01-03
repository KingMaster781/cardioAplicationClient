<template>
    <div>
      <prof-health-nav-bar/>
        <br><br>
        <b-container>
            <h2>Consultar um determinado Exercicio Físico</h2>
            <br>
            <form @submit.prevent="consult" :disabled="!isFormValid">
                <b-form-group
                    id="code"
                    description="O código é necessário"
                    label-for="code"
                    :invalid-feedback="invalidCodeFeedback"
                    :state="isCodeValid"
                >
                    <b-input v-model.trim="code" :state="isCodeValid" required placeholder="Insira o código do exercício" />
                </b-form-group>
                <p v-show="errorMsg" class="text-danger">
                    {{ errorMsg }}
                </p>
                <button class="btn btn-primary btn-lg btn-block" @click.prevent="consult" :disabled="!isFormValid">Consultar</button>
            </form>
            <br>
            <b-table v-if="exercises.length" striped over :items="exercises" :fields="fields">
            <template v-slot:cell(actions)="row">
                <nuxt-link class="btn btn-link" :to="`/profhealthcare/exercises/${row.item.code}`">Detalhes</nuxt-link>
            </template>
            </b-table>
            <br>
            <p aling="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
        </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            code: null,
            fields: ['code', 'name', 'descExercise', 'actions'],
            exercises: [],
            errorMsg: null
        }
    },

    computed: {
        invalidCodeFeedback () {
            if (!this.code) {
                return null
            }
            let codeLen = this.code.length
            if (codeLen < 1 || codeLen > 30) {
                return 'The code must be between [1, 30] number characters.'
            }
            return ''
        },

        isCodeValid () {
            if (!this.invalidCodeFeedback === null) {
                return null
            }
            return this.invalidCodeFeedback === ''
        },
        isFormValid () {
            if (! this.isCodeValid) {
                return false
            }
            return true
        }
    },

    methods: {
        consult(){
            this.$axios.$get('/api/exercise/' + this.code)
                .then((exercise) => {
                    this.exercises = [exercise]
                })
                .catch((error) => {
                    this.$toast.error('Erro a consultar exercicio').goAway(3000)
                    this.errorMsg = error.response.data
                })
        },

        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
      <b-container>
        <form @submit.prevent="consult" :disabled="!isFormValid">
            <b-form-group
                id="code"
                description="The code is required"
                label-for="code"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
                <b-input v-model.trim="code" :state="isCodeValid" required placeholder="Enter code's program" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary" @click.prevent="consult" :disabled="!isFormValid">Consultar</button>
        </form>
        <br>
        <b-table striped over :items="programs" :fields="fields">
          <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/profhealthcare/programs/${row.item.code}`">Details</nuxt-link>
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
            code: null,
            fields: ['code', 'name', 'descProgram', 'actions'],
            programs: [],
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
            this.$axios.$get('/api/program/' + this.code)
                .then((program) => {
                    this.programs = [program]
                })
                .catch((error) => {
                    this.errorMsg = error
                })
        },
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
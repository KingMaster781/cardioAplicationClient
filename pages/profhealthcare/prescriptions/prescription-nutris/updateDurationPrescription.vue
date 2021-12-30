<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
      <b-container>
        <form @submit.prevent="create" :disabled="!isFormValid">
            <b-form-group
                id="code"
                description="The code is required"
                label-for="code"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
            <b-input v-model.trim="code" :state="isCodeValid" required placeholder="Enter a code to the prescription" />
            </b-form-group>
            <b-form-group
                id="duracao"
                description="The duraction is required"
                label-for="duracao"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
            <b-input v-model.trim="duracao" :state="isDuracaoValid" required placeholder="Enter a duraction of the prescription" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary" @click.prevent="update" :disabled="!isFormValid">UPDATE</button>
            <br>
            <nuxt-link to="/profhealthcare">Back</nuxt-link>
        </form>
      </b-container>
    </div>
 </template>

<script>
  export default {
     data(){
        return {
            code: null,
            duracao: null,
            errorMsg: false
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

        invalidDuracaoFeedback () {
            if (!this.duracao) {
                return null
            }
            if (this.duracao < 0) {
                return 'A duração tem que ser superior ou igual a 0'
            }
            return ''
        },

        isDuracaoValid () {
            if (!this.invalidDuracaoFeedback === null) {
                return null
            }
            return this.invalidDuracaoFeedback === ''
        },

         isFormValid () {
            if (! this.isCodeValid) {
                return false
            }
            if (! this.isDuracaoValid) {
                return false
            }
            return true
        }
    },

    methods: {
        update(){
            this.$axios.$put('/api/prescription-nutris/' + this.code, {
                duracao: this.duracao,
            })
            .then(() => {
                this.$router.push('/profhealthcare')
            })
            .catch((error) => {
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
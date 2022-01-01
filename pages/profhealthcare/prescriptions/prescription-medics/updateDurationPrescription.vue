<template>
    <div>
      <prof-health-nav-bar/>
      <b-container>
        <h2>Atualiza uma determinada Prescrição Médica</h2>
        <br>
        <form @submit.prevent="create" :disabled="!isFormValid">
            <b-form-group
                id="code"
                description="O código é necessário"
                label-for="code"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
            <b-input v-model.trim="code" :state="isCodeValid" required placeholder="Insira o código da prescrição" />
            </b-form-group>
            <b-form-group
                id="duracao"
                description="A duração é necessária"
                label-for="duracao"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
            <b-input v-model.trim="duracao" :state="isDuracaoValid" required placeholder="Insira a duração da prescrição em dias" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary btn-lg btn-block" @click.prevent="analiseUpdateisPermited" :disabled="!isFormValid">Atualizar</button>
            <br>
            <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
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
        analiseUpdateisPermited(){
            this.$axios.$get('/api/prescription-medics/' + this.code)
            .then((prescription) => {
                if(prescription.vigor==="Está em vigor")
                {
                    this.update()
                }
                else
                {
                    this.errorMsg = "Esta prescrição já não se encontra em vigor"
                }
            })
            .catch((error) => {
                this.errorMsg = error.response.data
            })
        },
        update(){
            this.$axios.$put('/api/prescription-medics/' + this.code, {
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
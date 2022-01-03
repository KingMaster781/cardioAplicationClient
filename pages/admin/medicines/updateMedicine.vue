<template>
    <div>
      <admin-nav-bar/>
      <br><br>
      <b-container>
        <h2>Atualizar um Determindo Medicamento</h2>
        <br>
        <form @submit.prevent="create" :disabled="!isFormValid">
            <b-form-group
                id="code"
                description="O código é necessário"
                label-for="code"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
            <b-input v-model.trim="code" :state="isCodeValid" required placeholder="Insira o código do medicamento" />
            </b-form-group>
            <b-form-group
                id="name"
                description="O nome é necessário"
                label-for="name"
                :invalid-feedback="invalidNameFeedback"
                :state="isNameValid"
            >
                <b-input v-model.trim="name" :state="isNameValid" required placeholder="Insira o nome do medicamento" />
            </b-form-group>
                <b-form-group
                    id="desc"
                    description="A descrição do medicamento é necessário"
                    label-for="desc"
                    :invalid-feedback="invalidDescFeedback"
                    :state="isDescValid"
                >
                <textarea class="form-control" v-model.trim="desc" :state="isDescValid" placeholder="Insira a descrição do medicamento"></textarea>
            </b-form-group>
            <b-form-group
                id="warnings"
                label-for="warnings"
                :invalid-feedback="invalidWarningFeedback"
                :state="isWarningValid"
            >
                <textarea class="form-control" v-model.trim="warning" :state="isWarningValid" placeholder="Insira os avisos do medicamento"></textarea>
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary btn-lg btn-block" @click.prevent="update" :disabled="!isFormValid">Atualizar</button>
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
            name: null,
            desc: null,
            warning: null,
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

        invalidNameFeedback () {
            if (!this.name) {
                return null
            }
            let nameLen = this.name.length
            if (nameLen < 3 || nameLen > 25) {
                return false
            }
            return ''
        },

        isNameValid () {
            if (!this.invalidNameFeedback === null) {
                return null
            }
            return this.invalidNameFeedback === ''
        },

        invalidDescFeedback () {
            if (!this.desc) {
                return null
            }
            let descLen = this.desc.length
            if (descLen < 3 || descLen > 255) {
                return false
            }
            return ''
        },

        isDescValid () {
            if (!this.invalidDescFeedback === null) {
                return null
            }
            return this.invalidDescFeedback === ''
        },

        invalidWarningFeedback () {
            if (!this.warning) {
                return null
            }
            let warningLen = this.warning.length
            if (warningLen < 3 || warningLen > 255) {
                return false
            }
            return ''
        },

        isWarningValid () {
            if (!this.invalidWarningFeedback === null) {
                return null
            }
            return this.invalidWarningFeedback === ''
        },
	
        isFormValid () {
            if (! this.isCodeValid) {
                return false
            }
            if (! this.isNameValid) {
                return false
            }
            if (! this.isDescValid) {
                return false
            }
            if (! this.isWarningValid) {
                return false
            }
            return true
        }
    },

    methods: {
        update() {
            this.$axios.$put('/api/medicine/' + this.code, {
                name: this.name,
                description: this.desc,
                warning: this.warning
            })
            .then(() => {
                this.$toast.success('Medicamento atualizado com sucesso').goAway(3000)
                this.$router.push('/admin')
            })
            .catch((error) => {
                this.$toast.error('Erro a atualizar medicamento').goAway(3000)
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
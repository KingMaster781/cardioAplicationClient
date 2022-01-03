<template>
    <div>
      <prof-health-nav-bar/>
      <b-container>
        <h2>Criar uma Prescrição de Nutrição</h2>
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
            <b-form-group
                id="patient"
                description="O paciente é necessário"
                label-for="patient"
                :invalid-feedback="invalidPatientFeedback"
                :state="isPatientValid"
            >
                <b-select v-model="patient" :options="patients" :state="isPatientValid" required value-field="username" text-field="name">
                    <template v-slot:first>
                    <option :value="null" disabled>-- Por favor, selecione o paciente --
                    </option>
                    </template>
                </b-select>
            </b-form-group>
            <b-form-group
                id="description"
                description="The description is required"
                label-for="description"
                :invalid-feedback="invalidDescriptionFeedback"
                :state="isDescriptionValid"
            >
                <b-input v-model.trim="description" :state="isDescriptionValid" required placeholder="Enter a description of the prescription" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary btn-lg btn-block" @click.prevent="create" :disabled="!isFormValid">Criar</button>
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
            patient: null,
            program: null,
            duracao: null,
            patients: [],
            description: null,
            errorMsg: false
        }
    },
    computed: {
        invalidCodeFeedback () {
            if (!this.code) {
                return null
            }
            if (this.code < 0) {
                return 'O código tem que ser superior ou igual a 0'
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

        invalidPatientFeedback () {
            if (!this.patient) {
                return null
            }
            if(!this.patients.some(patient => this.patient === patient.username))
            {
                return null
            }
            return ''
        },
        
        isPatientValid () {
            if (!this.invalidPatientFeedback === null) {
                return null
            }
            return this.invalidPatientFeedback === ''
        },

        invalidDescriptionFeedback () {
            if (!this.description) {
                return null
            }
            let descriptionLen = this.description.length
            if (descriptionLen < 3 || descriptionLen > 255) {
                return 'The description must be between [3, 255] number characters.'
            }
            return ''
        },

        isDescriptionValid () {
            if (!this.invalidDescriptionFeedback === null) {
                return null
            }
            return this.invalidDescriptionFeedback === ''
        },
        

        isFormValid () {
            if (! this.isCodeValid) {
                return false
            }
            if (! this.isDuracaoValid) {
                return false
            }
            if (! this.isPatientValid) {
                return false
            }
            if (! this.isDescriptionValid) {
                return false
            }
            return true
        }
    },
    
    created(){
        this.$axios.$get(`/api/profhealthcares/${this.$auth.user.sub}`)
        .then(healthcare =>  {
          this.patients = healthcare.patients || []
        })
    },

    methods: {
    create() {
      let dates= new Date()
      let month = dates.getUTCMonth() + 1
      let day = dates.getUTCDate()
      let year = dates.getUTCFullYear()
      let currentDate = day + "/" + month + "/" + year
      this.$axios.$post('/api/prescription-nutris', {
          code: this.code,
          duracao: this.duracao,
          insertionDate: currentDate,
          descNutri: this.description,
          patientUser_username: this.patient
      })
      .then(() => {
          this.$toast.success('Prescrição criado com sucesso').goAway(3000)
          this.$router.push('/profhealthcare')
      })
      .catch((error) => {
          this.$toast.error('Erro ao criar prescrição').goAway(3000)
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
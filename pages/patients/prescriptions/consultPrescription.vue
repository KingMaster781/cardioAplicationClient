<template>
    <div>
      <patient-nav-bar/>
      <br><br>
      <b-container>
        <h2>Consultar um determinada Prescrição</h2>
        <br>
        <form @submit.prevent="consult" :disabled="!isFormValid">
            <b-form-group
                id="code"
                description="O código é necessário"
                label-for="code"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
                <b-input v-model.trim="code" :state="isCodeValid" required placeholder="Insira o código da prescrição" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary btn-lg btn-block" @click.prevent="consult" :disabled="!isFormValid">Consultar</button>
        </form>
        <b-table v-if="prescriptions.length" striped over :items="prescriptions" :fields="fields">
            <template v-slot:cell(actions)="row">
                <b-button variant="info" :to="`/patients/prescriptions/${typePrescription}/${row.item.code}`"><fa :icon="['fas', 'info-circle']" /></b-button>
            </template>
        </b-table>
        <br>
        <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
      </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            code: null,
            fields: ['code', 'duracao', 'oldInsertionDate', 'vigor', 'actions'],
            prescriptions: [],
            errorMsg: null,
            typePrescription: null
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
        },

        username(){
             return this.$auth.user.sub
        }
    },
    
    methods: {
        consult(){
            this.errorMsg=null
            this.typePrescription=null
            this.$axios.$get('/api/patientusers/' + this.username + '/prescription-exercises/' + this.code)
                .then((prescription) => {
                    this.typePrescription="prescription-exercises"
                    this.prescriptions = prescription
                })
                .catch(() => {
                    this.$axios.$get('/api/patientusers/' + this.username + '/prescription-medics/' + this.code)
                    .then((prescription) => {
                        this.typePrescription="prescription-medics"
                        this.prescriptions = prescription
                    })
                    .catch(() => {
                        this.$axios.$get('/api/patientusers/' + this.username + '/prescription-nutris/' + this.code)
                        .then((prescription) => {
                            this.typePrescription="prescription-nutris"
                            this.prescriptions = prescription
                        })
                        .catch((error) => {
                            this.errorMsg = error.response.data
                        })
                    })
                })
            },
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
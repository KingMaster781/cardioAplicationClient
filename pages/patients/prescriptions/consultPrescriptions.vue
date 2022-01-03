<template>
    <div>
      <patient-nav-bar/>
      <br><br>
      <b-container>
        <h2>Consultar todas as minhas Prescrições</h2>
        <br>
        <h5>Prescrições de Exercicios:</h5>
        <b-table v-if="prescriptionsExercise.length" striped over :items="prescriptionsExercise" :fields="fieldsExercise">
            <template v-slot:cell(actions)="row">
                <b-button
                    variant="info"
                    :to="`/patients/prescriptions/prescription-exercises/${row.item.code}`"
                >
                    <fa :icon="['fas', 'info-circle']" />
                </b-button>
            </template>
        </b-table>
        <h6 v-else>Não possui prescrições de exercicios</h6>
        <br>
        <h5>Prescrições Médicas:</h5>
        <b-table v-if="prescriptionsMedics.length" striped over :items="prescriptionsMedics" :fields="fieldsMedics">
            <template v-slot:cell(actions)="row">
                <b-button
                    variant="info"
                    :to="`/patients/prescriptions/prescription-medics/${row.item.code}`"
                >
                    <fa :icon="['fas', 'info-circle']" />
                </b-button>
            </template>
        </b-table>
        <h6 v-else>Não possui prescrições médicas</h6>
        <br>
        <h5>Prescrições de Nutrição:</h5>
        <b-table v-if="prescriptionsNutris.length" striped over :items="prescriptionsNutris" :fields="fieldsNutris">
            <template v-slot:cell(actions)="row">
                <b-button
                    variant="info"
                    :to="`/patients/prescriptions/prescription-nutris/${row.item.code}`"
                >
                    <fa :icon="['fas', 'info-circle']" />
                </b-button>
            </template>
        </b-table>
        <h6 v-else>Não possui prescrições de nutrição</h6>
        <br>
        <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
      </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            fieldsExercise: ['code', 'duracao', 'oldInsertionDate', 'vigor', 'programCode', 'actions'],
            prescriptionsExercise: [],
            fieldsMedics: ['code','duracao','oldInsertionDate','vigor', 'actions'],
            prescriptionsMedics: [],
            fieldsNutris: ['code','duracao','oldInsertionDate','vigor','descNutri','actions'],
            prescriptionsNutris: [],
        }
    },
    computed: {
        username(){
             return this.$auth.user.sub
        }
    },
    created(){
        this.$axios.$get('/api/patientusers/' + this.username + '/prescription-exercises')
        .then((prescriptions1) => {
            this.prescriptionsExercise = prescriptions1
        })
        this.$axios.$get('/api/patientusers/' + this.username + '/prescription-medics')
        .then((prescriptions2) => {
            this.prescriptionsMedics = prescriptions2
        })
        this.$axios.$get('/api/patientusers/' + this.username + '/prescription-nutris')
        .then((prescriptions3) => {
            this.prescriptionsNutris = prescriptions3
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
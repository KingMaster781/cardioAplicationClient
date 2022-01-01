<template>
    <div>
      <patient-nav-bar/>
      <br><br>
      <b-container>
        <h5 v-if="prescriptionsExercise.length">Prescrições de Exercicios:</h5>
        <b-table v-if="prescriptionsExercise.length" striped over :items="prescriptionsExercise" :fields="fieldsExercise">
            <template v-slot:cell(actions)="row">
                <nuxt-link class="btn btn-link" :to="`/patients/prescriptions/prescription-exercises/${row.item.code}`">Detalhes</nuxt-link>
            </template>
        </b-table>
        <h5 v-if="prescriptionsMedics.length">Prescrições Médicas</h5>
        <b-table v-if="prescriptionsMedics.length" striped over :items="prescriptionsMedics" :fields="fieldsMedics">
            <template v-slot:cell(actions)="row">
                <nuxt-link class="btn btn-link" :to="`/patients/prescriptions/prescription-medics/${row.item.code}`">Detalhes</nuxt-link>
            </template>
        </b-table>
        <h5 v-if="prescriptionsNutris.length">Prescrições de Nutrição</h5>
        <b-table v-if="prescriptionsNutris.length" striped over :items="prescriptionsNutris" :fields="fieldsNutris">
            <template v-slot:cell(actions)="row">
                <nuxt-link class="btn btn-link" :to="`/patients/prescriptions/prescription-nutris/${row.item.code}`">Detalhes</nuxt-link>
            </template>
        </b-table>
        <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
      </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            fieldsExercise: ['code', 'duracao', 'insertionDate', 'vigor', 'programCode', 'actions'],
            prescriptionsExercise: [],
            fieldsMedics: ['code','duracao','insertionDate','vigor', 'actions'],
            prescriptionsMedics: [],
            fieldsNutris: ['code','duracao','insertionDate','vigor','descNutri','actions'],
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
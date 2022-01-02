<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
        <b-container>
            <h2>Consultar Detalhes do Paciente {{ patient.username}}</h2>
            <br>
            <h4>Detalhes do Paciente:</h4>
                <p>Username: {{ patient.username}}</p>
                <p>Nome: {{ patient.name}}</p>
                <p>Email: {{ patient.email}}</p>
                <h5>Lista de Profissionais de Saude que seguem este paciente:</h5>
                  <b-table v-if="profHealthcares.length" striped over :items="profHealthcares" :fields="fieldProfHealthcare" />
                  <br>
                <h5>Prescrições de Exercicios:</h5>
                  <b-table v-if="prescriptionsExercise.length" striped over :items="prescriptionsExercise" :fields="fieldsExercise">
                      <template v-slot:cell(actions)="row">
                          <nuxt-link class="btn btn-link" :to="`/patients/prescriptions/prescription-exercises/${row.item.code}`">Detalhes</nuxt-link>
                      </template>
                  </b-table>
                  <h6 v-else>Não possui prescrições de exercicios</h6>
                  <br>
                <h5>Prescrições Médicas:</h5>
                  <b-table v-if="prescriptionsMedics.length" striped over :items="prescriptionsMedics" :fields="fieldsMedics">
                      <template v-slot:cell(actions)="row">
                          <nuxt-link class="btn btn-link" :to="`/patients/prescriptions/prescription-medics/${row.item.code}`">Detalhes</nuxt-link>
                      </template>
                  </b-table>
                  <h6 v-else>Não possui prescrições médicas</h6>
                  <br>
                <h5>Prescrições de Nutrição:</h5>
                  <b-table v-if="prescriptionsNutris.length" striped over :items="prescriptionsNutris" :fields="fieldsNutris">
                      <template v-slot:cell(actions)="row">
                          <nuxt-link class="btn btn-link" :to="`/patients/prescriptions/prescription-nutris/${row.item.code}`">Detalhes</nuxt-link>
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
      data() {
        return {
        patient: {},
        fieldpatient:['username','password','name','email','actions'],
        fieldProfHealthcare:['username','name','email'],
        fieldsExercise: ['code', 'duracao', 'insertionDate', 'vigor', 'programCode', 'actions'],
        fieldsMedics: ['code','duracao','insertionDate','vigor', 'actions'],
        fieldsNutris: ['code','duracao','insertionDate','vigor','descNutri','actions'],
        }
    },
    computed: {
        username() {
            return this.$route.params.username
        },
        profHealthcares()
        {
          return this.patient.profHealthcareDTOList || []
        },
        prescriptionsExercise()
        {
          return this.patient.prescriptionExerciseDTOList || []
        },
        prescriptionsMedics()
        {
          return this.patient.prescriptionMedicDTOList || []
        },
        prescriptionsNutris()
        {
          return this.patient.prescriptionNutriDTOList || []
        }
    },
    created() {
        this.$axios.$get(`/api/patientusers/${this.username}`)
        .then(patient => this.patient = patient || {})
    },
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
  }
</script>
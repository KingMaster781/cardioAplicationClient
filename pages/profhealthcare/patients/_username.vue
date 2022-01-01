<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
        <b-container>
            <h4>Detalhes do Paciente:</h4>
                <p>Username: {{ patient.username}}</p>
                <p>Name: {{ patient.name}}</p>
                <p>Email: {{ patient.email}}</p>
                <h5>Lista de Profissionais de Saude que seguem este paciente:</h5>
            <b-table v-if="profHealthcares.length" striped over :items="profHealthcares" :fields="fieldProfHealthcare" />
               <h5>Lista de Prescrições deste paciente:</h5>
            <b-table v-if="prescription.length" striped over :items="prescription" :fields="fieldPrescription">
              <template v-slot:cell(actions)="row">
                <nuxt-link class="btn btn-link" :to="`/profhealthcare/prescriptions/${row.item.code}`">Detalhes</nuxt-link>
              </template>
            </b-table>
            <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
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
        fieldPrescription:['code', 'duracao', 'insertionDate', 'vigor', 'programCode', 'actions'],
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
        prescription()
        {
          return this.patient.prescriptionDTOList || []
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
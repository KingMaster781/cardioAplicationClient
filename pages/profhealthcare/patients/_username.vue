<template>
    <div>
        <b-navbar type="dark" variant="primary">
        <b-button variant="primary" v-b-toggle.sidebar-no-header>
          <span class="navbar-toggler-icon"></span>
        </b-button>
        <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item @click.prevent="signOut">Logout</b-nav-item>
        </b-navbar-nav>         
      </b-navbar>
      <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow backdrop backdrop-variant="dark">
        <template #default>
          <div class="p-3">
            <nav class="mb-3">
              <b-nav vertical>
                <b-dropdown-item block v-b-toggle.pa variant="info">Patients</b-dropdown-item>
                <b-collapse id="pa" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/profhealthcare/patients/consultPatients" class="link-dark rounded">Lista de Pacientes</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/consultPatient" class="link-dark rounded">Consultar um determinado Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/createPatient" class="link-dark rounded">Criar um Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/removePatient" class="link-dark rounded">Remover um determinado Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/updatePatient" class="link-dark rounded">Atualiza um determinado Paciente</b-dropdown-item>
                  </b-card-body>
                </b-collapse>
              </b-nav>
            </nav>
          </div>
        </template>
          <template #footer>
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
              <strong class="mr-auto"></strong>
              <b-button size="sm" v-b-toggle.sidebar-no-header>Close</b-button>
          </div>
        </template>
      </b-sidebar>
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
                <nuxt-link class="btn btn-link" :to="`/profhealthcare/prescriptions/${row.item.code}`">Details</nuxt-link>
              </template>
            </b-table>
            <nuxt-link to="/profhealthcare">Back</nuxt-link>
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
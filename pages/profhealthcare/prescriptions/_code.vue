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
                <b-dropdown-item block v-b-toggle.pa variant="info">Pacientes</b-dropdown-item>
                <b-collapse id="pa" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/profhealthcare/patients/consultPatients" class="link-dark rounded">Lista de Pacientes</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/consultPatient" class="link-dark rounded">Consultar um determinado Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/createPatient" class="link-dark rounded">Criar um Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/removePatient" class="link-dark rounded">Remover um determinado Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/updatePatient" class="link-dark rounded">Atualiza um determinado Paciente</b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item block v-b-toggle.pa variant="info">Exercicios de Reabilitação Cardiaca</b-dropdown-item>
                <b-collapse id="pa" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/profhealthcare/exercises/consultExercises" class="link-dark rounded">Lista de Exercicios de Reabilitação Cardiaca</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/exercises/consultExercise" class="link-dark rounded">Consultar um determinado Exercicio de Reabilitação Cardiaca</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/exercises/createExercise" class="link-dark rounded">Criar um Exercicio de Reabilitação Cardiaca</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/exercises/deleteExercise" class="link-dark rounded">Remover um determinado Exercicio de Reabilitação Cardiaca</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/exercises/updateExercise" class="link-dark rounded">Atualiza um determinado Exercicio de Reabilitação Cardiaca</b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item block v-b-toggle.pa variant="info">Programas de Reabilitação Cardiaca</b-dropdown-item>
                <b-collapse id="pa" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/profhealthcare/programs/consultPrograms" class="link-dark rounded">Lista de Programas de Reabilitação Cardiaca</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/programs/consultProgram" class="link-dark rounded">Consultar um determinado Programa de Reabilitação Cardiaca</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/programs/createProgram" class="link-dark rounded">Criar um Programa de Reabilitação Cardiaca</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/programs/deleteProgram" class="link-dark rounded">Remover um Programa de Reabilitação Cardiaca</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/programs/updateProgram" class="link-dark rounded">Atualizar um Programa de Reabilitação Cardiaca</b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item block v-b-toggle.pa variant="info">Prescrições de Programas de Reabilitação Cardiaca</b-dropdown-item>
                <b-collapse id="pa" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/profhealthcare/prescriptions/consultPrescription" class="link-dark rounded">Consultar uma determinada Prescrição por Utilidador</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/prescriptions/createPrescription" class="link-dark rounded">Criar uma nova Prescrição</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/prescriptions/updateDurationPrescription" class="link-dark rounded">Atualizar a duração de uma determinada Prescrição</b-dropdown-item>
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
      <br>
      <b-container>
            <h4>Detalhes da Prescrição:</h4>
                <p>Codigo: {{ prescription.code}}</p>
                <p>Duração: {{ prescription.duracao}} meses</p>
                <p>Data de Inserção: {{ prescription.insertionDate}}</p>
                <p>Estado: {{ prescription.vigor}}</p>
                <p>Username do Paciente: {{ prescription.patientUser_username}}</p>
                <p>Código do Programa: {{prescription.programCode}}</p>
            <h5>Exercicios associados ao Programa:</h5>
            <b-table v-if="exercises.length" striped over :items="exercises" :fields="fieldExercises" />
            <nuxt-link to="/profhealthcare">Back</nuxt-link>
        </b-container>
    </div>
 </template>

<script>
  export default {
    data() {
        return {
            exercises: [],
            prescription: {},
            fieldPrescription:['code','duracao','insertionDate','vigor', 'patientUser_username', 'programCode', 'actions'],
            fieldExercises:['code','name','descExercise']
        }
    },
    computed: {
        code() {
            return this.$route.params.code
        }
    },
    created() {
        this.$axios.$get('/api/pescription/' + this.code)
        .then(prescriptions => {
            this.prescription = prescriptions
            this.showExercises();
        })
    },
    methods: {
        showExercises(){
            this.$axios.$get('/api/program/' + this.prescription.programCode + '/exercises')
            .then(exer => this.exercises = exer || {})
        },
    
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
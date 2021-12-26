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
      <br><br>
      <b-container>
        <b-table striped over :items="exercises" :fields="fields">
            <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/exercises/${row.item.code}`">Details</nuxt-link>
            </template>
        </b-table>
        <nuxt-link to="/profhealthcare">Back</nuxt-link>
      </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            fields: ['code', 'name', 'descExercise', 'actions'],
            exercises: []
        }
    },
    created(){
        this.$axios.$get('api/exercise/')
            .then((exercise) => {
            this.exercises = exercise
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
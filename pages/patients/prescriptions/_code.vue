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
                <b-collapse id="pa" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/patients/prescriptions/consultPrescription" class="link-dark rounded">Consultar uma determinada prescrição</b-dropdown-item>
                    <b-dropdown-item href="/patients/prescriptions/consultPrescriptions" class="link-dark rounded">Consultar todas prescrições</b-dropdown-item>
                    <b-dropdown-item href="/patients/profhealthcare/consultProfhealthcares" class="link-dark rounded">Consultar profissionais de saúde</b-dropdown-item>  
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
                <p>Código do Programa: {{prescription.programCode}}</p>
            <h5>Exercicios associados ao Programa:</h5>
            <b-table v-if="exercises.length" striped over :items="exercises" :fields="fieldExercises" />
            <nuxt-link to="/patients">Back</nuxt-link>
        </b-container>
    </div>
 </template>

<script>
  export default {
    data() {
        return {
            exercises: [],
            prescription: {},
            fieldPrescription:['code','duracao','insertionDate','vigor', 'programCode', 'actions'],
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
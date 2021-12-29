<template>
    <div>
      <prof-health-nav-bar/>
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
            <p v-if="prescription.vigor=='Está em vigor'">
              <b-button v-on:click="expirePrescription">Expirar Prescrição</b-button>
            </p>
            <p v-show="msg" class="text-danger">
                {{ msg }}
            </p>
            <br>
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
            fieldExercises:['code','name','descExercise'],
            msg: null
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

        expirePrescription(){
          this.$axios.put('/api/pescription/expire/' + this.prescription.code, {})
          .then(()=>{
            this.msg="Prescrição expirada com sucesso"
            this.prescription.vigor="Não está em vigor"
          })
          .catch((error)=>{this.msg=error})
        },
    
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
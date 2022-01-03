<template>
    <div>
      <prof-health-nav-bar/>
      <br>
      <b-container>
            <h2>Consultar Detalhes da Prescrição {{prescription.code}}</h2>
            <br>
            <h4>Detalhes da Prescrição:</h4>
                <p>Codigo: {{ prescription.code}}</p>
                <p>Duração (Dias em Falta): {{ prescription.duracao}} dias</p>
                <p>Data de Inserção: {{ prescription.oldInsertionDate}}</p>
                <p>Estado: {{ prescription.vigor}}</p>
                <p>Username do Paciente: {{ prescription.patientUser_username}}</p>
                <p>Descrição de Nutrição a seguir: {{ prescription.descNutri}}</p>
            <p v-if="prescription.vigor=='Está em vigor'">
            <b-button class="btn btn-secundary btn-lg btn-block" v-on:click="expirePrescription">Expirar Prescrição</b-button>
            </p>
            <p v-show="msg" class="text-danger">
                {{ msg }}
            </p>
            <br>
            <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
        </b-container>
    </div>
 </template>

<script>
import ProfHealthNavBar from '../../../../../components/ProfHealthNavBar.vue'
  export default {
  components: { ProfHealthNavBar },
    data() {
        return {
            medicines: [],
            prescription: {},
            fieldPrescription:['code','duracao','insertionDate','vigor','patientUser_username','descNutri','actions'],
            msg: null
        }
    },
    computed: {
        code() {
            return this.$route.params.code
        }
    },
    created() {
        this.$axios.$get('/api/prescription-nutris/' + this.code)
        .then(prescriptions => {
            this.prescription = prescriptions
        })
    },
    methods: {   
        expirePrescription(){
          this.$axios.put('/api/prescription-nutris/expire/' + this.prescription.code, {})
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
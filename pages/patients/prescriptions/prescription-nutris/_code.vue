<template>
    <div>
      <patient-nav-bar/>
      <br>
      <b-container>
            <h4>Detalhes da Prescrição:</h4>
                <p>Codigo: {{ prescription.code}}</p>
                <p>Duração: {{ prescription.duracao}} meses</p>
                <p>Data de Inserção: {{ prescription.insertionDate}}</p>
                <p>Estado: {{ prescription.vigor}}</p>
                <p>Descrição de Nutrição a seguir: {{ prescription.descNutri}}</p>
            <nuxt-link to="/patients">Back</nuxt-link>
        </b-container>
    </div>
 </template>

<script>
import PatientNavBar from '../../../../components/PatientNavBar.vue'
  export default {
  components: { PatientNavBar },
    data() {
        return {
            medicines: [],
            prescription: {},
            fieldPrescription:['code','duracao','insertionDate','vigor','descNutri','actions']
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
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
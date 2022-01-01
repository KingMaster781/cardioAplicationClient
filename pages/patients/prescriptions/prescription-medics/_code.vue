<template>
    <div>
      <patient-nav-bar/>
      <br>
      <b-container>
            <h2>Detalhes da Prescrição {{ prescription.code}}</h2>
            <br>
            <h4>Detalhes da Prescrição:</h4>
                <p>Codigo: {{ prescription.code}}</p>
                <p>Duração (Dias em Falta): {{ prescription.duracao}} dias</p>
                <p>Data de Inserção: {{ prescription.oldInsertionDate}}</p>
                <p>Estado: {{ prescription.vigor}}</p>
            <h5>Medicamentos associados a esta Prescrição:</h5>
            <b-table v-if="medicines.length" striped over :items="medicines" :fields="fieldMedicines" />
            <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
            <br>
            <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
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
            fieldPrescription:['code','duracao','insertionDate','vigor', 'actions'],
            fieldMedicines:['code','name','description','warning']
        }
    },
    computed: {
        code() {
            return this.$route.params.code
        }
    },
    created() {
        this.$axios.$get('/api/prescription-medics/' + this.code)
        .then(prescriptions => {
            this.prescription = prescriptions
            this.showMedicines();
        })
    },
    methods: {
        showMedicines(){
            this.medicines=this.prescription.medicineDTOList
        },
    
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
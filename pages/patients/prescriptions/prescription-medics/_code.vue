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
            <h5>Medicamentos associados a esta Prescrição:</h5>
            <b-table v-if="medicines.length" striped over :items="medicines" :fields="fieldMedicines" />
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
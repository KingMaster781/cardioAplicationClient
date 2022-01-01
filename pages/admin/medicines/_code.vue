<template>
    <div>
      <admin-nav-bar/>
      <br>
      <b-container>
            <h4>Detalhes do Medicamento:</h4>
                <p>Codigo: {{ medicine.code}}</p>
                <p>Nome: {{ medicine.name}}</p>
                <p>Descrição: {{ medicine.description}}</p>
                <p>Avisos: {{ medicine.warning}}</p>
            <br>
            <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
        </b-container>
    </div>
 </template>

<script>
  export default {
    data() {
        return {
            medicine: {},
            fieldMedicine:['code','name','description', 'warning', 'actions'],
        }
    },
    computed: {
        code() {
            return this.$route.params.code
        }
    },
    created() {
        this.$axios.$get('/api/medicine/' + this.code)
        .then(medicine => {
            this.medicine = medicine
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
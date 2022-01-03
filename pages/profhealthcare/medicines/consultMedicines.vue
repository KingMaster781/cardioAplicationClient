<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
      <b-container>
        <h2>Consultar todos os Medicamentos</h2>
        <br>
        <b-table striped over :items="medicines" :fields="fields">
            <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/profhealthcare/medicines/${row.item.code}`">Detalhes</nuxt-link>
            </template>
        </b-table>
        <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
      </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            fields: ['code','name','description', 'warning', 'actions'],
            medicines: []
        }
    },
    created(){
        this.$axios.$get('api/medicine/')
            .then((medicine) => {
            this.medicines = medicine
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
<template>
    <div>
      <prof-health-nav-bar/>
      <b-container>
        <h2>Consultar todos os Programas</h2>
        <br>
        <b-table v-if="programs.length" striped over :items="programs" :fields="fields">
            <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/profhealthcare/programs/${row.item.code}`">Detalhes</nuxt-link>
            </template>
        </b-table>
        <h5 v-else>Não existem atualmente programas inseridos na plantaforma</h5>
        <br>
        <p align = "center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
      </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            fields: ['code', 'name', 'descProgram', 'actions'],
            programs: []
        }
    },
    created(){
        this.$axios.$get('api/program/')
            .then((program) => {
            this.programs = program
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
<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
      <b-container>
        <b-table striped over :items="programs" :fields="fields">
            <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/profhealthcare/programs/${row.item.code}`">Detalhes</nuxt-link>
            </template>
        </b-table>
        <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
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
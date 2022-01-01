<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <b-table striped over :items="healthcares" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/admin/healthcares/${row.item.username}`">Detalhes</nuxt-link>
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
      fields: ['username', 'name', 'email', 'actions'],
      healthcares: []
    }
  },
  created(){
    this.$axios.$get('api/profhealthcares/')
        .then((healthcare) => {
          this.healthcares = healthcare
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
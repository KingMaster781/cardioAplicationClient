<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <b-table striped over :items="healthcares" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/admin/healthcares/${row.item.username}`">Details</nuxt-link>
        </template>
      </b-table>
      <nuxt-link to="/admin">Back</nuxt-link>
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
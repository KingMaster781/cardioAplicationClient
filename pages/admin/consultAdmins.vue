<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <b-button variant="success" style="float: right"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <br /><br />
      <b-table striped over :items="admins" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/admin/${row.item.username}`">Details</nuxt-link>
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
      admins: []
    }
  },
  created(){
    this.$axios.$get('api/admin/')
        .then((admin) => {
          this.admins = admin
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
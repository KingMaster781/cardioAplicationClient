<template>
  <div>
    <b-container>
      <b-table striped over :items="admins" :fields="fields">
      </b-table>
      <nuxt-link to="/admin">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fields: ['username', 'name', 'email'],
      admins: []
    }
  },
  created(){
    this.$axios.$get('api/admin/')
        .then((admin) => {
          this.admins = admin
        })
  }
}
</script>
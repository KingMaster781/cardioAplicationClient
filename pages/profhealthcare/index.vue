<template>
  <div>
    <b-container>
      <b-table striped over :items="profHealthcares" :fields="fields">
      </b-table>
      <nuxt-link to="/">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fields: ['username', 'name', 'email'],
      profHealthcares: []
    }
  },
  created(){
    this.$axios.$get('api/profhealthcares/')
        .then((profHealthcare) => {
          this.profHealthcares = profHealthcare
        })
  }
}
</script>
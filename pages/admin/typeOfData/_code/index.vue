<template>
  <div>
    <admin-nav-bar />
    <b-container>
      <h4>Detalhes do Tipo de dados:</h4>
      <p>Code: {{ typeData.code }}</p>
      <p>descType: {{ typeData.descType }}</p>
      <p>unidadeValorQuantitativo: {{ typeData.unidadeValorQuantitativo }}</p>
      <p>valorMaximo: {{ typeData.valorMaximo }}</p>
      <p>valorMinimo: {{ typeData.valorMinimo }}</p>
      <nuxt-link to="/admin/typeOfData">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeData: {},
      fields: ["code", "descType", "unidadeValorQuantitativo", "valorMaximo", "valorMinimo", "actions"],
    };
  },
  computed: {
    code() {
      return this.$route.params.code;
    },
  },
  created() {
    this.$axios
      .$get(`/api/typeofdata/${this.code}`)
      .then((typeDatas) => (this.typeData = typeDatas || {}));
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
  },
};
</script>

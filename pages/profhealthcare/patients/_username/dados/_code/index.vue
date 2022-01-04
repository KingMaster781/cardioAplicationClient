<template>
  <div>
    <prof-health-nav-bar/>
    <br />
    <b-container>
      <h4>Detalhes dos dados:</h4>
      <p>Código: {{ data.code }}</p>
      <p>Data: {{ data.insertionDate }}</p>
      <p>Descrição: {{ data.descriData }}</p>
      <p>Valor: {{ data.value + " " + dataType.unidadeValorQuantitativo}}</p>
      <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exercises: [],
      data: {},
      dataType: {},
    };
  },
  computed: {
    code() {
      return this.$route.params.code;
    },
    username() {
      return this.$auth.user.sub;
    },
  },
  created() {
    this.$axios
      .$get("/api/data/" + this.code)
      .then((datas) => {
        this.data = datas;
        this.$axios
        .$get("/api/typeofdata/" + this.data.typeOfDataCode)
        .then((dataTypes) => {
          this.dataType = dataTypes;
        });
      })
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
  },
};
</script>

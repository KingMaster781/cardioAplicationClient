<template>
  <div>
    <patient-nav-bar />
    <br />
    <b-container>
      <h2>Detalhes do Dado Biomédico {{ data.code }}</h2>
      <br>
      <h4>Detalhes do Dado Biomédico:</h4>
      <p>Código: {{ data.code }}</p>
      <p>Data: {{ data.insertionDate }}</p>
      <p>Descrição: {{ data.descriData }}</p>
      <p>Valor: {{ data.value + " " + dataType.unidadeValorQuantitativo}}</p>
      <br>
      <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p> 
    </b-container>
  </div>
</template>

<script>
import PatientNavBar from "../../../components/PatientNavBar.vue";
export default {
  components: { PatientNavBar },
  data() {
    return {
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
  },
};
</script>

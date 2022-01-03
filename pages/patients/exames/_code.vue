<template>
  <div>
    <patient-nav-bar />
    <br />
    <b-container>
      <h2>Detalhes do Exam {{ exam.code }}</h2>
      <br>
      <h4>Detalhes do Dado Biomédico:</h4>
      <p>Código: {{ exam.code }}</p>
      <p>Data: {{ exam.date }}</p>
      <p>Descrição: {{ exam.dateResult }}</p>
      <p>isDone: {{ exam.isDone}}</p>
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
      exam: {},
    };
  },
  computed: {
    code() {
      return this.$route.params.code;
    },
  },
  created() {
    this.$axios
      .$get("/api/exams/" + this.code)
      .then((exam) => {
        this.exams = [exam];
      });
  },
  methods: {
  },
};
</script>

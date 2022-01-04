<template>
  <div>
    <prof-health-nav-bar />
    <br />
    <b-container>
      <h4>Detalhes da Prescrição:</h4>
      <p>Código: {{ exam.code }}</p>
      <p>Data: {{ exam.date }}</p>
      <p>Data do resultado: {{ exam.dateResult }}</p>
      <p>Nome do paciente: {{ exam.patientUsername }}</p>
      <p align="center">
          <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
        </p>
    </b-container>
  </div>
</template>

<script>
export default {
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
      .then((exams) => {
        this.exam = exams;
      })
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
  },
};
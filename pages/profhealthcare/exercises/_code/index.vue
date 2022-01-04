<template>
  <div>
    <prof-health-nav-bar />
    <br />
    <b-container>
      <h2>Detalhes dp Exercicio {{ exercise.code }}</h2>
      <br />
      <h4>Detalhes do Exercicio:</h4>
      <p>Codigo: {{ exercise.code }}</p>
      <p>Nome: {{ exercise.name }}</p>
      <p>Descrição: {{ exercise.descExercise }}</p>
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
      exercise: {},
      fieldExercise: ["code", "name", "descExercise", "actions"],
    };
  },
  computed: {
    code() {
      return this.$route.params.code;
    },
  },
  created() {
    this.$axios.$get("/api/exercise/" + this.$route.params.code).then((exercises) => {
      this.exercise = exercises;
    });
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div>
    <prof-health-nav-bar />
    <br />
    <b-container>
      <h2>Consultar Detalhes da Prescrição {{ prescription.code }}</h2>
      <br />
      <h4>Detalhes da Prescrição:</h4>
      <p>Codigo: {{ prescription.code }}</p>
      <p>Duração (Dias em Falta): {{ prescription.duracao }} dias</p>
      <p>Data de Inserção: {{ prescription.oldInsertionDate }}</p>
      <p>Estado: {{ prescription.vigor }}</p>
      <p>Username do Paciente: {{ prescription.patientUser_username }}</p>
      <p>Código do Programa: {{ prescription.programCode }}</p>
      <h5>Exercicios associados ao Programa:</h5>
      <b-table
        v-if="exercises.length"
        striped
        over
        :items="exercises"
        :fields="fieldExercises"
      />
      <p v-if="prescription.vigor == 'Está em vigor'">
        <b-button
          class="btn btn-primary btn-lg btn-block"
          v-on:click="expirePrescription"
          >Expirar Prescrição</b-button
        >
      </p>
      <p v-show="msg" class="text-danger">
        {{ msg }}
      </p>
      <br />
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
      exercises: [],
      prescription: {},
      fieldPrescription: [
        "code",
        "duracao",
        "insertionDate",
        "vigor",
        "programCode",
        "patientUser_username",
        "actions",
      ],
      fieldExercises: ["code", "name", "descExercise"],
      msg: null,
    };
  },
  computed: {
    code() {
      return this.$route.params.code;
    },
  },
  created() {
    this.$axios
      .$get("/api/prescription-exercises/" + this.code)
      .then((prescriptions) => {
        this.prescription = prescriptions;
        this.showExercises();
      });
  },
  methods: {
    showExercises() {
      this.$axios
        .$get("/api/program/" + this.prescription.programCode + "/exercises")
        .then((exer) => (this.exercises = exer || {}));
    },

    expirePrescription() {
      this.$axios
        .put("/api/prescription-exercises/expire/" + this.prescription.code, {})
        .then(() => {
          this.msg = "Prescrição expirada com sucesso";
          this.prescription.vigor = "Não está em vigor";
        })
        .catch((error) => {
          this.msg = error;
        });
    },

    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div>
      <patient-nav-bar/>
    <br /><br />
    <b-container>
      <h2>Consultar Todos os Exames do Paciente: {{ this.$auth.user.sub }}</h2>
      <b-table striped over :items="data" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/profhealthcare/patients/${$auth.user.sub}/exams/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
        </template>
      </b-table>
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
      fields: ["code", "date", "dateResult", "done", "actions"],
      exams: [{}],
    };
  },
  created() {
    this.$axios
      .$get(`/api/exams/user/${this.$auth.user.sub}`)
      .then((exams) => {
        this.exam = exams || {};
      });
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    remove(item) {
      this.$axios.$delete("api/data/" + item).then(
        this.$axios
          .$get(`/api/exams/user/${this.$auth.user.sub}`)
          .then((exams) => {
            this.exam = exams || {};
          })
      );
    },
  },
};
</script>

<template>
  <div>
    <patient-nav-bar />
    <br><br>
    <b-container>
      <h2>Exames</h2>
      <br>
      <b-table v-if="exam.length" striped over :items="exam" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/patients/patientData/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
        </template>
      </b-table>
      <h5 v-else>Não possui exames de momento</h5>
      <br>
      <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "code",
        "date",
        "dateResult",
        "isDone",
        "actions",
      ],
      exam: [],
    };
  },
  computed: {
    username() {
      return this.$auth.user.sub;
    },
  },
  created() {
    this.$axios
      .$get("/api/exams/user/" + this.username)
      .then((exam) => {
        this.exams = exam;
      });
  },
  methods: {
  },
};
</script>

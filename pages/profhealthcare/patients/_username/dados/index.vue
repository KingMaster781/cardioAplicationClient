<template>
  <div>
    <prof-health-nav-bar />
    <br /><br />
    <b-container>
      <h2>Consultar Todos os Dados do Paciente: {{ patient.username }}</h2>
      <b-button
        variant="success"
        :to="`/profhealthcare/patients/${$route.params.username}/dados/create`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <br />
      <b-table striped over :items="data" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/profhealthcare/patients/${$route.params.username}/dados/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/profhealthcare/patients/${$route.params.username}/dados/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger" @click="remove(row.item.code)">
            <fa :icon="['fas', 'trash']" />
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
      fields: [
        "code",
        "insertionDate",
        "descriData",
        "value",
        "typeOfDataCode",
        "actions",
      ],
      patient: {},
      data: [{}],
    };
  },
  created() {
    this.$axios
      .$get(`/api/patientusers/${this.$route.params.username}`)
      .then((patient) => {
        this.patient = patient || {};
        this.$axios
          .$get("/api/data/patient/" + this.patient.username)
          .then((datas) => {
            this.data = datas;
          });
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
          .$get(`/api/patientusers/${this.$route.params.username}`)
          .then((patient) => {
            this.patient = patient || {};
            this.$axios
              .$get("/api/data/patient/" + this.patient.username)
              .then((datas) => {
                this.data = datas;
              });
          })
      );
    },
  },
};
</script>

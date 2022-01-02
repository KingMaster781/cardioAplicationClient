<template>
  <div>
    <patient-nav-bar />
    <br /><br />
    <b-container>
      <h2>Prescrições Fisicas</h2>
      <b-table striped over :items="prescriptionsExer" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/patients/prescriptions/${row.item.code}/exer`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
        </template>
      </b-table>
      <br />
      <h2>Prescrições Médicas</h2>
      <b-table striped over :items="prescriptionsMedics" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/patients/prescriptions/${row.item.code}/medics`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
        </template>
      </b-table>
      <br />
      <h2>Prescrições Nutricionais</h2>
      <b-table striped over :items="prescriptionsNutris" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/patients/prescriptions/${row.item.code}/nutris`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
        </template>
      </b-table>
      <nuxt-link to="/patients">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "code",
        "duracao",
        "insertionDate",
        "vigor",
        "programCode",
        "actions",
      ],
      prescriptionsExer: [],
      prescriptionsMedics: [],
      prescriptionsNutris: [],
    };
  },
  computed: {
    username() {
      return this.$auth.user.sub;
    },
  },
  created() {
    this.$axios
      .$get("/api/patientusers/" + this.username + "/prescription-exercises")
      .then((prescription) => {
        this.prescriptionsExer = prescription;
      });
      this.$axios
      .$get("/api/patientusers/" + this.username + "/prescription-medics")
      .then((prescription) => {
        this.prescriptionsMedics = prescription;
      });
      this.$axios
      .$get("/api/patientusers/" + this.username + "/prescription-nutris")
      .then((prescription) => {
        this.prescriptionsNutris = prescription;
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

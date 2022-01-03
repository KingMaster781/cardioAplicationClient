<template>
  <div>
    <patient-nav-bar />
    <br /><br />
    <b-container>
      <h2>Dados Biomédicos</h2>
      <br>
      <b-table v-if="datas.length" striped over :items="datas" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/patients/patientData/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
        </template>
      </b-table>
      <h5 v-else>Ainda não possui dados</h5>
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
        "insertionDate",
        "descriData",
        "value",
        "typeOfDataCode",
        "actions",
      ],
      datas: [],
    };
  },
  computed: {
    username() {
      return this.$auth.user.sub;
    },
  },
  created() {
    this.$axios
      .$get("/api/data/patient/" + this.username)
      .then((data) => {
        this.datas = data;
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

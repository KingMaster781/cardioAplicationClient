<template>
  <div>
    <admin-nav-bar />
    <b-container>
      <h4>Detalhes do Profissional de Saúde:</h4>
      <p>Username: {{ healthcare.username }}</p>
      <p>Name: {{ healthcare.name }}</p>
      <p>Email: {{ healthcare.email }}</p>
      <b-button variant="success" style="float: right" :to="`/admin/healthcares/${username}/enrollPatient`"
        >Associar novo paciente
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <b-table
        v-if="patients.length"
        striped
        over
        :items="patients"
        :fields="fieldPatients"
      >
      <template v-slot:cell(actions)="row">
        <b-button variant="danger" @click="unroll(row.item.username)">
          <fa :icon="['fas', 'trash']" />
        </b-button>
      </template>
      </b-table>
      <h5 v-else>Não tem utentes associados</h5>
      <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      healthcare: {},
      fieldhealthcare: ["username", "password", "name", "email", "actions"],
      fieldPatients: ["username", "name", "email", "actions"],
    };
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    patients() {
      return this.healthcare.patients || [];
    },
  },
  created() {
    this.$axios
      .$get(`/api/profhealthcares/${this.username}`)
      .then((healthcare) => (this.healthcare = healthcare || {}));
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    unroll(patientUsername) {
      this.$axios
        .$put("/api/profhealthcares/" + this.username + "/patients/", {
          username: patientUsername,
        })
        .then(() => {
          this.$axios
            .$get(`/api/profhealthcares/${this.username}`)
            .then((healthcare) => (this.healthcare = healthcare || {}));
        })
        .catch((e) => {
          this.errorMsg = e.response.data;
        });
    },
  },
};
</script>

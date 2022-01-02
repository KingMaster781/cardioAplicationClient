<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <b-button variant="success" style="float: right" :to="`/admin/patients/create`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <h2>Consultar todos os Pacientes</h2>
      <br>
      <b-table striped over :items="patients" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/admin/patients/${row.item.username}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button variant="primary" :to="`/admin/patients/${row.item.username}/edit`">
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger" @click="remove(row.item.username)">
            <fa :icon="['fas', 'trash']" />
          </b-button>
        </template>
      </b-table>
      <br>
      <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["username", "name", "email", "actions"],
      patients: [],
    };
  },
  created() {
    this.$axios.$get("api/patientusers/").then((patient) => {
      this.patients = patient;
    });
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    remove(patientUsername) {
      this.$axios.$delete("api/patientusers/" + patientUsername).then(
        this.$axios.$get("api/patientusers/").then((patient) => {
        this.patients = patient;
      })
      );
    }
  },
};
</script>

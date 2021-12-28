<template>
  <div>
    <admin-nav-bar/>
    <b-container>
      <b-table striped over :items="patients" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button variant="success" >
            <fa :icon="['fas', 'plus']" />
          </b-button>
          <b-button variant="info" :to="`/admin/patients/${row.item.username}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button variant="primary" :to="`/admin/patients/${row.item.username}/edit`">
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" />
          </b-button>
        </template>
      </b-table>
      <nuxt-link to="/admin">Back</nuxt-link>
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
  },
};
</script>

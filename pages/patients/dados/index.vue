<template>
  <div>
    <patient-nav-bar />
    <br /><br />
    <b-container>
      <b-button variant="success" style="float: right" :to="`/patients/dados/create`"
      >Criar novo registo
      <fa :icon="['fas', 'plus']" />
    </b-button>
    <br />
      <b-table striped over :items="datas" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/patients/dados/${row.item.code}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/patients/dados/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger" @click="remove(row.item.code)">
            <fa :icon="['fas', 'trash']" />
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
    this.$axios.$get("/api/data/patient/" + this.username).then((data) => {
      this.datas = data;
    });
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    remove(code) {
      this.$axios.$delete("api/data/" + code).then(
        this.$axios.$get("/api/data/patient/" + this.username).then((data) => {
          this.datas = data;
        })
      );
    },
  },
};
</script>

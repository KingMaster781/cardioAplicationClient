<template>
  <div>
    <admin-nav-bar />
    <br /><br />
    <b-container>
      <h2>Consultar todos os Medicamentos</h2>
      <br />
      <b-button variant="success" style="float: right" :to="`/admin/medicines/createMedicine`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <b-table striped over :items="medicines" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/admin/medicines/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/admin/medicines/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" @click="remove(row.item.code)" />
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
      fields: ["code", "name", "description", "warning", "actions"],
      medicines: [],
    };
  },
  created() {
    this.$axios.$get("api/medicine/").then((medicine) => {
      this.medicines = medicine;
    });
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    remove(code){
            this.$axios.$delete('/api/medicine/' + code)
                .then(() => {
                    this.$router.push('/admin/medicines')
                })
                .catch((error) => {
                    this.errorMsg = error.response.data
                })
        },
  },
};
</script>

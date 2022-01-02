<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <b-button variant="success" style="float: right" :to="`/admin/typeOfData/create`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <b-table striped over :items="typeData" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/admin/typeOfData/${row.item.code}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button variant="primary" :to="`/admin/typeOfData/${row.item.code}/edit`">
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger" @click="remove(row.item.code)">
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
      fields: ["code", "descType", "unidadeValorQuantitativo", "valorMaximo", "valorMinimo", "actions"],
      typeData: [],
    };
  },
  created() {
    this.$axios.$get("api/typeofdata/").then((type) => {
      this.typeData = type;
    });
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    remove(typeDatas) {
      this.$axios.$delete("api/typeofdata/" + typeDatas).then(
        this.$axios.$get("api/typeofdata/").then((type) => {
        this.typeData = type;
      })
      );
    }
  },
};
</script>

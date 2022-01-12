<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <b-button variant="success" style="float: right" :to="`/admin/healthcares/createHealthCare`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <b-table striped over :items="healthcares" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/admin/healthcares/${row.item.username}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button variant="primary" :to="`/admin/healthcares/${row.item.username}/edit`">
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger" @click="remove(row.item.username)">
            <fa :icon="['fas', 'trash']" />
          </b-button>
        </template>
      </b-table>
      <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fields: ['username', 'name', 'email', 'actions'],
      healthcares: []
    }
  },
  created(){
    this.$axios.$get('api/profhealthcares/')
        .then((healthcare) => {
          this.healthcares = healthcare
        })
  },
  methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      },
      remove(username) {
      this.$axios.$delete("api/profhealthcares/" + username).then(
        this.$axios.$get("api/profhealthcares/").then((healthcare) => {
        this.healthcares = healthcare;
      })
      );
    }
    }
}
</script>
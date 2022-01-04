<template>
  <div>
   <admin-nav-bar/>
    <b-container>
      <b-button variant="success" style="float: right" :to="`/admin/admins/createAdmin`"
        >Criar novo administrador
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <br /><br />
      <h2>Consultar Todos os Admins</h2>
      <br>
      <b-table striped over :items="admins" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/admin/admins/${row.item.username}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button variant="primary" :to="`/admin/admins/${row.item.username}/edit`">
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
  data(){
    return {
      fields: ['username', 'name', 'email', 'actions'],
      admins: []
    }
  },
  created(){
    this.$axios.$get('api/admin/')
        .then((admin) => {
          this.admins = admin
        })
  },
  methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      },
      remove(admin) {
      this.$axios.$delete('/api/admin/' + admin)
        .then((admins) => {
          this.$router.push('/admin/admins')
          this.$axios.$get('api/admin/')
        .then((admin) => {
          this.admins = admin
        })
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    }
}
</script>
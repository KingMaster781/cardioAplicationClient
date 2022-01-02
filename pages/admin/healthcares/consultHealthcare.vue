<template>
  <div>
    <admin-nav-bar/>
    <b-container>
        <h2>Consultar um Determindo Profissional de Saúde</h2>
        <br>
        <form @submit.prevent="consult" :disabled="!isFormValid">
            <b-form-group
                id="username"
                description="O username é necessário"
                label-for="username"
                :invalid-feedback="invalidUsernameFeedback"
                :state="isUsernameValid"
            >
                <b-input v-model.trim="username" :state="isUsernameValid" required placeholder="Insira o username do profissional de saúde" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary btn-lg btn-block" @click.prevent="consult" :disabled="!isFormValid">Consultar</button>
        </form>
        <br>
        <b-table v-if="healthcare.length" striped over :items="healthcare" :fields="fieldHealthcares">
          <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/admin/healthcares/${row.item.username}`">Detalhes</nuxt-link>
          </template>
        </b-table>
        <br>
        <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
    </b-container>
  </div>
</template>

<script>
import AdminNavBar from '../../../components/AdminNavBar.vue'
export default {
  components: { AdminNavBar },
  data(){
    return {
      username: null,
      fieldHealthcares:['username','name','email','actions'],
      healthcare: [],
      errorMsg: false
    }
  },
  computed: {
    invalidUsernameFeedback () {
      if (!this.username) {
        return null
      }
      let usernameLen = this.username.length
      if (usernameLen < 3 || usernameLen > 30) {
        return 'The username must be between [3, 30] characters.'
      }
      return ''
    },

    isUsernameValid () {
      if (!this.invalidUsernameFeedback === null) {
        return null
      }
      return this.invalidUsernameFeedback === ''
    },

    isFormValid () {
      if (! this.isUsernameValid) {
        return false
      }
      return true
    }
  },
  methods: {
    consult() {
      this.$axios.$get('/api/profhealthcares/' + this.username)
        .then((healthcare) => {
          this.healthcare = [healthcare]
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
  }
}
</script>
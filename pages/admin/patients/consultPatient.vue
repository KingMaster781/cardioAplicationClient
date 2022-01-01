<template>
  <div>
    <admin-nav-bar/>
    <b-container>
        <form @submit.prevent="consult" :disabled="!isFormValid">
            <b-form-group
                id="username"
                description="O username é necessário"
                label-for="username"
                :invalid-feedback="invalidUsernameFeedback"
                :state="isUsernameValid"
            >
                <b-input v-model.trim="username" :state="isUsernameValid" required placeholder="Insira o username do paciente" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary" @click.prevent="consult" :disabled="!isFormValid">Consultar</button>
        </form>
        <br>
        <b-table striped over :items="patient" :fields="fieldPatients">
          <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/admin/patients/${row.item.username}`">Detalhes</nuxt-link>
          </template>
        </b-table>
        <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username: null,
      fieldPatients:['username','name','email','actions'],
      patient: [],
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
      this.$axios.$get('/api/patientusers/' + this.username)
        .then((patient) => {
          this.patient = [patient]
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
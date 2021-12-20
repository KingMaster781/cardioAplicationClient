<template>
  <div>
    <b-navbar type="dark" variant="primary">
        <b-button variant="primary" v-b-toggle.sidebar-no-header>
          <span class="navbar-toggler-icon"></span>
        </b-button>
        <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item @click.prevent="signOut">Logout</b-nav-item>
        </b-navbar-nav>         
      </b-navbar>
      <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow backdrop backdrop-variant="dark">
        <template #default>
          <div class="p-3">
            <nav class="mb-3">
              <b-nav vertical>
                <b-dropdown-item block v-b-toggle.pa variant="info">Patients</b-dropdown-item>
                <b-collapse id="pa" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/profhealthcare/patients/consultPatients" class="link-dark rounded">Lista de Pacientes</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/consultPatient" class="link-dark rounded">Consultar um determinado Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/createPatient" class="link-dark rounded">Criar um Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/removePatient" class="link-dark rounded">Remover um determinado Paciente</b-dropdown-item>
                    <b-dropdown-item href="/profhealthcare/patients/updatePatient" class="link-dark rounded">Atualiza um determinado Paciente</b-dropdown-item>
                  </b-card-body>
                </b-collapse>
              </b-nav>
            </nav>
          </div>
        </template>
          <template #footer>
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
              <strong class="mr-auto"></strong>
              <b-button size="sm" v-b-toggle.sidebar-no-header>Close</b-button>
          </div>
        </template>
      </b-sidebar>
    <br><br>
    <b-container>
        <form @submit.prevent="consult" :disabled="!isFormValid">
            <b-form-group
                id="username"
                description="The username is required"
                label-for="username"
                :invalid-feedback="invalidUsernameFeedback"
                :state="isUsernameValid"
            >
                <b-input v-model.trim="username" :state="isUsernameValid" required placeholder="Enter your username" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary" @click.prevent="deleted" :disabled="!isFormValid">Remover</button>
        </form>
        <br>
        <nuxt-link to="/profhealthcare">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username: null,
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
    deleted() {
      this.$axios.$delete('/api/patientusers/' + this.username)
        .then(() => {
          this.$router.push('/profhealthcare')
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    signOut(){
        this.$auth.logout()
        this.$router.push('/')
    },
  }
}
</script>
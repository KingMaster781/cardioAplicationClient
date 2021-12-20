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
      <form @submit.prevent="create" :disabled="!isFormValid">
            <b-form-group
                id="username"
                description="The username is required"
                label-for="username"
                :invalid-feedback="invalidUsernameFeedback"
                :state="isUsernameValid"
            >
            <b-input v-model.trim="username" :state="isUsernameValid" required placeholder="Enter your username" />
            </b-form-group>
                <b-form-group
                    id="password"
                    description="The password is required"
                    label-for="password"
                    :invalid-feedback="invalidPasswordFeedback"
                    :state="isPasswordValid"
                >
            <b-input v-model="password" :state="isPasswordValid" required placeholder="Enter your password" />
            </b-form-group>
                <b-form-group
                    id="name"
                    description="The name is required"
                    label-for="name"
                    :invalid-feedback="invalidNameFeedback"
                    :state="isNameValid"
                >
                <b-input v-model.trim="name" :state="isNameValid" required placeholder="Enter your name" />
            </b-form-group>
                <b-form-group
                    id="email"
                    description="The email is required"
                    label-for="email"
                    :invalid-feedback="invalidEmailFeedback"
                    :state="isEmailValid"
                >
                <b-input ref="email" v-model.trim="email" type="email" :state="isEmailValid" placeholder="Enter your e-mail" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary" @click.prevent="create" :disabled="!isFormValid">CREATE</button>
            <br>
            <nuxt-link to="/profhealthcare">Back</nuxt-link>
        </form>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username: null,
      password: null,
      name: null,
      email: null,
      docUsername: null,
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

    invalidPasswordFeedback () {
      if (!this.password) {
        return null
      }
      let passwordLen = this.password.length
      if (passwordLen < 3 || passwordLen > 255) {
        return false
      }
      return ''
    },

    isPasswordValid () {
      if (!this.invalidPasswordFeedback === null) {
        return null
      }
      return this.invalidUsernameFeedback === ''
    },

    invalidNameFeedback () {
      if (!this.name) {
        return null
      }
      let nameLen = this.name.length
      if (nameLen < 3 || nameLen > 25) {
        return false
      }
      return ''
    },

    isNameValid () {
      if (!this.invalidNameFeedback === null) {
        return null
      }
      return this.invalidNameFeedback === ''
    },

    invalidEmailFeedback () {
      if (!this.email) {
        return null
      }
     //if(!this.$refs.email.checkValidity())
      //{
      //  return null
      //}
      return ''
    },

    isEmailValid () {
      if (!this.invalidEmailFeedback === null) {
        return null
      }
      return this.invalidEmailFeedback === ''
    },
     isFormValid () {
      if (! this.isUsernameValid) {
        return false
      }
      if (! this.isPasswordValid) {
        return false
      }
      if (! this.isNameValid) {
        return false
      }
      if (! this.isEmailValid) {
        return false
      }
      return true
    }
  },
  methods: {
    create() {
      console.log(this.docUsername);
      this.$axios.$post('/api/patientusers', {
        username: this.username,
        password: this.password,
        name: this.name,
        email: this.email,
      })
        .then(() => {
          this.enroll()
        })
        .catch((error) => {
          this.errorMsg = error.response.data
        })
    },
    signOut(){
        this.$auth.logout()
        this.$router.push('/')
    },
    enroll() {
      this.$axios.$post('/api/profhealthcares/' + this.docUsername + '/patients/',{username: this.username})
        .then(() => {
          console.log("bom dia")
          this.$router.push('/profhealthcare')
        })
        .catch((e)=>{
          this.errorMsg = e.response.data
        })
    },
  },
  mounted(){
    this.docUsername = this.$auth.user.sub
  }
}
</script>
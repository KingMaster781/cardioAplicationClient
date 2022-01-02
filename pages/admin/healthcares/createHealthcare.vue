<template>
  <div>
    <admin-nav-bar/>
    <b-container>
      <h2>Criar um Profissional de Saude</h2>
      <br>
      <form @submit.prevent="create" :disabled="!isFormValid">
            <b-form-group
                id="username"
                description="O username é necessário"
                label-for="username"
                :invalid-feedback="invalidUsernameFeedback"
                :state="isUsernameValid"
            >
            <b-input v-model.trim="username" :state="isUsernameValid" required placeholder="Insira o username do profissional de saúde" />
            </b-form-group>
                <b-form-group
                    id="password"
                    description="A password é necessária"
                    label-for="password"
                    :invalid-feedback="invalidPasswordFeedback"
                    :state="isPasswordValid"
                >
            <b-input v-model="password" :state="isPasswordValid" required placeholder="Insira a password do profissional de saúde" />
            </b-form-group>
                <b-form-group
                    id="name"
                    description="O nome é necessário"
                    label-for="name"
                    :invalid-feedback="invalidNameFeedback"
                    :state="isNameValid"
                >
                <b-input v-model.trim="name" :state="isNameValid" required placeholder="Insira o nome do profissional de saúde" />
            </b-form-group>
                <b-form-group
                    id="email"
                    description="O email é necessário e com o prefixo @mycardio.pt"
                    label-for="email"
                    :invalid-feedback="invalidEmailFeedback"
                    :state="isEmailValid"
                >
                <b-input ref="email" v-model.trim="email" type="email" :state="isEmailValid" required pattern=".+@mycardio.pt" placeholder="Insira o email do profissional de saúde" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary btn-lg btn-block" @click.prevent="create" :disabled="!isFormValid">Criar</button>
            <br>
            <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
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
     if(!this.$refs.email.checkValidity())
      {
        return null
      }
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
      this.$axios.$post('/api/profhealthcares', {
        username: this.username,
        password: this.password,
        name: this.name,
        email: this.email,
      })
        .then(() => {
          this.$router.push('/admin/healthcares')
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
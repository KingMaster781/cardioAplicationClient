<template>
  <div>
    <admin-nav-bar/>
    <b-container>
      <h2>Atualizar um determinado admin</h2>
      <br>
      <form @submit.prevent="update" :disabled="!isFormValid">
                <b-form-group
                    id="name"
                    description="O nome é necessário"
                    label-for="name"
                    :invalid-feedback="invalidNameFeedback"
                    :state="isNameValid"
                >
                <b-input v-model.trim="name" :state="isNameValid" required placeholder="Insira o nome do admin" />
            </b-form-group>
                <b-form-group
                    id="email"
                    description="O email é necessário e deve possuir o prefixo @mycardio.pt"
                    label-for="email"
                    :invalid-feedback="invalidEmailFeedback"
                    :state="isEmailValid"
                >
                <b-input ref="email" v-model.trim="email" type="email" :state="isEmailValid" required pattern=".+@mycardio.pt" placeholder="Insira o email do admin" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary btn-lg btn-block" @click.prevent="update" :disabled="!isFormValid">Atualizar</button>
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
  created() {
        this.$axios.$get(`/api/admin/${this.$route.params.username}`)
        .then(healthcare => {
            this.name = healthcare.name,
            this.email = healthcare.email,
            this.password = healthcare.password
        })
    },
  computed: {
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
    update() {
      this.$axios.$put('/api/admin/' + this.$route.params.username, {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push('/admin/admins')
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
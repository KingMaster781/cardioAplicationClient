<template>
  <div>
    <admin-nav-bar/>
    <b-container>
      <form @submit.prevent="update" :disabled="!isFormValid">
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
                <b-input ref="email" v-model.trim="email" type="email" :state="isEmailValid" required pattern=".+@mycardio.pt" placeholder="Enter your e-mail" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary" @click.prevent="update" :disabled="!isFormValid">Update</button>
            <br>
            <nuxt-link to="/admin/healthcares">Back</nuxt-link>
        </form>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: null,
      email: null,
      password: null,
      errorMsg: false
    }
  },
  computed: {
      /*invalidUsernameFeedback () {
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
    },*/

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
      /*if(!this.$refs.email.checkValidity())
      {
        return null
      }*/
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
  created() {
        this.$axios.$get(`/api/profhealthcares/${this.$route.params.username}`)
        .then(healthcare => {
            this.name = healthcare.name,
            this.email = healthcare.email,
            this.password = healthcare.password
        })
    },
  methods: {
    update() {
      this.$axios.$put('/api/profhealthcares/' + this.$route.params.username, {
        username: this.$route.params.username,
        name: this.name,
        email: this.email,
        password: this.password
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
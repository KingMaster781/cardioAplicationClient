<template>
  <div>
    <admin-nav-bar/>
    <b-container>
        <h1>Enviar uma mensagem para um Paciente</h1>
        <br>
        <form @submit.prevent="send">
        <b-form-group
            id="username"
            description="The username is required"
            label-for="username"
            :invalid-feedback="invalidUsernameFeedback"
            :state="isUsernameValid"
        >
          <b-input v-model.trim="username" :state="isUsernameValid" required placeholder="Escreva o username do Profissional de Saúde" />
        </b-form-group>
        <b-form-group
            id="subject"
            label-for="subject"
        >
          <b-input v-model.trim="subject" placeholder="Escreva o Cabeçalho" />
        </b-form-group>
        <b-form-group
            id="message"
            label-for="message"
        >
          <textarea v-model="message" class="form-control" name="message" placeholder="Escreva a sua mensagem"></textarea>
        </b-form-group>
        <nuxt-link to="/admin">Back</nuxt-link>
        &nbsp;
        <button class="btn btn-primary" @click.prevent="send" :disabled="!isFormValid">Enviar</button>
        </form>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username: null,
      subject: null,
      message: null
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
    send() {
      this.$axios.$post(`/api/patientusers/${this.username}/email/send`, {
        subject: this.subject,
        message: this.message
      })
      .then(msg => {
        this.$toast.success(msg).goAway(1500)
      })
      .catch(error => {
        this.$toast.error('error sending the e-mail').goAway(3000)
      })
    },
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
  }
}
</script>
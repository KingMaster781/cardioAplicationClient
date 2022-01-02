<template>
    <div>
        <admin-nav-bar/>
        <b-container>
            <form @submit.prevent="enroll" :disabled="!isFormValid">
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
                id="patient"
                description="The patient is required"
                label-for="patient"
                :invalid-feedback="invalidPatientFeedback"
                :state="isPatientValid"
                >
                <b-select v-model="patientUsername" :options="patients" :state="isPatientValid" required value-field="username" text-field="name">
                    <template v-slot:first>
                    <option :value="null" disabled>-- Please select the Subject --
                    </option>
                    </template>
                </b-select>
                </b-form-group>
                <p v-show="errorMsg" class="text-danger">
                    {{ errorMsg }}
                </p>
                <button class="btn btn-primary" @click.prevent="unroll" :disabled="!isFormValid">Dessassociar Paciente</button>
                <br><br>
                <nuxt-link to="/admin">Back</nuxt-link>
            </form>
        </b-container>
    </div>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      patients:[],
      patientUsername: null,
      errorMsg: false
    }
  },
  created() {
    this.$axios.$get('/api/patientusers')
      .then(patient => {
        this.patients = patient
      })
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

    invalidPatientFeedback () {
      if (!this.patientUsername) {
        return null
      }
      if(!this.patients.some(patient => this.patientUsername === patient.username))
      {
        return null
      }
      return ''
    },
    
    isPatientValid () {
      if (!this.invalidPatientFeedback === null) {
        return null
      }
      return this.invalidPatientFeedback === ''
    },

    isFormValid () {
      if (! this.isUsernameValid) {
        return false
      }
      if (! this.isPatientValid) {
        return false
      }
      return true
    }
  },

  methods: {
    unroll() {
      this.$axios.$put('/api/profhealthcares/' + this.username + '/patients/',{username: this.patientUsername})
        .then(() => {
          this.$router.push('/admin')
        })
        .catch((e)=>{
          this.errorMsg = e.response.data
        })
    },
    signOut(){
        this.$auth.logout()
        this.$router.push('/')
    }
  }
}
</script>

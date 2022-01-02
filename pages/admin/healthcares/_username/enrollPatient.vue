<template>
    <div>
        <admin-nav-bar/>
        <b-container>
            <h2>Associar um Paciente um Profissional de Saude</h2>
            <br>
            <form @submit.prevent="enroll" :disabled="!isFormValid">
                <b-form-group
                id="patient"
                description="O paciente é necessário"
                label-for="patient"
                :invalid-feedback="invalidPatientFeedback"
                :state="isPatientValid"
                >
                <b-select v-model="patientUsername" :options="patients" :state="isPatientValid" required value-field="username" text-field="name">
                    <template v-slot:first>
                    <option :value="null" disabled>Por favor, selecione o paciente
                    </option>
                    </template>
                </b-select>
                </b-form-group>
                <p v-show="errorMsg" class="text-danger">
                    {{ errorMsg }}
                </p>
                <button class="btn btn-primary btn-lg btn-block" @click.prevent="enroll" :disabled="!isFormValid">Associar Paciente</button>
                <br><br>
                <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
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
      this.username = this.$route.params.username;
  },

  computed: {

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
      if (! this.isPatientValid) {
        return false
      }
      return true
    }
  },

  methods: {
    enroll() {
      this.$axios.$post('/api/profhealthcares/' + this.username + '/enroll-patient',{username: this.patientUsername})
        .then(() => {
          this.$router.push('/admin/healthcares/' + this.username)
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

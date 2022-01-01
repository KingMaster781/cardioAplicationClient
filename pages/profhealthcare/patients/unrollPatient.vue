<template>
    <div>
        <prof-health-nav-bar/>
        <b-container>
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
                    <option :value="null" disabled>-- Selecione o paciente a Dessassociar --
                    </option>
                    </template>
                </b-select>
                </b-form-group>
                <p v-show="errorMsg" class="text-danger">
                    {{ errorMsg }}
                </p>
                <button class="btn btn-primary" @click.prevent="unroll" :disabled="!isFormValid">Dessassociar Paciente</button>
                <br><br>
                <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
            </form>
        </b-container>
    </div>
</template>
<script>
export default {
  data() {
    return {
      patients:[],
      patientUsername: null,
      errorMsg: false
    }
  },
  created() {
    this.$axios.$get(`/api/profhealthcares/${this.$auth.user.sub}`)
        .then(healthcare =>  {
          this.patients = healthcare.patients || []
        })
  },

  computed: {
    username(){
        return this.$auth.user.sub
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
      if (! this.isPatientValid) {
        return false
      }
      return true
    }
  },

  methods: {
    unroll() {
      console.log(this.$auth.user.groups)
      this.$axios.$put('/api/profhealthcares/' + this.username + '/unroll-patient/',{username: this.patientUsername})
        .then(() => {
          this.$router.push('/profhealthcare')
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

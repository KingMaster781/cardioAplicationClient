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
                <b-collapse id="pa" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/patients/prescriptions/consultPrescription" class="link-dark rounded">Consultar uma determinada prescrição</b-dropdown-item>
                    <b-dropdown-item href="/patients/prescriptions/consultPrescriptions" class="link-dark rounded">Consultar todas prescrições</b-dropdown-item>
                    <b-dropdown-item href="/patients/profhealthcare/consultProfhealthcares" class="link-dark rounded">Consultar profissionais de saúde</b-dropdown-item>  
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
                id="code"
                description="The code is required"
                label-for="code"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
                <b-input v-model.trim="code" :state="isCodeValid" required placeholder="Enter code's prescription" />
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary" @click.prevent="consult" :disabled="!isFormValid">Consultar</button>
        </form>
        <b-table striped over :items="prescriptions" :fields="fields">
            <template v-slot:cell(actions)="row">
            <nuxt-link class="btn btn-link" :to="`/patients/prescriptions/${row.item.code}`">Details</nuxt-link>
            </template>
        </b-table>
        <nuxt-link to="/patients">Back</nuxt-link>
      </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            code: null,
            fields: ['code', 'duracao', 'insertionDate', 'vigor', 'programCode', 'actions'],
            prescriptions: [],
            errorMsg: null
        }
    },
    computed: {
        invalidCodeFeedback () {
            if (!this.code) {
                return null
            }
            let codeLen = this.code.length
            if (codeLen < 1 || codeLen > 30) {
                return 'The code must be between [1, 30] number characters.'
            }
            return ''
        },

        isCodeValid () {
            if (!this.invalidCodeFeedback === null) {
                return null
            }
            return this.invalidCodeFeedback === ''
        },
        isFormValid () {
            if (! this.isCodeValid) {
                return false
            }
            return true
        },

        username(){
             return this.$auth.user.sub
        }
    },
    
    methods: {
        consult(){
            this.$axios.$get('/api/patientusers/' + this.username + '/prescription/' + this.code)
                .then((prescription) => {
                    this.prescriptions = prescription
                })
                .catch((error) => {
                    this.errorMsg = error
                })
            },
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
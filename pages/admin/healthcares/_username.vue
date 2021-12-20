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
                    <b-dropdown-item href="/admin/patients/consultPatients" class="link-dark rounded">Lista de Pacientes</b-dropdown-item>
                    <b-dropdown-item href="/admin/patients/consultPatient" class="link-dark rounded">Consultar um determinado Paciente</b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item block v-b-toggle.he variant="info">Healthcare Professionals</b-dropdown-item>
                <b-collapse id="he" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/admin/healthcares/consultHealthcares" class="link-dark rounded">Lista de Profissionais de Saude</b-dropdown-item>
                    <b-dropdown-item href="/admin/healthcares/consultHealthcare" class="link-dark rounded">Consultar um determinado Profissional de Saude</b-dropdown-item>
                    <b-dropdown-item href="/admin/healthcares/createHealthcare" class="link-dark rounded">Criar um Profissional de Saude</b-dropdown-item>
                    <b-dropdown-item href="/admin/healthcares/removeHealthcare" class="link-dark rounded">Remover um determinado Profissional de Saude</b-dropdown-item>
                    <b-dropdown-item href="/admin/healthcares/updateHealthcare" class="link-dark rounded">Atualiza um determinado Profissional de Saude</b-dropdown-item>
                    <b-dropdown-item href="/admin/healthcares/enrollPatient" class="link-dark rounded">Associar utente a Profissional de Saude</b-dropdown-item>
                    <b-dropdown-item href="/admin/healthcares/unrollPatient" class="link-dark rounded">Dessassociar utente de Profissional de Saude</b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item block v-b-toggle.ad variant="info">Admins</b-dropdown-item>
                <b-collapse id="ad" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/admin/consultAdmins" class="link-dark rounded">Lista de Admins</b-dropdown-item>
                    <b-dropdown-item href="/admin/consultAdmin" class="link-dark rounded">Consultar um determinado Admin</b-dropdown-item>
                    <b-dropdown-item href="/admin/createAdmin" class="link-dark rounded">Criar um Admin</b-dropdown-item>
                    <b-dropdown-item href="/admin/removeAdmin" class="link-dark rounded">Remover um determinado Admin</b-dropdown-item>
                    <b-dropdown-item href="/admin/updateAdmin" class="link-dark rounded">Atualiza um determinado Admin</b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item block v-b-toggle.ad variant="info">Tipo de Dados</b-dropdown-item>
                <b-collapse id="ad" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item href="/admin/createTypeDataBio" class="link-dark rounded">Lista de Admins</b-dropdown-item>
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
            <h4>Detalhes do Profissional de Saúde:</h4>
              <p>Username: {{ healthcare.username}}</p>
              <p>Name: {{ healthcare.name}}</p>
              <p>Email: {{ healthcare.email}}</p>
              <p>Password: {{ healthcare.password}}</p>
            <b-table v-if="patients.length" striped over :items="patients" :fields="fieldPatients" />
            <h5 v-else>Não tem utentes associados</h5>
            <nuxt-link to="/admin">Back</nuxt-link>
        </b-container>
    </div>
 </template>

<script>
  export default {
      data() {
        return {
          healthcare: {},
          fieldhealthcare:['username','password','name','email','actions'],
          fieldPatients:['username','name','email']
        }
    },
    computed: {
        username() {
          return this.$route.params.username
        },
        patients(){
          return this.healthcare.patients || []
        }
    },
    created() {
        this.$axios.$get(`/api/profhealthcares/${this.username}`)
        .then(healthcare => this.healthcare = healthcare || {})
    },
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
  }
</script>
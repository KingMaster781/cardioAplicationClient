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
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
      backdrop
      backdrop-variant="dark"
    >
      <template #default>
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-collapse 
                id="pa" 
                visible
                accordion="my-accordion" 
                role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item 
                        href="/patients/prescriptions/consultPrescription" 
                        class="link-dark rounded">
                            Consultar uma determinada prescrição
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/patients/prescriptions/consultPrescriptions" 
                        class="link-dark rounded">
                            Consultar todas prescrições
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/patients/profhealthcare/consultProfhealthcares"
                        class="link-dark rounded">
                            Consultar profissionais de saúde
                    </b-dropdown-item>  
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
    <br /><br />
</div>
</template>

<script>
export default {
    name: 'navBarPatient',
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
}
</script>

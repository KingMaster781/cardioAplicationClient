<template>
<div>
 <b-navbar type="dark" variant="primary">
      <b-button variant="primary" v-b-toggle.sidebar-no-header>
        <span class="navbar-toggler-icon"></span>
      </b-button>
      <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>Bem Vindo {{username}}</b-nav-item>
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
              <b-dropdown-item 
                block 
                v-b-toggle.pa 
                variant="info">
                    Pacientes
              </b-dropdown-item>
                <b-collapse 
                    id="pa" 
                    visible 
                    accordion="my-accordion" 
                    role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item 
                        href="/profhealthcare/patients/consultPatients" 
                        class="link-dark rounded">
                            Lista de Pacientes
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/patients/consultPatient" 
                        class="link-dark rounded">
                            Consultar um determinado Paciente
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/patients/createPatient" 
                        class="link-dark rounded">
                            Criar um Paciente
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/patients/removePatient" 
                        class="link-dark rounded">
                            Remover um determinado Paciente
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/patients/updatePatient" 
                        class="link-dark rounded">
                            Atualiza um determinado Paciente
                    </b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item 
                    block 
                    v-b-toggle.me 
                    variant="info">
                        Medicamentos
                </b-dropdown-item>
                <b-collapse 
                    id="me" 
                    visible 
                    accordion="my-accordion" 
                    role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item 
                        href="/profhealthcare/medicines/consultMedicines" 
                        class="link-dark rounded">
                            Lista de Medicamentos
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/medicines/consultMedicine" 
                        class="link-dark rounded">
                            Consultar um determinado Medicamento
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/medicines/createMedicine" 
                        class="link-dark rounded">
                            Criar um Medicamento
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/medicines/removeMedicine" 
                        class="link-dark rounded">
                            Remover um Medicamento
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/medicines/updateMedicine" 
                        class="link-dark rounded">
                            Atualizar um Medicamento
                    </b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item 
                    block 
                    v-b-toggle.ex 
                    variant="info">
                        Exercicios de Reabilitação Cardiaca
                </b-dropdown-item>
                <b-collapse 
                    id="ex" 
                    visible 
                    accordion="my-accordion" 
                    role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item 
                        href="/profhealthcare/exercises/consultExercises" 
                        class="link-dark rounded">
                            Lista de Exercicios de Reabilitação Cardiaca
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/exercises/consultExercise" 
                        class="link-dark rounded">
                            Consultar um determinado Exercicio de Reabilitação Cardiaca
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/exercises/createExercise" 
                        class="link-dark rounded">
                            Criar um Exercicio de Reabilitação Cardiaca
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/exercises/deleteExercise" 
                        class="link-dark rounded">
                            Remover um determinado Exercicio de Reabilitação Cardiaca
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/exercises/updateExercise" 
                        class="link-dark rounded">
                            Atualiza um determinado Exercicio de Reabilitação Cardiaca
                    </b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item 
                    block 
                    v-b-toggle.pro 
                    variant="info">
                        Programas de Reabilitação Cardiaca
                </b-dropdown-item>
                <b-collapse 
                    id="pro" 
                    visible 
                    accordion="my-accordion" 
                    role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item 
                        href="/profhealthcare/programs/consultPrograms" 
                        class="link-dark rounded">
                            Lista de Programas de Reabilitação Cardiaca
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/programs/consultProgram" 
                        class="link-dark rounded">
                            Consultar um determinado Programa de Reabilitação Cardiaca
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/programs/createProgram"
                        class="link-dark rounded">
                            Criar um Programa de Reabilitação Cardiaca
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/programs/deleteProgram" 
                        class="link-dark rounded">
                            Remover um Programa de Reabilitação Cardiaca
                    </b-dropdown-item>
                    <b-dropdown-item 
                        href="/profhealthcare/programs/updateProgram" 
                        class="link-dark rounded">
                            Atualizar um Programa de Reabilitação Cardiaca
                    </b-dropdown-item>
                  </b-card-body>
                </b-collapse>
                <b-dropdown-item 
                    block 
                    v-b-toggle.pre 
                    variant="info">
                        Prescrições de Programas de Reabilitação Cardiaca
                </b-dropdown-item>
                <b-collapse 
                    id="pre" 
                    visible 
                    accordion="my-accordion" 
                    role="tabpanel">
                  <b-card-body>
                    <b-dropdown-item 
                        href="/profhealthcare/prescriptions/consultPrescription" 
                        class="link-dark rounded">
                            Consultar uma determinada Prescrição
                    </b-dropdown-item>
                    <b-dropdown-item 
                      block 
                      v-b-toggle.pe 
                      variant="info">
                          Prescrições de Exercicio
                    </b-dropdown-item>
                    <b-collapse 
                      id="pe" 
                      role="tabpanel">
                      <b-dropdown-item 
                          href="/profhealthcare/prescriptions/prescription-exercises/createPrescription" 
                          class="link-dark rounded">
                              Criar uma nova prescrição
                      </b-dropdown-item>
                      <b-dropdown-item 
                          href="/profhealthcare/prescriptions/prescription-exercises/updateDurationPrescription" 
                          class="link-dark rounded">
                              Atualizar a duração de uma determinada prescrição
                      </b-dropdown-item>
                    </b-collapse>
                    <b-dropdown-item 
                      block 
                      v-b-toggle.pm 
                      variant="info">
                          Prescrições Medicas
                    </b-dropdown-item>
                    <b-collapse 
                      id="pm" 
                      role="tabpanel">
                      <b-dropdown-item 
                          href="/profhealthcare/prescriptions/prescription-medics/createPrescription" 
                          class="link-dark rounded">
                              Criar uma nova prescrição
                      </b-dropdown-item>
                      <b-dropdown-item 
                          href="/profhealthcare/prescriptions/prescription-medics/updateDurationPrescription" 
                          class="link-dark rounded">
                              Atualizar a duração de uma determinada prescrição
                      </b-dropdown-item>
                    </b-collapse>
                    <b-dropdown-item 
                      block 
                      v-b-toggle.pn 
                      variant="info">
                          Prescrições de Nutrição
                    </b-dropdown-item>
                    <b-collapse 
                      id="pn" 
                      role="tabpanel">
                      <b-dropdown-item 
                          href="/profhealthcare/prescriptions/prescription-nutris/createPrescription" 
                          class="link-dark rounded">
                              Criar uma nova prescrição
                      </b-dropdown-item>
                      <b-dropdown-item 
                          href="/profhealthcare/prescriptions/prescription-nutris/updateDurationPrescription" 
                          class="link-dark rounded">
                              Atualizar a duração de uma determinada prescrição
                      </b-dropdown-item>
                    </b-collapse>
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
    name: 'navBarProfH',
    computed: {
      username(){
        return this.$auth.user.sub
      }
    },
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
}
</script>

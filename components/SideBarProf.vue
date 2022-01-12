<template>
<div>
    <div class="container-fluid">
        <div class="row" >
            <div v-if="open">
                <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar ">
                    <div @click="$emit('togglenav')"><p align="right"><fa :icon="['fas', 'times']" size="2x" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div>
                    <div class="position-sticky pt-3">

                    <ul class="nav flex-column" >

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.pa><h5>Pacientes</h5></div>
                        </li>
                        <b-collapse id="pa" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/patients/">Lista de Pacientes</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/patients/consultPatient">Consultar um determinado Paciente</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/patients/createPatient">Criar um Paciente</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/patients/removePatient">Remover um determinado Paciente</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/patients/enrollPatient">Associar utente</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/patients/unrollPatient">Dessassociar utente</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/patients/sendEmailPatientUser">Enviar uma mensagem a um Paciente</a>
                        </b-collapse>
                        
                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.me><h5>Medicamentos</h5></div>
                        </li>
                        <b-collapse id="me" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/medicines/consultMedicines">Lista de Medicamentos</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/medicines/consultMedicine">Consultar um determinado Medicamento</a>
                        </b-collapse>

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.ex><h5>Exercicios de Reabilitação Cardiaca</h5></div>
                        </li>
                        <b-collapse id="ex" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/exercises/">Lista de Exercicios de Reabilitação Cardiaca</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/exercises/consultExercise">Consultar um determinado Exercicio de Reabilitação Cardiaca</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/exercises/createExercise">Criar um Exercicio de Reabilitação Cardiaca</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/exercises/deleteExercise">Remover um determinado Exercicio de Reabilitação Cardiaca</a>
                        </b-collapse>

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.pr><h5>Programas de Reabilitação Cardiaca</h5></div>
                        </li>
                        <b-collapse id="pr" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/programs/">Lista de Programas de Reabilitação Cardiaca</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/programs/consultProgram">Consultar um determinado Programa de Reabilitação Cardiaca</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/programs/createProgram">Criar um Programa de Reabilitação Cardiaca</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/programs/deleteProgram">Remover um Programa de Reabilitação Cardiaca</a>
                        </b-collapse>

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.pp><h5>Prescrições</h5></div>
                        </li>
                        <b-collapse id="pp" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/profhealthcare/prescriptions/consultPrescription">Consultar uma determinada Prescrição</a>
                        </b-collapse>
                    </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  export default {
      props:[
          'open'
      ]
  }
</script>
<style scoped>
@import "@/assets/css/dashboard.css";
</style>>
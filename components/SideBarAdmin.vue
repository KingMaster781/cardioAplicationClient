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
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/patients/">Lista de Pacientes</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/patients/consultPatient">Consultar um determinado Paciente</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/patients/sendEmailPatientUser">Enviar uma mensagem a um paciente</a>
                        </b-collapse>
                        
                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.ps><h5>Profissionais de Saude</h5></div>
                        </li>
                        <b-collapse id="ps" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/healthcares/">Lista de Profissionais de Saude</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/healthcares/consultHealthcare">Consultar um determinado Profissional de Saude</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/healthcares/createHealthcare">Criar um Profissional de Saude</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/healthcares/sendEmailProfHealthcare">Enviar uma mensagem a um profissional de saude</a>
                        </b-collapse>

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.ad><h5>Administradores</h5></div>
                        </li>
                        <b-collapse id="ad" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/admins">Lista de Admins</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/admins/createAdmin">Criar um Admin</a>
                        </b-collapse>

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.tdd><h5>Tipos de dados</h5></div>
                        </li>
                        <b-collapse id="tdd" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/typeOfData/create">Criar um Tipo de Dados</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/typeOfData">Consultar Todos os Tipos de Dados</a>
                        </b-collapse>

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.me><h5>Medicamentos</h5></div>
                        </li>
                        <b-collapse id="me" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/medicines/">Lista de Medicamentos</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/medicines/consultMedicine">Consultar um determinado Medicamento</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/medicines/createMedicine">Criar um Medicamento</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/admin/medicines/removeMedicine">Remover um Medicamento</a>
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
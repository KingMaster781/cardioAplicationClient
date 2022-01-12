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
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.pr><h5>Prescrições</h5></div>
                        </li>
                        <b-collapse id="pr" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/patients/prescriptions/">Consultar todas as prescrições</a>
                        </b-collapse>
                        
                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.ps><h5>Profissionais de Saude</h5></div>
                        </li>
                        <b-collapse id="ps" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/patients/profhealthcare/">Consultar profissionais de saúde</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/patients/profhealthcare/sendEmailProfHealthcare">Enviar um email a um profissional de saúde</a>
                        </b-collapse>

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.db><h5>Dados Biomédicos</h5></div>
                        </li>
                        <b-collapse id="db" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/patients/dados">Consultar Dados Biomédicos</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/patients/dados/create">Inserir Dados Biomédicos</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="#">Inserir Documento com Dados Biomédicos</a>
                        </b-collapse>

                        <li class="nav-item">
                            <div class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" block v-b-toggle.ex><h5>Exames</h5></div>
                        </li>
                        <b-collapse id="ex" accordion="my-accordion" role="tabpanel">
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="/patients/exams/">Consultar Exames</a>
                            <a class="nav-link" onmouseover="this.style.background='gray';" onmouseout="this.style.background='whitesmoke'" href="#">Inserir Documento com Exame Realizado</a>
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
<template>
<div>
  <b-navbar id="navigator" type="dark" class="navbar" :class="{ navbaropen: opened }">
      <span class="open-slide">
        <a href="#" @click="opened = !opened">
          <div>
            <div class="bar" :class="{ topopen: opened }"></div>
            <div class="bar" :class="{ midopen: opened }"></div>
            <div class="bar" :class="{ botopen: opened }"></div>
          </div>
        </a>
      </span>
      <b-navbar-brand tag="h1" class="mb-0" @click="initialPage">CardioApp</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>Bem Vindo {{username}}</b-nav-item>
        <b-nav-item class="navbar-nav" @click.prevent="signOut">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="side-menu" class="side-nav" :class="{ sidenavopen: opened }">
      <div class="list-group">
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.pa><a>Pacientes</a></div>
        <b-collapse id="pa" accordion="my-accordion" role="tabpanel">
          <a href="/profhealthcare/patients/consultPatients">Lista de Pacientes</a>
          <a href="/profhealthcare/patients/consultPatient">Consultar um determinado Paciente</a>
          <a href="/profhealthcare/patients/createPatient">Criar um Paciente</a>
          <a href="/profhealthcare/patients/removePatient">Remover um determinado Paciente</a>
          <a href="/profhealthcare/patients/updatePatient">Atualiza um determinado Paciente</a>
          <a href="/profhealthcare/patients/enrollPatient">Associar utente</a>
          <a href="/profhealthcare/patients/unrollPatient">Dessassociar utente</a>
          <a href="/profhealthcare/patients/sendEmailPatientUser">Enviar uma mensagem a um Paciente</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.me><a>Medicamentos</a></div>
        <b-collapse id="me" accordion="my-accordion" role="tabpanel">
          <a href="/profhealthcare/medicines/consultMedicines">Lista de Medicamentos</a>
          <a href="/profhealthcare/medicines/consultMedicine">Consultar um determinado Medicamento</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.ex><a>Exercicios de Reabilitação Cardiaca</a></div>
        <b-collapse id="ex" accordion="my-accordion" role="tabpanel">
          <a href="/profhealthcare/exercises/consultExercises">Lista de Exercicios de Reabilitação Cardiaca</a>
          <a href="/profhealthcare/exercises/consultExercise">Consultar um determinado Exercicio de Reabilitação Cardiaca</a>
          <a href="/profhealthcare/exercises/createExercise">Criar um Exercicio de Reabilitação Cardiaca</a>
          <a href="/profhealthcare/exercises/deleteExercise">Remover um determinado Exercicio de Reabilitação Cardiaca</a>
          <a href="/profhealthcare/exercises/updateExercise">Atualiza um determinado Exercicio de Reabilitação Cardiaca</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.pr><a>Programas de Reabilitação Cardiaca</a></div>
        <b-collapse id="pr" accordion="my-accordion" role="tabpanel">
          <a href="/profhealthcare/programs/consultPrograms">Lista de Programas de Reabilitação Cardiaca</a>
          <a href="/profhealthcare/programs/consultProgram">Consultar um determinado Programa de Reabilitação Cardiaca</a>
          <a href="/profhealthcare/programs/createProgram">Criar um Programa de Reabilitação Cardiaca</a>
          <a href="/profhealthcare/programs/deleteProgram">Remover um Programa de Reabilitação Cardiaca</a>
          <a href="/profhealthcare/programs/updateProgram">Atualizar um Programa de Reabilitação Cardiaca</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.pp><a>Prescrições de Programas de Reabilitação Cardiaca</a></div>
        <b-collapse id="pp" accordion="my-accordion" role="tabpanel">
          <a href="/profhealthcare/prescriptions/consultPrescription">Consultar uma determinada Prescrição</a>
          <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.pe><a>Prescrições de Exercicio</a></div>
          <b-collapse id="pe" accordion="my-accordion-2" role="tabpanel">
            <a href="/profhealthcare/prescriptions/prescription-exercises/createPrescription">Criar uma nova prescrição</a>
            <a href="/profhealthcare/prescriptions/prescription-exercises/updateDurationPrescription">Atualizar a duração de uma determinada prescrição</a>
          </b-collapse>
          <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.pm><a>Prescrições Medicas</a></div>
          <b-collapse id="pm" accordion="my-accordion-2" role="tabpanel">
            <a href="/profhealthcare/prescriptions/prescription-medics/createPrescription">Criar uma nova prescrição</a>
            <a href="/profhealthcare/prescriptions/prescription-medics/updateDurationPrescription">Atualizar a duração de uma determinada prescrição</a>
          </b-collapse>
          <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.pn><a>Prescrições de Nutrição</a></div>
          <b-collapse id="pn" accordion="my-accordion-2" role="tabpanel">
            <a href="/profhealthcare/prescriptions/prescription-nutris/createPrescription">Criar uma nova prescrição</a>
            <a href="/profhealthcare/prescriptions/prescription-nutris/updateDurationPrescription">Atualizar a duração de uma determinada prescrição</a>
          </b-collapse>
        </b-collapse>
      </div>
    </div>
    <br><br>
</div>
</template>

<script>
export default {
    name: 'navBarProfH',
    data(){
      return {
        opened: false
      }
    },
    computed: {
      username(){
        return this.$auth.user.sub
      }
    },
    created(){
      if(!this.$auth.user)
      {
        this.$router.push('/')
      }
      if(!this.$auth.user.groups.includes('ProfHealthcare'))
      {
        if(this.$auth.user.groups.includes('PatientUser'))
        {
          this.$router.push('/patients')
        }
        if(this.$auth.user.groups.includes('Admin'))
        {
          this.$router.push('/admin')
        }
      }
    },
    methods: {
      initialPage(){
        this.$router.push('/profhealthcare')
      },
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      }
    }
}
</script>
<style scoped>
.navbar{
  background-color: #3b5998;
  overflow: hidden;
  height: 80px;
}

.navbaropen{
  background-color: #3b5998;
  overflow: hidden;
  height: 80px;
  margin-left: 15%;
}

.navbar a{
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar ul{
  margin: 8px 0 0 0;
  list-style: none;
}

.navbar a:hover{
  background-color: #ddd;
  color: #000;
}

.side-nav{
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.sidenavopen{
  height: 100%;
  width: 15%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.side-nav a{
  padding: 10px 10px 10px 30px;
  text-decoration: none;
  font-size: 22px;
  color: #ccc;
  display: block;
  transition: 0.3s;
}

.side-nav a:hover{
  color: #fff;
}

.side-nav .btn-close{
  position: absolute;
  top: 0;
  right: 22px;
  font-size: 36px;
  margin-left: 50px;
}

#main{
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
}

.mainopen{
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  margin-left: 250px;
}

nav{
  transition: margin-left 0.3s;
}

.bar{
  display: block;
  height: 5px;
  width: 35px;
  background: #000;
  margin: 5px auto;
}

.midopen{
  width: 0;
}
.bar{
  transition: all .3s ease;
}
.topopen{
  transform: translateY(10px) rotateZ(45deg);
}
.botopen{
  transform: translateY(-10px) rotateZ(-45deg);
}
</style>

<template>
<div id="allTheNav">
    <b-navbar id="navigator" type="dark" :class="{ navbaropen: opened }">
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
        <b-nav-item @click.prevent="signOut">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="side-menu" class="side-nav" :class="{ sidenavopen: opened }">
      <div class="list-group">
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.pa><a>Pacientes</a></div>
        <b-collapse id="pa" accordion="my-accordion" role="tabpanel">
          <a href="/admin/patients/">Lista de Pacientes</a>
          <a href="/admin/patients/consultPatient">Consultar um determinado Paciente</a>
          <a href="/admin/patients/sendEmailPatientUser">Enviar uma mensagem a um paciente</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.ps><a>Profissionais de Saude</a></div>
        <b-collapse id="ps" accordion="my-accordion" role="tabpanel">
          <a href="/admin/healthcares/">Lista de Profissionais de Saude</a>
          <a href="/admin/healthcares/consultHealthcare">Consultar um determinado Profissional de Saude</a>
          <a href="/admin/healthcares/createHealthcare">Criar um Profissional de Saude</a>
          <a href="/admin/healthcares/sendEmailProfHealthcare">Enviar uma mensagem a um profissional de saude</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.ad><a>Administradores</a></div>
        <b-collapse id="ad" accordion="my-accordion" role="tabpanel">
          <a href="/admin/admins">Lista de Admins</a>
          <a href="/admin/consultAdmin">Consultar um determinado Admin</a>
          <a href="/admin/admins/createAdmin">Criar um Admin</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.tdd><a>Tipos de dados</a></div>
        <b-collapse id="tdd" accordion="my-accordion" role="tabpanel">
          <a href="/admin/typeOfData">Lista de Tipos de Dados</a>
          <a href="/admin/typeOfData/create">Criar um Tipo de Dados</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.me><a>Medicamentos</a></div>
        <b-collapse id="me" accordion="my-accordion" role="tabpanel">
          <a href="/admin/medicines">Lista de Medicamentos</a>
          <a href="/admin/medicines/consultMedicine">Consultar um determinado Medicamento</a>
          <a href="/admin/medicines/createMedicine">Criar um Medicamento</a>
          <a href="/admin/medicines/removeMedicine">Remover um Medicamento</a>
        </b-collapse>
      </div>
    </div>
    <br><br>
</div>
</template>

<script>
export default {
    name: 'navBarAdmin',
    data(){
      return {
        opened: false
      }
    },
    computed: {
      username(){
        return this.$auth.user.sub
      },
      textDrop(){
        return "Bem Vindo" + this.username
      }
    },
    created(){
      if(!this.$auth.user)
      {
        this.$router.push('/')
      }
      if(!this.$auth.user.groups.includes('Admin'))
      {
        if(this.$auth.user.groups.includes('ProfHealthcare'))
        {
          this.$router.push('/profhealthcare')
        }
        if(this.$auth.user.groups.includes('PatientUser'))
        {
          this.$router.push('/patients')
        }
      }
    },
    methods: {
      initialPage(){
        this.$router.push('/admin')
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

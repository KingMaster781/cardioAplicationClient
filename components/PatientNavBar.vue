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
        <b-nav-item class="navbar-nav">Bem Vindo {{username}}</b-nav-item>
        <b-nav-item class="navbar-nav" @click.prevent="signOut">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="side-menu" class="side-nav" :class="{ sidenavopen: opened }">
      <div class="list-group">
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.pr><a>Prescrições</a></div>
        <b-collapse id="pr" accordion="my-accordion" role="tabpanel">
          <a href="/patients/prescriptions/consultPrescription">Consultar uma determinada prescrição</a>
          <a href="/patients/prescriptions/consultPrescriptions">Consultar todas prescrições</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.ps><a>Profissionais de Saude</a></div>
        <b-collapse id="ps" accordion="my-accordion" role="tabpanel">
          <a href="/patients/profhealthcare/consultProfhealthcares">Consultar profissionais de saúde</a>
          <a href="/patients/profhealthcare/sendEmailProfHealthcare">Consultar profissionais de saúde</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.db><a>Dados Biomédicos</a></div>
        <b-collapse id="db" accordion="my-accordion" role="tabpanel">
          <a href="#">Consultar Dados Biomédicos</a>
          <a href="#">Consultar Dados Biomédicos por um determinado tipo</a>
          <a href="#">Inserir Dados Biomédicos</a>
          <a href="#">Inserir Documento com Dados Biomédicos</a>
        </b-collapse>
        <div onmouseover="this.style.background='gray';" onmouseout="this.style.background='black'" block v-b-toggle.ex><a>Exames</a></div>
        <b-collapse id="ex" accordion="my-accordion" role="tabpanel">
          <a href="#">Consultar Exames</a>
          <a href="#">Consultar Exames Realizados</a>
          <a href="#">Inserir Documento com Exame Realizado</a>
        </b-collapse>
      </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'navBarPatient',
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
      if(!this.$auth.user.groups.includes('PatientUser'))
      {
        if(this.$auth.user.groups.includes('ProfHealthcare'))
        {
          this.$router.push('/profhealthcare')
        }
        if(this.$auth.user.groups.includes('Admin'))
        {
          this.$router.push('/admin')
        }
      }
    },
    methods: {
      initialPage(){
        this.$router.push('/patients')
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

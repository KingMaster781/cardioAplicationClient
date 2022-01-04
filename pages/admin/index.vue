<template>
    <div>
      <admin-nav-bar/>
       <div>
         <div>
         <button class="btn btn-secondary btn-lg btn-block" @click.prevent="admins">Admins</button>
       </div>
       <br>
       <div>
         <button class="btn btn-secondary btn-lg btn-block" @click.prevent="healthcare">Médicos</button>
       </div>
       <br>
       <div>
         <button class="btn btn-secondary btn-lg btn-block" @click.prevent="patient">Pacientes</button>
       </div>
       <br>
       <div>
         <button class="btn btn-secondary btn-lg btn-block" @click.prevent="medicamentos">Medicamentos</button>
       </div>
       <br>
       <div>
         <button class="btn btn-secondary btn-lg btn-block" @click.prevent="medicos">Tipos de dados</button>
       </div>
       <br>
      </div>
    </div>
 </template>

<script>
  export default {
    methods: {
      signOut(){
        this.$auth.logout()
        this.$router.push('/')
      },
      healthcare(){
        this.$router.push('/admin/healthcares')
      },
      patient(){
        this.$router.push('/admin/patients')
      },
      medicos(){
        this.$router.push('/admin/typeOfData')
      },
      medicamentos(){
        this.$router.push('/admin/medicines')
      },
      admins(){
        this.$router.push('/admin/admins')
      }
    }
  }
</script>

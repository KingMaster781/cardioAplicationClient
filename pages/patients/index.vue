<template>
    <div>
      <patient-nav-bar/>
       <div>
       <div>
         <button class="btn btn-secondary btn-lg btn-block" @click.prevent="dados">Dados</button>
       </div>
       <br>
       <div>
         <button class="btn btn-secondary btn-lg btn-block" @click.prevent="precricoes">Prescrições</button>
       </div>
       <br>
       <div>
         <button class="btn btn-secondary btn-lg btn-block" @click.prevent="medicos">Médicos</button>
       </div>
       <br>
      </div>
    </div>
 </template>

<script>
  export default {
    methods: {
      dados(){
        this.$router.push('/patients/patientData')
      },
      precricoes(){
        this.$router.push('/patients/prescriptions')
      },
      medicos(){
        this.$router.push('/patients/profhealthcare')
      }
    }
  }
</script>
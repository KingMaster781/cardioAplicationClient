<template>
  <div>
    <patient-nav-bar />
    <br />
    <b-container>
      <h2>Detalhes da Mensagen de {{ mail.userFrom }}</h2>
      <br>
      <p>Cabeçalho: {{ mail.subject }}</p>
      <p>Mensagem:</p>
      <div> 
        {{ mail.message }}
      </div>
      <br>
      <b-button
            class="btn btn-info btn-lg btn-block"
            v-on:click="responde"
      >
        Responder a mensagem <fa :icon="['fas', 'info-circle']" />
      </b-button> 
      <br>
       <b-button
            class="btn btn-danger btn-lg btn-block"
            v-on:click="deleteMsg"
       >
        Apagar mensagem <fa :icon="['fas', 'times-circle']" />
       </b-button>
      <br>
      <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p> 
    </b-container>
  </div>
</template>

<script>
import PatientNavBar from "../../../components/PatientNavBar.vue";
export default {
  components: { PatientNavBar },
  data() {
    return {
      mail: {},
    };
  },
  computed: {
    code() {
        return this.$route.params.code;
    },
    username() {
        return this.$auth.user.sub
    }
  },
  created() {
    this.$axios
      .$get("/api/profhealthcares/" + this.username + "/email/receive/" + this.code) 
      .then((mail) => {
          console.log(mail)
        this.mail = mail;
      });
  },
  methods: {
      responde(){
          this.$router.push('/profhealthcare/patients/sendEmailPatientUser')
      },

      deleteMsg(){
          this.$axios.delete('api/profhealthcares/' + this.username + '/email/delete/' + this.code)
            .then(()=>{
                this.$toast.success('Eliminou o email com sucesso').goAway(3000)
                this.$router.push('/profhealthcare/mails/mailsReceive')
            })
            .catch(()=>{
                this.$toast.error('Não foi possivel eliminar o seu email').goAway(3000)
            })
      }
  },
};
</script>

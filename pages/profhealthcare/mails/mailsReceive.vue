<template>
    <div>
      <prof-health-nav-bar/>
      <br><br>
       <b-container>
        <h2>Mensagens Recebidas</h2>
        <br>
        <b-table v-if="mails.length" striped over :items="mails" :fields="fields">
          <template v-slot:cell(actions)="row">
            <b-button
                    variant="info"
                    :to="`/profhealthcare/mails/${row.item.code}`"
                >
                <fa :icon="['fas', 'info-circle']" />
            </b-button>
            <b-button variant="danger" v-on:click="removeMessage(row.item.code)">
                <fa :icon="['fas', 'times-circle']" />
            </b-button>
          </template>
        </b-table>
        <h6 v-else>Não possui Mensagens</h6>
        <br>
        <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
    </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            fields: ['code', , 'userFrom', 'subject', 'actions'],
            mails: [],
        }
    },

    computed: {
        username(){
            return this.$auth.user.sub
        }
    },

    created(){
        this.$axios.get('api/profhealthcares/' + this.username + '/email/receive')
        .then((mail)=>{
            this.mails=mail.data
        })
    },

    methods: {
        removeMessage(code)
        {
            this.$axios.delete('api/profhealthcares/' + this.username + '/email/delete/' + code)
            .then(()=>{
                this.$toast.success('Eliminou o email com sucesso').goAway(3000)
            })
            .catch(()=>{
                this.$toast.error('Não foi possivel eliminar o seu email').goAway(3000)
            })
        }
    }
  }
</script>
<template>
  <div>
    <prof-health-nav-bar />
    <b-container>
      <form @submit.prevent="create">
        <b-form-group
          id="isDoneForm"
          label-for="descriData"
        >
          <b-form-radio v-model="isDone" name="some-radios" value="true">Concluido</b-form-radio>
          <b-form-radio v-model="isDone" name="some-radios" value="false">Não Concluido</b-form-radio>
        </b-form-group>
        <p v-show="errorMsg" class="text-danger">
          {{ errorMsg }}
        </p>
        <button class="btn btn-primary" @click.prevent="create">Atualizar</button>
        <br />
        <p align="center">
          <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
        </p>
      </form>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: null,
      dateResult: null,
      isDone: null,
    };
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    create() {
        const today = new Date();
        if(this.isDone == true){
            this.dateResult = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
        } else {
            this.dateResult = null;
        }
    this.$axios
      .$put("/api/data/" + this.$route.params.code, {
        code: this.$route.params.code,
        dateResult: this.dateResult,
        isDone: this.isDone,
        patientUsername: this.$route.params.username,
      })
      .then(() => {
        this.$router.push('/profhealtcare/' + this.$route.params.username + '/exams/')
      })
      .catch((error) => {
        this.errorMsg = error.response.data;
      });
  },
  },
};
</script>
<template>
  <div>
    <prof-health-nav-bar />
    <b-container>
      <form @submit.prevent="create">
          <b-form-group
          id="code"
          label-for="code"
        >
          <b-input v-model.trim="code" type="number" placeholder="Insere o código do exame" />
        </b-form-group>
        <p v-show="errorMsg" class="text-danger">
          {{ errorMsg }}
        </p>
        <button class="btn btn-primary" @click.prevent="create">CREATE</button>
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
      errorMsg: false,
    };
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    dataTypes(){
        return this.dataType;
    },
    create() {
    const today = new Date();
    this.$axios
      .$post("/api/exams/", {
        code: this.code,
        date: (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear(),
        dateResult: null,
        isDone: false,
        patientUsername: this.$route.params.username,
      })
      .then(() => {
        this.$router.push('/profhealthcare/patients/' + this.$route.params.username + '/exams/')
      })
      .catch((error) => {
        this.errorMsg = error.response.data;
      });
  },
  },
};
</script>
<template>
  <div>
    <admin-nav-bar />
    <b-container>
      <form @submit.prevent="create">
        <b-form-group
          id="isDoneForm"
          label-for="descriData"
        >
          <b-form-radio v-model="isDone" :aria-describedby="ariaDescribedby" name="some-radios" value="true">Concluido</b-form-radio>
          <b-form-radio v-model="isDone" :aria-describedby="ariaDescribedby" name="some-radios" value="false">Não Concluido</b-form-radio>
        </b-form-group>
        <p v-show="errorMsg" class="text-danger">
          {{ errorMsg }}
        </p>
        <button class="btn btn-primary" @click.prevent="create">Atualizar</button>
        <br />
        <nuxt-link :to="`/admin/patients/${this.$route.params.username}`"
          >Back</nuxt-link
        >
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
            this.dateResult = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
        this.$router.push('/admin/patients')
      })
      .catch((error) => {
        this.errorMsg = error.response.data;
      });
  },
  },
};
</script>

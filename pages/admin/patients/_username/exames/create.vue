<template>
  <div>
    <admin-nav-bar />
    <b-container>
      <form @submit.prevent="create">
          <b-form-group
          id="code"
          label-for="code"
        >
          <b-input v-model.trim="code" type="number" placeholder="Insere o código dos dados" />
        </b-form-group>
        <p v-show="errorMsg" class="text-danger">
          {{ errorMsg }}
        </p>
        <button class="btn btn-primary" @click.prevent="create">CREATE</button>
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
        date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
        dateResult: null,
        isDone: false,
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

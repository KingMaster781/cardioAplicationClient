<template>
  <div>
    <prof-health-nav-bar />
    <br /><br />
    <b-container>
      <h2>Atualizar um determinado Exercício Fisico</h2>
      <br />
      <form @submit.prevent="create" :disabled="!isFormValid">
        <b-form-group
          id="name"
          description="O nome é necessário"
          label-for="name"
          :invalid-feedback="invalidNameFeedback"
          :state="isNameValid"
        >
          <b-input
            v-model.trim="name"
            :state="isNameValid"
            required
            placeholder="Insira o nome do exercício"
          />
        </b-form-group>
        <b-form-group
          id="desc"
          description="A descrição do exercício é necessária"
          label-for="desc"
          :invalid-feedback="invalidDescFeedback"
          :state="isDescValid"
        >
          <b-input
            v-model.trim="desc"
            :state="isDescValid"
            placeholder="Insira a descrição do exercício"
          />
        </b-form-group>
        <p v-show="errorMsg" class="text-danger">
          {{ errorMsg }}
        </p>
        <button
          class="btn btn-primary btn-lg btn-block"
          @click.prevent="update"
          :disabled="!isFormValid"
        >
          Atualizar
        </button>
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
      name: null,
      desc: null,
      errorMsg: false,
    };
  },
  created() {
    this.$axios.$get("/api/exercise/" + this.$route.params.code).then((exercises) => {
      this.desc = exercises.descExercise;
      this.name = exercises.name;
    });
  },
  computed: {
    invalidNameFeedback() {
      if (!this.name) {
        return null;
      }
      let nameLen = this.name.length;
      if (nameLen < 3 || nameLen > 25) {
        return false;
      }
      return "";
    },

    isNameValid() {
      if (!this.invalidNameFeedback === null) {
        return null;
      }
      return this.invalidNameFeedback === "";
    },

    invalidDescFeedback() {
      if (!this.desc) {
        return null;
      }
      let descLen = this.desc.length;
      if (descLen < 3 || descLen > 255) {
        return false;
      }
      return "";
    },

    isDescValid() {
      if (!this.invalidDescFeedback === null) {
        return null;
      }
      return this.invalidDescFeedback === "";
    },

    isFormValid() {
      if (!this.isNameValid) {
        return false;
      }
      if (!this.isDescValid) {
        return false;
      }
      return true;
    },
  },

  methods: {
    update() {
      this.$axios
        .$put("/api/exercise/" + this.$route.params.code, {
          name: this.name,
          descExercise: this.desc,
        })
        .then(() => {
          this.$router.push("/profhealthcare/exercises");
        })
        .catch((error) => {
          this.errorMsg = error.response.data;
        });
    },

    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
  },
};
</script>

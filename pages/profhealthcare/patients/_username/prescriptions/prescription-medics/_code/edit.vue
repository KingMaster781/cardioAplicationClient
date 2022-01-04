<template>
  <div>
    <prof-health-nav-bar />
    <b-container>
      <h2>Atualiza uma determinada Prescrição Médica</h2>
      <br />
      <form @submit.prevent="create" :disabled="!isFormValid">
        <b-form-group
          id="duracao"
          description="A duração é necessária"
          label-for="duracao"
          :invalid-feedback="invalidCodeFeedback"
          :state="isCodeValid"
        >
          <b-input
            v-model.trim="duracao"
            :state="isDuracaoValid"
            required
            placeholder="Insira a duração da prescrição em dias"
          />
        </b-form-group>
        <p v-show="errorMsg" class="text-danger">
          {{ errorMsg }}
        </p>
        <button
          class="btn btn-primary btn-lg btn-block"
          @click.prevent="analiseUpdateisPermited"
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
      duracao: null,
      errorMsg: false,
    };
  },

  computed: {
    invalidDuracaoFeedback() {
      if (!this.duracao) {
        return null;
      }
      if (this.duracao < 0) {
        return "A duração tem que ser superior ou igual a 0";
      }
      return "";
    },

    isDuracaoValid() {
      if (!this.invalidDuracaoFeedback === null) {
        return null;
      }
      return this.invalidDuracaoFeedback === "";
    },

    isFormValid() {
      if (!this.isDuracaoValid) {
        return false;
      }
      return true;
    },
  },

  methods: {
    analiseUpdateisPermited() {
      this.$axios
        .$get("/api/prescription-medics/" + this.$route.params.code)
        .then((prescription) => {
          if (prescription.vigor === "Está em vigor") {
            this.update();
          } else {
            this.errorMsg = "Esta prescrição já não se encontra em vigor";
          }
        })
        .catch((error) => {
          this.errorMsg = error.response.data;
        });
    },
    update() {
      this.$axios
        .$put("/api/prescription-medics/" + this.$route.params.code, {
          duracao: this.duracao,
        })
        .then(() => {
          this.$router.push("/profhealthcare/patients/" + this.$route.params.username);
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

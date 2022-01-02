<template>
  <div>
    <admin-nav-bar />
    <b-container>
        <b-form-group
          id="codeForm"
          label-for="code"
        >
          <b-input v-model.trim="code" placeholder="Código do tipo de dados" />
        </b-form-group>
      <form @submit.prevent="create">
        <b-form-group
          id="descTypeForm"
          label-for="descType"
        >
          <b-input
            v-model.trim="descType"
            placeholder="Descrição do tipo de dados"
          />
        </b-form-group>
        <b-form-group
          id="unidadeValorQuantitativoForm"
          label-for="unidadeValorQuantitativo"
        >
          <b-input
            v-model.trim="unidadeValorQuantitativo"
            placeholder="Unidade de valor dos dados"
          />
        </b-form-group>
        <b-form-group
          id="valorMaximoForm"
          label-for="valorMaximo"
        >
          <b-input
            v-model.trim="valorMaximo"
            type="number"
            placeholder="Valor Máximo dos dados"
          />
        </b-form-group>
        <b-form-group
          id="valorMinimoForm"
          label-for="valorMinimo"
        >
          <b-input
            v-model.trim="valorMinimo"
            type="number"
            placeholder="Valor Minimo dos dados"
          />
        </b-form-group>
        <p v-show="errorMsg" class="text-danger">
          {{ errorMsg }}
        </p>
        <button class="btn btn-primary" @click.prevent="create">CREATE</button>
        <br />
        <nuxt-link :to="`/admin/typeOfData`"
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
      descType: null,
      unidadeValorQuantitativo: null,
      valorMaximo: null,
      valorMinimo: null,
      errorMsg: false
    };
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    create() {
    this.$axios
      .$post("/api/typeofdata/", {
          code: this.code,
        descType: this.descType,
        unidadeValorQuantitativo: this.unidadeValorQuantitativo,
        valorMaximo: this.valorMaximo,
        valorMinimo: this.valorMinimo,
      })
      .then(() => {
        this.$router.push('/admin/typeOfData')
      })
      .catch((error) => {
        this.errorMsg = error.response.data;
      });
  },
  },
};
</script>

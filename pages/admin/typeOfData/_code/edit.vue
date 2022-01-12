<template>
  <div>
    <admin-nav-bar />
    <b-container>

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
        <button class="btn btn-primary" @click.prevent="create">Atualizar</button>
        <br />
        <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
      </form>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      descType: null,
      unidadeValorQuantitativo: null,
      valorMaximo: null,
      valorMinimo: null,
      errorMsg: false
    };
  },
  created() {
      this.$axios
      .$get("/api/typeofdata/" + this.$route.params.code)
      .then((datas) => {
        this.descType = datas.descType,
        descTypeForm.value = this.descType,
        this.unidadeValorQuantitativo = datas.unidadeValorQuantitativo,
        unidadeValorQuantitativoForm.value = this.unidadeValorQuantitativo,
        this.valorMaximo = datas.valorMaximo,
        valorMaximoForm.value = this.valorMaximo,
        this.valorMinimo = datas.valorMinimo,
        valorMinimoForm.value = this.valorMinimo
        
      })
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    create() {
    this.$axios
      .$put("/api/typeofdata/" + this.$route.params.code, {
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

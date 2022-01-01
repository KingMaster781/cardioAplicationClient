<template>
  <div>
    <admin-nav-bar/>
    <b-container>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Descrição">
          <b-input v-model="typeOfData.descType" name="descType" />
        </b-form-group>
        <b-form-group label="Valor Minimo">
          <b-input type="number" v-model="typeOfData.valorMinimo" name="valorMinimo" />
        </b-form-group>
        <b-form-group label="Valor Máximo">
          <b-input type="number" v-model="typeOfData.valorMaximo" name="valorMaximo" />
        </b-form-group>
        <b-form-group label="Unidade de valor Quantitativa (ºC, ºF, ...)">
          <b-input v-model="typeOfData.unidadeValorQuantitativo" name="unidadeValorQuantitativo" />
        </b-form-group>
        <b-button @click="criar" class="btn btn-primary btn-lg btn-block">Criar</b-button>
        <br>
        <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
        <br />
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
      return{
        typeOfData: {}
      }
  },
  methods: {
    criar() {
      this.$axios.$post(`/api/typeofdata/`, this.typeOfData).then((result) => {
        this.$toast.success(`Tipo de dados criado com sucesso`).goAway(3000);
      });
    },
  },
};
</script>

<template>
  <div>
    <prof-health-nav-bar/>
    <b-container>
      <form @submit.prevent="create">
        <b-form-group
          id="descriDataForm"
          label-for="descriData"
        >
          <b-input v-model.trim="descriData" placeholder="Insere uma pequena descrição dos dados" />
        </b-form-group>
        <b-form-group
          id="valueForm"
          label-for="value"
        >
          <b-input
            v-model.trim="value"
            type="number"
            placeholder="Valor dos dados"
          />
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
      insertionDate: null,
      descriData: null,
      value: null,
      type: null,
      errorMsg: false,
      dataType: [{}],
    };
  },
  created() {
      this.$axios.$get("/api/typeofdata/").then((dataTypes) => {
        this.dataType = dataTypes;
      });
      this.$axios
      .$get("/api/data/" + this.$route.params.code)
      .then((datas) => {
        this.code = datas.code,
        this.insertionDate = datas.insertionDate,
        this.descriData = datas.descriData,
        descriDataForm.value = this.code,
        this.value = datas.value,
        valueForm.value = this.value,
        this.type = datas.type
      })
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    create() {
    this.$axios
      .$put("/api/data/" + this.$route.params.code, {
          code: this.$route.params.code,
        insertionDate: this.insertionDate,
        descriData: this.descriData,
        value: this.value,
        type: this.type,
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

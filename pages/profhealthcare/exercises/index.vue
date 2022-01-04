<template>
  <div>
    <prof-health-nav-bar />
    <br /><br />
    <b-container>
      <h2>Consultar todos os Exercícios Fisicos</h2>
      <br />
      <b-button
        variant="success"
        style="float: right"
        :to="`/profhealthcare/exercises/createExercise`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <b-table striped over :items="exercises" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/profhealthcare/exercises/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/profhealthcare/exercises/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" @click="remove(row.item.code)" />
          </b-button>
        </template>
      </b-table>
      <p align="center">
        <a class="primary" @click="$router.go(-1)">Voltar a Trás</a>
      </p>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["code", "name", "descExercise", "actions"],
      exercises: [],
    };
  },
  created() {
    this.$axios.$get("api/exercise/").then((exercise) => {
      this.exercises = exercise;
    });
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    remove(item){
            this.$axios.$delete('/api/exercise/' + item)
                .then(() => {
                    this.$router.push('/profhealthcare/exercises')
                })
                .catch((error) => {
                    this.errorMsg = error.response.data
                })
        },
  },
};
</script>

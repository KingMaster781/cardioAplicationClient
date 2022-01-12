<template>
  <div>
    <prof-health-nav-bar />
    <div>
      <div>
        <button
          class="btn btn-secondary btn-lg btn-block"
          @click.prevent="pacientes"
        >
          Pacientes
        </button>
      </div>
      <br />
      <div>
        <button
          class="btn btn-secondary btn-lg btn-block"
          @click.prevent="medicamentos"
        >
          Medicamentos
        </button>
      </div>
      <br />
      <div>
        <button
          class="btn btn-secondary btn-lg btn-block"
          @click.prevent="exercises"
        >
          Exercicios de reabilitação cardiaca
        </button>
      </div>
      <br />
      <div>
        <button
          class="btn btn-secondary btn-lg btn-block"
          @click.prevent="programs"
        >
          Programas de reabilitação cardiaca
        </button>
      </div>
      <br />
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    medicamentos() {
      this.$router.push("/profhealthcare/medicines/consultMedicines");
    },
    pacientes() {
      this.$router.push("/profhealthcare/patients");
    },
    exercises() {
      this.$router.push("/profhealthcare/exercises");
    },
    programs() {
      this.$router.push("/profhealthcare/programs");
    },
  },
  created() {
    this.$axios
      .$put("/api/prescriptions/update", {})
      .then();
  },
};
</script>

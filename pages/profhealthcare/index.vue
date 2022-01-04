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
      </div>
  </div>
</template>

<script>
import ProfHealthNavBar from "../../components/ProfHealthNavBar.vue";
export default {
  methods: {
    medicamentos() {
      this.$router.push("/profhealthcare/medicines/consultMedicines");
    },
    pacientes() {
      this.$router.push("/profhealthcare/patients");
    },
  },
  created() {
    this.$axios
      .$put("/api/prescriptions/update", {})
      .then(console.log("success"))
      .catch(console.log("failed"));
  },
};
</script>

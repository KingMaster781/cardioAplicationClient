<template>
  <div>
    <prof-health-nav-bar />
    <br /><br />
    <b-container>
      <h2>Consultar Detalhes do Paciente {{ patient.username }}</h2>
      <br />
      <h4>Detalhes do Paciente:</h4>
      <p>Username: {{ patient.username }}</p>
      <p>Nome: {{ patient.name }}</p>
      <p>Email: {{ patient.email }}</p>
      <p><nuxt-link
        :to="`/profhealthcare/patients/${$route.params.username}/dados`"
        >Ver dados biométricos do paciente</nuxt-link
      ></p>
      <p><nuxt-link
        :to="`/profhealthcare/patients/${$route.params.username}/exams`"
        >Ver exames do paciente</nuxt-link
      ></p>
      <h5>Lista de Profissionais de Saude que seguem este paciente:</h5>
      <b-table
        v-if="profHealthcares.length"
        striped
        over
        :items="profHealthcares"
        :fields="fieldProfHealthcare"
      />
      <br />
      <h5>Prescrições de Exercicios:</h5>
      <b-button
        variant="success"
        :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-exercises/createPrescription`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <br />
      <b-table
        v-if="prescriptionsExercise.length"
        striped
        over
        :items="prescriptionsExercise"
        :fields="fieldsExercise"
      >
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-exercises/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-exercises/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" @click="removeExer(row.item.code)" />
          </b-button>
        </template>
      </b-table>
      <h6 v-else>Não possui prescrições de exercicios</h6>
      <br />
      <h5>Prescrições Médicas:</h5>
      <b-button
        variant="success"
        :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-medics/createPrescription`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <br />
      <b-table
        v-if="prescriptionsMedics.length"
        striped
        over
        :items="prescriptionsMedics"
        :fields="fieldsMedics"
      >
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-medics/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-medics/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" @click="removeMed(row.item.code)" />
          </b-button>
        </template>
      </b-table>
      <h6 v-else>Não possui prescrições médicas</h6>
      <br />
      <h5>Prescrições de Nutrição:</h5>
      <b-button
        variant="success"
        :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-nutris/createPrescription`"
        >Criar novo registo
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <b-table
        v-if="prescriptionsNutris.length"
        striped
        over
        :items="prescriptionsNutris"
        :fields="fieldsNutris"
      >
        <template v-slot:cell(actions)="row">
          <b-button
            variant="info"
            :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-nutris/${row.item.code}`"
          >
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/profhealthcare/patients/${$route.params.username}/prescriptions/prescription-nutris/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" @click="removeNut(row.item.code)" />
          </b-button>
        </template>
      </b-table>
      <h6 v-else>Não possui prescrições de nutrição</h6>
      <br />
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
      patient: {},
      fieldpatient: ["username", "password", "name", "email", "actions"],
      fieldProfHealthcare: ["username", "name", "email"],
      fieldsExercise: [
        "code",
        "duracao",
        "insertionDate",
        "vigor",
        "programCode",
        "actions",
      ],
      fieldsMedics: ["code", "duracao", "insertionDate", "vigor", "actions"],
      fieldsNutris: [
        "code",
        "duracao",
        "insertionDate",
        "vigor",
        "descNutri",
        "actions",
      ],
    };
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    profHealthcares() {
      return this.patient.profHealthcareDTOList || [];
    },
    prescriptionsExercise() {
      return this.patient.prescriptionExerciseDTOList || [];
    },
    prescriptionsMedics() {
      return this.patient.prescriptionMedicDTOList || [];
    },
    prescriptionsNutris() {
      return this.patient.prescriptionNutriDTOList || [];
    },
  },
  created() {
    this.$axios
      .$get(`/api/patientusers/${this.username}`)
      .then((patient) => (this.patient = patient || {}));
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    removeExer(code) {
      this.$axios
        .$delete("api/prescription-exercises/" + code)
        .then(
          this.$axios
            .$get(`/api/patientusers/${this.username}`)
            .then((patient) => (this.patient = patient || {}))
        );
    },
    removeMed(code) {
      this.$axios
        .$delete("api/prescription-medics/" + code)
        .then(
          this.$axios
            .$get(`/api/patientusers/${this.username}`)
            .then((patient) => (this.patient = patient || {}))
        );
    },
    removeNut(code) {
      this.$axios
        .$delete("api/prescription-nutris/" + code)
        .then(
          this.$axios
            .$get(`/api/patientusers/${this.username}`)
            .then((patient) => (this.patient = patient || {}))
        );
    },
  },
};
</script>

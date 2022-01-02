<template>
  <div>
    <admin-nav-bar />
    <b-container>
      <h4>Dados Biométricos do Paciente:</h4>
      <p>Username: {{ patient.username }}</p>
      <p>Name: {{ patient.name }}</p>
      <p>Email: {{ patient.email }}</p>
      <br />
      <h5>Profissionais de Saude que trabalharam com o paciente</h5>
      <b-table
        striped
        over
        :items="profHealthcares"
        :fields="fieldProfHealthcare"
        ><template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/admin/healthcares/${row.item.username}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/admin/healthcares/${row.item.username}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
        </template>
      </b-table>
      <br />
      <div>
        <h5 style="float: left">Dados biométricos do cliente</h5>
        <b-button variant="success" style="float: right" :to="`/admin/patients/${$route.params.username}/dados/create`"
        >Criar novos dados
        <fa :icon="['fas', 'plus']" />
      </b-button>
      </div>
      <b-table striped over :items="data" :fields="fieldData">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/admin/patients/${$route.params.username}/dados/${row.item.code}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/admin/patients/${$route.params.username}/dados/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" @click="removeData(row.item.code)" />
          </b-button>
        </template>
      </b-table>
      <br />
      <div>
        <h5 style="float: left">Exames realizados pelo paciente</h5>
        <b-button variant="success" style="float: right" :to="`/admin/patients/${$route.params.username}/exames/create`"
        >Criar novo exame
        <fa :icon="['fas', 'plus']" />
      </b-button>
      </div>
      
      <b-table striped over :items="profHealthcares" :fields="fieldExam">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/admin/patients/${row.item.username}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/admin/patients/${row.item.username}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" />
          </b-button>
        </template>
      </b-table>
      <nuxt-link to="/admin/patients">Back</nuxt-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patient: {},
      data: {},
      exam: {},
      fieldProfHealthcare: ["username", "name", "email", "actions"],
      fieldData: [
        "code",
        "insertionDate",
        "descriData",
        "value",
        "typeOfDataCode",
        "actions",
      ],
      fieldExam: ["code", "date", "dateResult", "done", "actions"],
      fieldPrescription: [
        "code",
        "duracao",
        "insertionDate",
        "vigor",
        "programCode",
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
  },
  created() {
    this.$axios.$get(`/api/patientusers/${this.username}`).then((patient) => {
      this.patient = patient || {};
      this.$axios
        .$get("/api/data/patient/" + this.patient.username)
        .then((datas) => {
          this.data = datas;
        });
      this.$axios
        .$get("/api/exams/user/" + this.patient.username)
        .then((exams) => {
          this.exam = exams;
        });
    });
  },
  methods: {
    signOut() {
      this.$auth.logout();
      this.$router.push("/");
    },
    removeData(code) {
      this.$axios.$delete("api/data/" + code).then(
        this.$axios.$get("api/data/patient/" + this.patient.username).then((datas) => {
        this.data = datas;
      })
      );
    }
  },
};
</script>

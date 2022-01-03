<template>
  <div>
    <prof-health-nav-bar/>
    <b-container>
      <h4>Detalhes do Paciente: {{ patient.username}}</h4>
      <br>
      <p>Username: {{ patient.username }}</p>
      <p>Name: {{ patient.name }}</p>
      <p>Email: {{ patient.email }}</p>
      <br>
      <h5>Dados biométricos do cliente</h5>
      <br>
      <b-table v-if="data.length" striped over :items="data" :fields="fieldData">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/profhealthcare/patients/${$route.params.username}/dados/${row.item.code}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/profhealthcare/patients/${$route.params.username}/dados/${row.item.code}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" @click="removeData(row.item.code)" />
          </b-button>
        </template>
      </b-table>
      <h6 v-else>Ainda não possui dados</h6>
      <br>
      <b-button class="btn btn-success btn-lg btn-block" :to="`/profhealthcare/patients/${$route.params.username}/dados/create`"
          >Criar novos dados
          <fa :icon="['fas', 'plus']" />
        </b-button>
      <br>   
      <h5>Exames realizados pelo paciente</h5>
      <br>
      <b-table v-if="exam.length" striped over :items="exam" :fields="fieldExam">
        <template v-slot:cell(actions)="row">
          <b-button variant="info" :to="`/profhealthcare/patients/${row.item.username}`">
            <fa :icon="['fas', 'info-circle']" />
          </b-button>
          <b-button
            variant="primary"
            :to="`/profhealthcare/patients/${row.item.username}/edit`"
          >
            <fa :icon="['fas', 'pen']" />
          </b-button>
          <b-button variant="danger">
            <fa :icon="['fas', 'trash']" />
          </b-button>
        </template>
      </b-table>
      <h6 v-else>Ainda não possui exames</h6>
      <br>
      <b-button class="btn btn-success btn-lg btn-block" :to="`/profhealthcare/patients/${$route.params.username}/exames/create`"
        >Criar novo exame
        <fa :icon="['fas', 'plus']" />
      </b-button>
      <br>
      <h5>Prescrições de Exercicios:</h5>
        <b-table v-if="prescriptionsExercise.length" striped over :items="prescriptionsExercise" :fields="fieldsExercise">
            <template v-slot:cell(actions)="row">
                <b-button
                    variant="info"
                    :to="`/profhealthcare/prescriptions/prescription-exercises/${row.item.code}`"
                >
                    <fa :icon="['fas', 'info-circle']" />
                </b-button>
            </template>
        </b-table>
        <h6 v-else>Não possui prescrições de exercicios</h6>
        <br />
        <h5>Prescrições Médicas:</h5>
        <b-table v-if="prescriptionsMedics.length" striped over :items="prescriptionsMedics" :fields="fieldsMedics">
            <template v-slot:cell(actions)="row">
                <b-button
                    variant="info"
                    :to="`/profhealthcare/prescriptions/prescription-medics/${row.item.code}`"
                >
                    <fa :icon="['fas', 'info-circle']" />
                </b-button>
            </template>
        </b-table>
        <h6 v-else>Não possui prescrições médicas</h6>
        <br />
        <h5>Prescrições de Nutrição:</h5>
        <b-table v-if="prescriptionsNutris.length" striped over :items="prescriptionsNutris" :fields="fieldsNutris">
            <template v-slot:cell(actions)="row">
                <b-button
                    variant="info"
                    :to="`/profhealthcare/prescriptions/prescription-nutris/${row.item.code}`"
                >
                    <fa :icon="['fas', 'info-circle']" />
                </b-button>
            </template>
        </b-table>
        <h6 v-else>Não possui prescrições de nutrição</h6>
        <br />
      <p align="center"><a class="primary" @click="$router.go(-1)">Voltar a Trás</a></p>
    </b-container>
  </div>
</template>

<script>
import ProfHealthNavBar from '../../../../components/ProfHealthNavBar.vue';
export default {
  components: { ProfHealthNavBar },
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
      fieldsExercise: ['code', 'duracao', 'oldInsertionDate', 'vigor', 'programCode', 'actions'],
      prescriptionsExercise: [],
      fieldsMedics: ['code','duracao','oldInsertionDate','vigor', 'actions'],
      prescriptionsMedics: [],
      fieldsNutris: ['code','duracao','oldInsertionDate','vigor','descNutri','actions'],
      prescriptionsNutris: [],
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
        this.$axios.$get('/api/patientusers/' + this.username + '/prescription-exercises')
        .then((prescriptions1) => {
            this.prescriptionsExercise = prescriptions1
        })
        this.$axios.$get('/api/patientusers/' + this.username + '/prescription-medics')
        .then((prescriptions2) => {
            this.prescriptionsMedics = prescriptions2
        })
        this.$axios.$get('/api/patientusers/' + this.username + '/prescription-nutris')
        .then((prescriptions3) => {
            this.prescriptionsNutris = prescriptions3
        })
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

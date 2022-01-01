<template>
    <div>
      <admin-nav-bar/>
      <br><br>
      <b-container>
        <form @submit.prevent="create" :disabled="!isFormValid">
            <b-form-group
                id="code"
                description="The code is required"
                label-for="code"
                :invalid-feedback="invalidCodeFeedback"
                :state="isCodeValid"
            >
            <b-input v-model.trim="code" :state="isCodeValid" required placeholder="Enter a code to medicine" />
            </b-form-group>
            <b-form-group
                id="name"
                description="The name is required"
                label-for="name"
                :invalid-feedback="invalidNameFeedback"
                :state="isNameValid"
            >
                <b-input v-model.trim="name" :state="isNameValid" required placeholder="Enter a name to medicine" />
            </b-form-group>
                <b-form-group
                    id="desc"
                    description="The medicine's description is required"
                    label-for="desc"
                    :invalid-feedback="invalidDescFeedback"
                    :state="isDescValid"
                >
                <b-input v-model.trim="desc" :state="isDescValid" placeholder="Enter a description to medicine" />
            </b-form-group>
            <b-form-group
                id="warnings"
                label-for="warnings"
                :invalid-feedback="invalidWarningFeedback"
                :state="isWarningValid"
            >
                <textarea class="form-control" v-model.trim="warning" :state="isWarningValid" placeholder="Enter a warnings of the medicine"></textarea>
            </b-form-group>
            <p v-show="errorMsg" class="text-danger">
                {{ errorMsg }}
            </p>
            <button class="btn btn-primary" @click.prevent="create" :disabled="!isFormValid">CREATE</button>
            <br>
            <nuxt-link to="/profhealthcare">Back</nuxt-link>
        </form>
    </b-container>
    </div>
 </template>

<script>
  export default {
    data(){
        return {
            code: null,
            name: null,
            desc: null,
            warning: null,
            errorMsg: false
        }
    },

    computed: {
        invalidCodeFeedback () {
            if (!this.code) {
                return null
            }
            let codeLen = this.code.length
            if (codeLen < 1 || codeLen > 30) {
                return 'The code must be between [1, 30] number characters.'
            }
            return ''
        },

        isCodeValid () {
            if (!this.invalidCodeFeedback === null) {
                return null
            }
            return this.invalidCodeFeedback === ''
        },

        invalidNameFeedback () {
            if (!this.name) {
                return null
            }
            let nameLen = this.name.length
            if (nameLen < 3 || nameLen > 25) {
                return false
            }
            return ''
        },

        isNameValid () {
            if (!this.invalidNameFeedback === null) {
                return null
            }
            return this.invalidNameFeedback === ''
        },

        invalidDescFeedback () {
            if (!this.desc) {
                return null
            }
            let descLen = this.desc.length
            if (descLen < 3 || descLen > 255) {
                return false
            }
            return ''
        },

        isDescValid () {
            if (!this.invalidDescFeedback === null) {
                return null
            }
            return this.invalidDescFeedback === ''
        },

        invalidWarningFeedback () {
            if (!this.warning) {
                return null
            }
            let warningLen = this.warning.length
            if (warningLen < 3 || warningLen > 255) {
                return false
            }
            return ''
        },

        isWarningValid () {
            if (!this.invalidWarningFeedback === null) {
                return null
            }
            return this.invalidWarningFeedback === ''
        },
	
        isFormValid () {
            if (! this.isCodeValid) {
                return false
            }
            if (! this.isNameValid) {
                return false
            }
            if (! this.isDescValid) {
                return false
            }
            if (! this.isWarningValid) {
                return false
            }
            return true
        }
    },

    methods: {
        create() {
            this.$axios.$post('/api/medicine', {
                code: this.code,
                name: this.name,
                description: this.desc,
                warning: this.warning
            })
            .then(() => {
                this.$router.push('/profhealthcare')
            })
            .catch((error) => {
                this.errorMsg = error.response.data
            })
        },
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
    }
  }
</script>
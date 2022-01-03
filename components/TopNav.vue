<template>
    <div class="nav-fill">
        <b-navbar variant="primary" type="dark">
        <div @click="$emit('togglenav')">
            <fa :icon="['fas', 'bars']" size="2x" color="white"/>
        </div>
        &nbsp;&nbsp;
        <b-navbar-brand tag="h1" class="mb-0" @click="initialPage">CardioApp</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item>Bem Vindo {{username}}</b-nav-item>
            &nbsp;&nbsp;&nbsp;
            <b-nav-item @click.prevent="mailsReceive"><fa :icon="['fas', 'envelope']" /></b-nav-item>
            <b-nav-item @click.prevent="signOut"><fa :icon="['fas', 'sign-out-alt']" /></b-nav-item>
        </b-navbar-nav>
        </b-navbar>
    </div>
</template>
<script>
export default ({
    computed: {
      username(){
        return this.$auth.user.sub
      },
    },
    methods:{
        initialPage(){
            if(this.$auth.user.groups.includes('Admin'))
            {
                this.$router.push('/admin')
            }
            if(this.$auth.user.groups.includes('ProfHealthcare'))
            {
                this.$router.push('/profhealthcare')
            }
            if(this.$auth.user.groups.includes('PatientUser'))
            {
                this.$router.push('/patients')
            }
        },
        mailsReceive(){
            if(this.$auth.user.groups.includes('Admin'))
            {
                this.$router.push('/admin/mails/mailsReceive')
            }
            if(this.$auth.user.groups.includes('ProfHealthcare'))
            {
                this.$router.push('/profhealthcare/mails/mailsReceive')
            }
            if(this.$auth.user.groups.includes('PatientUser'))
            {
                this.$router.push('/patients/mails/mailsReceive')
            }
        },
        signOut(){
            this.$auth.logout()
            this.$router.push('/')
        }
   }
})
</script>
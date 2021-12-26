<template>
    <div v-bind:style="{ backgroundImage: 'url('+img+')' }">
        <b-navbar type="dark" variant="primary">
            <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>
        </b-navbar>
        <br>
        <br>
        <div class="container-fluid">
            <b-container>
                <p align="center"><img width="200" height="200" src = "@/img/depositphotos_77542188-stock-illustration-app-fitness-logo.jpg"></p>
                <h2 align="center">CardioApp</h2>
                <br>
                <b-form @submit.prevent="onSubmit">
                    <b-form-group label="Username" description="Enter your username">
                        <b-input
                            name="username"
                            placeholder="Your username"
                            v-model.trim = "username"
                            required/>
                    </b-form-group>
                    <b-form-group label="Password" description="Enter your password">
                        <b-input
                            name="password"
                            type="password"
                            placeholder="Your password" 
                            v-model.trim = "password"
                            required/>
                    </b-form-group>
                    <b-button type="submit" class="btn btn-primary btn-lg btn-block">Login</b-button>
                 </b-form>
            </b-container>
        </div>
    </div>
</template>

<script>

export default{
    auth: false,
    data(){
        return{
            img : "@/img/background_1.jpg",
            username: null,
            password: null
        }
    },
    methods: {
        onSubmit()
        {
            let promise = this.$auth.loginWith('local', {
                data: {
                    username: this.username,
                    password: this.password
                }
            })
            promise.then(() => {
                this.$toast.success('Já está logado').goAway(3000)
                console.log(this.$auth.user)
                if(this.$auth.user.groups.includes('Admin'))
                {
                    this.$router.push('/admin')
                } else if(this.$auth.user.groups.includes('ProfHealthcare'))
                {
                    this.$router.push('/profhealthcare')
                } else if(this.$auth.user.groups.includes('PatientUser'))
                {
                    this.$router.push('/patients')
                }
            })
            promise.catch(() => {
                this.$toast.error('Desculpe, você não pode fazer login. Garanta que as suas credenciais estão corretas').goAway(3000);
            })
        }
  },
}
</script>
>
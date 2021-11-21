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
                        placeholder="Your username"/>
                </b-form-group>
                <b-form-group label="Password" description="Enter your password">
                    <b-input
                        name="password"
                        type="password"
                        placeholder="Your password" />
                </b-form-group>
                <b-button type="submit" class="btn btn-primary btn-lg btn-block">Login</b-button>
                <br>
                <h6 align="center"><a href="#" class="link-primary">You don't have an account, create one here</a></h6>
            </b-form>
            </b-container>
        </div>
    </div>
</template>

<script>

export default{
    data(){
        return{
            img : "@/img/background_1.jpg"
        }
    },
    methods: {
        login() {
        
        },
  },
}
</script>
>
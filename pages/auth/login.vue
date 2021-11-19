<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>
        </b-navbar>
        <br><br>
        <b-container>
            <h3>Login</h3>
            <b-form @submit.prevent="onSubmit" @reset="onReset">
                <b-form-group label="Username" description="Enter your username">
                    <b-input
                        name="username"
                        placeholder="Your username"
                        v-model.trim="username"
                        required />
                </b-form-group>
                <b-form-group label="Password" description="Enter your password">
                    <b-input
                        name="password"
                        type="password"
                        placeholder="Your password"
                        v-model="password"
                        required />
                </b-form-group>
                <b-button type="reset" class="btn-warning">Reset</b-button>
                <b-button type="submit" class="btn-success">Submit</b-button>
            </b-form>
            <nuxt-link to="/admin" class="btn btn-link">Admin</nuxt-link>
        </b-container>
    </div>
</template>

<script>

export default{
    data(){
        return{
            
        }
    }
}
</script>
>


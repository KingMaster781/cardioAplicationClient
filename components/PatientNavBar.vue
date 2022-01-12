<template>
<div>
    <top-nav @togglenav="changeNavOpen"/>
    <side-bar-patient :open="navOpen" @togglenav="changeNavOpen"/>
    <br><br>
</div>
</template>

<script>
import SideBarPatient from './SideBarPatient.vue'
import TopNav from './TopNav.vue'
export default {
  components: { TopNav, SideBarPatient },
    name: 'navBarPatient',
    data(){
      return {
        navOpen: false
      }
    },
    created(){
      if(!this.$auth.user)
      {
        this.$router.push('/')
      }
      if(!this.$auth.user.groups.includes('PatientUser'))
      {
        if(this.$auth.user.groups.includes('ProfHealthcare'))
        {
          this.$router.push('/profhealthcare')
        }
        if(this.$auth.user.groups.includes('Admin'))
        {
          this.$router.push('/admin')
        }
      }
    },
    methods: {
      changeNavOpen(){
        this.navOpen=!this.navOpen
      }
    }
}
</script>
<style scoped>

</style>

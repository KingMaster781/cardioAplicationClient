<template>
<div>
    <top-nav @togglenav="changeNavOpen"/>
    <side-bar-admin :open="navOpen" @togglenav="changeNavOpen"/>
    <br><br>
</div>
</template>

<script>
import SideBarAdmin from './SideBarAdmin.vue'
import TopNav from './TopNav.vue'
export default {
  components: { TopNav, SideBarAdmin },
    name: 'navBarAdmin',
    data: () => {
      return {
        navOpen: false
      }
    },
    created(){
      if(!this.$auth.user)
      {
        this.$router.push('/')
      }
      if(!this.$auth.user.groups.includes('Admin'))
      {
        if(this.$auth.user.groups.includes('ProfHealthcare'))
        {
          this.$router.push('/profhealthcare')
        }
        if(this.$auth.user.groups.includes('PatientUser'))
        {
          this.$router.push('/patients')
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
<style  scoped>

</style>

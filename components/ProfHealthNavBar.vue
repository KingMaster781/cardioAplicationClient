<template>
<div>
    <top-nav @togglenav="changeNavOpen"/>
    <side-bar-prof :open="navOpen" @togglenav="changeNavOpen"/>
    <br><br>
</div>
</template>

<script>
import SideBarProf from './SideBarProf.vue'
import TopNav from './TopNav.vue'
export default {
  components: { TopNav, SideBarProf },
    name: 'navBarProfH',
    data(){
      return {
        navOpen: false
      }
    },
    computed: {
      
    },
    created(){
      if(!this.$auth.user)
      {
        this.$router.push('/')
      }
      if(!this.$auth.user.groups.includes('ProfHealthcare'))
      {
        if(this.$auth.user.groups.includes('PatientUser'))
        {
          this.$router.push('/patients')
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

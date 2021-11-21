<template>
    <div>
      <b-navbar type="dark" variant="primary">
        <b-button variant="primary" v-b-toggle.sidebar-no-header>
          <span class="navbar-toggler-icon"></span>
        </b-button>
        <b-navbar-brand tag="h1" class="mb-0">CardioApp</b-navbar-brand>         
      </b-navbar>
      <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
        <template #default="{ hide }">
          <div class="p-3">
            <nav class="mb-3">
              <b-nav vertical>
                <b-dropdown-item href="/patients">Patients</b-dropdown-item>
                <b-dropdown-item href="/profhealthcare">Healthcare Professionals</b-dropdown-item>
                <b-dropdown-item href="/admin/consultAdmins">Admins</b-dropdown-item>
              </b-nav>
            </nav>
            <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
          </div>
        </template>
      </b-sidebar>
    </div>
 </template>

<script>
  export default {

  }
</script>

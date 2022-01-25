<template>
  <div id="login">
    <form @mouseleave="showForm = false">
      <input @click="showForm = !showForm" v-show="!showForm" type="button"
             value="Anmelden">
      <input v-show="showForm" type="text" placeholder="Benutzer">
      <input v-show="showForm" type="password" placeholder="Passwort">
      <input v-show="showForm" type="submit" value="Abschicken">
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    msg: String,
    showForm: {type: Boolean, default: false}
  }
}
</script>

<style scoped>
</style>

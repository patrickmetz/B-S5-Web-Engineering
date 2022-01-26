<template>
  <div id="login">
    <form @mouseleave="showForm = false" method="post" action="./index.php">
      <input type="hidden" name="session_action" value="login">

      <input @click="showForm = !showForm" v-show="!showForm" type="button" value="Anmelden">

      <input v-show="showForm" type="text" name="username" placeholder="Benutzer">
      <input v-show="showForm" type="password" name="password" placeholder="Passwort">
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

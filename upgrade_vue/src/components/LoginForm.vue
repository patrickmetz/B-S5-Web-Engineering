<template>
  <div id="login">
    <form @submit="submitForm" @mouseleave="showForm = false">
      <input type="hidden" name="session_action" value="login">

      <input @click="showForm = !showForm" v-show="!showForm" type="button"
             value="Anmelden">

      <input type="text" v-bind:class="{error: usernameIsEmpty}"
             v-show="showForm" v-model="username" name="username"
             placeholder="Benutzer">

      <input type="password" v-bind:class="{error: passwordIsEmpty}"
             v-show="showForm" v-model="password" name="password"
             placeholder="Passwort">

      <input type="submit" v-show="showForm" value="Abschicken">
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    username: String,
    usernameIsEmpty: {type: Boolean, default: false},

    password: String,
    passwordIsEmpty: {type: Boolean, default: false},

    showForm: {type: Boolean, default: false}
  },
  methods: {
    submitForm: function (event) {
      this.resetEmptyStates();
      this.checkFields();

      if (this.username && this.password) {
        return true;
      }

      event.preventDefault();
    },

    checkUsername: function () {
      this.usernameIsEmpty = !this.username;
    },

    checkPassword: function () {
      this.passwordIsEmpty = !this.password;
    },

    checkFields: function () {
      this.checkUsername();
      this.checkPassword();
    },

    resetEmptyStates() {
      this.usernameIsEmpty = this.passwordIsEmpty = false;
    }
  }

}
</script>

<style scoped></style>

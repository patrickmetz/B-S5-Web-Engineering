<template>
  <header>
    <my-menu :entries='menuEntries()' name="topic" v-on:menu="bubbleMenuEvent"></my-menu>
  </header>
</template>

<script>

import MyMenu from "./03_menu.vue";

export default {
  name: "my-header",

  components: {MyMenu},

  props: {
    json: {
      type: Array
    }
  },

  methods: {
    bubbleMenuEvent : function (event){
      console.log("header: bubbling menu event", event);
      this.$emit("menu", event);
    },

    menuEntries() {
      console.log("header", this.json);
      let index = 0;

      return this.json.map(x => ({id: index++, content: x.topic}));
    }
  }
}
</script>


<template>
  <aside class="left">
    my-aside-left
    {{topicId}}
    <my-menu :entries='menuEntries()' name="subtopic" v-on:menu="bubbleMenuEvent"></my-menu>

  </aside>
</template>

<script>

import MyMenu from "./03_menu.vue";

export default {
  name: "my-aside-left",

  components: {MyMenu},

  props: {
    json: {
      type: Array,
      required: true
    },

    topicId: {
      type: Number,
      required: true
    }
  },


  methods: {
    bubbleMenuEvent : function (event){
      console.log("aside left: bubbling menu event", event);

      this.$emit("menu", event);
    },

    menuEntries() {
      console.log("aside-left", this.topicId);

      if(this.topicId < 0){
        return [];
      }

      let index = 0;
      const subtopics = this.json[this.topicId].subtopics;
      return subtopics.map(x => ({id: index++, content: x.name}));
    }
  }
}
</script>

<style scoped>
aside.left {
  background: cornflowerblue;
}
</style>
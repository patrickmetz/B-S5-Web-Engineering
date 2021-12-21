<template>
  <article>my-article {{content()}}</article>
</template>

<script>
export default {
  name: "my-article",

  props: {
    json: {
      type: Array,
      required: true
    },

    topicId: {
      type: Number,
      required: true
    },

    subTopicId: {
      type: Number,
      required: true
    }
  },

  methods : {
    content : function (){

      if(this.topicId < 0 || this.subTopicId < 0){
        return "";
      }

      return  this.json[this.topicId].subtopics[this.subTopicId].content;
    }
  }
}
</script>

<style scoped>
article {
  background: springgreen;
}
</style>
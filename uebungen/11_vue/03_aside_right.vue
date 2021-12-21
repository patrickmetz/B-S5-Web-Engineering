<template>
  <aside class="right">{{content()}}</aside>
</template>

<script>
export default {
  name: "my-aside-right",

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

      return  this.json[this.topicId].subtopics[this.subTopicId].references;
    }
  }
}
</script>

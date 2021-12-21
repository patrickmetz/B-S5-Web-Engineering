<template>
  <div id="my-navigator">
    <my-header :json="json" v-on:menu="changeTopicId"></my-header>
    <my-aside-left :json="json" v-on:menu="changeTopicId" :topicId="topicId"></my-aside-left>
    <my-article :json="json" :topicId="topicId" :subTopicId="subTopicId"></my-article>
    <my-aside-right :json="json" :topicId="topicId" :subTopicId="subTopicId"></my-aside-right>
    <my-footer></my-footer>
  </div>
</template>

<script>

// ES6 feature
import json from './navigator_contents.json'

import MyFooter from "./03_footer.vue";
import MyHeader from "./03_header.vue";
import MyAsideLeft from "./03_aside_left.vue";
import MyAsideRight from "./03_aside_right.vue";
import MyArticle from "./03_article.vue";

export default {
  components: {MyArticle, MyAsideRight, MyAsideLeft, MyHeader, MyFooter},

  data() {
    return {
      json: json,
      topicId: -1,
      subTopicId: -1,
    }
  },

  methods: {
    changeTopicId: function (event) {
      if (event.name === "topic") {
        console.log("changing topic id", event.id);
        this.topicId = event.id;
      } else if (event.name === "subtopic") {
        console.log("changing sub topic id", event.id);
        this.subTopicId = event.id;
      }else{
        console.log("unknown event");
      }
    }
  }

}
</script>
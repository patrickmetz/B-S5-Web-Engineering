<template>
  <div id="my-navigator">
    <my-header :json="json" v-on:menu="changeTopicId"></my-header>

    <my-aside-left :json="json" v-on:menu="changeTopicId"
                   :topicId="topicId"></my-aside-left>

    <my-article :json="json" :topicId="topicId"
                :subTopicId="subTopicId"></my-article>

    <my-aside-right :json="json" :topicId="topicId"
                    :subTopicId="subTopicId"></my-aside-right>

    <my-footer></my-footer>
  </div>
</template>

<script>

// source: https://stackoverflow.com/a/45566350
import json from './navigator_contents.json'

import MyFooter from "./footer.vue";
import MyHeader from "./header.vue";
import MyAsideLeft from "./aside_left.vue";
import MyAsideRight from "./aside_right.vue";
import MyArticle from "./article.vue";

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
        this.subTopicId = -1;
      } else if (event.name === "subtopic") {
        console.log("changing sub topic id", event.id);
        this.subTopicId = event.id;
      } else {
        console.log("unknown event");
      }
    }
  }

}
</script>


<style>

* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
  color: darkblue;
  padding: 0;
  margin: 0;
}

:root {
  /* responsive font size: https://websemantics.uk/tools/responsive-font-calculator/ */
  font-size: clamp(12px, calc(0.75rem + ((1vw - 3px) * 0.3704)), 18px);
  min-height: 0vw; /* safari fix */
  --background-color-1: cornflowerblue;
  --background-color-2: skyblue;
  --padding: 1em;
}

body {
  height: 100vh;
  margin: 0;
}

#my-navigator {
  display: grid;
  grid-template-rows: 5vh 5vh 80vh 5vh 5vh;
  grid-template-areas:
      "header"
      "aside_left"
      "article"
      "aside_right"
      "footer";
  height: 100vh;
  margin: 0;
}

#my-navigator ul {
  list-style-type: none;
  text-transform: capitalize;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  padding-top: var(--padding);
}

#my-navigator a{
  text-decoration: none;
}

#my-navigator li {
  padding-right: 1em;
  padding-bottom:1em;
  cursor:pointer;
}

#my-navigator li:hover, #my-navigator a:hover{
  text-decoration: underline;
}

#my-navigator header {
  grid-area: header;
  background-color: var(--background-color-1);
}

#my-navigator header ul{
  height:5vh;
}

#my-navigator aside.left {
  grid-area: aside_left;
  background-color: var(--background-color-2);
  padding-left: var(--padding);
}

#my-navigator aside.right {
  grid-area: aside_right;
  background-color: var(--background-color-2);
  padding-left: var(--padding);
}

#my-navigator aside.right a{
  display: block;
  padding-top: var(--padding);
}

#my-navigator article {
  grid-area: article;
  padding:var(--padding);
}

#my-navigator footer {
  grid-area: footer;
  background-color: var(--background-color-1)
}

@media screen and (min-width: 400px) {
  #my-navigator {
    grid-template-columns: 30vw 70vw;
    grid-template-rows: 10vh 75vh 10vh 5vh;
    grid-template-areas:
      "header header"
      "aside_left article"
      "aside_right aside_right"
      "footer footer"
  }

  #my-navigator header ul {
    margin-top:2.5vh;
  }

  #my-navigator aside.left ul {
    flex-direction: column;
  }

  #my-navigator #aside.left li {
    padding-bottom: var(--padding);
  }

  @media screen and (min-width: 600px) {
    #my-navigator {
      grid-template-columns: 20vw 60vw 20vw;
      grid-template-rows: 10vh 80vh 10vh;
      grid-template-areas:
          "header header header"
          "aside_left article aside_right"
          "footer footer footer"
    }

    #my-navigator aside.right ul {
      flex-direction: column;
    }

    #my-navigator aside.right li {
      padding-bottom: var(--padding);
    }
  }
}
</style>
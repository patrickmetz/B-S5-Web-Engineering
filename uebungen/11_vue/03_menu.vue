<template>
  <ul :class="className()">
    <li
        v-for="entry in entries"
        :key="entry.id"
        @click="$emit(eventName, { id : entry.id, name : name})"
    >
      {{ entry.content }}
    </li>
  </ul>
</template>

<script>

export default {
  name: "my-menu",

  props: {
    name: {
      type: String,
      required: true
    },
    isVertical: {
      type: Boolean
    },
    entries: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      eventName: "menu",
    }
  },

  methods: {
    className: function () {
      return this.isVertical === true ? "vertical" : "horizontal";
    }
  }
}
</script>

<style scoped>

</style>
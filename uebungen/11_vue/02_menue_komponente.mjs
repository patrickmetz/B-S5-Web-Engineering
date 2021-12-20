Vue.component(
    "my-menu", {
        template: `
          <ul :class="className()">
              <li
                  v-for="entry in entries"
                  :key="entry.id"
              >
                {{ entry.content }}
              </li>
          </ul>
        `,

        props: {
            isVertical: {
                type: Boolean
            },
            entries: {
                type: Array,
                required: true
            }
        },

        data: function () {
            return {}
        },

        methods: {
            className: function () {
                return this.isVertical === true ? "vertical" : "horizontal";
            }
        }
    }
);


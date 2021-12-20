Vue.component(
    "my-input-info", {
        template: `
          <div>
          <input @keyup="update" type="text" placeholder="Eingabe"/>
          <input type="text" v-bind:value="characterCount" placeholder="Buchstaben"/>
          <input type="text" v-bind:value="spaceCount" placeholder="Leerzeichen"/>
          <input type="text" v-bind:value="wordCount" placeholder="Wörter"/>
          </div>
        `,
        data: function () {
            return {
                characterCount: 0,
                spaceCount: 0,
                wordCount: 0
            }
        }, methods: {
            update: function (event) {
                const input = event.target.value;

                this.characterCount = input.length;

                // source: https://stackoverflow.com/a/881111
                this.spaceCount = input.split(" ").length - 1;
                this.wordCount = (input.match(/(\w{2,})/g) || []).length;
            }
        }
    }
);


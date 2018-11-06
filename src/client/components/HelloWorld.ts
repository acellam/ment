import Vue from "vue";

export default Vue.extend({
    template: `
         <div class="hello">
            <h1>{{ msg }}</h1>
            <h3>Essential Links</h3>
          </div>
    `,
    props: [ "msg" ]
});

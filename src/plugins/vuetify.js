import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VSelect } from "vuetify/components/VSelect";
import { VTextField } from "vuetify/components/VTextField";

export default createVuetify({
  defaults: {
    VSelect: {
      style: [{ border: "2px" }],
    },
    VTextField: {
      style: [{ border: "none" }],
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
});

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1976D2", // Deep blue shade
          secondary: "#9C27B0", // Purple shade
          accent: "#FF5722", // Deep orange shade for accents
          background: "#F5F5F5", // Light gray background color
          surface: "#FFFFFF", // White surface color
          error: "#FF5252", // Red shade for errors
          info: "#2196F3", // Blue shade for info
          success: "#4CAF50", // Green shade for success
          warning: "#FFC107", // Yellow shade for warnings
        },
      },
      dark: {
        colors: {
          primary: "#2196F3", // A deep blue shade
          secondary: "#03DAC6", // A teal shade
          accent: "#FF4081", // A pink shade for accents
          background: "#121212", // Dark background color
          surface: "#1E1E1E", // Slightly lighter surface color
          error: "#FF5252", // Red shade for errors
          info: "#2196F3", // Reusing primary color for info
          success: "#4CAF50", // Green shade for success
          warning: "#FFC107", // Yellow shade for warnings
        },
      },
    },
  },
});

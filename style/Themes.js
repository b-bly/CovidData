import * as colors from './colors';

export const Themes = {
  red: {
    backgroundColor: "#ba0000",
    backgroundGradientFrom: "#eb0000",
    backgroundGradientTo: "#f04343",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    fillShadowGradientOpacity: 1,
    fillShadowGradient: "#ffffff",
  },
  orange: {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    fillShadowGradientOpacity: 1,
    fillShadowGradient: "#ffffff",
  },
  blue: {
    backgroundColor: colors.blue,
    backgroundGradientFrom: colors.lightblue,
    backgroundGradientTo: colors.blue100,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    fillShadowGradientOpacity: 1,
    fillShadowGradient: "#ffffff",
  }
}

export const modes = {
  dark: {
    textColor: 'snow',
    red: {
      backgroundColor: "#ba0000",
    },
    orange: {
      backgroundColor: "#e26a00",
    },
    blue: {
      backgroundColor: colors.blue,
    }
  },
  light: {
    textColor: 'black',
    red: {
      backgroundColor: "snow",
    },
    orange: {
      backgroundColor: "snow",
    },
    blue: {
      backgroundColor: "snow",
    }
  }
}
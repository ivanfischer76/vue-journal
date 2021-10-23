module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  setupFiles: ["/media/ivan/datos/Proyectos/Udemy/Vuejs-fh/07-journal-app/tests/jest/setEnvVars.js"],
  // comentar lo siguiente para las pruebas del router con el options API
  // setupFilesAfterEnv: ['/media/ivan/datos/Proyectos/Udemy/Vuejs-fh/07-journal-app/jest.setup.js'],
}

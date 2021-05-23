module.exports = function (plop) {
  // controller generator
  plop.setGenerator('component', {
    description: 'vue component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'component name',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: './src/components/{{ properCase componentName }}',
        templateFiles: './plop-templates/component/*',
        base: './plop-templates/component/',
        skipIfExists: true,
      },
    ],
  });
};

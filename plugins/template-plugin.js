const templateFiles = /\.(.template)$/;

export default function templatePlugin() {
  return {
    name: "template-plugin",

    transformPath(src, name) {
      if (templateFiles.test(name)) {
        return {
          code: `export default function template(props = {}){return \`${src}\`}`,
          map: null,
        };
      }
    },
  };
}

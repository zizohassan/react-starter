var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var path = require("path");
var rimraf = require("rimraf");
let pageFolder = ["Guest", "Auth"];
const Const = require("./Const");
const c = new Const();

const count = (str, p) => {
  return ((str || "").match(p) || []).length;
};

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const title = (str) =>  {
  str = str.replace(/-/ , " ")
  str = str.replace(/_/ , " ")
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
const rolBack = (name, routeFile) => {
  fs.readFileAsync(routeFile, "utf8").then(function(data) {
    let content = "";
    let liens = data.split("\n");
    for (let i = 0; i < liens.length; i++) {
      let check = false;
      for (let n = 0; n < name.length; n++) {
        if (liens[i].includes(name[n])) {
          check = true;
        }
      }
      if (!check) {
        content += liens[i] + "\n";
      }
    }
    fs.writeFile(routeFile, content, () => {
      console.error("   Done Remove form file " + routeFile);
    });
  });
};

const buildFile = (objectKeys, data) => {
  let content = `export const ${data} = {` + "\n";
  Object.keys(objectKeys).forEach((word) => {
    content += "\t" + "\"" + word + "\"" + ":" + "\"" + objectKeys[word] + "\"," + "\n";
  });
  content += "};";
  fs.writeFile(`./src/Translations/${data}/${data}.js`, content, () => {
  });
};

const getOldValues = (content) => {
  let obj = {};
  var pattTwo = new RegExp(`".*?":".*?"`, "g", "m");
  let pattrenT = content.match(pattTwo);
  if (pattrenT) {
    pattrenT.map(reg => {
      reg = reg.replace(/"/g , "")
      let keys = reg.split(":");
      obj[keys[0]] = keys[1];
    });
  }
  return obj;
};

const transLation = (path, data) => {
  walk(path, (n, res) => {
    let objectKeys = {};
    res.forEach((file) => {
      fs.readFileAsync(file, "utf8").then(function(data) {
        // var pattTwo = new RegExp("_trans\\(\\\\?'.*?\\\\?'\\)", "g", "m");
        var pattTwo = new RegExp("_trans\\(\\\\?('|\").*?\\\\?(\"|')\\)", "g", "m");
        let pattrenT = data.match(pattTwo);
        if (pattrenT) {
          pattrenT.map(reg => {
            if (reg.includes(`_trans`)) {
              let word = reg.replace(/{/g, "");
              word = word.replace("_trans", "");
              word = word.replace("(", "");
              word = word.replace(")", "");
              word = word.replace(/"/g, "");
              word = word.replace(/'/g, "");
              word = word.replace(/}/g, "");
              word = word.trim()
              objectKeys[word] = title(word);
            }
          });
        }
      }).then(() => {
        if (data.type == "All") {
          Object.values(c.languages()).forEach((langFile) => {
            fs.readFileAsync(`./src/Translations/${langFile}/${langFile}.js`, "utf8").then(function(content) {
              let oldValues  = {}
              if(content){
                oldValues = {...getOldValues(content)};
              }
              buildFile({ ...objectKeys, ...oldValues }, capitalize(langFile));
            });
          });
        } else {
          fs.readFileAsync(`./src/Translations/${data.type}/${data.type}.js`, "utf8").then(function(content) {
            let oldValues  = {}
            if(content){
              oldValues = getOldValues(content);
            }
            buildFile({ ...objectKeys, ...oldValues }, capitalize(data.type));
          });
        }
      }).catch(function(e) {
        console.error(e.stack);
      });
    });
  });
};

module.exports = function(plop) {

  const requireField = fieldName => {
    return value => {
      if (String(value).length === 0) {
        return fieldName + " is required";
      }
      return true;
    };
  };

  plop.setGenerator("Create Module", {
    description: "You Ready to build some thins amazing",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Please provide your module name , NOTICE : make sure module name is plural",
        validate: requireField("name")
      },
      {
        type: "input",
        name: "prefix",
        message: "Api prefix (if you have some prefix to add before url add it ) example (page/)"
      },
      {
        type: "list",
        name: "listPageResponse",
        message: "What type of response of list page ",
        choices : ["Paing" , "MapNormal"]
      },
      {
        type: "list",
        name: "module",
        message: "List Module Component in which folder",
        choices: pageFolder
      },
      {
        type: "list",
        name: "create_module",
        message: "Create Module Component in which folder",
        choices: pageFolder
      },
      {
        type: "list",
        name: "details_module",
        message: "Details Module Component in which folder",
        choices: pageFolder
      },
      {
        type: "list",
        name: "edit_module",
        message: "Edit Module Component in which folder",
        choices: pageFolder
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/{{module}}/{{pascalCase name}}.js",
        templateFile: "plop-templates/Pages/Module.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/{{details_module}}/{{pascalCase name}}Details.js",
        templateFile: "plop-templates/Pages/ModuleDetails.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/{{create_module}}/{{pascalCase name}}Create.js",
        templateFile: "plop-templates/Pages/ModuleCreate.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/{{edit_module}}/{{pascalCase name}}Edit.js",
        templateFile: "plop-templates/Pages/ModuleEdit.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/Form.js",
        templateFile: "plop-templates/Pages/Form.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/Actions/{{pascalCase name}}Action.js",
        templateFile: "plop-templates/Pages/Actions/ModuleAction.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/Actions/{{pascalCase name}}DetailsAction.js",
        templateFile: "plop-templates/Pages/Actions/ModuleDetailsAction.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/Actions/{{pascalCase name}}CreateAction.js",
        templateFile: "plop-templates/Pages/Actions/ModuleCreateAction.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/Actions/{{pascalCase name}}EditAction.js",
        templateFile: "plop-templates/Pages/Actions/ModuleEditAction.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/Actions/ApiRoute.js",
        templateFile: "plop-templates/Pages/Actions/ApiRoute.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/Transformers/{{pascalCase name}}CreateTransformer.js",
        templateFile: "plop-templates/Pages/Transformers/TransformersCreate.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Pages/{{pascalCase name}}/Transformers/{{pascalCase name}}EditTransformer.js",
        templateFile: "plop-templates/Pages/Transformers/TransformersEdit.js.hbs",
        skipIfExists: true
      },
      {
        type: "append",
        path: "src/routes/{{ module }}.js",
        pattern: `//PLOP_IMPORT_INJECT`,
        template: `import {{pascalCase name}} from "Pages/{{pascalCase name}}/{{module}}/{{pascalCase name}}"`
      },
      {
        type: "append",
        path: "src/routes/{{ details_module }}.js",
        pattern: `//PLOP_IMPORT_INJECT`,
        template: `import {{pascalCase name}}Details from "Pages/{{pascalCase name}}/{{details_module}}/{{pascalCase name}}Details"`
      },
      {
        type: "append",
        path: "src/routes/{{ edit_module }}.js",
        pattern: `//PLOP_IMPORT_INJECT`,
        template: `import {{pascalCase name}}Create from "Pages/{{pascalCase name}}/{{edit_module}}/{{pascalCase name}}Create"`
      },
      {
        type: "append",
        path: "src/routes/{{ create_module }}.js",
        pattern: `//PLOP_IMPORT_INJECT`,
        template: `import {{pascalCase name}}Edit from "Pages/{{pascalCase name}}/{{create_module}}/{{pascalCase name}}Edit"`
      },
      {
        type: "append",
        path: "src/routes/{{ module }}.js",
        pattern: `//PLOP_ROUTE_INJECT`,
        template: `  {{camelCase name}} : { path: "/{{kebabCase name}}", component: {{pascalCase name}}, label: "{{pascalCase name}}" },`
      },
      {
        type: "append",
        path: "src/routes/{{ details_module }}.js",
        pattern: `//PLOP_ROUTE_INJECT`,
        template: `  {{camelCase name}}Details : { path: "/{{kebabCase name}}/details/:id", component: {{pascalCase name}}Details, label: "{{pascalCase name}} Details" , show : false },`
      },
      {
        type: "append",
        path: "src/routes/{{ create_module }}.js",
        pattern: `//PLOP_ROUTE_INJECT`,
        template: `  {{camelCase name}}Create : { path: "/{{kebabCase name}}/create", component: {{pascalCase name}}Create, label: "{{pascalCase name}} Create"  , show : false },`
      },
      {
        type: "append",
        path: "src/routes/{{ edit_module }}.js",
        pattern: `//PLOP_ROUTE_INJECT`,
        template: `  {{camelCase name}}Edit : { path: "/{{kebabCase name}}/edit/:id", component: {{pascalCase name}}Edit, label: "{{pascalCase name}} Edit"  , show : false },`
      }
    ]
  });

  plop.setGenerator("RoleBack Module", {
    description: "Delete Module Folder and routes",
    prompts: [{
      type: "input",
      name: "name",
      message: "Please provide your module name , NOTICE ( Make Sure it the same module Name)",
      validate: requireField("name")
    }],
    actions: (data) => {
      let actions = [];
      let name = data.name;
      let folderName = "./src/Pages/" + name;
      fs.access(folderName, error => {
        if (!error) {
          let removeArray = [name, name + "Details", name + "Edit", name + "Create"];
          rolBack(removeArray, "./src/Routes/Auth.js");
          rolBack(removeArray, "./src/Routes/Guest.js");
          rimraf.sync(folderName);
        } else {
          console.error("  This Module Not Exists");
        }
      });
      return actions;
    }
  });

  plop.setGenerator("Translation", {
    description: "Generate translation files from Pages , Component folder",
    prompts: [{
      type: "list",
      name: "type",
      message: "What Language you want to generate",
      choices: c.languageAll()
    }],
    actions: (data) => {

      var actions = [];

      transLation("./src/Pages", data);
      transLation("./src/Components", data);
      transLation("./src/Layouts", data);

      return actions;
    }
  });

  plop.setGenerator("Create Language", {
    description: "Create New Language",
    prompts: [{
      type: "input",
      name: "code",
      message: "Please provide language Code (fr , en , ar)",
      validate: requireField("code")
    },
      {
        type: "input",
        name: "label",
        message: "Please provide language Label like (Arabic , English)",
        validate: requireField("label")
      },
      {
        type: "list",
        name: "dir",
        message: "Choose layout direction",
        choices: ["rtl", "ltr"]
      }],
    actions: [
      {
        type: "append",
        path: "src/Config/LanguagesConfig.js",
        pattern: `//PLOP_IMPORT_INJECT`,
        template: `    {{code}}: { label: "{{label}}", code: "{{code}}", dir: "{{dir}}" },`
      },
      {
        type: "append",
        path: "src/Components/TimeDate/Date.js",
        pattern: `//PLOP_IMPORT_INJECT`,
        template: `import 'moment/locale/{{ code }}';`
      },
      {
        type: "append",
        path: "src/Providers/Languages/TranslationProvider.js",
        pattern: `//PLOP_IMPORT_INJECT`,
        template: `import { {{titleCase code}} } from "Translations/{{titleCase code}}/{{titleCase code}}";
import { Other{{titleCase code}} } from "Translations/{{titleCase code}}/Other{{titleCase code}}";`
      },
      {
        type: "append",
        path: "src/Providers/Languages/TranslationProvider.js",
        pattern: `//PLOP_CODE_INJECT`,
        template: `  {{code}}: { translation: { ...{{titleCase code}}, ...Other{{titleCase code}} } },`
      },
      {
        type: "append",
        path: "./Const.js",
        pattern: `//PLOP_LANG_INJECT`,
        template: `      "{{titleCase code}}",`
      },
      {
        type: "add",
        path: "src/Translations/{{titleCase code}}/{{titleCase code}}.js",
        templateFile: "plop-templates/lang.js.hbs",
        skipIfExists: true
      }
      ,
      {
        type: "add",
        path: "src/Translations/{{titleCase code}}/Other{{titleCase code}}.js",
        templateFile: "plop-templates/other.js.hbs",
        skipIfExists: true
      }
    ]
  });

  plop.setGenerator("RoleBack Language", {
    description: "Delete language from system",
    prompts: [{
      type: "input",
      name: "name",
      message: "Please provide your language code like (ar , en , fr)",
      validate: requireField("name")
    }],
    actions: (data) => {
      let actions = [];
      let name = capitalize(data.name);
      let folderName = "./src/Translations/" + name;
      fs.access(folderName, error => {
        if (!error) {
          let removeArray = [data.name + ":"];
          let ProviderRemove = [data.name + ":", `Translations/${name}/${name}` , `Translations/${name}/Other${name}`];
          let Date = [`moment/locale/${data.name}`];
          rolBack(removeArray, "./src/Config/LanguagesConfig.js");
          rolBack(ProviderRemove, "./src/Providers/Languages/TranslationProvider.js");
          rolBack(Date, "./src/Components/TimeDate/Date.js");
          rolBack([`"${name}"`], "./Const.js");
          rimraf.sync(folderName);
        } else {
          console.error("  Language Folder not exists");
        }
      });
      return actions;
    }
  });

  plop.setGenerator("Create Layout", {
    description: "Creat layout ",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Please provide your layout name , NOTICE : make sure layout name is Titled like (Auth)",
        validate: requireField("name")
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/Layouts/{{titleCase name }}/Layout.js",
        templateFile: "plop-templates/Layout/Layout.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Layouts/{{titleCase name }}/Common/Body.js",
        templateFile: "plop-templates/Layout/Common/Body.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Layouts/{{titleCase name }}/Common/Header.js",
        templateFile: "plop-templates/Layout/Common/Header.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Layouts/{{titleCase name }}/Common/Footer.js",
        templateFile: "plop-templates/Layout/Common/Footer.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Layouts/{{titleCase name }}/Assets/Layout.module.scss",
        templateFile: "plop-templates/Layout/Assets/Layout.js.hbs",
        skipIfExists: true
      },
      {
        type: "add",
        path: "src/Layouts/{{titleCase name }}/Assets/LayoutRtl.module.scss",
        templateFile: "plop-templates/Layout/Assets/LayoutRtl.js.hbs",
        skipIfExists: true
      },
      {
        type: "append",
        path: "src/App.scss",
        pattern: `//PLOP_IMPORT_INJECT`,
        template: `@import "Layouts/{{titleCase name }}/Assets/Layout.module";
@import "Layouts/{{titleCase name }}/Assets/LayoutRtl.module";`
      }
    ]
  });

  plop.setGenerator("RoleBack Layout", {
    description: "Delete Layout from system",
    prompts: [{
      type: "input",
      name: "name",
      message: "Please provide your Layout Name  ,  NOTICE : make sure layout name is Titled like (Auth)",
      validate: requireField("name")
    }],
    actions: (data) => {
      let actions = [];
      let name = capitalize(data.name);
      let folderName = "./src/Layouts/" + name;
      fs.access(folderName, error => {
        if (!error) {
          let removeArray = ["/" + name + "/"];
          rolBack(removeArray, "./src/App.scss");
          rimraf.sync(folderName);
        } else {
          console.error("  Layout Folder not exists");
        }
      });
      return actions;
    }
  });

};
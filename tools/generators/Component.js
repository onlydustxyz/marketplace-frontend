const fs = require("fs");

module.exports = {
  CreateComponent: (base, doc, fileSuffix) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const baseFolder = `../../${base}`;

    const componentObj = {
      parent: null,
      folder: null,
      path: null,
    };

    const promptName = async () => {
      const name = await readline.question("\x1b[34m Components Name ? ");
      console.log("NNNAME", name);
      readline.question("\x1b[34m Components Name ? ", name => {
        readline.question("\x1b[34m Folder path ? ", folder => {
          componentObj.name = name;
          componentObj.folder = folder;
          componentObj.path = `${baseFolder}${folder}/${capitalizeFirstLetter(name)}`;

          if (fs.existsSync(componentObj.path)) {
            promptName();
          } else {
            fs.mkdirSync(componentObj.path);
            createFile();
          }
        });
      });
    };

    const createFile = async () => {
      readline.close();
      const createIndex = await fs.appendFile(`${componentObj.path}/index.ts`, setUpIndex());

      fs.appendFile(`${componentObj.path}/index.ts`, setUpIndex(), function (err) {
        if (err) throw err;

        fs.appendFile(`${componentObj.path}/${componentObj.name}.tsx`, setUpComponent(), function (err) {
          if (err) throw err;

          fs.appendFile(`${componentObj.path}/${componentObj.name}.type.ts`, setUpType(), function (err) {
            if (err) throw err;

            fs.appendFile(
              `${componentObj.path}/${capitalizeFirstLetter(componentObj.name)}.styled.tsx`,
              setUpStyled(),
              function (err) {
                if (err) throw err;

                if (doc) {
                  fs.appendFile(
                    `${componentObj.path}/${capitalizeFirstLetter(componentObj.name)}.${
                      fileSuffix ? `${fileSuffix}.` : ""
                    }stories.tsx`,
                    setUpDoc(),
                    function (err) {
                      if (err) throw err;
                    }
                  );
                }
              }
            );
          });
        });
      });
    };

    const setUpIndex = () => {
      return `import ${capitalizeFirstLetter(componentObj.name)} from './${capitalizeFirstLetter(componentObj.name)}${
        fileSuffix ? `.${fileSuffix}` : ""
      }'

export * from './${capitalizeFirstLetter(componentObj.name)}${fileSuffix ? `.${fileSuffix}` : ""}'
export * from './${capitalizeFirstLetter(componentObj.name)}.${fileSuffix ? `${fileSuffix}.` : ""}type'

export default ${capitalizeFirstLetter(componentObj.name)}
`;
    };

    const setUpComponent = () => {
      return `import { FC } from 'react'
import { ${capitalizeFirstLetter(componentObj.name)}Styles as Styled } from './${capitalizeFirstLetter(
        componentObj.name
      )}.${fileSuffix ? `${fileSuffix}.` : ""}styled'
import { ${capitalizeFirstLetter(componentObj.name)}Types } from './${capitalizeFirstLetter(componentObj.name)}.${
        fileSuffix ? `${fileSuffix}.` : ""
      }type'

export const ${capitalizeFirstLetter(componentObj.name)}: FC<${capitalizeFirstLetter(
        componentObj.name
      )}Types.Props> = ({ children }) => {
  return <Styled.Container>{children}</Styled.Container>
}

export default ${capitalizeFirstLetter(componentObj.name)}
`;
    };

    const setUpType = () => {
      return `import { ReactNode } from 'react'

export namespace ${capitalizeFirstLetter(componentObj.name)}Types {
  export interface Props {
    children: ReactNode
  }
}
`;
    };

    const setUpStyled = () => {
      return `import styled from 'styled-components'

export namespace ${capitalizeFirstLetter(componentObj.name)}Styles {
  export const Container = styled.div\`\`
}
`;
    };

    const capitalizeFirstLetter = string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const kebabToPascal = kebabCase => {
      const words = kebabCase.split("-");
      const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      return pascalCaseWords.join("");
    };

    promptName();
  },
};

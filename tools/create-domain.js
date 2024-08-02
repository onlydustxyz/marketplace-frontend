/* eslint-disable @typescript-eslint/no-var-requires */

const i = require("@inquirer/prompts");
const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName, exists } = require("./global");
const { exec } = require("node:child_process");

const DOMAIN_PATH = "core/domain";
const API_PATH = "core/infrastructure/marketplace-api-client-adapter/adapters";
const MOCK_API_PATH = "core/infrastructure/marketplace-api-client-adapter/mock-adapters";

async function createContract({ PascalName, files }) {
  await fs.appendFile(
    files.contract,
    prettier.format(
      `
      import {
        HttpClientParameters,
        HttpStorageResponse,
      } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

      import { components } from "src/__generated/api";

      export type Get${PascalName}Response = components["schemas"]["${PascalName}Response"];

      export type Get${PascalName}PortResponse = HttpStorageResponse<Get${PascalName}Response>;

      export type Get${PascalName}PortParams = HttpClientParameters<object>;

  `,
      { parser: "typescript" }
    )
  );
}

async function createInput({ PascalName, files, filesNoExtension }) {
  await fs.appendFile(
    files.input,
    prettier.format(
      `
    import { Get${PascalName}PortParams, Get${PascalName}PortResponse } from "${filesNoExtension.contract}";

    export interface ${PascalName}FacadePort {
      get${PascalName}(p: Get${PascalName}PortParams): Get${PascalName}PortResponse;
    }
  `,
      { parser: "typescript" }
    )
  );
}

async function createOutput({ PascalName, files, filesNoExtension }) {
  await fs.appendFile(
    files.outputs,
    prettier.format(
      `

      import { Get${PascalName}PortParams, Get${PascalName}PortResponse } from "${filesNoExtension.contract}";

      export interface ${PascalName}StoragePort {
        routes: Record<string, string>;
        get${PascalName}(p: Get${PascalName}PortParams): Get${PascalName}PortResponse;
      }
  `,
      { parser: "typescript" }
    )
  );
}

async function createModel({ PascalName, files }) {
  await fs.appendFile(
    files.models,
    prettier.format(
      `
    import { components } from "src/__generated/api";

    export type ${PascalName}Response = components["schemas"]["${PascalName}Response"];

    export interface ${PascalName}Interface extends ${PascalName}Response {}

    export class ${PascalName} implements ${PascalName}Interface {
      constructor(props: ${PascalName}Response) {
        Object.assign(this, props);
      }
    }

  `,
      { parser: "typescript" }
    )
  );
}

async function createClientAdapter({ PascalName, files, camelName, filesNoExtension }) {
  await fs.appendFile(
    files.clientAdapter,
    prettier.format(
      `
      import { Get${PascalName}Response } from "${filesNoExtension.contract}";
      import { ${PascalName} } from "${filesNoExtension.models}";
      import { ${PascalName}StoragePort } from "${filesNoExtension.outputs}";
      import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

      export class ${PascalName}ClientAdapter implements ${PascalName}StoragePort {
        constructor(private readonly client: HttpClient) {}

        routes = {
          get${PascalName}: "${camelName}",
        } as const;

        get${PascalName} = () => {
          const path = this.routes["get${PascalName}"];
          const method = "GET";
          const tag = HttpClient.buildTag({ path });
          const request = async () => {
            const data = await this.client.request<Get${PascalName}Response>({
              path,
              method,
              tag,
            });

            return new ${PascalName}(data);
          };

          return {
            request,
            tag
          };
        };
      }

  `,
      { parser: "typescript" }
    )
  );
}

async function createMockClientAdapter({ PascalName, files, filesNoExtension }) {
  await fs.appendFile(
    files.clientMockAdapter,
    prettier.format(
      `
      import { ${PascalName}StoragePort } from "${filesNoExtension.outputs}";
      import { mockHttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

      export class ${PascalName}ClientAdapterMock implements ${PascalName}StoragePort {
        constructor() {}

        routes = {};

        get${PascalName} = mockHttpStorageResponse<${PascalName}StoragePort["get${PascalName}"]>;
      }


  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  await createContract(informations);
  await createInput(informations);
  await createOutput(informations);
  await createModel(informations);
  await createClientAdapter(informations);
  await createMockClientAdapter(informations);

  await exec(`eslint '${informations.path}/**/*.{js,jsx,json,ts,tsx}' --max-warnings=0 --fix`);
}

async function promptName() {
  const name = await i.input({ message: "Domain name (kebab-case):" });

  const path = `${DOMAIN_PATH}/${name}`;
  const isPathExist = await exists(path);

  if (isPathExist) {
    console.log(`${COLORS.RED}❌ Component already exist${COLORS.NC}`);
    console.log(`\nComponent path: ${COLORS.BLUE}${path}${COLORS.NC}`);

    console.log(`\n${COLORS.YELLOW}👇 Choose another name${COLORS.NC}\n`);

    return defaultPromptName();
  }

  const paths = {
    input: `${path}/input`,
    models: `${path}/models`,
    outputs: `${path}/outputs`,
    clientAdapter: `${API_PATH}`,
    clientMockAdapter: `${MOCK_API_PATH}`,
  };

  const files = {
    contract: `${path}/${name}-contract.types.ts`,
    input: `${path}/input/${name}-facade-port.ts`,
    models: `${path}/models/${name}-model.ts`,
    outputs: `${path}/outputs/${name}-storage-port.ts`,
    clientAdapter: `${API_PATH}/${name}-client-adapter.ts`,
    clientMockAdapter: `${MOCK_API_PATH}/${name}-client-adapter-mock.ts`,
  };

  const filesNoExtension = {
    contract: `${path}/${name}-contract.types`,
    input: `${path}/input/${name}-facade-port`,
    models: `${path}/models/${name}-model`,
    outputs: `${path}/outputs/${name}-storage-port`,
    clientAdapter: `${API_PATH}/${name}-client-adapter`,
    clientMockAdapter: `${MOCK_API_PATH}/${name}-client-adapter-mock`,
  };

  return { folder: DOMAIN_PATH, name, path, files, paths, filesNoExtension };
}

async function createDomain() {
  const { folder, name, path, paths, files, filesNoExtension } = await promptName();

  await fs.mkdir(path);
  await fs.mkdir(paths.input);
  await fs.mkdir(paths.outputs);
  await fs.mkdir(paths.models);
  const PascalName = kebabToPascal(name);
  const camelName = kebabToCamel(name);

  await createFiles({
    folder,
    name,
    path,
    PascalName,
    camelName,
    paths,
    files,
    filesNoExtension,
  });

  console.log(`\n${COLORS.GREEN}✅ Component created${COLORS.NC}`);
  console.log(`Component path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

createDomain();

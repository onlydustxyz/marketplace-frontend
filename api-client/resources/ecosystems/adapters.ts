import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {};

export default Adapters;

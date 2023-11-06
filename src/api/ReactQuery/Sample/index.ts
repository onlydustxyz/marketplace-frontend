import { SAMPLE_TAGS } from "./tags";
import queries from "./queries";
import mutations from "./mutations";
import SampleSubApi from "./subSample";

const SampleApi = {
  tags: SAMPLE_TAGS,
  queries: queries,
  mutations: mutations,
  sub: SampleSubApi,
};

export default SampleApi;

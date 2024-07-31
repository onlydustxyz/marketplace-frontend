import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export function Content() {
  return (
    <div className="overflow-hidden">
      <Paper container="3" size="s" classNames={{ base: "h-full" }}>
        <ScrollView>
          <div className="flex h-full flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Typo
                size="xl"
                weight="medium"
                color="text-2"
                translate={{
                  token: "v2.pages.legalNotice.common.terms.onlydust.title",
                }}
              />
              <Typo
                size="s"
                color="text-2"
                translate={{
                  token: "v2.pages.legalNotice.common.terms.onlydust.description",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Typo
                size="xl"
                weight="medium"
                color="text-2"
                translate={{
                  token: "v2.pages.legalNotice.common.terms.access.title",
                }}
              />
              <Typo
                size="s"
                color="text-2"
                translate={{
                  token: "v2.pages.legalNotice.common.terms.access.description",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Typo
                size="xl"
                weight="medium"
                color="text-2"
                translate={{
                  token: "v2.pages.legalNotice.common.terms.responsability.title",
                }}
              />

              <div className="flex flex-col gap-2">
                <Typo size="s" color="text-2">
                  You can use the platform as a project leader or as a contributor.
                </Typo>

                <Typo size="s" color="text-2">
                  <span className="underline">If you are a contributor</span>, you will provide contributions from among
                  those proposed on the platform by the projects. You undertake to execute these contributions with the
                  highest level of diligence, in accordance with the specifications set out by the project. Rewards for
                  this contribution will not be systematic and will depend in part on how well the contribution is
                  executed. This evaluation will be carried out by the project leader and, except in cases of fraud,
                  Only Dust will not be directly involved.
                </Typo>

                <Typo size="s" color="text-2">
                  <span className="underline">If you are a Project Leader</span>, the project must be open-source and
                  useful for the community. You will be responsible for the project, and as such, you will have to
                  define the nature of the contributions required, assess their quality and determine the reward amount
                  to be paid to contributors. You can receive a grant depending on the merits of your project, which is
                  purely discretionary (will be taken by OD or by a committee of independent experts)
                </Typo>

                <Typo size="s" color="text-2">
                  <span className="underline">In both cases</span>, you must: (i) properly use our platform and refrain
                  from all fraudulent activity; (ii) give us valid information about your status, including whether you
                  act for a company or not; (iii) comply with the laws and regulations in force in the country in which
                  you are locateds.
                </Typo>

                <Typo size="s" color="text-2">
                  <span className="font-medium">What are Our responsibilities?</span> We undertake to provide you with
                  our platform and ensure its proper operation and transfer to contributors the rewards under the
                  conditions defined by the project leader.
                </Typo>

                <Typo size="s" color="text-2">
                  By using Our platform, You understand that we are not responsible for the interruption or breakdowns
                  of our platform; we are not your employer and the rewards that we transfer to you must not be
                  considered as a salary; we are not responsible for the amount of budget that is given to a project nor
                  for the amount of rewards that is given to contributors; and we are not responsible if the foundations
                  decide not to give us funds anymore.
                </Typo>
              </div>
            </div>
          </div>
        </ScrollView>
      </Paper>
    </div>
  );
}

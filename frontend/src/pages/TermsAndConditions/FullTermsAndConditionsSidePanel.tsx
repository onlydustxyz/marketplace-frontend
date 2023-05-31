import Card from "src/components/Card";
import SidePanel from "src/components/SidePanel";
import ParagraphNumber from "./ParagraphNumber";
import SectionSubTitle from "./SectionSubTitle";
import SectionTitle from "./SectionTitle";

interface FullTermsAndConditionsSidePanelProps {
  showFullTermsAndConditions: boolean;
  setShowFullTermsAndConditions: (showFullTermsAndConditions: boolean) => void;
}

export default function FullTermsAndConditionsSidePanel({
  showFullTermsAndConditions,
  setShowFullTermsAndConditions,
}: FullTermsAndConditionsSidePanelProps) {
  return (
    <SidePanel
      title="Full terms ans conditions"
      open={showFullTermsAndConditions}
      setOpen={setShowFullTermsAndConditions}
    >
      <div className="px-6 py-6 font-walsheim overflow-y-auto  scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded">
        <Card className="bg-noise-heavy">
          <p className="text-xl font-medium mb-2">LEGAL NOTICE</p>
          <p className="text-md mb-3">
            The platform onlydust.xyz is edited by Wagmi SAS, a French simplified joint stock company, registered with
            the trade and companies register of Paris under number 908 233 638, with registered offices located 34 rue
            des Bourdonnais, 75001 Paris, France.
          </p>
          <p className="text-md mb-3">The director of publication is Gregoire Gambatto.</p>
          <p className="text-md mb-3">Contact : admin@onlydust.xyz</p>
          <p className="text-md mb-3">The platform is hosted by Gandi</p>
        </Card>
        <div className="flex flex-col divide-greyscale-50/12 divide-y gap-4 mt-8 font-medium mb-8">
          <p className="text-md">TABLE OF CONTENTS</p>
          <p className="pt-4">1. Definitions</p>
          <p className="pt-4">2. Purpose and scope</p>
          <p>
            <p className="pt-4">3. Acceptance and amendment</p>
            <ol className="ml-6 mb-4 font-normal mt-2">
              <li>3.1 Acceptance</li>
              <li>3.2 Amendment</li>
            </ol>
          </p>
          <p className="pt-4">4. Access to the Platform</p>
          <p>
            <p className="pt-4">5. Services </p>
            <ol className="ml-6 mb-4 font-normal mt-2">
              <li>5.1 Platform</li>
              <li>5.2 Projects</li>
              <li>5.3 Grants</li>
            </ol>
          </p>
          <p>
            <p className="pt-4">6. Commitments</p>
            <ol className="ml-6 mb-4 font-normal mt-2">
              <li>6.1 Wagmi’s commitments</li>
              <li>6.2 User’s commitments</li>
              <ol className="ml-6 mb-4 font-thin text-sm mt-2">
                <li>6.2.1 Use of the Platform</li>
                <li>6.2.2 Performance of the Projects</li>
                <li>6.2.3 Legal and administrative formalities</li>
                <li>6.2.4 Specific commitments of Project Leaders</li>
              </ol>
            </ol>
          </p>
          <p className="pt-4">7. Liability</p>
          <p>
            <p className="pt-4">8. Duration, suspension and termination</p>
            <ol className="ml-6 mb-4 font-normal mt-2">
              <li>8.1 Duration</li>
              <li>8.2 Suspension</li>
              <li>8.3 Termination</li>
            </ol>
          </p>
          <p className="pt-4">9. Hyperlinks</p>
          <p className="pt-4">10. Intellectual property</p>
          <p>
            <p className="pt-4">11. Miscellaneous</p>
            <ol className="ml-6 mb-4 font-normal mt-2">
              <li>11.1 Nullity</li>
              <li>11.2 Assignment</li>
            </ol>
          </p>
          <p>
            <p className="pt-4">12. Disputes</p>
            <ol className="ml-6 mb-4 font-normal mt-2">
              <li>12.1 Disputes</li>
              <li>12.2 Governing Law and Jurisdiction</li>
            </ol>
          </p>
        </div>
        <div>
          <SectionTitle num={1} title="Definitions" />
          <p className="italic pb-3">
            Where drafted in upper case, whether written in singular or plural, the following definitions are applicable
            to the entire T&Cs.
          </p>
          <table>
            <tr>
              <td>Community</td>
              <td>refers to members of the open source community.</td>
            </tr>
            <tr>
              <td>Contributors</td>
              <td>refers to the persons developing the Projects.</td>
            </tr>
            <tr>
              <td>Grants</td>
              <td>refers to the funds granted by the Partner to the Contributors through the Platform.</td>
            </tr>
            <tr>
              <td>Partners</td>
              <td>refers to the persons funding the Projects.</td>
            </tr>
            <tr>
              <td>Project Leaders</td>
              <td>refers to the person in charge of a Project.</td>
            </tr>
            <tr>
              <td>Parties</td>
              <td>refers to the Users and Wagmi.</td>
            </tr>
            <tr>
              <td>Platform</td>
              <td>refers to onlydust.xyz, including all its subdomains. </td>
            </tr>
            <tr>
              <td>Projects</td>
              <td>refers to the open source solutions developed on blockchain ecosystems by Contributors.</td>
            </tr>
            <tr>
              <td>Reporting</td>
              <td>
                refers to the report made on the Platform by Contributors or Project Leaders, indicating the time spent
                on the development of a Project and the related github file(s).
              </td>
            </tr>
            <tr>
              <td>Services</td>
              <td>refers to the intermediation services performed by the Company, as described in these T&Cs.</td>
            </tr>
            <tr>
              <td>Wagmi</td>
              <td>refers to Wagmi SAS, as identified in the front page of the document. </td>
            </tr>
            <tr>
              <td>User</td>
              <td>refers to Contributors and Project Leaders accessing the Platform or using the Services. </td>
            </tr>
          </table>
          <SectionTitle num={2} title="Purpose and scope" />
          <p className="pt-3">
            <ParagraphNumber num={1} /> The purpose of the T&Cs is to define the conditions under which the Services are
            provided by Wagmi to Users. The purpose of the Services is to reward open source developments done by
            Contributors participating in the development of blockchain ecosystems.
          </p>
          <p className="pt-3">
            <ParagraphNumber num={2} /> For the provision of the Services, Wagmi solely acts as an intermediary between
            Partners and Contributors/Project Leaders. Due to this role of intermediary, the relationship between Wagmi
            and Contributors/Project Leaders cannot in any case be qualified as an employment relationship and no
            employment contract should be deducted from these T&Cs.
          </p>
          <p className="pt-3">
            <ParagraphNumber num={3} /> As such, the Grants given to Contributors do not constitute in any case a salary
            within the meaning of labor law.
          </p>
          <p className="pt-3">
            <ParagraphNumber num={4} /> Moreover, any relationship of any kind that may arise (i) between Contributors,
            (ii) between Contributors and Project Leaders, and (ii) between Partners, Contributors and/or Project
            Leaders does not fall within the scope of the T&Cs.
          </p>
          <SectionTitle num={3} title="Acceptance and amendment" />
          <SectionSubTitle num={3} subNum={1} title="Acceptance" />
          <p className="pt-3">
            <ParagraphNumber num={5} /> In order to be able to use the Services Users agree to fully and unconditionally
            accept these T&Cs by ticking the relevant case on the Platform. The T&Cs are accessible at any time on the
            Platform and Users should read these T&Cs carefully before accepting them.
          </p>
          <SectionSubTitle num={3} subNum={2} title="Amendment of the T&Cs and evolution of the Services" />
          <p className="pt-3">
            <ParagraphNumber num={6} /> In order to improve their features and quality, Wagmi may regularly modify the
            Platform and the Services. In particular, Wagmi may add, remove or replace certain functions at any time.
          </p>
          <p className="pt-3">
            <ParagraphNumber num={7} /> Therefore, Wagmi may modify the T&Cs from time to time. Users will be informed
            of changes fifteen (15) days before the new version comes into force.
          </p>
          <p className="pt-3">
            <ParagraphNumber num={8} /> During this period, Users may terminate the T&Cs by any means provided that they
            complete any commitment to which they have already agreed.
          </p>
          <SectionTitle num={4} title="Access to the Platform" />
          <p className="pt-3">
            <ParagraphNumber num={9} /> The Services are accessible:
            <ol>
              <li>
                i) to any natural person who has full legal capacity to enter into commitments under these T&Cs. A
                natural person who does not have full legal capacity may only access the Platform and the Services with
                the consent of his/her legal representative;
              </li>
              <li>
                ii) to any legal entity acting through a natural person who has the legal capacity to enter into a
                contract in the name and on behalf of such legal entity.
              </li>
            </ol>
          </p>
          <p className="pt-3">
            <ParagraphNumber num={10} /> Any natural person who accepts the T&Cs in the name and on behalf of a legal
            entity acknowledges that he/she is authorized to do so. The legal entity may in no case be released from its
            obligations on the grounds that the natural person did not have the authority to commit himself/herself.
          </p>
          <p className="pt-3">
            <ParagraphNumber num={11} /> Users must provide all information required by Wagmi to use the Services. Any
            incomplete registration will not be validated. Wagmi reserves the right to verify the information provided
            and to refuse any invalid and/or incomplete registration request. Users will not be entitled to any
            compensation in this respect.
          </p>
          <SectionTitle num={5} title="Services" />
        </div>
      </div>
    </SidePanel>
  );
}

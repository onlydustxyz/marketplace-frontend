import Card from "src/components/Card";
import SidePanel from "src/components/SidePanel";
import List from "./List";
import Paragraph from "./Paragraph";
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
          <p className="text-md mb-3">
            Contact : <a href="mailto:admin@onlydust.xyz">admin@onlydust.xyz</a>
          </p>
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
          <Paragraph>
            <ParagraphNumber num={1} /> The purpose of the T&Cs is to define the conditions under which the Services are
            provided by Wagmi to Users. The purpose of the Services is to reward open source developments done by
            Contributors participating in the development of blockchain ecosystems.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={2} /> For the provision of the Services, Wagmi solely acts as an intermediary between
            Partners and Contributors/Project Leaders. Due to this role of intermediary, the relationship between Wagmi
            and Contributors/Project Leaders cannot in any case be qualified as an employment relationship and no
            employment contract should be deducted from these T&Cs.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={3} /> As such, the Grants given to Contributors do not constitute in any case a salary
            within the meaning of labor law.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={4} /> Moreover, any relationship of any kind that may arise (i) between Contributors,
            (ii) between Contributors and Project Leaders, and (ii) between Partners, Contributors and/or Project
            Leaders does not fall within the scope of the T&Cs.
          </Paragraph>
          <SectionTitle num={3} title="Acceptance and amendment" />
          <SectionSubTitle num={3} subNum={1} title="Acceptance" />
          <Paragraph>
            <ParagraphNumber num={5} /> In order to be able to use the Services Users agree to fully and unconditionally
            accept these T&Cs by ticking the relevant case on the Platform. The T&Cs are accessible at any time on the
            Platform and Users should read these T&Cs carefully before accepting them.
          </Paragraph>
          <SectionSubTitle num={3} subNum={2} title="Amendment of the T&Cs and evolution of the Services" />
          <Paragraph>
            <ParagraphNumber num={6} /> In order to improve their features and quality, Wagmi may regularly modify the
            Platform and the Services. In particular, Wagmi may add, remove or replace certain functions at any time.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={7} /> Therefore, Wagmi may modify the T&Cs from time to time. Users will be informed
            of changes fifteen (15) days before the new version comes into force.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={8} /> During this period, Users may terminate the T&Cs by any means provided that they
            complete any commitment to which they have already agreed.
          </Paragraph>
          <SectionTitle num={4} title="Access to the Platform" />
          <Paragraph>
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
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={10} /> Any natural person who accepts the T&Cs in the name and on behalf of a legal
            entity acknowledges that he/she is authorized to do so. The legal entity may in no case be released from its
            obligations on the grounds that the natural person did not have the authority to commit himself/herself.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={11} /> Users must provide all information required by Wagmi to use the Services. Any
            incomplete registration will not be validated. Wagmi reserves the right to verify the information provided
            and to refuse any invalid and/or incomplete registration request. Users will not be entitled to any
            compensation in this respect.
          </Paragraph>
          <SectionTitle num={5} title="Services" />
          <SectionSubTitle num={5} subNum={1} title="Platform" />
          <Paragraph>
            <ParagraphNumber num={12} /> Wagmi operates the Platform, a digital infrastructure aiming at optimizing the
            funding of open source Projects. The role of Wagmi is limited to the operation of the Platform, the
            selection of the Projects and the allocation of the Grants.
          </Paragraph>
          <SectionSubTitle num={5} subNum={2} title="Projects" />
          <Paragraph>
            <ParagraphNumber num={13} /> The Projects available are listed on the Platform. Contributors and Project
            Leaders should select Projects according to their skills.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={14} /> Users understand that the number of Projects is limited. Wagmi does not
            guarantee a minimum number of Projects listed on its Platform.
          </Paragraph>
          <SectionSubTitle num={5} subNum={3} title="Grants" />
          <Paragraph>5.3.1 Decision of the Community</Paragraph>
          <Paragraph>
            <ParagraphNumber num={15} /> The Grants are provided by Partners on a discretionary basis. The amount of
            Grants to be attributed to a Project is decided by the Community.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={16} /> Based on the decision of the Community, Wagmi will allocate a minimum amount of
            Grants to Projects. If the first amount of Grants allocated is not sufficient to finalize the Project, the
            Community will be consulted and will decide whether or not to allocate a second amount of Grants.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={17} /> The Grants will be attributed by the Community to the Contributors according,
            among other criteria, to: the characteristics of the Projects and its utility for the ecosystem.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={18} /> Wagmi is not responsible for the amounts of Grants allocated for each Project.
            The decision of the Community not to reallocate Grants may not give rise to any compensation whatsoever by
            Wagmi to Contributors.
          </Paragraph>
          <Paragraph>5.3.2 Transfer by Wagmi</Paragraph>
          <Paragraph>
            <ParagraphNumber num={19} /> Grants will be transferred by Wagmi to Contributors subject to the following
            cumulative conditions:
            <List>
              <li>the acceptance of the T&Cs;</li>
              <li>the acceptance of the Project by the Contributor or the Project Leader;</li>
              <li>the Reporting on the Platform by the Project Leader of the developments made for the Project;</li>
              <li>the validation of the Reporting by the Community.</li>
            </List>
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={20} /> Users understand that, when a Project Leader is in charge of a Project, he is
            the one deciding the repartition of the Grants among Contributors.
          </Paragraph>
          <SectionTitle num={6} title="Commitments" />
          <SectionSubTitle num={6} subNum={1} title="Wagmi's commitments" />
          <Paragraph>
            <ParagraphNumber num={21} /> Wagmi undertakes to perform its obligations with the care normally expected
            from a professional in his field and to comply with the professional customs in force.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={22} /> Wagmi will make its best efforts to make the Services and the Platform
            available to the Users and ensure its accessibility and proper operation. Wagmi undertakes to ensure that
            the Platform is accessible 24/7, except in the event of (i) force majeure or unforeseeable and unavoidable
            behavior on the part of a third party or a third-party service or (ii) potential breakdowns, maintenance
            interventions and updates required for the proper operation of the Platform.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={23} /> Wagmi can only be held to an obligation of best endeavor for the operation of
            the Platform. Access to the Platform and use of the Services is at the User&apos;s own risk, and the
            Services and the Platform are provided on an &quot;as is&quot; and &quot;as available&quot; basis without
            warranty of any kind, either express or implied, except as otherwise provided by law.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={24} /> To the fullest extent permitted by law, Wagmi does not represent or warrant
            that (i) access to or use of the Services or the Platform will be uninterrupted, timely, secure or
            error-free; (ii) data provided by the Services or on the Platform will always be accurate; (iii) the
            Services are free of malware or other harmful components.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={25} /> In particular, unless otherwise provided by law or regulation, Wagmi shall not
            be held liable for:
            <List>
              <li>
                breakdowns or malfunctions of the Platform or Services lasting less than 24 hours or that are not the
                responsibility of Wagmi;
              </li>
              <li>an unusual or illegal use of the Services by a third party or a User;</li>
              <li>harmful or unintended consequences of the operation of third party services;</li>
              <li>a malfunction or cyberattack;</li>
              <li>any case of force majeure within the meaning of Article 1218 of the French Civil Code.</li>
            </List>
          </Paragraph>
          <SectionSubTitle num={6} subNum={2} title="User’s commitments " />
          <Paragraph>6.2.1 Use of the Platform</Paragraph>
          <Paragraph>
            <ParagraphNumber num={26} /> Users agree and guarantee:
            <List>
              <li>to comply with the laws and regulations in force in the country in which they are located;</li>
              <li>to refrain from all kind of fraudulent activities;</li>
              <li>
                that they are of legal age or have obtain a legal representative authorisation and supervision and have
                the capacity to enter into an agreement with Wagmi and as the case may be with other Users, in
                accordance with the laws of the country in which they are located;
              </li>
              <li>
                to provide information that is truthful, accurate and free from error when interacting in and with the
                Platform and the Services, to keep this information up-to-date throughout their time using the Platform
                and the Services and to publish content that meets these same requirements;
              </li>
              <li>to use the Platform and the Services in accordance with its intended purpose and objective.</li>
            </List>
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={27} /> Users understand and accept that the following acts are strictly prohibited:
            <List>
              <li>
                any behavior that disrupts, suspends, slows or prevents the continuity of the Platform and Services;
              </li>
              <li>
                any intrusion or attempted intrusion into Wagmi&apos;s information systems or infringement of the
                security and authentication measures;
              </li>
              <li>any act infringing Wagmi&apos;s rights and financial interests, whether commercial or legal;</li>
              <li>
                any copying and/or misappropriation of the Platform and more generally any misuse of the Platform;
              </li>
              <li>any infringement of Wagmi’s intellectual property rights.</li>
            </List>
          </Paragraph>
          <Paragraph>6.2.2 Performance of the projects</Paragraph>
          <Paragraph>
            <ParagraphNumber num={28} /> Users undertake to perform their obligations with the care normally expected
            from a professional in his field or from a duly responsible person and to comply with the customs in force.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={29} /> Users understand and agree that they are solely responsible for the correct
            development of the Projects assigned to them.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={30} /> Users undertake to Report their time passed on the development of a Project on
            the Platform.
          </Paragraph>
          <Paragraph>6.2.3 Legal and administrative formalities</Paragraph>
          <Paragraph>
            <ParagraphNumber num={31} /> Users are solely responsible for the proper completion of all administrative,
            fiscal and social formalities and for all payments of contributions, taxes or duties of any kind that they
            are responsible for, where applicable, in connection with their use of the Services.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={32} /> They are also responsible for complying with the regulations applicable to the
            contractual relationship to which they are a party.
          </Paragraph>
          <Paragraph>6.2.4 Specific commitments of Project Leaders</Paragraph>
          <Paragraph>
            <ParagraphNumber num={33} /> Project Leaders undertake to:
            <List>
              <li>manage the Contributors and the Projects;</li>
              <li>report on the Platform the Contributors’ developments made for the Project;</li>
              <li>manage the amount of Grant allocated to each Contributor;</li>
              <li>comply with all legal, administrative, fiscal and social requirements attached to such a role.</li>
            </List>
          </Paragraph>
          <Paragraph>6.2.5 Specific commitments of companies</Paragraph>
          <Paragraph>
            <ParagraphNumber num={34} />
            All legal entities acting through a natural person undertake to:
            <List>
              <li>notify Wagmi of the company’s existence and legal information;</li>{" "}
              <li>designate a natural person responsible for the Reporting; and</li>{" "}
              <li>Report on the name of the company.</li>
            </List>
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={35} /> The Grants will be allocated to the company upon presentation to Wagmi of an
            invoice made in the name of such company.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={36} /> As for all Users, companies responsible for the proper completion of all
            administrative, fiscal and social formalities and for all payments of contributions, taxes or duties of any
            kind that they are responsible for, where applicable, in connection with their use of the Services.
          </Paragraph>
          <SectionTitle num={7} title="Liability" />
          <SectionSubTitle num={7} subNum={1} title="Wagmi's liability" />
          <Paragraph>
            <ParagraphNumber num={37} /> Unless otherwise provided by law, where Wagmi’s liability may be established by
            Users, taking into account the free nature of the Services, Wagmi’s liability will not exceed 500 Euros. For
            residents of the European Union, consumer rules may contain more favorable provisions, in which case such
            provisions will apply.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={38} /> Wagmi may only be obliged to the reparation of direct damages caused by a
            breach related to the provision of the Platform and the Services. Wagmi will not be held liable for any
            other damages and losses suffered by the User, in particular indirect damages (including but not limited to,
            earning or profit losses, commercial damages, the consequences of complaints, actions, claims of third
            parties against the User) even where Wagmi has been informed of their occurrence.
          </Paragraph>
          <SectionSubTitle num={7} subNum={2} title="User’s liability " />
          <Paragraph>
            <ParagraphNumber num={39} />
            The User guarantees Wagmi against any complaints, claims, actions and/or demands that Wagmi may suffer as a
            result of the User's breach of any of his/her obligations under these T&Cs. The User undertakes to indemnify
            Wagmi for any damage suffered as a result of such a breach.
          </Paragraph>
          <SectionTitle num={8} title="Duration, suspension and termination" />
          <SectionSubTitle num={8} subNum={1} title="Duration" />
          <Paragraph>
            <ParagraphNumber num={40} /> The T&Cs are entered into for an indefinite term. The T&Cs shall stay in force
            as long as the User accesses and use the Platform or the Services.
          </Paragraph>
          <SectionSubTitle num={8} subNum={2} title="Suspension" />
          <Paragraph>
            <ParagraphNumber num={41} />
            If a User breaches the T&Cs Wagmi may temporarily and without prior notice suspend access to the Platform
            and the Services.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={42} />
            After an investigation period during which Wagmi shall verify the truth of the alleged violations, access to
            the Platform and/or to the Services may be restored or the T&Cs may be terminated in accordance with the
            terms below.
          </Paragraph>
          <SectionSubTitle num={8} subNum={3} title="Termination" />
          <Paragraph>
            <ParagraphNumber num={43} /> Users may terminate these T&Cs at any time by sending an email to the following
            email address: <a href="mailto:admin@onlydust.xyz">admin@onlydust.xyz</a>. After doing so, Users shall not
            access the Platform and use the Services, unless they accept the T&Cs again.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={44} /> In the event of a change in the applicable regulations affecting the capacity
            of Wagmi or its employees to execute the Services the T&Cs will automatically be terminated.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={45} /> Without prejudice to any other action, Wagmi may terminate these T&Cs and block
            the User’s access to the Platform in case of material breach of these T&Cs and in particular in case of a
            breach of the sections entitled “Commitments” and “Intellectual Property”.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={46} /> Moreover, if the Partners decide to stop the allocation of Grants to Projects,
            the T&Cs will automatically end for all Contributors and Project Leaders involved in such Projects.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={47} /> Termination of the T&Cs shall not result, in any event, in any compensation
            from Wagmi to a User.
          </Paragraph>
          <SectionTitle num={9} title="Hyperlinks" />
          <Paragraph>
            <ParagraphNumber num={48} /> The Platform may contain links or content redirecting to third-party websites
            or resources, which may be subject to different policies. Wagmi is not responsible for the content available
            through such links.
          </Paragraph>
          <SectionTitle num={10} title="Intellectual property" />
          <Paragraph>
            <ParagraphNumber num={49} /> The Platform and all its functionalities, the Services, and more broadly any
            content generated by Wagmi are Wagmi's sole intellectual property and are protected by all intellectual
            property rights in force.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={50} /> Any use, reproduction or representation in any form of the Platform, the
            Services or any of Wagmi’s content without express written permission is strictly prohibited.
          </Paragraph>
          <SectionTitle num={11} title="Miscellaneous" />
          <SectionSubTitle num={11} subNum={1} title="Nullity" />
          <Paragraph>
            <ParagraphNumber num={51} /> If any provision of the T&Cs is annulled by a modification of legislation,
            regulation or by a court decision, the rest of the T&Cs will not be affected.
          </Paragraph>
          <SectionSubTitle num={11} subNum={2} title="Assignment" />
          <Paragraph>
            <ParagraphNumber num={52} /> Users may not assign or transfer the T&Cs to a third party without the prior
            written consent of Wagmi.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={53} /> In the event of (i) a merger by formation of a new company, contribution,
            partial contribution of assets, merger by acquisition, asset spin-off, or any other operation entailing a
            universal transfer of Wagmi’s assets or (ii) any operation entailing a direct or indirect change of control
            affecting Wagmi, the contractual relations will persist without it being necessary to inform or obtain the
            consent of the Users.
          </Paragraph>
          <SectionTitle num={12} title="Disputes" />
          <SectionSubTitle num={12} subNum={1} title="Disputes" />
          <Paragraph>
            <ParagraphNumber num={54} /> Any dispute in relation to the use of the Platform and the Services shall be
            submitted to Wagmi by sending an email to <a href="mailto:admin@onlydust.xyz">admin@onlydust.xyz</a>.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={55} /> All complaints, disputes or claims about the relation to other Contributors or
            Lead Projects should be directed to such a person.
          </Paragraph>
          <SectionSubTitle num={12} subNum={2} title="Governing Law and Jurisdiction" />
          <Paragraph>
            <ParagraphNumber num={56} /> The T&Cs are governed by and interpreted according to French laws, except
            French conflict-of-law rules. For residents of the European Union, consumer rules may contain more favorable
            provisions, in which case such provisions will apply.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={57} /> In compliance with article L.616-2 of the French Consumer Code, consumers may
            use the EU Commission’s mediation service which has the purpose of collecting claims from EU consumers and
            transmitting their cases to national mediators.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={58} /> This service may be accessed following this{" "}
            <a href="europa.eu/consumers">link</a>
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={59} /> Unless otherwise provided by the law, any conflict or dispute related to the
            validity, the interpretation, performance, and/or termination of the T&Cs must be submitted to the exclusive
            jurisdiction of the Paris courts.
          </Paragraph>
          <Paragraph>
            <ParagraphNumber num={60} /> Non-professional EU residents may submit any dispute related to the T&Cs in the
            jurisdiction where they were living at the moment of the acceptance of the T&Cs or in the jurisdiction where
            the damage occurred.
          </Paragraph>
        </div>
      </div>
    </SidePanel>
  );
}

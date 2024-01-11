import Card from "src/components/Card";
import SidePanel from "src/components/SidePanel";
import List from "./List";
import Paragraph from "./Paragraph";
import ParagraphNumber from "./ParagraphNumber";
import SectionSubTitle from "./SectionSubTitle";
import SectionTitle from "./SectionTitle";

interface PrivacyPolicySidePanelProps {
  showPrivacyPolicy: boolean;
  setShowPrivacyPolicy: (showPrivacyPolicy: boolean) => void;
}

export default function PrivacyPolicySidePanel({
  showPrivacyPolicy,
  setShowPrivacyPolicy,
}: PrivacyPolicySidePanelProps) {
  return (
    <SidePanel open={showPrivacyPolicy} setOpen={setShowPrivacyPolicy}>
      <div className="mr-1 flex h-full min-h-0 flex-col gap-7 divide-y divide-greyscale-50/12  overflow-y-auto pl-6 pr-5 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <div className="flex flex-col gap-3 pt-9 font-normal text-greyscale-50">
          <div className="font-walsheim">JUNE 2023</div>
          <div className="font-belwe text-2xl">Privacy Policy</div>
        </div>
        <div className="py-6 font-walsheim">
          <Card className="bg-noise-heavy" withBg={false}>
            <p className="mb-2 text-xl font-medium">LEGAL NOTICE</p>
            <p className="text-md mb-3">
              Onlydust.xyz is an online service edited by Wagmi SAS, a French simplified joint stock company registered
              in the trade and companies register of Paris under number 908 233 638, headquartered at 34 rue des
              Bourdonnais, 75001 Paris, France.
            </p>
            <p className="text-md mb-3">
              The purpose of this document is to provide information regarding the processing of personal data by the
              Company in compliance with article 13 of the GDPR.
            </p>
            <p className="text-md mb-3">
              For all questions or requests, you may contact us at the following email address:{" "}
              <a href="mailto:admin@onlydust.xyz">admin@onlydust.xyz</a>.
            </p>
            <p></p>
          </Card>
          <div className="mb-8 mt-8 flex flex-col gap-4 divide-y divide-greyscale-50/12 font-medium">
            <p className="text-md">TABLE OF CONTENTS</p>
            <p className="pt-4">1. Definitions</p>
            <p className="pt-4">2. Foreword</p>
            <p>
              <p className="pt-4">3. Data We collect; purposes and legal basis</p>
              <ol className="mb-4 ml-6 mt-2 font-normal">
                <li>3.1 Data required to use the platform</li>
                <li>3.2 Data We collect from third-parties</li>
                <li>3.3 Data that You chose to provide to Us</li>
                <li>3.4 Information collected automatically when You use the Platform</li>
              </ol>
            </p>
            <p className="pt-4">4. Our role; other recipients</p>
            <p className="pt-4">5. Data storage</p>
            <p className="pt-4">6. Other information</p>
            <p className="pt-4">7. Your rights</p>
            <p className="pt-4">8. Security</p>
            <p className="pt-4">9. Cookies</p>
            <p className="pt-4">10. Amendment of the Privacy Policy</p>
          </div>
          <div>
            <SectionTitle num={1} title="Definitions" />
            <p className="pb-3">
              <ParagraphNumber num={1} /> Where drafted in upper case, whether singular or plural, the following
              definitions are applicable to the entire Privacy Policy.
            </p>
            <table>
              <tr>
                <td>Account</td>
                <td>
                  refers to a User’s dedicated and individualized digital interface on the Platform and granting access
                  to the Services.
                </td>
              </tr>
              <tr>
                <td>Cookie</td>
                <td>refers to a small file stored by a server in the terminal, as defined in this Privacy Policy.</td>
              </tr>
              <tr>
                <td>Personal Data</td>
                <td>
                  refers to any information relating to an identified or identifiable natural person, as defined in
                  article 4 of the GDPR.
                </td>
              </tr>
              <tr>
                <td>Platform</td>
                <td>refers to onlydust.xyz, including all its subdomains.</td>
              </tr>
              <tr>
                <td>The Company, We, Us, Our</td>
                <td>refers to Wagmi SAS, as identified in the Legal Notice.</td>
              </tr>
              <tr>
                <td>Service</td>
                <td>refers to the service provided by the Company, as described on the Platform and in the T&Cs.</td>
              </tr>
              <tr>
                <td>T&Cs</td>
                <td>refers to the terms and conditions applicable to the Service and available on the Platform.</td>
              </tr>
              <tr>
                <td>User, You, Your</td>
                <td>refers to any data subject to the collection and processing of Personal Data by the Company.</td>
              </tr>
            </table>
            <Paragraph>
              <ParagraphNumber num={2} /> Any term defined in article 4 of the GDPR and mentioned in this Privacy Policy
              shall have the same meaning.
            </Paragraph>
          </div>
          <div>
            <SectionTitle num={2} title="Foreword" />
            <Paragraph>
              <ParagraphNumber num={3} /> We believe that trust is the key to successful and lasting relationships. In
              this respect, the protection of Your Personal Data and privacy is no exception. For this reason, We take
              great care to collect and process Your Personal Data with the utmost care and in strict compliance with
              the applicable legal framework.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={4} /> In drafting this Privacy Policy and making it available to Our Users, We
              intend to fulfill Our duty to inform data subjects within the meaning of articles 13 and 14 of the
              Regulation EU (2016/679) of the EU Parliament and the Council of 27 April 2016 (the “GDPR”).
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={5} /> This Privacy Policy will describe how Your Personal Data is processed when You
              navigate on the Platform and use Our Service.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={6} /> We may amend this Privacy Policy from time to time, in which case We will
              update You by any available means, including by way of notification on the Platform.
            </Paragraph>
          </div>
          <div>
            <SectionTitle num={3} title="Data We collect; purposes and legal basis" />
            <SectionSubTitle num={3} subNum={1} title="Data required to use the Platform" />
            <Paragraph>
              <ParagraphNumber num={7} />
              <span className="text-bold"> Account creation. </span>Users must connect their GitHub account on the
              Platform to access the Service. For this purpose, We need to collect and process the following Personal
              Data:
            </Paragraph>
            <List>
              <li>GitHub Username;</li>
              <li>Email address.</li>
            </List>
            <Paragraph>
              <ParagraphNumber num={8} /> The legal basis for this processing is (i) Your consent and (ii) Our need to
              perform a contract to which You are a party (Our T&Cs).
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={9} />
              <span className="text-bold"> Provision of the Service. </span>As described in the T&Cs, the Service allows
              You to get funds for the development of projects. In order to allocate You such funds, We need to collect
              and process the following Personal Data:
              <List>
                <li>For natural persons:</li>
                <List>
                  <li>First and last name;</li>
                  <li>Postal address;</li>
                  <li>Bank details (IBAN and BIC numbers);</li>
                  <li>Phone number.</li>
                </List>
                <li>For legal persons:</li>
                <List>
                  <li>First name and last name of the legal representative;</li>
                  <li>Phone number of the legal representative;</li>
                  <li>Name of the legal entity;</li>
                  <li>Postal address of the legal entity.</li>
                </List>
              </List>
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={10} /> We will also process this Data to (i) detect and prevent fraud and other
              harmful activities, and (ii) to enforce our agreements with third parties and (iii) enforce our T&Cs.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={11} /> The legal basis for this processing is Our need to perform a contract to
              which You are a party (Our T&Cs).
            </Paragraph>
            <SectionSubTitle num={3} subNum={2} title="Data We collect from third-parties" />
            <Paragraph>
              <ParagraphNumber num={12} />
              <span className="text-bold"> Additional Account information. </span>You can give Us access to the
              information of Your GitHub profile. If You do not want to give us such an access, You can modify Your
              confidentiality set up on Github. Such additional information could include for example Your phone number
              associated with Your Telegram account, Your Twitter account URL and Your Discord username.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={13} /> Some of this information, as indicated in your account settings, is part of
              your public GitHub profile page and will therefore be publicly visible through the Platform.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={14} /> We only collect that information with Your consent.
            </Paragraph>
            <SectionSubTitle num={3} subNum={3} title="Data that You chose to provide to Us" />
            <Paragraph>
              <ParagraphNumber num={15} />
              <span className="text-bold"> Communications. </span>We collect and process Personal Data in order to
              respond to any questions, requests or feedback that Users may submit to us, including:
              <List>
                <li>Identification information (email address, first and last name);</li>
                <li>The content of the message that You send to Us.</li>
              </List>
            </Paragraph>

            <Paragraph>
              <ParagraphNumber num={16} /> This processing is based on Your consent and Our legitimate interest in
              managing Our relationship with You.
            </Paragraph>
            <SectionSubTitle num={3} subNum={4} title="Information collected automatically when You use the Platform" />
            <Paragraph>
              <ParagraphNumber num={17} />
              <span className="text-bold"> Navigational information. </span> In order to enhance the User experience, We
              need to understand Your interactions with the Services. We may use the following Data to perform
              analytics, debug, and conduct research on the performance of Our Platform and You use of the Service:
              <List>
                <li>Unique identifiers (browser type and settings, device type and settings, operating system);</li>
                <li>Interaction information (IP address, system activity, date and time of the requests);</li>
                <li>Pages and services You browse on the Platform.</li>
              </List>
            </Paragraph>

            <Paragraph>
              <ParagraphNumber num={18} /> To do so, We rely on Our legitimate interest to (i) understand how Our
              Platform is browsed by Users; and (ii) improve the Platform based on such Data.
            </Paragraph>
            <SectionTitle num={4} title="Our role; other recipients" />
            <Paragraph>
              <ParagraphNumber num={19} /> The Company acts as a data controller regarding User’s Personal Data.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={20} /> We share Your Personal Data with service providers who assist Us in
              fulfilling the purposes specified in this Privacy Policy. As Our subcontractors, such service providers
              may have access to Your Personal Data for the sole purpose of carrying out the specific tasks assigned to
              them. Our service providers are:
              <List>
                <li>
                  Datadog for monitoring our Platform. For this purpose, we share the following Personal Data:
                  Navigational information.For more information You can consult Datadog’s privacy policy.
                </li>
                <li>
                  Amazon Web Services and Heroku for Data storage. For this purpose we share the following Personal
                  Data: all Data listed in section 3. For more information on those providers, You can consult:
                </li>
                <List>
                  <li>AWS privacy policy; and</li>
                  <li>Heroku’s statement for the protection of EU Personal Data.</li>
                </List>
              </List>
            </Paragraph>

            <Paragraph>
              <ParagraphNumber num={21} /> Where appropriate, We will share Your Personal Data with the relevant courts
              and any other governmental and/or public authority requesting access to Personal Data, to the extent
              legally permitted.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={22} /> In any event, We will only disclose Your Personal Data to the above-mentioned
              recipients on a strict need-to-know basis and only to the extent necessary to achieve the identified
              processing purposes.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={23} /> When possible, the Data We collect from You is stored and processed at data
              centers in the European Union. However, in the cases set forth above, your Data may be transferred to
              countries located outside of the European Union who provide an equivalent level of protection. In the
              event of transfer to other countries, the protection of your Data will be ensured by adequate safeguards
              such as the signature of standard contractual clauses approved by the European Commission.
            </Paragraph>
            <SectionTitle num={5} title="Data storage" />
            <Paragraph>
              <ParagraphNumber num={24} /> We will store Personal Data as long as You use the Platform and more broadly
              any of Our Services.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={25} /> Once Your Account has been inactive for a certain period of time, or If You
              choose to delete Your online Account or end Our relationship in any manner, We will nevertheless keep and
              store Your Personal Data for a certain period of time.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={26} /> We will keep Your Personal Data at least 3 years after the end of Our
              relationship (materialized, for instance, by the deletion of Your Account), for various legal reasons,
              including statute of limitation rules and potential litigation where We may be involved and where We might
              need Your Personal Data.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={27} /> If We consider that it is not necessary to keep Your Personal Data in Our
              active database, We will archive it and ensure that access to it is restricted to a limited number of
              persons with a genuine need to access the Personal Data.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={28} /> This includes, at the moment, all of the Personal Data We process.
            </Paragraph>
            <SectionTitle num={6} title="Other information" />
            <Paragraph>
              <ParagraphNumber num={29} /> Users are never compelled to provide Personal Data that We may request.
              However, We draw Your attention to the fact that if You refuse, access to the Services may be limited,
              suspended or impossible.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={30} /> In any event, and regardless of the purpose of the processing in question, We
              will adhere to a strict principle of data minimisation and will therefore only collect and process
              Personal Data that is necessary for the purposes mentioned above.
            </Paragraph>
            <SectionTitle num={7} title="Your rights" />
            <Paragraph>
              <ParagraphNumber num={31} /> Users are informed that they have the following rights regarding the
              processing of their Personal Data, under the conditions provided for in articles 15 to 22 of the GDPR:
              <List>
                <li>A right of access to the Personal Data We collect;</li>
                <li>A right to the rectification and/or erasure of the Personal Data We collect;</li>
                <li>A right to the restriction of the processing;</li>
                <li>A right to Personal Data portability.</li>
              </List>
            </Paragraph>

            <Paragraph>
              <ParagraphNumber num={32} /> According to French privacy laws (articles 84 to 86 of Act n°78-17 of 6
              January 1978), Users also have the right to specify instructions defining how We shall manage Person Data
              after their death under the conditions of such law.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={33} /> Although You have rights, the exercise of such rights is not unlimited; each
              of the rights offered by the GDPR may be subject to specific conditions.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={34} />
              This being said, in order to exercise their rights or for any question on privacy, Users shall make a
              request accompanied by a proof of their identity by email at{" "}
              <a href="mailto:admin@onlydust.xyz">admin@onlydust.xyz</a>.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={35} /> We will process the requests within a reasonable timeframe taking into
              account the complexity and the number of requests. We shall strive to reply without undue delay and at the
              latest within two weeks of receipt of the request. We may extend this period to one (1) month in the case
              of a complex request.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={36} /> The exercise of the rights offered by the GDPR are in practice free. However,
              where Your requests may involve important costs, You may have to bear some of them.
            </Paragraph>

            <Paragraph>
              <ParagraphNumber num={37} /> Finally, Users have the option to refer to the competent supervisory
              authority, the French Commission Nationale Informatique et Libertés (“CNIL”), in order to submit a claim.
              Contact information of the CNIL can be found on its website.
            </Paragraph>
            <SectionTitle num={8} title="Security" />
            <Paragraph>
              <ParagraphNumber num={38} /> We implement security measures to protect Your Personal Data, such as:
              <List>
                <li>Our database is encrypted by SSL;</li>
                <li>
                  All persons with access to Your Personal Data are bound by a duty of confidentiality and may be
                  subject to disciplinary action and/or other sanctions if they fail to comply with these obligations;
                </li>
                <li>
                  Data is hosted and processed on secure servers located within the European Union and operated by Our
                  subcontractors acting in accordance with the requirements of the GDPR.
                </li>
              </List>
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={39} /> In the event that the integrity, confidentiality or security of the User’s
              Personal Data is compromised, We undertake (i) to notify the CNIL of the breach within 24 hours of
              becoming aware of it and (ii) to inform the User concerned as soon as possible when the breach is likely
              to result in a high risk to the rights and freedoms of that person.
            </Paragraph>
            <SectionTitle num={9} title="Cookies" />
            <Paragraph>
              <ParagraphNumber num={40} /> A Cookie is a small computer file playing the same role as a tracker, stored
              and read for instance at the moment where a website is visited, an email is read or a mobile app is used,
              whatever the device used.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={41} /> In compliance with EU privacy regulations, Users are informed that
              “non-essential” Cookies may be deposited on their device without their consent. Non-essential Cookies
              include (i) Cookies having as their essential purpose to allow or enable electronic communications and
              (ii) are strictly necessary for the provision of online communication service.
            </Paragraph>
            <SectionTitle num={10} title="Amendment of the Privacy Policy" />
            <Paragraph>
              <ParagraphNumber num={1} /> We might review and update this Policy. Any changes We make will be posted on
              the Platform and, where appropriate, notified to You. Please check back frequently to see any updates or
              changes to Our Privacy Policy.
            </Paragraph>
            <Paragraph>
              <ParagraphNumber num={2} /> It is important that the Personal Data We hold about you is accurate and
              current. Please keep us informed if Your Personal Data changes during Your relationship with Us.
            </Paragraph>
          </div>
        </div>
      </div>
    </SidePanel>
  );
}

import { Typography } from "components/layout/typography/typography";

export function MandateDetailStack() {
  return (
    <div className="grid gap-4 px-6">
      <div className="border-b border-card-border-medium pb-4">
        <Typography variant={"title-m"} translate={{ token: "v2.pages.stacks.mandate.title" }} />
      </div>

      <div className="grid gap-10 p-6">
        <div className="grid gap-4">
          <h1 className="border-b border-card-border-medium pb-4 uppercase">Table of Contents</h1>
          <ul className="divide-y divide-card-border-medium">
            <li className="pb-4">
              <Typography variant={"body-m-bold"}>1. Definitions</Typography>
            </li>
            <li className="py-4">
              <Typography variant={"body-m-bold"}>2. Purpose and scope</Typography>
            </li>
            <li className="py-4">
              <Typography variant={"body-m-bold"}>3. Mandate free of charge</Typography>
            </li>
            <li className="py-4">
              <Typography variant={"body-m-bold"}>4. Duration</Typography>
            </li>
            <li className="py-4">
              <Typography variant={"body-m-bold"}>5. Company obligations</Typography>
            </li>
            <li className="py-4">
              <Typography variant={"body-m-bold"}>6. Contributor obligations</Typography>
            </li>
            <li className="grid gap-4 pt-4">
              <Typography variant={"body-m-bold"}>7. Miscellaneous provisions</Typography>

              <ul className="px-6">
                <li>7.1. Amendments to the Mandate</li>
                <li>7.2. Non-transferability of the Mandate</li>
                <li>7.3. Confidentiality</li>
                <li>7.4. Nullity and independence of clauses</li>
                <li>7.5. Applicable law and jurisdiction</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="prose-sm prose-invert rounded-2xl bg-card-background-heavy bg-noise-medium p-6 text-greyscale-50 marker:text-greyscale-50">
          <h3 className="uppercase">Legal notice</h3>

          <p>THIS INVOICING MANDATE AGREEMENT (the &quot;Agreement&quot;) is made between:</p>
          <p>
            1. Wagmi SAS, a French simplified joint stock company, registered with the Register of Trade and Companies
            of Paris under number 908 233 638, with registered offices located at 60 rue François 1er 75008 Paris,
            represented by Gregoire Gambatto, CEO, duly authorized for the purpose hereof
          </p>
          <p>hereinafter referred to as the &quot;Wagmi&quot; or the &quot;Company&quot;,</p>
          <p>And :</p>
          <p>
            2. The Contributor, the natural or legal persons providing Contributions on the digital platform named Only
            Dust (
            <a href="https://www.onlydust.xyz/" target="_blank" rel="noopener noreferrer">
              https://www.onlydust.xyz/
            </a>
            ).
          </p>
          <p>hereinafter referred to as the &quot;Contributor&quot;,</p>
          <p>hereinafter together referred to as the &quot;Parties&quot;,</p>
          <p>
            <span className="uppercase">Whereas</span> :
          </p>
          <p>
            A. The Company develops and operates a digital platform under the name Only Dust (
            <a href="https://www.onlydust.xyz/" target="_blank" rel="noopener noreferrer">
              https://www.onlydust.xyz/
            </a>
            ) which aims to optimize the funding of open source projects, specifically in the web3 industry, by matching
            open source projects seeking IT development contributions with developers having appropriate technical
            skills (the &quot;Platform&quot;).
          </p>
          <p>
            B. In order to simplify invoicing, the Company proposes to establish and issue invoices for the
            Contributions provided by the Contributor on the Platform as part of the Projects in accordance with the
            needs specified by the Project Leaders.
          </p>
          <p>
            C. In this context, the Contributor wishes to give the Company the present invoicing mandate under the terms
            of which she/he expressly agrees to entrust the Company with the traductions and issuance of invoices
            relating to the Contribution (hereinafter, the &quot;Mandate&quot;).
          </p>
          <p className="uppercase">Now, therefore, the company and the contributor agree as follows.</p>
        </div>

        <div className="prose prose-invert text-greyscale-50 marker:text-greyscale-50">
          <h3>1. Definitions</h3>
          <div className="px-6">
            <p>
              Capitalised terms used herein shall have the respective meanings specified below in this Article 1 or
              elsewhere in this Agreement.
            </p>

            <p>
              &quot;<b>Agreement</b>&quot; or &quot;<b>Mandate</b>&quot; refer to the present agreement, all its
              amendments and related schedules.
            </p>

            <p>
              &quot;<b>Beneficiary</b>&quot; refers to Wagmi or the beneficiary of the Contributions.
            </p>

            <p>
              “<b>Contributors</b>” refers to the natural or legal persons providing Contributions.
            </p>

            <p>
              &quot;<b>Contributions</b>&quot; refers to technical, commercial or marketing development services
              provided by Contributors as part of the Projects in accordance with the needs specified by the Project
              Leaders.
            </p>

            <p>
              &quot;<b>Invoices</b>&quot; refers to all invoices, original, initial and/or corrective, issued or to be
              issued relating to the Contribution.
            </p>

            <p>
              &quot;<b>Rewards</b>&quot; refers to the amount, in tokens or legal tender, as the case may be, paid by
              Wagmi, on behalf of or in the name and on behalf of the Partners, as the case may be, to the Contributors
              in respect of their Contribution;
            </p>

            <p>
              &quot;<b>Partners</b>&quot; refers to the natural persons promoting the development of a specific protocol
              and intending to reward Contributors of Projects built on the said protocol, on whose behalf Wagmi
              distributes Rewards.
            </p>

            <p>
              &quot;<b>Personal Space</b>&quot; refers to the personal space that each User can access on the Platform.
            </p>

            <p>
              &quot;<b>Platform</b>&quot; has the meaning ascribed to it in the Preamble.
            </p>

            <p>
              &quot;<b>Projects</b>&quot; refers to open source software projects built on the Protocol and selected by
              the Committee under the conditions set out in Article 4 of the T&Cs.
            </p>

            <p>
              &quot;<b>Project Leaders</b>&quot; refers to the person in charge of a Project selected by under the
              conditions set out in Article 4 of the T&Cs.
            </p>
          </div>

          <h3>2. Purpose and scope</h3>

          <div className="px-6">
            <p>
              The Contributor grants the Company, who accepts it, to issue, in his name and on his behalf, the Invoices
              and amending Invoices relating to the Contribution.
            </p>

            <p>This Mandate is drawn up in accordance with current regulations.</p>
          </div>

          <h3>3. Mandate free of charge</h3>

          <div className="px-6">
            <p>
              The Mandate, intended to facilitate the provision of the Contribution by the Contributor, is concluded
              free of charge.
            </p>
          </div>

          <h3>4. Duration</h3>

          <div className="px-6">
            <p>
              <b>Duration.</b> The Mandate is entered into for an indefinite term. The Mandate shall stay in force as
              long as the Contributor accesses and uses the Platform.
            </p>

            <p>
              <b>Termination.</b> Contributors may terminate the Mandate at any time by emailing the following email
              address:{" "}
              <a href="mailto:admin@onlydust.xyz" target="_blank" rel="noreferrer">
                admin@onlydust.xyz
              </a>
              . After doing so, the Contributor may continue to access the Platform and provide Contributions, but will
              need to establish and issue the Invoices.
            </p>

            <p>
              In the event of a change in the applicable regulations affecting the capacity of Wagmi or its employees to
              provide the Platform, the Agreement will automatically be terminated.
            </p>

            <p>
              Termination of the Agreement shall not result, in any event, in any compensation from Wagmi to a
              Contributor.
            </p>
          </div>

          <h3>5. Company obligations</h3>

          <div className="px-6">
            <p>The Company undertakes to:</p>

            <ul>
              <li>
                collect all the information required to establish Invoices in accordance with current French
                regulations;
              </li>
              <li>
                establish a draft Invoice intended for the Beneficiaries in respect of the Contributions provided by the
                Contributor, and to make it available to the Contributor electronically for validation; the final
                invoice will only be issued once it has been validated by the Contributor;
              </li>
              <li>
                establish, issue and send, in the name and on behalf of the Contributor, all the latter&apos;s Invoices
                for Contributions made via the Platform in accordance with the information available to it;
              </li>
              <li>
                ensure that Invoices mention{" "}
                <i>&quot;Invoice issued by Wagmi SAS in the name and on behalf of [Contributor]&quot;</i>;
              </li>
              <li>
                to provide the Contributor with a copy of all Invoices issued by Wagmi SAS in its name and on its
                behalf, and in any event, to provide the Contributor every month with a copy of each Invoice issued in
                its name and on its behalf for the previous month,
              </li>
              <li>
                to mention the Reward on the Invoice, it being specified that in the event that the Reward is in tokens,
                the Reward is determined by the Company by reference to the average daily price of these tokens as
                practised by the main digital asset exchange platforms on the day of payment of the token; and to
                mention the following: &quot;[number] [type of tokens] received and accepted in payment of this
                invoice&quot;
              </li>
              <li>
                issue a rectifying Invoice without delay in the event of a request to this effect from the Contributor,
              </li>
              <li>
                with regard to the numbering of Invoices, to use a chronological and continuous numbering sequence, or
                the numbering indicated by the Contributor so that the Invoices fit into the sequence used by him for
                the invoices he issues himself,
              </li>
              <li>
                to keep all Invoices issued in the name and on behalf of the Contributor for a minimum period of 5
                years.
              </li>

              <p> The Company is not responsible for :</p>

              <ul>
                <li>
                  compliance with any regulatory obligations of the Contributor , in particular those relating to the
                  fight against money laundering and the financing of terrorism;
                </li>
                <li>the tax consequences of issuing Invoices;</li>
                <li>
                  any loss or failure to fulfil its obligations due to force majeure as defined by the French courts.
                </li>
              </ul>
            </ul>
          </div>

          <h3>6. Contributor obligations</h3>

          <div className="px-6">
            <p>
              The Contributor acknowledges that she/he is solely responsible for its legal and tax obligations with
              regard to invoicing for Invoices issued by Wagmi in its name and on its behalf, and in particular with
              regard to its VAT reporting and payment obligations.
            </p>

            <p>
              In addition, the Contributor is solely responsible for determining the rules applicable to invoicing and
              for transmitting the information required to the Company so that it can establish Invoices in compliance
              with the applicable regulations, and in particular with regard to its liability to or exemption from VAT.
            </p>

            <p>
              In the event of any change in the information concerning him/her, and in particular concerning his/her
              professional identity or VAT liability, the Contributor undertakes to notify the Company of such changes
              as soon as possible. If he fails to do so, these changes may not be taken into account for the
              establishment of the Invoices.
            </p>

            <p>The Contributor expressly undertakes to :</p>

            <ul>
              <li>
                provide Company with all the information required by applicable regulations to appear on Invoices;
              </li>
              <li>
                where applicable, pay to the Tax Authorities the VAT mentioned on the Invoices established in his name
                and on his behalf; and
              </li>
              <li>
                inform the Company of any change in the information concerning the identification of its business.
              </li>
            </ul>

            <p>
              The Contributor undertakes to examine the draft Invoices drawn up by the Company and to accept them, or to
              request a correction where applicable, without delay from the time they are made available. The
              Contributor understands and accepts that final invoices will not be issued by the Company in the absence
              of express validation on its part.
            </p>

            <p>
              The Contributor undertakes to keep a copy of all Invoices issued by the Company in its name and on its
              behalf.
            </p>
          </div>

          <h3>7. Miscellaneous provisions</h3>

          <h4>7.1 Amendments to the Mandate</h4>

          <div className="px-6">
            <p>
              Any legislative or regulatory measures that would make it necessary to modify all or part of the present
              Mandate are applicable on the date they come into effect.
            </p>

            <p>
              The Parties agree that Wagmi may modify the T&Cs from time to time. Contributors will be informed of
              changes fifteen (15) days before the new version comes into force. During this period, Contributors may
              terminate the Mandate by any means provided that they complete any commitment to which they have already
              agreed.
            </p>
          </div>

          <h4>7.2 Non-transferability of the Mandate</h4>

          <div className="px-6">
            <p>
              As the Mandate is granted to the Company on a personal basis, the latter may not in any way assign,
              transfer or contribute to one or more third parties or to any legal entity whatsoever the mission which
              belongs to it by virtue of the Agreement, without the prior written agreement of the Contributor.
            </p>
          </div>

          <h4>7.3 Confidentiality</h4>

          <div className="px-6">
            <p>
              Confidential Information means any information that is not generally known or publicly available, whether
              or not it is marked as confidential. Confidential Information includes in particular (i) personal
              information disclosed by the Contributor to the Company, (ii) technical and commercial information
              disclosed by the Company to the Contributor, directly or indirectly, before or after the date of this
              Mandate.
            </p>

            <p>
              The Parties undertake, throughout the term of this Agreement and without limitation of time after its
              expiry, for any reason whatsoever, to maintain the strictest confidentiality, refraining from disclosing,
              directly or indirectly, the Confidential Information.
            </p>

            <p>The Parties undertake to ensure that all members of their staff comply with this obligation.</p>

            <p>
              In the event that a Party is required, in the context of civil, criminal or administrative proceedings, to
              disclose all or part of the Confidential Information of the other Party, it will inform the other Party
              without delay, if this is not contrary to applicable laws and regulations.
            </p>
          </div>

          <h4>7.4 Nullity and independence of clauses</h4>

          <div className="px-6">
            <p>
              The possible nullity of one or more clauses of the Mandate by a court decision, an arbitration ruling or
              by mutual agreement between the Parties shall not affect its other stipulations, which shall continue to
              produce their full and complete effect insofar as the general scheme of the Mandate can be safeguarded.
            </p>

            <p>
              Should this not be the case, or should the general scheme of the Mandate be fundamentally disrupted, the
              Parties may, by mutual agreement and in writing, declare the present Mandate null and void in its
              entirety.
            </p>
          </div>

          <h4>7.5 Applicable law and jurisdiction</h4>

          <div className="px-6">
            <p>
              The Mandate is governed by French law. In the absence of an amicable settlement, all disputes to which
              this agreement may give rise, in particular concerning its validity, interpretation or performance, shall
              be submitted to the exclusive jurisdiction of the competent court within the jurisdiction of the Paris
              Court of Appeal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

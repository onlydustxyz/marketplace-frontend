import { expect, Locator, Page } from "@playwright/test";
import { UserPayoutInfo } from "../types";
import { Identity, PayoutSettings, PersonIdentity } from "../__generated/graphql";

export class EditPayoutInfoPage {
  readonly page: Page;

  readonly accountTypeIndividualButton: Locator;
  readonly accountTypeCompanyButton: Locator;

  readonly companyName: Locator;
  readonly identificationNumber: Locator;
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly address: Locator;
  readonly postCode: Locator;
  readonly city: Locator;
  readonly country: Locator;

  readonly cryptoWireButton: Locator;
  readonly ethAddressOrENS: Locator;

  readonly bankWireButton: Locator;
  readonly IBAN: Locator;
  readonly BIC: Locator;

  readonly email: Locator;
  readonly telegram: Locator;
  readonly twitter: Locator;
  readonly discord: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountTypeIndividualButton = this.page.locator("[data-testid=INDIVIDUAL]");
    this.accountTypeCompanyButton = this.page.locator("[data-testid=COMPANY]");

    this.companyName = this.page.locator("[name=companyName]");
    this.identificationNumber = this.page.locator("[name=identificationNumber]");
    this.firstname = this.page.locator("[name=firstname]");
    this.lastname = this.page.locator("[name=lastname]");
    this.address = this.page.locator("[name=address]");
    this.postCode = this.page.locator("[name=postCode]");
    this.city = this.page.locator("[name=city]");
    this.country = this.page.locator("[name=country]");

    this.cryptoWireButton = this.page.locator("[data-testid=ETHEREUM_IDENTITY]");
    this.ethAddressOrENS = this.page.locator("[name=ethIdentity]");

    this.bankWireButton = this.page.locator("[data-testid=BANK_ADDRESS]");
    this.IBAN = this.page.locator("[name=IBAN]");
    this.BIC = this.page.locator("[name=BIC]");

    this.email = this.page.locator("[name=email]");
    this.telegram = this.page.locator("[name=telegram]");
    this.twitter = this.page.locator("[name=twitter]");
    this.discord = this.page.locator("[name=discord]");
  }

  async goto() {
    await this.page.getByTestId("profile-button").click();
    await this.page.getByText(/payout info/i).click();
  }

  async submitForm() {
    await this.page.getByTestId("profile-form-submit-button").click();
    await expect(this.page.getByTestId("toaster-message")).toHaveText("Changes saved");
  }

  async fillForm(profile: UserPayoutInfo) {
    let personIdentity: PersonIdentity | null | undefined;

    if (profile.identity?.company) {
      await this.accountTypeCompanyButton.click();
      await this.companyName.clear();
      await this.companyName.type(profile.identity?.company?.name || "");
      await this.identificationNumber.clear();
      await this.identificationNumber.type(profile.identity?.company?.identificationNumber || "");
      personIdentity = profile.identity?.company?.owner;
    } else {
      await this.accountTypeIndividualButton.click();
      personIdentity = profile.identity?.person;
    }

    await this.firstname.clear();
    await this.firstname.type(personIdentity?.firstname || "");
    await this.lastname.clear();
    await this.lastname.type(personIdentity?.lastname || "");

    await this.address.clear();
    await this.address.type(profile.location?.address || "");
    await this.postCode.clear();
    await this.postCode.type(profile.location?.postCode || "");
    await this.city.clear();
    await this.city.type(profile.location?.city || "");
    await this.country.clear();
    await this.country.type(profile.location?.country || "");

    if (profile.payoutSettings?.bankAccount) {
      await this.bankWireButton.click();
      await this.IBAN.clear();
      await this.IBAN.type(profile.payoutSettings?.bankAccount?.IBAN || "");
      await this.BIC.clear();
      await this.BIC.type(profile.payoutSettings?.bankAccount?.BIC || "");
    } else {
      if (profile.identity?.company) {
        await this.cryptoWireButton.click();
      }
      await this.ethAddressOrENS.clear();
      await this.ethAddressOrENS.type(profile.payoutSettings?.ethAddress || profile.payoutSettings?.ethName || "");
    }
  }

  async expectForm(profile: UserPayoutInfo) {
    let personIdentity: PersonIdentity | null | undefined;

    if (profile.identity?.company) {
      await expect(this.companyName).toHaveValue(profile.identity?.company?.name || "");
      await expect(this.identificationNumber).toHaveValue(profile.identity?.company?.identificationNumber || "");
      personIdentity = profile.identity?.company?.owner;
    } else {
      personIdentity = profile.identity?.person;
    }

    await expect(this.firstname).toHaveValue(personIdentity?.firstname || "");
    await expect(this.lastname).toHaveValue(personIdentity?.lastname || "");

    await expect(this.address).toHaveValue(profile.location?.address || "");
    await expect(this.postCode).toHaveValue(profile.location?.postCode || "");
    await expect(this.city).toHaveValue(profile.location?.city || "");
    await expect(this.country).toHaveValue(profile.location?.country || "");

    if (profile.payoutSettings?.bankAccount) {
      expect((await this.IBAN.inputValue()).replace(/ /g, "")).toBe(profile.payoutSettings?.bankAccount?.IBAN || "");
      await expect(this.BIC).toHaveValue(profile.payoutSettings?.bankAccount?.BIC || "");
    } else {
      await expect(this.ethAddressOrENS).toHaveValue(
        profile.payoutSettings?.ethAddress || profile.payoutSettings?.ethName || ""
      );
    }
  }
}

import { expect, Locator, Page } from "@playwright/test";
import { UserProfile } from "../types";
import { IdentityType, PayoutSettingsType, PersonIdentity } from "../__generated/graphql";

export class EditProfilePage {
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

  async fillForm(profile: UserProfile) {
    let personIdentity: PersonIdentity | null | undefined;

    if (profile.identity?.type === IdentityType.Company) {
      await this.accountTypeCompanyButton.click();
      await this.companyName.clear();
      await this.companyName.type(profile.identity?.optCompany?.name || "");
      await this.identificationNumber.clear();
      await this.identificationNumber.type(profile.identity?.optCompany?.identificationNumber || "");
      personIdentity = profile.identity?.optCompany?.owner;
    } else {
      await this.accountTypeIndividualButton.click();
      personIdentity = profile.identity?.optPerson;
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

    if (profile.payoutSettings?.type === PayoutSettingsType.BankAddress) {
      await this.bankWireButton.click();
      await this.IBAN.clear();
      await this.IBAN.type(profile.payoutSettings?.optBankAddress?.IBAN || "");
      await this.BIC.clear();
      await this.BIC.type(profile.payoutSettings?.optBankAddress?.BIC || "");
    } else {
      if (profile.identity?.type === IdentityType.Company) {
        await this.cryptoWireButton.click();
      }
      await this.ethAddressOrENS.clear();
      await this.ethAddressOrENS.type(
        profile.payoutSettings?.optEthAddress || profile.payoutSettings?.optEthName || ""
      );
    }
  }

  async expectForm(profile: UserProfile) {
    let personIdentity: PersonIdentity | null | undefined;

    if (profile.identity?.type === IdentityType.Company) {
      await expect(this.companyName).toHaveValue(profile.identity?.optCompany?.name || "");
      await expect(this.identificationNumber).toHaveValue(profile.identity?.optCompany?.identificationNumber || "");
      personIdentity = profile.identity?.optCompany?.owner;
    } else {
      personIdentity = profile.identity?.optPerson;
    }

    await expect(this.firstname).toHaveValue(personIdentity?.firstname || "");
    await expect(this.lastname).toHaveValue(personIdentity?.lastname || "");

    await expect(this.address).toHaveValue(profile.location?.address || "");
    await expect(this.postCode).toHaveValue(profile.location?.postCode || "");
    await expect(this.city).toHaveValue(profile.location?.city || "");
    await expect(this.country).toHaveValue(profile.location?.country || "");

    if (profile.payoutSettings?.type === PayoutSettingsType.BankAddress) {
      expect((await this.IBAN.inputValue()).replace(/ /g, "")).toBe(profile.payoutSettings?.optBankAddress?.IBAN || "");
      await expect(this.BIC).toHaveValue(profile.payoutSettings?.optBankAddress?.BIC || "");
    } else {
      await expect(this.ethAddressOrENS).toHaveValue(
        profile.payoutSettings?.optEthAddress || profile.payoutSettings?.optEthName || ""
      );
    }
  }
}

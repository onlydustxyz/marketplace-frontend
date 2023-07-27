import { Locator, Page } from "@playwright/test";
export class ProjectOverviewPage {
  readonly page: Page;
  public readonly whatsapp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.whatsapp = this.page.getByTestId("whatsapp");
  }

  description = () => this.page.getByRole("paragraph").textContent();
  projectLeads = () => this.page.getByTestId("project-leads").textContent();
  contributorsCount = () =>
    this.page
      .getByTestId("contributors-count")
      .textContent()
      .then(count => (count ? parseInt(count) : 0));
  sponsors = () => this.page.getByTestId("sponsors").allTextContents();
  moreInfo = () => this.page.getByTestId("more-info").textContent();
  repository = (id: number) => this.page.getByTestId(`github-repo-${id}`);
  applyButton = () => this.page.getByTestId("apply-btn");
}

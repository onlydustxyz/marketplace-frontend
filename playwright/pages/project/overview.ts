import { Page } from "@playwright/test";
export class ProjectOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  description = () => this.page.getByRole("paragraph").textContent();
  projectLeads = () => this.page.getByTestId("project-leads").textContent();
  contributorsCount = () =>
    this.page
      .getByTestId("contributors-count")
      .textContent()
      .then(count => (count ? parseInt(count) : 0));
  grantedAmount = () => this.page.getByTestId("money-granted-amount").textContent();
  sponsors = () => this.page.getByTestId("sponsors").allTextContents();
  moreInfo = () => this.page.getByTestId("more-info").textContent();
  repository = (id: number) => this.page.getByTestId(`github-repo-${id}`);
  applyButton = () => this.page.getByTestId("apply-btn");
}

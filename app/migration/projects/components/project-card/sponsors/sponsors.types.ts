export namespace TSponsors {
  export interface Sponsor {
    id: string;
    logoUrl: string;
    name: string;
    url: string;
  }

  export interface Props {
    sponsors: Sponsor[];
  }
}

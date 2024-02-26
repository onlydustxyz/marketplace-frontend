export namespace TSearchContributor {
  export interface Contributor {
    avatarUrl?: string;
    id?: string;
    githubUserId?: number;
    login: string;
    name?: string;
    isRegistered?: boolean;
  }

  export interface Props {
    onChange: (user: Contributor) => void;
    value?: Contributor;
  }
}

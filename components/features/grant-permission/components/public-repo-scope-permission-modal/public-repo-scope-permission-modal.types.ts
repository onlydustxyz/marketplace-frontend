export namespace TPublicRepoScopePermissionModal {
  export interface Props {
    isOpen: boolean;
    handleClose: () => void;
    handleMoreInfoOpen: () => void;
    handleOpenDrawer: () => void;
    permissionUrl: string;
  }
}

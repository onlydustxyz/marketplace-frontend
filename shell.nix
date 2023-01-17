{ pkgs ? import <nixpkgs> {}
}:

pkgs.mkShell {
  buildInputs = [
    pkgs.yarn
  ];

  shellHook = ''
    yarn
  '';
}

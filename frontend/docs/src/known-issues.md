# Known issues

## Vite HMR going in a loop and crashing browser

HMR (Hot Module Reloading) allows to change

This happens becasue a `.tsx.` file is exporting something else than React Components. To avoid this, consider moving utility function or constants to a separate file.

## *XXXXX* not found on *mutation/query_root*

Go to the Hasura console and a prompt to reload metadata should appear.

Go to the bottom of the screen, tick the two boxes and click the *Reload* button.


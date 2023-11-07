import { setRemoteDefinitions } from '@nx/angular/mf';
import {environment} from "./environments/environment";

let manifestFile = '';
switch(environment.isLocal) {
  case true:
    manifestFile = '/assets/module-federation.manifest.local.json';
    break;
  default:
    manifestFile = '/assets/module-federation.manifest.json';
}

fetch(manifestFile)
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));

/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { beforeElectronIsReadyInjectionToken } from "../../start-main-application/runnable-tokens/before-electron-is-ready-injection-token";
import electronAppInjectable from "../electron-app.injectable";
import { runManyFor } from "../../../common/runnable/run-many-for";
import { afterWindowIsOpenedInjectionToken } from "../../start-main-application/runnable-tokens/after-window-is-opened-injection-token";

const setupRunnablesAfterWindowIsOpenedInjectable = getInjectable({
  id: "setup-runnables-after-window-is-opened",

  instantiate: (di) => {
    const afterWindowIsOpened = runManyFor(di)(afterWindowIsOpenedInjectionToken);

    return {
      id: "setup-runnables-after-window-is-opened",
      run: () => {
        const app = di.inject(electronAppInjectable);

        app.on("browser-window-created", async () => {
          await afterWindowIsOpened();
        });
      },
    };
  },

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default setupRunnablesAfterWindowIsOpenedInjectable;

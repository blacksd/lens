/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import isAllowedResourceInjectable from "../../../../../utils/is-allowed-resource.injectable";
import { frontEndRouteInjectionToken } from "../../../../front-end-route-injection-token";

const leasesRouteInjectable = getInjectable({
  id: "leases",

  instantiate: (di) => {
    const isAllowedResource = di.inject(isAllowedResourceInjectable, "leases");

    return {
      path: "/leases",
      clusterFrame: true,
      isEnabled: isAllowedResource,
    };
  },

  injectionToken: frontEndRouteInjectionToken,
});

export default leasesRouteInjectable;

import type { NavigationRoute } from "./routes.navigation";

export class NavigationWrapper {
   
  private ON_LOCATION_EVENT_NAME = "onLocationChange";

  private routes: NavigationRoute[];
  private onChangeRoute: (route: NavigationRoute | null, params: any | null) => void;

  constructor(routes: NavigationRoute[], onChangeRoute: (route: NavigationRoute | null, params: any | null) => void) {
    this.routes = routes;
    this.onChangeRoute = onChangeRoute;

    this.initEvents;
  } 

  private initEvents() : void {
    const originalPushState = history.pushState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      const onLocationChange = new Event(this.ON_LOCATION_EVENT_NAME);
      window.dispatchEvent(onLocationChange);
    }

    window.addEventListener("popstate", async () => await this.onLocationhandler());
    window.addEventListener(this.ON_LOCATION_EVENT_NAME, async () => await this.onLocationhandler());

  }

  private async onLocationhandler()  {
    const urlPath = window.location.pathname;

    const route = this.routes.find(itemRoute => itemRoute.path === urlPath) || null;

    const params = history.state || null;
    this.onChangeRoute(route, params);
  }

}


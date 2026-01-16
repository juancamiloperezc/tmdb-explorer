import { Observable } from "../../core/observer/observable";
import type { NavigationRoute } from "./routes.navigation";

export interface NavigationState {
  route: NavigationRoute | null, 
  params: any | null
}

export class NavigationWrapper extends Observable<NavigationState>{
   
  private ON_LOCATION_EVENT_NAME = "onLocationChange";

  private _routes: NavigationRoute[];

  constructor(routes: NavigationRoute[]) {
    super();

    this._routes = routes;

    this.initEvents();
  } 

  public navigateTo(route: NavigationRoute, _params: any | null){
      history.pushState({}, "", route.path);
  }

  public get routes() {
    return this._routes;
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
    const route = this._routes.find(itemRoute => itemRoute.path === urlPath) || null;
    const params = history.state || null;

    this.notify({ route, params })
  }

}


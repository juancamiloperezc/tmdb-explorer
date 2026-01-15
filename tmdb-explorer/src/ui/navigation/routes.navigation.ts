import type { BasePage } from "../pages/base.page";

export interface NavigationRoute {
  title: string,
  description: string
  path: string, 
  page: () => BasePage,
};
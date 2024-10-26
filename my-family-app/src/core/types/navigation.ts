export interface RouteConfig {
    path: string;
    label: string;
    component: React.LazyExoticComponent<() => JSX.Element>;
    icon?: React.ComponentType;
    children?: RouteConfig[];
  }
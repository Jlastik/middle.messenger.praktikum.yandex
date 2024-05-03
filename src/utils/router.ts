import Block from "./block.ts";

function render(query: string, block: Block | null) {
  const root = document.querySelector(query);
  const element = block?.getContent();
  if (root && element) {
    root.replaceChildren(element);
    block && block.dispatchComponentDidMount();
  }
  return root;
}

export class Route {
  _pathname;
  _block: null | Block;
  _props;

  constructor(
    pathname: string,
    view: Block,
    props: Record<string, unknown> & { rootQuery: string },
  ) {
    this._pathname = pathname;
    this._block = view;
    this._props = props;
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    render(this._props.rootQuery, this._block);
  }
}

export class Router {
  private static instance: Router;
  private _routes: Route[];
  private history: History;
  private readonly _rootQuery: string;

  private constructor(rootQuery: string) {
    this._routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;
  }

  static getInstance(rootQuery: string) {
    if (!Router.instance) {
      Router.instance = new Router(rootQuery);
    }
    return Router.instance;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this._routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const target = event.currentTarget as Window;
      if (target) {
        this._onRoute(target.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    route && route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.go(-1);
  }

  forward() {
    this.history.go(1);
  }

  reload() {
    window.location.reload();
  }

  getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }
}

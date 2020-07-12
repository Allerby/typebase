class Router {
  routes = [];
  root = '/';

  constructor() {
    this.listen();
  }

  add = (path, callback) => {
    this.routes.push({ path, callback });
    return this;
  }

  remove = path => {
    for(let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
  }

  flush = () => {
    this.routes = [];
    return this;
  }

  clearSlashes = path => {
    return path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');
  }

  getFragment = () => {
    let fragment = '';
    fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    
    return this.clearSlashes(fragment);
  }

  navigate = (path = '') => {
    window.history.pushState(null, null, this.root + this.clearSlashes(path));
    return this;
  }

  listen = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval, 50);
  }

  interval = () => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some(route => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.callback.apply({}, match);
        return match;
      }
      return false;
    })
  }
}

export default Router
import Articles from 'scripts/collections/app';

export default class DashboardArticles extends Articles {
  constructor(...args) {
    this.url = 'dashboard';

    super(...args);
  }

  parse(response) {
    return response.articles;
  }
}

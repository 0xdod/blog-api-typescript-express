export class PageQuery {
  constructor(public readonly page = 1, public readonly limit = 10) {}

  get skip() {
    return (+this.page - 1) * +this.limit;
  }
}

export class PageQueryWithSearch extends PageQuery {
  constructor(
    public readonly page = 1,
    public readonly limit = 10,
    public readonly searchTerm: string
  ) {
    super(page, limit);
  }

  static fromQuery(query: any) {
    return new PageQueryWithSearch(
      query.page,
      query.limit,
      query.searchTerm || ""
    );
  }
}

export class Page<T> {
  constructor(
    public readonly data: T[],
    public readonly total: number,
    public readonly pageQuery: PageQuery
  ) {}

  static from<T>(data: T[], total: number, pageQuery: PageQuery) {
    return new Page(data, total, pageQuery);
  }
}

import { PageQueryWithSearch } from "../../utils/page/page-query";

export class PostPageQuery extends PageQueryWithSearch {
  constructor(
    public readonly page = 1,
    public readonly limit = 10,
    public readonly searchTerm: string,
    public readonly published: boolean
  ) {
    super(page, limit, searchTerm);
  }

  static fromQuery(query: any) {
    const { page, limit, searchTerm, published } = query;
    return new PostPageQuery(page, limit, searchTerm, published);
  }
}

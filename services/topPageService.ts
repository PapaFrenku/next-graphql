import { TopLevelCategory, TopPageEntity } from "../generated/types";
import { initializeApollo } from "../lib/apolloClient";
import { GET_TOP_PAGE_BY_ALIAS, FIND_TOP_PAGES_BY_CATEGORY, FIND_TOP_PAGE_BY_TEXT, ALL_TOP_PAGES } from "./queries";

export type TopPageByAlias = TopPageEntity;

export class TopPageService {
  public async findByCategory(
    firstCategory: TopLevelCategory
  ): Promise<TopPageEntity[]> {
    const apolloClient = initializeApollo();
    const response = await apolloClient
      .query<{ findByCategory: TopPageEntity[] }>({
        query: FIND_TOP_PAGES_BY_CATEGORY,
        variables: {
          findTopPageDto: {
            firstCategory,
          },
        },
      })
      .catch((err) => {
        throw err;
      });

    if (response && response.data && response.data.findByCategory)
      return response.data.findByCategory;

    return [];
  }

  public async getAllTopPages(): Promise<TopPageEntity[]> {
    const apolloClient = initializeApollo();
    const response = await apolloClient
      .query<{ getAllTopPages: TopPageEntity[] }>({
        query: ALL_TOP_PAGES,
      })
      .catch((err) => {
        throw err;
      });

    if (response && response.data && response.data.getAllTopPages)
      return response.data.getAllTopPages;

    return [];
  }

  public async getTopPageByAlias(
    alias: string
  ): Promise<TopPageByAlias | null> {
    const apolloClient = initializeApollo();

    const response = await apolloClient
      .query<{ getTopPageByAlias: TopPageByAlias }>({
        query: GET_TOP_PAGE_BY_ALIAS,
        variables: {
          alias,
        },
      })
      .catch((err) => {
        throw err;
      });

    if (response && response.data && response.data.getTopPageByAlias)
      return response.data.getTopPageByAlias;

    return null;
  }

  public async findTopPageByText(query: string): Promise<TopPageEntity[]> {
    const apolloClient = initializeApollo();

    const response = await apolloClient
      .query<{ findByText: TopPageEntity[] }>({
        query: FIND_TOP_PAGE_BY_TEXT,
        variables: {
          query
        },
      })
      .catch((err) => {
        throw err;
      });
      
    if (response && response.data && response.data.findByText)
      return response.data.findByText;

    return [];
  }
}

export default new TopPageService();

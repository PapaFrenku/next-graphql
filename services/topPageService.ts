import { TopLevelCategory, TopPageEntity } from "../generated/types";
import { initializeApollo } from "../lib/apolloClient";
import { FIND_TOP_PAGES_BY_CATEGORY } from "./queries";

export class TopPageService {
  public async findByCategory(firstCategory: TopLevelCategory): Promise<TopPageEntity[]> {
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
}

export default new TopPageService();

import { gql } from "@apollo/client";

export const FIND_TOP_PAGES_BY_CATEGORY = gql`
  query findByCategory($findTopPageDto: FindTopPageDto!) {
    findByCategory(findTopPageDto: $findTopPageDto) {
      id
      firstCategory
      secondCategory
      alias
      title
      metaTitle
      metaDescription
      category
      seoText
      tagsTitle
      tags
      createdAt
    }
  }
`;
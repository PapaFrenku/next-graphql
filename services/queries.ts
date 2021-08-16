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

export const GET_TOP_PAGE_BY_ALIAS = gql`
  query findByAlias($alias: String!) {
    getTopPageByAlias(alias: $alias) {
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
      products {
        id
        image
        title
        link
        initialRating
        price
        oldPrice
        credit
        description
        advantages
        disAdvantages
        categories
        tags
        characteristics {
          id
          name
          value
          productId
        }
        createdAt
        updatedAt
        reviewAvg
        reviews {
          id
          title
          name
          description
          rating
          productId
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query product($id: Float!) {
    product(id: $id) {
      id
      image
      title
      link
      initialRating
      price
      oldPrice
      credit
      description
      advantages
      disAdvantages
      categories
      tags
      characteristics {
       id
       name
       value
       productId
      }
      reviews {
        id
        title
        name
        description
        rating
        productId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      reviewAvg
    }
  }
`;

export const GET_PRODUCTS = gql`
  query products($findAllProductDto: FindAllProductDto!) {
    products(findAllProductDto: $findAllProductDto) {
      id
      image
      title
      link
      initialRating
      price
      oldPrice
      credit
      description
      advantages
      disAdvantages
      categories
      firstCategory
      tags
      characteristics {
       id
       name
       value
       productId
      }
      reviews {
        id
        title
        name
        description
        rating
        productId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      reviewAvg
    }
  }
`;

export const FIND_TOP_PAGE_BY_TEXT = gql`
  query findTopPagesByText($query: String!) {
    findByText(searchQuery: $query) {
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

export const FIND_PRODUCTS_BY_TEXT = gql`
  query findProductsByText($query: String!) {
    findProductsByText(query: $query) {
      id
      image
      title
      link
      initialRating
      price
      oldPrice
      credit
      description
      advantages
      disAdvantages
      categories
      tags
      characteristics {
       id
       name
       value
       productId
      }
      reviews {
        id
        title
        name
        description
        rating
        productId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      reviewAvg
    }
  }
`;

export const ALL_TOP_PAGES = gql`
  query getAllTopPages {
    getAllTopPages {
      id
      firstCategory
      secondCategory
      alias
      title
      category
    }
  }
`;
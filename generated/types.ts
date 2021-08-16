import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AccesToken = {
  __typename?: 'AccesToken';
  access_token: Scalars['String'];
};

export type AuthDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateProductDto = {
  image?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  initialRating: Scalars['Int'];
  price: Scalars['Int'];
  oldPrice?: Maybe<Scalars['Int']>;
  credit: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  advantages?: Maybe<Array<Maybe<Scalars['String']>>>;
  disAdvantages?: Maybe<Array<Maybe<Scalars['String']>>>;
  categories: Array<Maybe<Scalars['String']>>;
  tags: Array<Maybe<Scalars['String']>>;
  characteristics?: Maybe<Array<Maybe<ProductCharacteristicDto>>>;
};

export type CreateTopPageDto = {
  firstCategory: TopLevelCategory;
  secondCategory: Scalars['String'];
  alias: Scalars['String'];
  title: Scalars['String'];
  metaTitle: Scalars['String'];
  metaDescription: Scalars['String'];
  category: Scalars['String'];
  hh: HhDataDto;
  advantages: Array<TopPageAdvantageDto>;
  seoText: Scalars['String'];
  tagsTitle: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type FindAllProductDto = {
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
};

export type FindTopPageDto = {
  firstCategory: TopLevelCategory;
};

export type HhData = {
  __typename?: 'HhData';
  count: Scalars['Int'];
  juniorSalary: Scalars['Int'];
  middleSalary: Scalars['Int'];
  seniorSalary: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type HhDataDto = {
  count: Scalars['Int'];
  juniorSalary: Scalars['Int'];
  middleSalary: Scalars['Int'];
  seniorSalary: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserEntity;
  login: AccesToken;
  createProduct: Product;
  deleteProduct: Product;
  updateProduct: Product;
  postReview: Product;
  createTopPage: TopPageEntity;
  deleteTopPage: TopPageEntity;
  updateTopPage: TopPageEntity;
};


export type MutationRegisterArgs = {
  authDto: AuthDto;
};


export type MutationLoginArgs = {
  authDto: AuthDto;
};


export type MutationCreateProductArgs = {
  createProductDto: CreateProductDto;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateProductArgs = {
  createProductDto: CreateProductDto;
  id: Scalars['Float'];
};


export type MutationPostReviewArgs = {
  postReviewDto: PostRevieDto;
};


export type MutationCreateTopPageArgs = {
  createTopPageDto: CreateTopPageDto;
};


export type MutationDeleteTopPageArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateTopPageArgs = {
  createTopPageDto: CreateTopPageDto;
  id: Scalars['Float'];
};

export type PostRevieDto = {
  title: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  rating: Scalars['Int'];
  productId: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  initialRating: Scalars['Int'];
  price: Scalars['Int'];
  oldPrice?: Maybe<Scalars['Int']>;
  credit: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  advantages: Array<Maybe<Scalars['String']>>;
  disAdvantages: Array<Maybe<Scalars['String']>>;
  categories: Array<Maybe<Scalars['String']>>;
  tags: Array<Maybe<Scalars['String']>>;
  characteristics?: Maybe<Array<Maybe<ProductCharacteristic>>>;
  reviews: Array<Review>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  reviewAvg: Scalars['Float'];
  firstCategory: TopLevelCategory;
};

export type ProductCharacteristic = {
  __typename?: 'ProductCharacteristic';
  id: Scalars['Int'];
  name: Scalars['String'];
  value: Scalars['String'];
  product: Product;
  productId: Scalars['Int'];
};

export type ProductCharacteristicDto = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: UserEntity;
  product: Product;
  products: Array<Product>;
  getAllTopPages: Array<TopPageEntity>;
  getTopPageByAlias: TopPageEntity;
  getTopPage: TopPageEntity;
  findByCategory: Array<TopPageEntity>;
  findByText: Array<TopPageEntity>;
};


export type QueryUserArgs = {
  email: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['Float'];
};


export type QueryProductsArgs = {
  findAllProductDto: FindAllProductDto;
};


export type QueryGetTopPageByAliasArgs = {
  alias: Scalars['String'];
};


export type QueryGetTopPageArgs = {
  id: Scalars['Float'];
};


export type QueryFindByCategoryArgs = {
  findTopPageDto: FindTopPageDto;
};


export type QueryFindByTextArgs = {
  searchQuery: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  title: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  rating: Scalars['Int'];
  productId: Scalars['String'];
  product: Product;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Subscription = {
  __typename?: 'Subscription';
  reviewAdded: Product;
};

export enum TopLevelCategory {
  Courses = 'Courses',
  Services = 'Services',
  Books = 'Books'
}

export type TopPageAdvantage = {
  __typename?: 'TopPageAdvantage';
  title: Scalars['String'];
  description: Scalars['String'];
};

export type TopPageAdvantageDto = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type TopPageEntity = {
  __typename?: 'TopPageEntity';
  id: Scalars['Int'];
  firstCategory: TopLevelCategory;
  secondCategory: Scalars['String'];
  alias: Scalars['String'];
  title: Scalars['String'];
  metaTitle: Scalars['String'];
  metaDescription: Scalars['String'];
  category: Scalars['String'];
  hh: HhData;
  advantages: Array<TopPageAdvantage>;
  seoText: Scalars['String'];
  tagsTitle: Scalars['String'];
  tags: Array<Scalars['String']>;
  products: Array<Product>;
  createdAt: Scalars['DateTime'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

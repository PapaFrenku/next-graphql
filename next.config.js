/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withSass({
  cssModules: true
});

module.exports = withImages();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['https://nest-graphql-prisma.herokuapp.com/'],
  }
};

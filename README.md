# gatsby-source-greenhouse

> Loads job openings from greenhouse.io into Gatsby.js.

## Status

[![npm version](https://badge.fury.io/js/gatsby-source-greenhouse.svg)](https://badge.fury.io/js/gatsby-source-greenhouse)

## Installation

```bash
npm install gatsby-source-greenhouse
```

or

```bash
yarn add gatsby-source-greenhouse
```

## Usage

To use this source you only need the name of a public Greenhouse board.
Usually, the board name is the name of your company.

Next, edit `gatsby-config.js` to use the plugin:

```
{
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-source-greenhouse`,
      options: {
        boardName: 'myCompany',
      },
    },
  ]
}
```

## Querying

You can query the all `GreenhouseJob` created by the plugin as follows:

```graphql
{
  allGreenhouseJob {
    edges {
      node {
        id
        title
        updated_at
      }
    }
  }
}
```

# gatsby-source-greenhouse
> Loads job openings from greenhouse.io into Gatsby.js. Based on [gatsby-source-workable](https://github.com/tumblbug/gatsby-source-workable).

## Installation

```bash
npm install gatsby-source-greenhouse
```
or
```bash
yarn add gatsby-source-greenhouse
```

## Usage

To use this source you need to supply a Greenhouse API token. You can create a Greenhouse API token by logging into Greenhouse and going to `Configure > Dev Center > API Credential Management > Create New API Key`. Make sure it is type **Harvest**.

Next, edit `gatsby-config.js` to use the plugin:
```
{
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-source-greenhouse`,
      options: {
        apiToken: `{API_TOKEN}`,
        jobPosts: {
          live: true
        }
      },
    },
  ]
}
```

By default, `gatsby-source-greenhouse` will only retrieve job openings that are marked as *live*. You can change this by passing in `false` in the `jobPosts` plugin option parameter.

## Querying

You can query the all `JobPost` created by the plugin as follows:
```graphql
{
    allGreenhouseJobPost {
        edges {
            node {
                ...
            }
        }
    }
}
```

You can also query all `JobPost` broken out for each department:
```graphql
{
  allGreenhouseDepartment {
    edges {
      node {
        name
        childrenGreenhouseJobPost {
          title
        }
      }
    }
  }
}
```

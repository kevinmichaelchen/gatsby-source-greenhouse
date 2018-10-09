const axios = require('axios');
const crypto = require('crypto');

/**
 * Return all job posts
 * @param boardName string.
 */
async function getJobPosts(boardName) {
  return axios.get(
    `https://boards-api.greenhouse.io/v1/boards/${boardName}/jobs`
  );
}

/**
 * Gatsby requires ID to be a string to define nodes and greenhouse.io uses an integer instead.
 *
 * @param obj object.
 * @returns object.
 */
const changeId = obj => {
  const updatedObj = obj;
  updatedObj.id = updatedObj.id.toString();
  return updatedObj;
};

exports.sourceNodes = async (
  { boundActionCreators, createNodeId },
  { boardName, pluginOptions }
) => {
  const { createNode } = boundActionCreators;

  const processJob = job => {
    const nodeId = createNodeId(`hubspot-topic-${job.id}`);
    const nodeContent = JSON.stringify(job);
    const nodeContentDigest = crypto
      .createHash('md5')
      .update(nodeContent)
      .digest('hex');

    return Object.assign({}, job, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `GreenhouseJobPost`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    });
  };

  console.log(`Fetching Greenhouse data...`);

  let jobPosts;
  try {
    jobPosts = await getJobPosts(boardName).then(
      response => response.data.jobs
    );
  } catch (e) {
    console.log(`Failed to fetch data from Greenhouse`);
    process.exit(1);
  }

  console.log(`Fetched ${jobPosts.length} job posts...`);

  return Promise.all(
    jobPosts.map(async job => {
      const convertedJob = changeId(job);
      createNode(processJob(convertedJob));
    })
  );
};

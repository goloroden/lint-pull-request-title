const core = require('@actions/core');
const github = require('@actions/github');
const conventionalCommitsParser = require('conventional-commits-parser');

try {
  const allowedPullRequestTypesInputKey = 'allowed-pull-request-types';

  let allowedPullRequestTypes = core
    .getInput(allowedPullRequestTypesInputKey, { required: true })
    .trim()
    .split(',');

  const pullRequestContext = github.context.payload.pull_request;

  if (!pullRequestContext) {
    throw new Error(`This action can only be invoked in 'pull_request' events. Otherwise the pull request can't be inferred.`);
  }

  const { header, type } = conventionalCommitsParser.sync(pullRequestContext.title);

  core.notice(`Inspecting pull request title '${header}'.`);

  if (!type) {
    throw new Error(`No commit type found in pull request title '${header}'.`);
  }

  if (!allowedPullRequestTypes.includes(type)) {
    throw new Error(`Invalid commit type '${type}' found in pull request title '${header}', please use one of ${allowedPullRequestTypes}.`);
  }

  core.notice('Success.');
} catch (error) {
  core.setFailed(error.message);
}

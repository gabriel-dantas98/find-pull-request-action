const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
    const token = core.getInput('github-token', { required: true });
    const sha = core.getInput('sha', { required: true});
    const repo = core.getInput('repository') || github.context.repo;
    const owner = core.getInput('owner') || github.context.owner;
    
    const payload = JSON.stringify(github.context.payload, undefined, 2)

    console.log(`The event payload: ${payload}`);

    console.log(`debugging ${sha} ${repo} ${owner}`)
    
    const client = github.getOctokit(token, {});

    const result = await client.repos.listPullRequestsAssociatedWithCommit({
        owner: owner,
        repo: repo,
        commit_sha: sha,
    });

    const pr = result.data.length > 0 && result.data.filter(el => el.state === 'open')[0];
    
    core.setOutput('pr', pr && pr.number || '');
    core.setOutput('number', pr && pr.number || '');
    core.setOutput('title', pr && pr.title || '');
    core.setOutput('body', pr && pr.body || '');
}

main().catch(err => core.setFailed(err.message));

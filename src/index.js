const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function main() {
    const token = core.getInput('github-token', { required: true });
    const sha = core.getInput('sha', { required: true});
    const repo = core.getInput('repository', { required: true});

    console.log(`debugging ${sha} ${repo}`)

    const client = new GitHub(token, {});
    const result = await client.repos.listPullRequestsAssociatedWithCommit({
        owner: context.repo.owner,
        repo: repo,
        commit_sha: sha,
    });

    const result = await client.repos.listPullRequestsAssociatedWithCommit({
        owner: context.repo.owner,
        repo: repo,
        commit_sha: sha,
    });

    console.log(pr);

    const pr = result.data.length > 0 && result.data.filter(el => el.state === 'open')[0];
    

    core.setOutput('pr', pr && pr.number || '');
    core.setOutput('number', pr && pr.number || '');
    core.setOutput('title', pr && pr.title || '');
    core.setOutput('body', pr && pr.body || '');
}

main().catch(err => core.setFailed(err.message));

# Contributing to ngqp

We encourage and welcome contributions and appreciate your interest in helping to make it better! Here are some tips and guidelines
that we would like you to keep in mind:

## Having a question or problem?

Please reach out to us by opening a new issue. We will eventually move support questions to other channels, but while ngqp
is under initial development, we would like to gather feedback quickly.

## Found a bug?

If you found a bug, please open a new issue after making sure that no open issue exists for it yet. Please include as much
useful information as possible as that helps us in finding the problem more quickly. If you want, you can of course also
send a pull request to fix the issue!

## Got an awesome idea for a feature?

If there's something you're missing, let's talk about it! Just open a new issue after making sure none exists for this
feature request yet and we can work out if and how we can include it. Please try to describe not just the idea, but ideally
also the specific usecase as this might help shape the solution better.

## Submission Guidelines

### Submitting an issue

Before submitting an issue, please take the time to look through the existing issues first. If an issue for your question
or idea exists already, use the reactions to add your vote – or leave a comment if you can add further, substantial information.

When submitting bugs, please help us triage and fix the issue faster by making sure to include all crucial information such as
version, a minimal reproduction setup and a clear description of expected versus actual behavior.

### Submitting a pull request

1. Look through open and recently merged pull requests to make sure your issue hasn't been addressed already.
1. Create a fork of the ngqp repository.
1. Start a new branch from `master`:

```shell
git checkout -b my-awesome-fix
```

1. Make your changes and commit them to your branch. Please make sure to adhere to the implicit code style of the existing code.
   Please also check out the [commit message conventions](#commitmsg) to learn how to write the commit messages.
   
```shell
git commit -a
```

1. Push your branch to your forked repository:

```shell
git push origin my-awesome-fix
```

1. Visit the ngqp repository on Github and follow the instructions to create a pull request.
1. If we request any changes, please add them to your existing commit and force-push your branch. Also make sure to rebase
   your PR first. Leave a comment after pushing your changes so that we are notified and can check again. This process may
   take a few iterations.
   
```shell
git rebase master -i
git push -f
```

Thank you for your contribution!

### <a name="commitmsg"></a> Commit Message Conventions

Please see [conventionalcommits.org][conventionalcommits] to learn how to format your commit messages. We use the following
scopes:

- core – For changes to `@ngqp/core`.
- material – For changes to `@ngqp/material`.
- other – For anything that doesn't fit in the previous categories.

For changes to the documentation / website you can use the type "docs" directly.

[conventionalcommits]: https://www.conventionalcommits.org
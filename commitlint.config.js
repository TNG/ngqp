module.exports = {
    extends: [ '@commitlint/config-conventional' ],
    rules: {
        'subject-case': [ 0 ],
        'scope-enum': [ 2, 'always', [ 'core', 'demo', 'docs', 'scripts', 'other', 'deps', 'release' ] ],
        'type-enum': [ 2, 'always', [ 'feat', 'fix', 'chore', 'test', 'docs', 'style', 'refactor', 'revert' ] ],
        'signed-off-by': [ 2, 'always', 'Signed-off-by:' ],
    },
};

module.exports = {
    env: {
        browser: false,
        es2021: true,
    },
    extends: ['standard-with-typescript', 'plugin:react/recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};

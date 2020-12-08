module.exports = {
    presets: [['@babel/preset-env', { modules: false }]],
    plugins: ['@babel/plugin-proposal-class-properties'],
    ignore: ['node_modules', 'libs', 'babel.config.js', '.git', '**/*.babel.js'],
    minified: true,
    comments: false,
    sourceMaps: true,
};

module.exports = {
    presets: [['@babel/preset-env', { modules: false }]],
    ignore: ['node_modules', 'babel.config.js', '.git', '**/*.babel.js'],
    minified: true,
    comments: false,
};

module.exports = {
    presets: [['@babel/preset-env', { modules: false }]],
    ignore: ['node_modules', 'libs', 'babel.config.js', '.git', '**/*.babel.js'],
    minified: true,
    comments: false,
};

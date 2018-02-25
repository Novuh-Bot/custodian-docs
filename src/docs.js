const Docma = require('docma');
const Package = require('./package');

Docma.create()
  .build({
    app: {
      title: Package.name,
      base: '/Custodian',
      entrance: 'readme',
      routing: 'query',
      server: Docma.ServerType.GITHUB
    },
    markdown: {
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: true,
      sanitize: true,
      smartLists: true,
      smartypants: true,
      tasks: true,
      emoji: true
    },
    src: [
      { readme: './README.md' },
      { Custodian: './src/*/**/*.js'}
    ],
    dest: './docs',
    debug: true,
    jsdoc: { package: './package.json' },
    template: {
      options: {
        title: Package.name,
        navItems: [
          {
            label: 'Readme',
            href: './README'
          },
          {
            label: 'Documentation',
            href: '?api=custodian',
            iconClass: 'ico-book'
          },
          {
            label: 'GitHub',
            href: Package.homepage,
            target: '_blank',
            iconClass: 'ico-md ico-github'
          }
        ]
      }
    }
  })
  .catch(console.error);
const fs = require('fs')
const path = require('path')

describe('Rules documentation', () => {
  let rules = fs
    .readdirSync(path.join(__dirname, '..', '..', 'src', 'core', 'rules'))
    .map((rule) => rule.replace('.ts', ''))

  // remove the index.ts that includes all the rules as it is covered by list-rules.md
  const index = rules.indexOf('index')
  rules.splice(index, 1)

  let docs = fs
    .readdirSync(
      path.join(
        __dirname,
        '..',
        '..',
        'website',
        'src',
        'content',
        'docs',
        'rules'
      )
    )
    .map((doc) => doc.replace('.mdx', ''))

  const rulesListPage = fs.readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'website',
      'src',
      'content',
      'docs',
      'rules',
      'index.mdx'
    ),
    'utf-8'
  )

  rules.forEach((rule) => {
    it(`${rule} should have a documentation page`, () => {
      expect(docs).toContain(rule)
    })
    it(`${rule} should be on the rules/index.mdx`, () => {
      expect(rulesListPage).toContain(rule)
    })
  })
})

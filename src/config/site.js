const site = {
  name: 'DB Study',
  nameKo: '데이터베이스 & SQL 학습',
  description: '데이터베이스와 SQL을 기초부터 고급까지 체계적으로 학습하는 교육 플랫폼',
  url: 'https://aebonlee.github.io/db-study',

  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },

  brand: {
    parts: [
      { text: 'DB', className: 'brand-dream' },
      { text: ' Study', className: 'brand-it' }
    ]
  },

  themeColor: '#0046C8',

  menuItems: [
    {
      labelKey: 'site.nav.intro',
      path: '/intro/what-is-db',
      activePath: '/intro',
      dropdown: [
        { path: '/intro/what-is-db', labelKey: 'site.nav.whatIsDB' },
        { path: '/intro/rdbms', labelKey: 'site.nav.rdbms' },
      ]
    },
    {
      labelKey: 'site.nav.services',
      path: '/services',
      activePath: '/services',
      dropdown: [
        { path: '/services/rdbms-compare', labelKey: 'site.nav.rdbmsCompare' },
        { path: '/services/nosql', labelKey: 'site.nav.nosql' },
        { path: '/services/cloud-db', labelKey: 'site.nav.cloudDb' },
        { path: '/services/newsql', labelKey: 'site.nav.newsql' },
      ]
    },
    {
      labelKey: 'site.nav.webIntegration',
      path: '/web',
      activePath: '/web',
      dropdown: [
        { path: '/web/architecture', labelKey: 'site.nav.webArchitecture' },
        { path: '/web/node-mysql', labelKey: 'site.nav.nodeMysql' },
        { path: '/web/python-db', labelKey: 'site.nav.pythonDb' },
        { path: '/web/orm', labelKey: 'site.nav.orm' },
        { path: '/web/auth-security', labelKey: 'site.nav.authSecurity' },
        { path: '/web/deploy', labelKey: 'site.nav.deploy' },
      ]
    },
    {
      labelKey: 'site.nav.sql',
      path: '/sql',
      activePath: '/sql',
      dropdown: [
        { path: '/sql/setup', labelKey: 'site.nav.sqlSetup' },
        { path: '/sql/select', labelKey: 'site.nav.sqlSelect' },
        { path: '/sql/where', labelKey: 'site.nav.sqlWhere' },
        { path: '/sql/sort', labelKey: 'site.nav.sqlSort' },
        { path: '/sql/function', labelKey: 'site.nav.sqlFunction' },
        { path: '/sql/aggregate', labelKey: 'site.nav.sqlAggregate' },
        { path: '/sql/dml', labelKey: 'site.nav.sqlDml' },
        { path: '/sql/ddl', labelKey: 'site.nav.sqlDdl' },
        { path: '/sql/join', labelKey: 'site.nav.sqlJoin' },
        { path: '/sql/subquery', labelKey: 'site.nav.sqlSubquery' },
        { path: '/sql/advanced', labelKey: 'site.nav.sqlAdvanced' },
        { path: '/sql/design', labelKey: 'site.nav.sqlDesign' },
      ]
    },
    {
      labelKey: 'site.nav.tuning',
      path: '/tuning',
      activePath: '/tuning',
      dropdown: [
        { path: '/tuning/explain', labelKey: 'site.nav.tuningExplain' },
        { path: '/tuning/index', labelKey: 'site.nav.tuningIndex' },
        { path: '/tuning/sql', labelKey: 'site.nav.tuningSql' },
        { path: '/tuning/server', labelKey: 'site.nav.tuningServer' },
        { path: '/tuning/case-study', labelKey: 'site.nav.tuningCase' },
      ]
    },
    {
      labelKey: 'site.nav.oracle',
      path: '/oracle',
      activePath: '/oracle',
      dropdown: [
        { path: '/oracle/sql-processing', labelKey: 'site.nav.oracleSqlProcessing' },
        { path: '/oracle/execution-plan', labelKey: 'site.nav.oracleExecutionPlan' },
        { path: '/oracle/index-strategy', labelKey: 'site.nav.oracleIndexStrategy' },
        { path: '/oracle/awr-analysis', labelKey: 'site.nav.oracleAwrAnalysis' },
        { path: '/oracle/parallel-wait', labelKey: 'site.nav.oracleParallelWait' },
      ]
    },
    { path: '/references', labelKey: 'site.nav.references', activePath: '/references' },
    { path: '/training', labelKey: 'site.nav.training', activePath: '/training' }
  ],

  footerLinks: [
    { path: '/intro/what-is-db', labelKey: 'site.nav.whatIsDB' },
    { path: '/intro/rdbms', labelKey: 'site.nav.rdbms' },
    { path: '/services', labelKey: 'site.nav.services' },
    { path: '/services/rdbms-compare', labelKey: 'site.nav.rdbmsCompare' },
    { path: '/web', labelKey: 'site.nav.webIntegration' },
    { path: '/web/architecture', labelKey: 'site.nav.webArchitecture' },
    { path: '/web/node-mysql', labelKey: 'site.nav.nodeMysql' },
    { path: '/tuning', labelKey: 'site.nav.tuning' },
    { path: '/tuning/explain', labelKey: 'site.nav.tuningExplain' },
    { path: '/oracle', labelKey: 'site.nav.oracle' },
    { path: '/oracle/sql-processing', labelKey: 'site.nav.oracleSqlProcessing' },
    { path: '/oracle/execution-plan', labelKey: 'site.nav.oracleExecutionPlan' },
    { path: '/sql', labelKey: 'site.nav.sql' },
    { path: '/sql/setup', labelKey: 'site.nav.sqlSetup' },
    { path: '/sql/join', labelKey: 'site.nav.sqlJoin' },
    { path: '/sql/design', labelKey: 'site.nav.sqlDesign' },
    { path: '/references', labelKey: 'site.nav.references' },
    { path: '/training', labelKey: 'site.nav.training' }
  ],

  familySites: [
    { name: 'DreamIT Biz (본사이트)', url: 'https://www.dreamitbiz.com' },
    { name: 'KoreaTech 컴퓨팅 사고', url: 'https://koreatech.dreamitbiz.com' }
  ]
};

export default site;

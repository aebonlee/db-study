import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import useCodeCopy from '../hooks/useCodeCopy';
import useTableScroller from '../hooks/useTableScroller';

const Home = lazy(() => import('../pages/Home'));
const WhatIsDB = lazy(() => import('../pages/WhatIsDB'));
const RDBMS = lazy(() => import('../pages/RDBMS'));
const DbServices = lazy(() => import('../pages/DbServices'));
const RdbmsCompare = lazy(() => import('../pages/RdbmsCompare'));
const NoSqlDb = lazy(() => import('../pages/NoSqlDb'));
const CloudDb = lazy(() => import('../pages/CloudDb'));
const NewSqlDb = lazy(() => import('../pages/NewSqlDb'));
const WebIntegration = lazy(() => import('../pages/WebIntegration'));
const WebArchitecture = lazy(() => import('../pages/WebArchitecture'));
const NodeMysql = lazy(() => import('../pages/NodeMysql'));
const PythonDb = lazy(() => import('../pages/PythonDb'));
const OrmQueryBuilder = lazy(() => import('../pages/OrmQueryBuilder'));
const AuthSecurity = lazy(() => import('../pages/AuthSecurity'));
const DeployOps = lazy(() => import('../pages/DeployOps'));
const DbTuning = lazy(() => import('../pages/DbTuning'));
const ExplainAnalysis = lazy(() => import('../pages/ExplainAnalysis'));
const IndexTuning = lazy(() => import('../pages/IndexTuning'));
const SqlTuning = lazy(() => import('../pages/SqlTuning'));
const ServerTuning = lazy(() => import('../pages/ServerTuning'));
const TuningCaseStudy = lazy(() => import('../pages/TuningCaseStudy'));
const OracleTuning = lazy(() => import('../pages/OracleTuning'));
const OracleSqlProcessing = lazy(() => import('../pages/OracleSqlProcessing'));
const OracleExecutionPlan = lazy(() => import('../pages/OracleExecutionPlan'));
const OracleIndexStrategy = lazy(() => import('../pages/OracleIndexStrategy'));
const OracleAwrAnalysis = lazy(() => import('../pages/OracleAwrAnalysis'));
const OracleParallelWait = lazy(() => import('../pages/OracleParallelWait'));
const SqlLesson = lazy(() => import('../pages/SqlLesson'));
const SqlChapter1 = lazy(() => import('../pages/SqlChapter1'));
const SqlChapter2 = lazy(() => import('../pages/SqlChapter2'));
const SqlChapter3 = lazy(() => import('../pages/SqlChapter3'));
const SqlChapter4 = lazy(() => import('../pages/SqlChapter4'));
const SqlChapter5 = lazy(() => import('../pages/SqlChapter5'));
const SqlChapter6 = lazy(() => import('../pages/SqlChapter6'));
const SqlChapter7 = lazy(() => import('../pages/SqlChapter7'));
const SqlChapter8 = lazy(() => import('../pages/SqlChapter8'));
const SqlChapter9 = lazy(() => import('../pages/SqlChapter9'));
const SqlChapter10 = lazy(() => import('../pages/SqlChapter10'));
const SqlChapter11 = lazy(() => import('../pages/SqlChapter11'));
const SqlChapter12 = lazy(() => import('../pages/SqlChapter12'));
const DbExam = lazy(() => import('../pages/DbExam'));
const DbExamBasic = lazy(() => import('../pages/DbExamBasic'));
const DbExamInter = lazy(() => import('../pages/DbExamInter'));
const References = lazy(() => import('../pages/References'));
const Training = lazy(() => import('../pages/Training'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="loading-spinner"></div>
  </div>
);

const PublicLayout = () => {
  useCodeCopy();
  useTableScroller();

  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* DB Intro */}
            <Route path="/intro/what-is-db" element={<WhatIsDB />} />
            <Route path="/intro/rdbms" element={<RDBMS />} />

            {/* DB Services */}
            <Route path="/services" element={<DbServices />} />
            <Route path="/services/rdbms-compare" element={<RdbmsCompare />} />
            <Route path="/services/nosql" element={<NoSqlDb />} />
            <Route path="/services/cloud-db" element={<CloudDb />} />
            <Route path="/services/newsql" element={<NewSqlDb />} />

            {/* DB Web Integration */}
            <Route path="/web" element={<WebIntegration />} />
            <Route path="/web/architecture" element={<WebArchitecture />} />
            <Route path="/web/node-mysql" element={<NodeMysql />} />
            <Route path="/web/python-db" element={<PythonDb />} />
            <Route path="/web/orm" element={<OrmQueryBuilder />} />
            <Route path="/web/auth-security" element={<AuthSecurity />} />
            <Route path="/web/deploy" element={<DeployOps />} />

            {/* DB Tuning */}
            <Route path="/tuning" element={<DbTuning />} />
            <Route path="/tuning/explain" element={<ExplainAnalysis />} />
            <Route path="/tuning/index" element={<IndexTuning />} />
            <Route path="/tuning/sql" element={<SqlTuning />} />
            <Route path="/tuning/server" element={<ServerTuning />} />
            <Route path="/tuning/case-study" element={<TuningCaseStudy />} />

            {/* Oracle Tuning */}
            <Route path="/oracle" element={<OracleTuning />} />
            <Route path="/oracle/sql-processing" element={<OracleSqlProcessing />} />
            <Route path="/oracle/execution-plan" element={<OracleExecutionPlan />} />
            <Route path="/oracle/index-strategy" element={<OracleIndexStrategy />} />
            <Route path="/oracle/awr-analysis" element={<OracleAwrAnalysis />} />
            <Route path="/oracle/parallel-wait" element={<OracleParallelWait />} />

            {/* SQL Lessons */}
            <Route path="/sql" element={<SqlLesson />} />
            <Route path="/sql/setup" element={<SqlChapter1 />} />
            <Route path="/sql/select" element={<SqlChapter2 />} />
            <Route path="/sql/where" element={<SqlChapter3 />} />
            <Route path="/sql/sort" element={<SqlChapter4 />} />
            <Route path="/sql/function" element={<SqlChapter5 />} />
            <Route path="/sql/aggregate" element={<SqlChapter6 />} />
            <Route path="/sql/dml" element={<SqlChapter7 />} />
            <Route path="/sql/ddl" element={<SqlChapter8 />} />
            <Route path="/sql/join" element={<SqlChapter9 />} />
            <Route path="/sql/subquery" element={<SqlChapter10 />} />
            <Route path="/sql/advanced" element={<SqlChapter11 />} />
            <Route path="/sql/design" element={<SqlChapter12 />} />

            {/* DB Exam */}
            <Route path="/exam" element={<DbExam />} />
            <Route path="/exam/basic" element={<DbExamBasic />} />
            <Route path="/exam/intermediate" element={<DbExamInter />} />

            {/* References */}
            <Route path="/references" element={<References />} />

            {/* Training */}
            <Route path="/training" element={<Training />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

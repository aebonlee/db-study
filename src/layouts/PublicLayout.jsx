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
const References = lazy(() => import('../pages/References'));
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

            {/* References */}
            <Route path="/references" element={<References />} />

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

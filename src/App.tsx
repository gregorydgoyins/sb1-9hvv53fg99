import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Loader } from './components/common/Loader';
import { AuthGuard } from './components/auth/AuthGuard';

// Eager loaded components
import { Dashboard } from './components/Dashboard';

// Auth components
const Login = lazy(() => import('./components/auth/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./components/auth/Register').then(module => ({ default: module.Register })));
const UserProfile = lazy(() => import('./components/auth/UserProfile').then(module => ({ default: module.UserProfile })));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword').then(module => ({ default: module.ResetPassword })));

// Lazy loaded components for better performance
const MarketsPage = lazy(() => import('./pages/MarketsPage').then(module => ({ default: module.MarketsPage })));
const Markets = lazy(() => import('./components/Markets').then(module => ({ default: module.Markets })));
const Creators = lazy(() => import('./components/Creators').then(module => ({ default: module.Creators })));
const CreatorDetail = lazy(() => import('./components/CreatorDetail').then(module => ({ default: module.CreatorDetail })));
const CreatorStockPage = lazy(() => import('./pages/CreatorStockPage').then(module => ({ default: module.CreatorStockPage })));
const CreatorStockDetails = lazy(() => import('./components/creator/CreatorStockDetails').then(module => ({ default: module.CreatorStockDetails })));
const CreatorMatrix = lazy(() => import('./components/creator/CreatorMatrix').then(module => ({ default: module.CreatorMatrix })));
const CreatorProfile = lazy(() => import('./components/creator/CreatorProfile').then(module => ({ default: module.CreatorProfile })));
const PortfolioOverview = lazy(() => import('./components/PortfolioOverview').then(module => ({ default: module.PortfolioOverview })));
const PortfolioShowcase = lazy(() => import('./components/PortfolioShowcase').then(module => ({ default: module.PortfolioShowcase })));
const PortfolioAnalytics = lazy(() => import('./components/PortfolioAnalytics').then(module => ({ default: module.PortfolioAnalytics })));
const Trading = lazy(() => import('./components/Trading').then(module => ({ default: module.Trading })));
const News = lazy(() => import('./pages/NewsPage').then(module => ({ default: module.NewsPage })));
const NewsArticle = lazy(() => import('./components/NewsArticle').then(module => ({ default: module.NewsArticle })));
const Learn = lazy(() => import('./components/learn/LearningCenter').then(module => ({ default: module.LearningCenter })));
const ComicMarketIndexTrend = lazy(() => import('./components/ComicMarketIndexTrend').then(module => ({ default: module.ComicMarketIndexTrend })));
const ComicPriceTrends = lazy(() => import('./components/ComicPriceTrends').then(module => ({ default: module.ComicPriceTrends })));
const NavigationTestPage = lazy(() => import('./pages/NavigationTest').then(module => ({ default: module.NavigationTestPage })));
const ResearchReport = lazy(() => import('./components/research/ResearchReport').then(module => ({ default: module.ResearchReport })));
const FinancialDashboard = lazy(() => import('./pages/FinancialDashboard').then(module => ({ default: module.FinancialDashboard })));
const AssetPage = lazy(() => import('./pages/AssetPage').then(module => ({ default: module.AssetPage })));
const CreatorCategoryPage = lazy(() => import('./pages/CreatorCategoryPage').then(module => ({ default: module.CreatorCategoryPage })));

// Bond Pages
const BondListPage = lazy(() => import('./pages/bond/BondListPage').then(module => ({ default: module.BondListPage })));
const BondDetailsPage = lazy(() => import('./pages/bond/BondDetailsPage').then(module => ({ default: module.BondDetailsPage })));
const CreatorBondPage = lazy(() => import('./pages/bond/CreatorBondPage').then(module => ({ default: module.CreatorBondPage })));
const PublisherBondPage = lazy(() => import('./pages/bond/PublisherBondPage').then(module => ({ default: module.PublisherBondPage })));
const SpecialtyBondPage = lazy(() => import('./pages/bond/SpecialtyBondPage').then(module => ({ default: module.SpecialtyBondPage })));

// Fund Pages
const FundListPage = lazy(() => import('./pages/fund/FundListPage').then(module => ({ default: module.FundListPage })));
const FundDetailsPage = lazy(() => import('./pages/fund/FundDetailsPage').then(module => ({ default: module.FundDetailsPage })));
const ThemedFundPage = lazy(() => import('./pages/fund/ThemedFundPage').then(module => ({ default: module.ThemedFundPage })));
const CustomFundPage = lazy(() => import('./pages/fund/CustomFundPage').then(module => ({ default: module.CustomFundPage })));

// Character Pages
const CharacterStockPage = lazy(() => import('./pages/character/CharacterStockPage').then(module => ({ default: module.CharacterStockPage })));
const CharacterDetailsPage = lazy(() => import('./pages/character/CharacterDetailsPage').then(module => ({ default: module.CharacterDetailsPage })));
const HeroStockPage = lazy(() => import('./pages/character/HeroStockPage').then(module => ({ default: module.HeroStockPage })));
const VillainStockPage = lazy(() => import('./pages/character/VillainStockPage').then(module => ({ default: module.VillainStockPage })));
const SidekickStockPage = lazy(() => import('./pages/character/SidekickStockPage').then(module => ({ default: module.SidekickStockPage })));
const HenchmanStockPage = lazy(() => import('./pages/character/HenchmanStockPage').then(module => ({ default: module.HenchmanStockPage })));

// Location Pages
const LocationStockPage = lazy(() => import('./pages/location/LocationStockPage').then(module => ({ default: module.LocationStockPage })));
const LocationDetailsPage = lazy(() => import('./pages/location/LocationDetailsPage').then(module => ({ default: module.LocationDetailsPage })));
const HangoutStockPage = lazy(() => import('./pages/location/HangoutStockPage').then(module => ({ default: module.HangoutStockPage })));
const HideoutStockPage = lazy(() => import('./pages/location/HideoutStockPage').then(module => ({ default: module.HideoutStockPage })));

// Gadget Pages
const GadgetStockPage = lazy(() => import('./pages/gadget/GadgetStockPage').then(module => ({ default: module.GadgetStockPage })));
const GadgetDetailsPage = lazy(() => import('./pages/gadget/GadgetDetailsPage').then(module => ({ default: module.GadgetDetailsPage })));

// Trading Pages
const BuyPage = lazy(() => import('./pages/trading/BuyPage').then(module => ({ default: module.BuyPage })));
const SellPage = lazy(() => import('./pages/trading/SellPage').then(module => ({ default: module.SellPage })));
const PutsPage = lazy(() => import('./pages/trading/options/PutsPage').then(module => ({ default: module.PutsPage })));
const CallsPage = lazy(() => import('./pages/trading/options/CallsPage').then(module => ({ default: module.CallsPage })));
const LEAPsPage = lazy(() => import('./pages/trading/options/LEAPsPage').then(module => ({ default: module.LEAPsPage })));
const StraddlesPage = lazy(() => import('./pages/trading/specialty/StraddlesPage').then(module => ({ default: module.StraddlesPage })));
const ButterflysPage = lazy(() => import('./pages/trading/specialty/ButterflysPage').then(module => ({ default: module.ButterflysPage })));
const BullBearStraddlesPage = lazy(() => import('./pages/trading/specialty/BullBearStraddlesPage').then(module => ({ default: module.BullBearStraddlesPage })));
const DerivativesFuturesPage = lazy(() => import('./pages/trading/DerivativesFuturesPage').then(module => ({ default: module.DerivativesFuturesPage })));
const ETFsPage = lazy(() => import('./pages/trading/ETFsPage').then(module => ({ default: module.ETFsPage })));

// Portfolio Pages
const FormulasPage = lazy(() => import('./pages/portfolio/FormulasPage').then(module => ({ default: module.FormulasPage })));
const ToolsPage = lazy(() => import('./pages/portfolio/ToolsPage').then(module => ({ default: module.ToolsPage })));
const WatchlistPage = lazy(() => import('./pages/portfolio/WatchlistPage').then(module => ({ default: module.WatchlistPage })));
const TradingJournalPage = lazy(() => import('./pages/portfolio/TradingJournalPage').then(module => ({ default: module.TradingJournalPage })));

// Market Pages
const MarketCalendarPage = lazy(() => import('./pages/markets/MarketCalendarPage').then(module => ({ default: module.MarketCalendarPage })));

// Loading fallback
const PageLoader = () => <Loader />;

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <AuthGuard requireAuth={false}>
                <Login />
              </AuthGuard>
            } />
            <Route path="/register" element={
              <AuthGuard requireAuth={false}>
                <Register />
              </AuthGuard>
            } />
            <Route path="/forgot-password" element={
              <AuthGuard requireAuth={false}>
                <ForgotPassword />
              </AuthGuard>
            } />
            <Route path="/reset-password" element={
              <AuthGuard requireAuth={false}>
                <ResetPassword />
              </AuthGuard>
            } />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <AuthGuard>
                <UserProfile />
              </AuthGuard>
            } />
            
            {/* Main Routes - Some may require auth in the future */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/markets-old" element={<Markets />} />
            <Route path="/market-index" element={<ComicMarketIndexTrend />} />
            <Route path="/price-trends" element={<ComicPriceTrends />} />
            <Route path="/market-calendar" element={<MarketCalendarPage />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/creator/:symbol" element={<CreatorDetail />} />
            <Route path="/creator-stocks" element={<CreatorStockPage />} />
            <Route path="/creator-stock/:symbol" element={<CreatorStockDetails />} />
            <Route path="/creator-matrix" element={<CreatorMatrix />} />
            <Route path="/creator-profile/:symbol" element={<CreatorProfile />} />
            <Route path="/creator-category/:category" element={<CreatorCategoryPage />} />
            <Route path="/assets/:assetType" element={<AssetPage />} />
            
            {/* Bond Routes */}
            <Route path="/bonds" element={<BondListPage />} />
            <Route path="/bond/:symbol" element={<BondDetailsPage />} />
            <Route path="/creator-bonds" element={<CreatorBondPage />} />
            <Route path="/publisher-bonds" element={<PublisherBondPage />} />
            <Route path="/specialty-bonds" element={<SpecialtyBondPage />} />
            
            {/* Fund Routes */}
            <Route path="/funds" element={<FundListPage />} />
            <Route path="/fund/:symbol" element={<FundDetailsPage />} />
            <Route path="/themed-funds" element={<ThemedFundPage />} />
            <Route path="/custom-funds" element={<CustomFundPage />} />
            
            {/* Character Routes */}
            <Route path="/characters" element={<CharacterStockPage />} />
            <Route path="/character/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/hero/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/villain/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/sidekick/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/henchman/:symbol" element={<CharacterDetailsPage />} />
            <Route path="/hero-stocks" element={<HeroStockPage />} />
            <Route path="/villain-stocks" element={<VillainStockPage />} />
            <Route path="/sidekick-stocks" element={<SidekickStockPage />} />
            <Route path="/henchmen-stocks" element={<HenchmanStockPage />} />
            
            {/* Location Routes */}
            <Route path="/locations" element={<LocationStockPage />} />
            <Route path="/location/:symbol" element={<LocationDetailsPage />} />
            <Route path="/hangout/:symbol" element={<LocationDetailsPage />} />
            <Route path="/hideout/:symbol" element={<LocationDetailsPage />} />
            <Route path="/hangout-stocks" element={<HangoutStockPage />} />
            <Route path="/hideout-stocks" element={<HideoutStockPage />} />
            
            {/* Gadget Routes */}
            <Route path="/gadgets" element={<GadgetStockPage />} />
            <Route path="/gadget/:symbol" element={<GadgetDetailsPage />} />
            
            {/* Trading Routes */}
            <Route path="/trading" element={<Trading />} />
            <Route path="/trading/buy" element={<BuyPage />} />
            <Route path="/trading/sell" element={<SellPage />} />
            <Route path="/trading/options/puts" element={<PutsPage />} />
            <Route path="/trading/options/calls" element={<CallsPage />} />
            <Route path="/trading/options/leaps" element={<LEAPsPage />} />
            <Route path="/trading/specialty/straddles" element={<StraddlesPage />} />
            <Route path="/trading/specialty/butterflys" element={<ButterflysPage />} />
            <Route path="/trading/specialty/bull-bear" element={<BullBearStraddlesPage />} />
            <Route path="/trading/derivatives-futures" element={<DerivativesFuturesPage />} />
            <Route path="/trading/etfs" element={<ETFsPage />} />
            
            {/* Portfolio Routes */}
            <Route path="/portfolio" element={<PortfolioOverview />} />
            <Route path="/portfolio/showcase" element={<PortfolioShowcase />} />
            <Route path="/portfolio/analytics" element={<PortfolioAnalytics />} />
            <Route path="/portfolio/formulas" element={<FormulasPage />} />
            <Route path="/portfolio/tools" element={<ToolsPage />} />
            <Route path="/portfolio/watchlist" element={<WatchlistPage />} />
            <Route path="/portfolio/journal" element={<TradingJournalPage />} />
            
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/research" element={<ResearchReport />} />
            <Route path="/navigation-test" element={<NavigationTestPage />} />
            <Route path="/financial-dashboard" element={<FinancialDashboard />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Calculator, Info, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react';

export function FormulasPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Applicable Formulas' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Applicable Formulas</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            This page provides key financial formulas and calculations that can help you analyze your portfolio, evaluate investment opportunities, and make informed trading decisions. Understanding these formulas is essential for successful trading in the Panel Profits universe.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Return Calculations */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Return Calculations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Absolute Return</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">Return = (Current Value - Initial Value) / Initial Value × 100%</p>
                </div>
                <p className="text-sm text-gray-300">
                  Measures the percentage change in value of an investment over a specific period. This is the most basic return calculation.
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Example:</strong> If you bought ASM300 for CC 2,000 and it's now worth CC 2,500, your return is (2,500 - 2,000) / 2,000 × 100% = 25%
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Annualized Return</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">Annualized Return = (1 + Return)<sup>1/n</sup> - 1</p>
                  <p className="text-gray-400 text-sm">where n = number of years</p>
                </div>
                <p className="text-sm text-gray-300">
                  Converts a return over any period to an annual rate, allowing for comparison between investments held for different time periods.
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Example:</strong> If your portfolio gained 50% over 3 years, the annualized return is (1 + 0.5)<sup>1/3</sup> - 1 = 14.5%
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Risk Metrics */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Risk Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Volatility (Standard Deviation)</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">σ = √(Σ(R<sub>i</sub> - R̄)<sup>2</sup> / (n-1))</p>
                  <p className="text-gray-400 text-sm">where R<sub>i</sub> = return in period i, R̄ = average return</p>
                </div>
                <p className="text-sm text-gray-300">
                  Measures the dispersion of returns around the average return, indicating the investment's risk or stability.
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Interpretation:</strong> Higher volatility indicates greater risk and potential for both larger gains and losses.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Sharpe Ratio</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">Sharpe Ratio = (R<sub>p</sub> - R<sub>f</sub>) / σ<sub>p</sub></p>
                  <p className="text-gray-400 text-sm">where R<sub>p</sub> = portfolio return, R<sub>f</sub> = risk-free rate</p>
                </div>
                <p className="text-sm text-gray-300">
                  Measures risk-adjusted return, showing the excess return per unit of risk (volatility).
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Interpretation:</strong> Higher Sharpe ratios indicate better risk-adjusted performance. A ratio above 1.0 is generally considered good.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Maximum Drawdown</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">Max Drawdown = (Trough Value - Peak Value) / Peak Value</p>
                </div>
                <p className="text-sm text-gray-300">
                  Measures the largest percentage drop from a peak to a trough in the value of a portfolio before a new peak is achieved.
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Interpretation:</strong> Smaller maximum drawdowns indicate less downside risk. This metric helps assess worst-case scenarios.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Beta</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">β = Covariance(R<sub>i</sub>, R<sub>m</sub>) / Variance(R<sub>m</sub>)</p>
                  <p className="text-gray-400 text-sm">where R<sub>i</sub> = asset return, R<sub>m</sub> = market return</p>
                </div>
                <p className="text-sm text-gray-300">
                  Measures an asset's volatility relative to the overall market (Comic Market Index).
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Interpretation:</strong> β &gt; 1 means more volatile than the market, β &lt; 1 means less volatile, β = 1 means same volatility as the market.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Options Pricing */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Options Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Black-Scholes Model (Simplified)</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">Call Price = S × N(d1) - K × e<sup>-rT</sup> × N(d2)</p>
                  <p className="text-gray-400 text-sm">where S = stock price, K = strike price, r = risk-free rate, T = time to expiration</p>
                </div>
                <p className="text-sm text-gray-300">
                  The Black-Scholes model is a mathematical model used to determine the theoretical price of options.
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Note:</strong> The full formula is complex, but our trading platform calculates option prices automatically using this model.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Option Greeks</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-indigo-400">Delta (Δ):</span>
                    <span>∂V/∂S (Rate of change in option value per $1 change in underlying)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-400">Gamma (Γ):</span>
                    <span>∂²V/∂S² (Rate of change in Delta per $1 change in underlying)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-400">Theta (Θ):</span>
                    <span>-∂V/∂T (Rate of time decay in option value)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-400">Vega (v):</span>
                    <span>∂V/∂σ (Sensitivity to changes in volatility)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-400">Rho (ρ):</span>
                    <span>∂V/∂r (Sensitivity to changes in interest rate)</span>
                  </div>
                </div>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Note:</strong> These "Greeks" help options traders understand and manage the various dimensions of risk in their positions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Portfolio Management */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Portfolio Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Portfolio Expected Return</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">E(R<sub>p</sub>) = Σ w<sub>i</sub> × E(R<sub>i</sub>)</p>
                  <p className="text-gray-400 text-sm">where w<sub>i</sub> = weight of asset i, E(R<sub>i</sub>) = expected return of asset i</p>
                </div>
                <p className="text-sm text-gray-300">
                  Calculates the weighted average of the expected returns of the individual assets in a portfolio.
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Example:</strong> If your portfolio is 60% HERO (10% expected return) and 40% VILL (15% expected return), the portfolio expected return is 0.6 × 10% + 0.4 × 15% = 12%
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Portfolio Variance</h3>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 font-mono text-center mb-3">
                  <p className="text-indigo-300">σ<sub>p</sub><sup>2</sup> = ΣΣ w<sub>i</sub>w<sub>j</sub>σ<sub>i</sub>σ<sub>j</sub>ρ<sub>ij</sub></p>
                  <p className="text-gray-400 text-sm">where ρ<sub>ij</sub> = correlation between assets i and j</p>
                </div>
                <p className="text-sm text-gray-300">
                  Measures the risk of a portfolio, taking into account not just the volatility of individual assets but also how they move in relation to each other.
                </p>
                <div className="mt-3 bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  <p className="text-sm text-indigo-200">
                    <strong>Key insight:</strong> Diversification works because assets that aren't perfectly correlated can reduce overall portfolio risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-yellow-900/30 p-4 rounded-lg border border-yellow-700/30">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-white mb-2">Important Note</h3>
              <p className="text-sm text-gray-300">
                These formulas provide a theoretical framework for investment analysis, but past performance is not indicative of future results. Market conditions, liquidity, and other factors can significantly impact actual outcomes. Always consider your risk tolerance and investment goals when making trading decisions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            <BookOpen className="h-5 w-5" />
            <span>Download Formula Guide PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormulasPage;
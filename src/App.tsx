/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CalculaThonLogo } from "./components/CalculaThonLogo";
import { InteractiveCalculator } from "./components/InteractiveCalculator";
import { PythonCodeExplainer } from "./components/PythonCodeExplainer";
import { PythonTerminalSimulator } from "./components/PythonTerminalSimulator";
import { OperationsGuide } from "./components/OperationsGuide";
import { COMPLETE_PYTHON_CODE } from "./data/pythonCalculatorCode";
import { 
  Calculator, 
  Code2, 
  Terminal, 
  BookMarked, 
  Download, 
  Check, 
  Copy
} from "lucide-react";

type ActiveTab = "calculator" | "code_explainer" | "terminal" | "guide";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("calculator");
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const handleDownloadScript = () => {
    const blob = new Blob([COMPLETE_PYTHON_CODE], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "calculathon.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCompleteScript = () => {
    navigator.clipboard.writeText(COMPLETE_PYTHON_CODE);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 1. TOP BAR CONTRACT: One-row, 3-zone layout */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark com o símbolo do Python e os 4 operadores */}
          <button
            type="button"
            onClick={() => setActiveTab("calculator")}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-amber-700 transition-colors cursor-pointer flex items-center gap-3"
          >
            <CalculaThonLogo size={38} />
            <span className="font-extrabold tracking-tight text-slate-900 text-xl">CalculaThon</span>
          </button>

          {/* Zone 2: 4 clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab("calculator")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === "calculator" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Calculadora Visual
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code_explainer")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === "code_explainer" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Código & Explicações
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("terminal")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === "terminal" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Terminal Simulado
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("guide")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === "guide" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Operações & Guia
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadScript}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar calculathon.py</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO / CONTEXT BAR COM O SÍMBOLO DO PYTHON E OS 4 OPERADORES AO REDOR */}
      <section className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            {/* Símbolo do Python com os 4 operadores (+, -, *, /) */}
            <div className="p-1 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs shrink-0">
              <CalculaThonLogo size={80} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <span className="font-semibold text-amber-700">CalculaThon</span>
                <span aria-hidden="true">·</span>
                <span>Python 3.12+</span>
                <span aria-hidden="true">·</span>
                <span>Operações Básicas, Porcentagem e Logaritmo</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
                CalculaThon
              </h1>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
                Calculadora completa em Python com as 4 operações básicas (+, −, ×, ÷), cálculo de Porcentagem (%) e Logaritmo (log), explicações didáticas de cada parte do código e terminal interativo.
              </p>
            </div>
          </div>

          {/* Segmented Control de Visualização */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 self-start lg:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab("calculator")}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "calculator"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculadora Visual</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code_explainer")}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "code_explainer"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Código & Explicações</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("terminal")}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "terminal"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal Simulado</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("guide")}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "guide"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Operações & Guia</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "calculator" && <InteractiveCalculator />}
        {activeTab === "code_explainer" && <PythonCodeExplainer />}
        {activeTab === "terminal" && <PythonTerminalSimulator />}
        {activeTab === "guide" && <OperationsGuide />}
      </main>

      {/* 4. FOOTER: Clean, quiet site footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CalculaThonLogo size={24} showOrbitalRing={false} />
            <span className="font-bold text-slate-800">CalculaThon</span>
            <span aria-hidden="true">·</span>
            <span>Calculadora em Python (Adição, Subtração, Multiplicação, Divisão, Porcentagem e Logaritmo)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleCopyCompleteScript}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Código copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copiar script Python</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownloadScript}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Baixar calculathon.py</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

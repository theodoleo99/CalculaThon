import React, { useState } from "react";
import { 
  COMPLETE_PYTHON_CODE, 
  BASIC_PYTHON_CODE, 
  CODE_SECTIONS, 
  CodeSection 
} from "../data/pythonCalculatorCode";
import { 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Terminal, 
  Code2, 
  Info, 
  ChevronRight,
  Sparkles,
  FileCode
} from "lucide-react";

export function PythonCodeExplainer() {
  const [activeVersion, setActiveVersion] = useState<"complete" | "basic">("complete");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("funcao_adicao");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const selectedSection = CODE_SECTIONS.find((s) => s.id === selectedSectionId) || CODE_SECTIONS[0];
  const currentCodeToDisplay = activeVersion === "complete" ? COMPLETE_PYTHON_CODE : BASIC_PYTHON_CODE;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCodeToDisplay);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadPy = () => {
    const filename = activeVersion === "complete" ? "calculathon.py" : "calculathon_basico.py";
    const blob = new Blob([currentCodeToDisplay], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Barra superior de controle e alternância de versão */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-600" />
            CalculaThon: Código Python & Explicações Detalhadas
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore cada função, linha e conceito matemático com explicações claras em português.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* Segmented control para versão do código */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveVersion("complete")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeVersion === "complete"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Versão Completa com Menu
            </button>
            <button
              type="button"
              onClick={() => setActiveVersion("basic")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeVersion === "basic"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Versão Básica Simples
            </button>
          </div>

          {/* Botão Copiar */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar .py</span>
              </>
            )}
          </button>

          {/* Botão Baixar .py */}
          <button
            type="button"
            onClick={handleDownloadPy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar script (.py)</span>
          </button>
        </div>
      </div>

      {/* Grid de 2 colunas: Lista de Partes do Código + Explicação Aprofundada & Código */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna da Esquerda: Navegação pelos Módulos e Partes */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Partes do Programa ({CODE_SECTIONS.length})
              </span>
              <span className="text-[11px] text-slate-400">Clique para ver a explicação</span>
            </div>

            <div className="space-y-1.5">
              {CODE_SECTIONS.map((section) => {
                const isSelected = selectedSection.id === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setSelectedSectionId(section.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/10 border border-amber-500/30 text-amber-950 font-medium shadow-2xs"
                        : "hover:bg-slate-50 border border-transparent text-slate-700"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{section.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {section.shortSummary}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-amber-700 translate-x-0.5" : "text-slate-300"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dica para Iniciantes */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 shadow-sm text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Como executar no seu computador:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed">
              <li>Instale o Python 3 (<a href="https://www.python.org" target="_blank" rel="noreferrer" className="underline hover:text-white">python.org</a>).</li>
              <li>Baixe o arquivo clicando em <strong>Baixar script (.py)</strong> acima.</li>
              <li>Abra o terminal ou Prompt de Comando na pasta do arquivo.</li>
              <li>
                Digite o comando:
                <code className="block bg-slate-950 text-emerald-400 p-2 rounded mt-1 font-mono">
                  python calculadora.py
                </code>
              </li>
            </ol>
          </div>
        </div>

        {/* Coluna da Direita: Card de Explicação Detalhada do Bloco Selecionado & Código */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Card Detalhado da Seção Selecionada */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedSection.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {selectedSection.title}
                </h3>
              </div>

              <div className="text-right text-xs text-slate-400 font-mono">
                Linhas {selectedSection.lineStart} a {selectedSection.lineEnd}
              </div>
            </div>

            {/* Trecho do código em destaque */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-slate-600" />
                Trecho de código correspondente:
              </div>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                <pre>
                  <code>{selectedSection.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Explicação Didática */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  O que essa parte do código faz?
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedSection.explanation}
                </p>
              </div>

              {/* Pontos-Chave */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Conceitos e Palavras-Chave do Python
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedSection.keyPoints.map((point, index) => (
                    <li
                      key={index}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700 leading-normal"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dica de Sintaxe */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
                <strong className="font-semibold block mb-0.5 text-amber-900">
                  Dica de Sintaxe & Boas Práticas:
                </strong>
                <span>{selectedSection.syntaxTips}</span>
              </div>
            </div>
          </div>

          {/* Visualizador do Código Completo */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Código-Fonte Completo ({activeVersion === "complete" ? "calculadora.py" : "calculadora_basica.py"})
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {currentCodeToDisplay.split("\n").length} linhas
              </span>
            </div>

            <div className="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-[500px] overflow-y-auto border border-slate-800">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {currentCodeToDisplay.split("\n").map((line, idx) => {
                    const lineNum = idx + 1;
                    const isHighlighted = 
                      activeVersion === "complete" &&
                      lineNum >= selectedSection.lineStart && 
                      lineNum <= selectedSection.lineEnd;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isHighlighted ? "bg-amber-900/40 text-amber-200 font-medium" : "hover:bg-slate-900/60"
                        }`}
                      >
                        <td className="w-10 select-none text-right pr-4 text-slate-600 font-mono text-[11px] align-top py-0.5">
                          {lineNum}
                        </td>
                        <td className="py-0.5 whitespace-pre">
                          <code>{line || " "}</code>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

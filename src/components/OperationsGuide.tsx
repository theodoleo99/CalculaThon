import React, { useState } from "react";
import { OPERATIONS_LIST } from "../data/pythonCalculatorCode";
import { Plus, Minus, X as MultiplyIcon, Divide as DivideIcon, Percent, Sparkles, BookMarked, Calculator } from "lucide-react";

export function OperationsGuide() {
  const [selectedOpId, setSelectedOpId] = useState<string>("adicao");
  const [testA, setTestA] = useState<number>(20);
  const [testB, setTestB] = useState<number>(4);

  const selectedOp = OPERATIONS_LIST.find((o) => o.id === selectedOpId) || OPERATIONS_LIST[0];

  const calculateMiniTest = () => {
    switch (selectedOp.id) {
      case "adicao":
        return { res: testA + testB, formula: `${testA} + ${testB}` };
      case "subtracao":
        return { res: testA - testB, formula: `${testA} - ${testB}` };
      case "multiplicacao":
        return { res: testA * testB, formula: `${testA} * ${testB}` };
      case "divisao":
        if (testB === 0) {
          return { res: "Erro: Divisão por Zero!", formula: `${testA} / 0`, isError: true };
        }
        return { res: testA / testB, formula: `${testA} / ${testB}` };
      case "porcentagem":
        return { res: (testA * testB) / 100.0, formula: `${testB}% de ${testA}` };
      case "logaritmo":
        if (testA <= 0) {
          return { res: "Erro: Logaritmo indefinido (logaritmando ≤ 0)!", formula: `log_${testB}(${testA})`, isError: true };
        }
        if (testB <= 0 || testB === 1) {
          return { res: "Erro: A base do logaritmo deve ser > 0 e ≠ 1!", formula: `log_${testB}(${testA})`, isError: true };
        }
        const logRes = Math.log(testA) / Math.log(testB);
        return { res: Number(logRes.toFixed(6)), formula: `log de ${testA} na base ${testB}` };
      default:
        return { res: 0, formula: "" };
    }
  };

  const miniTestResult = calculateMiniTest();

  return (
    <div className="flex flex-col gap-8">
      {/* Header do Guia */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-600" />
            Guia Didático das Operações Matemáticas
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Entenda detalhadamente como funcionam a Adição, Subtração, Multiplicação, Divisão, Porcentagem e Logaritmo na teoria matemática e na prática da linguagem Python.
          </p>
        </div>
      </div>

      {/* Grid de 6 Cards das Operações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {OPERATIONS_LIST.map((op) => {
          const isSelected = selectedOp.id === op.id;
          return (
            <button
              key={op.id}
              type="button"
              onClick={() => {
                setSelectedOpId(op.id);
                if (op.id === "porcentagem") {
                  setTestA(500);
                  setTestB(20);
                } else if (op.id === "logaritmo") {
                  setTestA(100);
                  setTestB(10);
                } else {
                  setTestA(20);
                  setTestB(4);
                }
              }}
              className={`text-left p-5 rounded-2xl transition-all border cursor-pointer ${
                isSelected
                  ? "bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20"
                  : "bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg ${
                  isSelected ? "bg-amber-600 text-white" : "bg-slate-100 text-slate-700"
                }`}>
                  {op.id === "adicao" && <Plus className="w-5 h-5" />}
                  {op.id === "subtracao" && <Minus className="w-5 h-5" />}
                  {op.id === "multiplicacao" && <MultiplyIcon className="w-5 h-5" />}
                  {op.id === "divisao" && <DivideIcon className="w-5 h-5" />}
                  {op.id === "porcentagem" && <Percent className="w-4 h-4" />}
                  {op.id === "logaritmo" && <span className="font-mono text-xs font-black">log</span>}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Python: <code className="font-bold text-slate-700">{op.pythonOperator}</code>
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{op.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {op.description}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>Exemplo:</span>
                <span className="font-semibold text-amber-700">{op.example}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detalhamento da Operação Selecionada com Mini-Simulador */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Detalhes Teóricos e Sintaxe */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
          <div>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Operador / Função em Python: {selectedOp.pythonOperator}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2">
              Tudo sobre {selectedOp.name}
            </h3>
            <p className="text-sm text-slate-700 mt-1">
              {selectedOp.description}
            </p>
          </div>

          {/* Propriedade Matemática */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Propriedade Matemática
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedOp.mathProperty}
            </p>
          </div>

          {/* Particularidade no Python */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Nuance importante em Python
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed">
              {selectedOp.pythonNuance}
            </p>
          </div>

          {/* Código Exemplo */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Como escrever a função em Python:
            </h4>
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-slate-800">
              <pre>
                <code>{selectedOp.codeExample}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Mini Testador Interativo da Operação */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calculator className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Laboratório Interativo ({selectedOp.name})
            </h4>
          </div>

          <p className="text-xs text-slate-500">
            Altere os valores de entrada abaixo para ver o cálculo e o comportamento do Python instantaneamente:
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {selectedOp.id === "porcentagem" 
                  ? "Valor Principal / Base (a):" 
                  : selectedOp.id === "logaritmo"
                  ? "Número / Logaritmando (a > 0):"
                  : "Primeiro número (a):"}
              </label>
              <input
                type="number"
                value={testA}
                onChange={(e) => setTestA(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {selectedOp.id === "logaritmo" && testA <= 0 && (
                <span className="text-[11px] text-rose-600 font-medium mt-1 block">
                  Atenção: O logaritmo é indefinido para valores ≤ 0!
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {selectedOp.id === "porcentagem" 
                  ? "Taxa Percentual % (b):" 
                  : selectedOp.id === "logaritmo"
                  ? "Base do Logaritmo (b > 0 e ≠ 1):"
                  : "Segundo número (b):"}
              </label>
              <input
                type="number"
                value={testB}
                onChange={(e) => setTestB(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {selectedOp.id === "divisao" && testB === 0 && (
                <span className="text-[11px] text-rose-600 font-medium mt-1 block">
                  Atenção: Divisor igual a zero! Veja como o Python lida com isso abaixo.
                </span>
              )}
              {selectedOp.id === "logaritmo" && (testB <= 0 || testB === 1) && (
                <span className="text-[11px] text-rose-600 font-medium mt-1 block">
                  Atenção: A base do logaritmo deve ser estritamente positiva e diferente de 1!
                </span>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
              <div className="text-slate-400 text-[11px]">Cálculo em Python:</div>
              <div className="text-amber-300 font-semibold text-sm">
                {miniTestResult.formula} =
              </div>
              <div className={`text-base font-bold ${miniTestResult.isError ? "text-rose-400" : "text-emerald-400"}`}>
                {miniTestResult.res}
              </div>
            </div>

            {selectedOp.id === "divisao" && (
              <div className="text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Dica Extra dos 3 tipos de divisão em Python:</div>
                <div>• <code>a / b</code> : Divisão exata real (retorna float)</div>
                <div>• <code>a // b</code> : Divisão inteira (trunca os decimais)</div>
                <div>• <code>a % b</code> : Resto da divisão (módulo)</div>
              </div>
            )}

            {selectedOp.id === "porcentagem" && (
              <div className="text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Dica de Porcentagem vs Módulo em Python:</div>
                <div>• Na matemática/comércio: <code>20% de 500 = (500 * 20) / 100 = 100</code></div>
                <div>• No Python puro: <code>500 % 20</code> calcula o <em>resto da divisão</em> (que é <code>0</code>)</div>
                <div>• Por isso, sempre definimos a fórmula <code>(valor * taxa) / 100</code> explicitamente!</div>
              </div>
            )}

            {selectedOp.id === "logaritmo" && (
              <div className="text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Funções de Logaritmo no módulo <code>math</code>:</div>
                <div>• <code>math.log10(x)</code> : Logaritmo decimal (base 10)</div>
                <div>• <code>math.log(x)</code> : Logaritmo natural / neperiano (base e)</div>
                <div>• <code>math.log(x, base)</code> : Logaritmo em qualquer base personalizada</div>
                <div>• <code>math.log2(x)</code> : Logaritmo binário (base 2)</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

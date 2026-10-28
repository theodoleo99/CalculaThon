import React, { useState, useEffect, useCallback } from "react";
import { CalculaThonLogo } from "./CalculaThonLogo";
import { 
  Plus, 
  Minus, 
  X as MultiplyIcon, 
  Divide as DivideIcon, 
  Equal, 
  Delete, 
  RotateCcw, 
  AlertCircle, 
  Copy, 
  Check, 
  Code2, 
  History, 
  Trash2,
  Sparkles
} from "lucide-react";

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  pythonSnippet: string;
  timestamp: string;
  operationType: "adicao" | "subtracao" | "multiplicacao" | "divisao";
}

export function InteractiveCalculator() {
  const [currentInput, setCurrentInput] = useState<string>("0");
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/" | null>(null);
  const [waitingForNewInput, setWaitingForNewInput] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    return [
      {
        id: "sample-1",
        expression: "128 + 72",
        result: "200",
        pythonSnippet: "adicionar(128.0, 72.0) # 200.0",
        timestamp: "Agora há pouco",
        operationType: "adicao",
      },
      {
        id: "sample-2",
        expression: "450 - 85",
        result: "365",
        pythonSnippet: "subtrair(450.0, 85.0) # 365.0",
        timestamp: "Agora há pouco",
        operationType: "subtracao",
      },
    ];
  });

  // Calculate mathematical result
  const compute = useCallback((num1: number, num2: number, op: "+" | "-" | "*" | "/"): { result: number | null; error?: string } => {
    switch (op) {
      case "+":
        return { result: num1 + num2 };
      case "-":
        return { result: num1 - num2 };
      case "*":
        return { result: num1 * num2 };
      case "/":
        if (num2 === 0) {
          return { 
            result: null, 
            error: "ZeroDivisionError: Impossível dividir por zero! Na matemática e no Python (a / 0), essa operação é indefinida." 
          };
        }
        return { result: num1 / num2 };
      default:
        return { result: num2 };
    }
  }, []);

  // Format number for display
  const formatNumber = (numStr: string) => {
    if (numStr === "Erro" || numStr === "NaN") return numStr;
    const parts = numStr.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Format integer with dot separator for thousands if needed
    const formattedInteger = Number(integerPart).toLocaleString("pt-BR");
    if (decimalPart !== undefined) {
      return `${formattedInteger},${decimalPart}`;
    }
    return formattedInteger;
  };

  const handleDigit = useCallback((digit: string) => {
    setErrorMsg(null);
    if (waitingForNewInput) {
      setCurrentInput(digit === "." ? "0." : digit);
      setWaitingForNewInput(false);
    } else {
      if (digit === ".") {
        if (!currentInput.includes(".")) {
          setCurrentInput(currentInput + ".");
        }
      } else {
        if (currentInput === "0") {
          setCurrentInput(digit);
        } else {
          // Limit length to prevent overflow
          if (currentInput.replace(".", "").length < 14) {
            setCurrentInput(currentInput + digit);
          }
        }
      }
    }
  }, [currentInput, waitingForNewInput]);

  const handleOperator = useCallback((op: "+" | "-" | "*" | "/") => {
    setErrorMsg(null);
    const inputValue = parseFloat(currentInput);

    if (previousInput === null) {
      setPreviousInput(currentInput);
      setOperator(op);
      setWaitingForNewInput(true);
    } else if (operator && !waitingForNewInput) {
      const prevValue = parseFloat(previousInput);
      const { result, error } = compute(prevValue, inputValue, operator);

      if (error) {
        setErrorMsg(error);
        setPreviousInput(null);
        setOperator(null);
        setWaitingForNewInput(true);
        return;
      }

      if (result !== null) {
        // Clean float precision
        const formattedResult = Number(result.toFixed(8)).toString();
        setCurrentInput(formattedResult);
        setPreviousInput(formattedResult);
        setOperator(op);
        setWaitingForNewInput(true);
      }
    } else {
      setOperator(op);
    }
  }, [compute, currentInput, operator, previousInput, waitingForNewInput]);

  const handleEqual = useCallback(() => {
    if (!operator || previousInput === null) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    const { result, error } = compute(num1, num2, operator);

    if (error) {
      setErrorMsg(error);
      setCurrentInput("0");
      setPreviousInput(null);
      setOperator(null);
      setWaitingForNewInput(true);
      return;
    }

    if (result !== null) {
      const cleanResult = Number(result.toFixed(8)).toString();
      const opNames: Record<string, HistoryItem["operationType"]> = {
        "+": "adicao",
        "-": "subtracao",
        "*": "multiplicacao",
        "/": "divisao",
      };
      const opSymbols: Record<string, string> = {
        "+": "+",
        "-": "-",
        "*": "×",
        "/": "÷",
      };
      const opFunctions: Record<string, string> = {
        "+": "adicionar",
        "-": "subtrair",
        "*": "multiplicar",
        "/": "dividir",
      };

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        expression: `${num1} ${opSymbols[operator]} ${num2}`,
        result: cleanResult,
        pythonSnippet: `${opFunctions[operator]}(${num1}, ${num2}) # ${cleanResult}`,
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        operationType: opNames[operator],
      };

      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]);
      setCurrentInput(cleanResult);
      setPreviousInput(null);
      setOperator(null);
      setWaitingForNewInput(true);
      setErrorMsg(null);
    }
  }, [compute, currentInput, operator, previousInput]);

  const handleClear = () => {
    setCurrentInput("0");
    setPreviousInput(null);
    setOperator(null);
    setWaitingForNewInput(false);
    setErrorMsg(null);
  };

  const handleClearEntry = () => {
    setCurrentInput("0");
    setErrorMsg(null);
  };

  const handleBackspace = () => {
    if (waitingForNewInput) return;
    if (currentInput.length > 1) {
      setCurrentInput(currentInput.slice(0, -1));
    } else {
      setCurrentInput("0");
    }
  };

  const handleToggleSign = () => {
    if (currentInput === "0") return;
    if (currentInput.startsWith("-")) {
      setCurrentInput(currentInput.slice(1));
    } else {
      setCurrentInput("-" + currentInput);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === "." || e.key === ",") {
        e.preventDefault();
        handleDigit(".");
      } else if (e.key === "+") {
        e.preventDefault();
        handleOperator("+");
      } else if (e.key === "-") {
        e.preventDefault();
        handleOperator("-");
      } else if (e.key === "*") {
        e.preventDefault();
        handleOperator("*");
      } else if (e.key === "/") {
        e.preventDefault();
        handleOperator("/");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEqual();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDigit, handleOperator, handleEqual]);

  // Python equivalent string currently being drafted
  const currentPythonEquivalent = () => {
    if (previousInput && operator) {
      const funcName = 
        operator === "+" ? "adicionar" :
        operator === "-" ? "subtrair" :
        operator === "*" ? "multiplicar" : "dividir";
      return `${funcName}(${previousInput}, ${currentInput})`;
    }
    return `# Digite um operador e números para ver o código Python em tempo real`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Coluna Principal: Calculadora Visual */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
          {/* Header da Calculadora */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <CalculaThonLogo size={36} />
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  CalculaThon
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Operações: Adição (+), Subtração (−), Multiplicação (×) e Divisão (÷)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Atalhos pelo teclado ativos
              </span>
            </div>
          </div>

          {/* Visor Digital */}
          <div className="bg-slate-900 text-white rounded-xl p-5 mb-6 shadow-inner relative overflow-hidden">
            {/* Expressão anterior */}
            <div className="h-6 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>
                {previousInput !== null && operator ? (
                  <>
                    <span className="text-slate-300">{previousInput}</span>{" "}
                    <span className="text-amber-400 font-bold">
                      {operator === "+" ? "+" : operator === "-" ? "−" : operator === "*" ? "×" : "÷"}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-600">Pronto para calcular</span>
                )}
              </span>

              {operator && (
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-medium">
                  {operator === "+" && "Operação: Adição (+)"}
                  {operator === "-" && "Operação: Subtração (−)"}
                  {operator === "*" && "Operação: Multiplicação (×)"}
                  {operator === "/" && "Operação: Divisão (÷)"}
                </span>
              )}
            </div>

            {/* Número atual */}
            <div className="mt-2 text-right">
              <span className="text-4xl sm:text-5xl font-mono font-semibold tracking-tight text-white select-all break-all tabular-nums">
                {currentInput}
              </span>
            </div>
          </div>

          {/* Alerta de Erro Matemático / Divisão por zero */}
          {errorMsg && (
            <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-rose-950">Aviso Matemático:</strong>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Teclado da Calculadora */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {/* Linha 1 */}
            <button
              type="button"
              onClick={handleClear}
              className="py-3.5 px-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer active:scale-[0.98]"
              title="Limpar Tudo (Escape)"
            >
              AC
            </button>
            <button
              type="button"
              onClick={handleClearEntry}
              className="py-3.5 px-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer active:scale-[0.98]"
              title="Limpar Entrada Atual"
            >
              C
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-3.5 px-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 flex items-center justify-center cursor-pointer active:scale-[0.98]"
              title="Apagar último dígito (Backspace)"
            >
              <Delete className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleOperator("/")}
              className={`py-3.5 px-2 rounded-xl text-base font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center cursor-pointer active:scale-[0.98] ${
                operator === "/" 
                  ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-500" 
                  : "bg-amber-100 hover:bg-amber-200 text-amber-900"
              }`}
              title="Divisão (/) - operador real em Python"
            >
              <DivideIcon className="w-5 h-5" />
            </button>

            {/* Linha 2 */}
            <button
              type="button"
              onClick={() => handleDigit("7")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => handleDigit("8")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => handleDigit("9")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              9
            </button>
            <button
              type="button"
              onClick={() => handleOperator("*")}
              className={`py-3.5 px-2 rounded-xl text-base font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center cursor-pointer active:scale-[0.98] ${
                operator === "*" 
                  ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-500" 
                  : "bg-amber-100 hover:bg-amber-200 text-amber-900"
              }`}
              title="Multiplicação (*) - operador em Python"
            >
              <MultiplyIcon className="w-5 h-5" />
            </button>

            {/* Linha 3 */}
            <button
              type="button"
              onClick={() => handleDigit("4")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => handleDigit("5")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => handleDigit("6")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => handleOperator("-")}
              className={`py-3.5 px-2 rounded-xl text-base font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center cursor-pointer active:scale-[0.98] ${
                operator === "-" 
                  ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-500" 
                  : "bg-amber-100 hover:bg-amber-200 text-amber-900"
              }`}
              title="Subtração (-) - operador em Python"
            >
              <Minus className="w-5 h-5" />
            </button>

            {/* Linha 4 */}
            <button
              type="button"
              onClick={() => handleDigit("1")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => handleDigit("2")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => handleDigit("3")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => handleOperator("+")}
              className={`py-3.5 px-2 rounded-xl text-base font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center cursor-pointer active:scale-[0.98] ${
                operator === "+" 
                  ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-500" 
                  : "bg-amber-100 hover:bg-amber-200 text-amber-900"
              }`}
              title="Adição (+) - operador em Python"
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* Linha 5 */}
            <button
              type="button"
              onClick={handleToggleSign}
              className="py-3.5 px-2 rounded-xl text-sm font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
              title="Inverter Sinal (±)"
            >
              ±
            </button>
            <button
              type="button"
              onClick={() => handleDigit("0")}
              className="py-3.5 px-2 rounded-xl text-base font-semibold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleDigit(".")}
              className="py-3.5 px-2 rounded-xl text-base font-bold bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors cursor-pointer active:scale-[0.98]"
              title="Ponto decimal (float em Python)"
            >
              .
            </button>
            <button
              type="button"
              onClick={handleEqual}
              className="py-3.5 px-2 rounded-xl text-base font-bold bg-slate-900 hover:bg-slate-800 text-white shadow transition-all focus-visible:ring-2 focus-visible:ring-slate-900 flex items-center justify-center cursor-pointer active:scale-[0.98]"
              title="Calcular resultado (= ou Enter)"
            >
              <Equal className="w-5 h-5" />
            </button>
          </div>

          {/* Dica do Equivalente em Python */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Code2 className="w-3.5 h-3.5 text-amber-600" />
                Como o Python calcula isso no código:
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(currentPythonEquivalent())}
                className="hover:text-slate-900 flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-xs bg-slate-900 text-emerald-300 p-2.5 rounded-lg overflow-x-auto">
              <code>{currentPythonEquivalent()}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna Secundária: Histórico & Explicações Práticas */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Painel de Histórico */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900">Histórico de Cálculos</h3>
            </div>
            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setHistory([])}
                className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Limpar</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Nenhuma conta realizada ainda. Experimente fazer uma operação!
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-mono text-slate-500">{item.expression} =</div>
                    <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{item.result}</div>
                    <div className="text-[11px] font-mono text-amber-700/80 mt-1">
                      {item.pythonSnippet}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentInput(item.result);
                        setWaitingForNewInput(false);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-[11px] font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded transition-opacity cursor-pointer"
                    >
                      Usar valor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Didático Rápido */}
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 text-amber-950">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <h4 className="text-sm font-bold text-amber-900">Como o Python lida com números</h4>
          </div>
          <ul className="text-xs space-y-2 text-amber-900/90 leading-relaxed">
            <li>
              <strong>Inteiros (`int`) vs Decimais (`float`):</strong> Números como <code>5</code> são inteiros; números como <code>5.0</code> ou <code>3.14</code> são reais com ponto flutuante.
            </li>
            <li>
              <strong>Divisão Real (`/`):</strong> Em Python 3, <code>4 / 2</code> resulta em <code>2.0</code> (sempre retorna <code>float</code>).
            </li>
            <li>
              <strong>Segurança Zero:</strong> Tentar dividir por <code>0</code> levantaria um erro <code>ZeroDivisionError</code> se não colocássemos uma proteção <code>if b == 0</code>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

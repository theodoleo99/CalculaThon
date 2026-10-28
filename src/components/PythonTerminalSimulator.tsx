import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Play, RotateCcw, Sparkles, Send, CornerDownLeft } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "system" | "prompt" | "input" | "output" | "error" | "success";
  text: string;
}

type Step = 
  | "await_option"
  | "await_num1"
  | "await_num2"
  | "await_enter_continue"
  | "terminated";

export function PythonTerminalSimulator() {
  const [step, setStep] = useState<Step>("await_option");
  const [currentInput, setCurrentInput] = useState<string>("");
  const [selectedOp, setSelectedOp] = useState<string>("1");
  const [num1, setNum1] = useState<number>(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialLines: TerminalLine[] = [
    { id: "1", type: "system", text: "Executando: python calculathon.py" },
    { id: "2", type: "system", text: "Bem-vindo(a) ao CalculaThon - Calculadora em Python!" },
    { id: "3", type: "system", text: "" },
    { id: "4", type: "system", text: "====================================" },
    { id: "5", type: "system", text: "           CALCULATHON              " },
    { id: "6", type: "system", text: "====================================" },
    { id: "7", type: "system", text: "1 - Adição (+)" },
    { id: "8", type: "system", text: "2 - Subtração (-)" },
    { id: "9", type: "system", text: "3 - Multiplicação (*)" },
    { id: "10", type: "system", text: "4 - Divisão (/)" },
    { id: "11", type: "system", text: "5 - Sair do programa" },
    { id: "12", type: "system", text: "====================================" },
    { id: "13", type: "prompt", text: "Escolha uma opção (1-5): " },
  ];

  const [lines, setLines] = useState<TerminalLine[]>(initialLines);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const addLine = (type: TerminalLine["type"], text: string) => {
    setLines((prev) => [...prev, { id: Math.random().toString(), type, text }]);
  };

  const showMenuLines = () => {
    return [
      { id: Math.random().toString(), type: "system" as const, text: "" },
      { id: Math.random().toString(), type: "system" as const, text: "====================================" },
      { id: Math.random().toString(), type: "system" as const, text: "           CALCULATHON              " },
      { id: Math.random().toString(), type: "system" as const, text: "====================================" },
      { id: Math.random().toString(), type: "system" as const, text: "1 - Adição (+)" },
      { id: Math.random().toString(), type: "system" as const, text: "2 - Subtração (-)" },
      { id: Math.random().toString(), type: "system" as const, text: "3 - Multiplicação (*)" },
      { id: Math.random().toString(), type: "system" as const, text: "4 - Divisão (/)" },
      { id: Math.random().toString(), type: "system" as const, text: "5 - Sair do programa" },
      { id: Math.random().toString(), type: "system" as const, text: "====================================" },
      { id: Math.random().toString(), type: "prompt" as const, text: "Escolha uma opção (1-5): " },
    ];
  };

  const handleUserInput = (value: string) => {
    const trimmed = value.trim();

    if (step === "await_option") {
      addLine("input", `> ${trimmed}`);

      if (trimmed === "5") {
        addLine("system", "");
        addLine("success", "Obrigado por usar a calculadora! Encerrando...");
        addLine("system", "Processo finalizado com código de saída 0.");
        setStep("terminated");
        setCurrentInput("");
        return;
      }

      if (!["1", "2", "3", "4"].includes(trimmed)) {
        addLine("error", "Opção inválida! Escolha um valor entre 1 e 5.");
        addLine("prompt", "Escolha uma opção (1-5): ");
        setCurrentInput("");
        return;
      }

      setSelectedOp(trimmed);
      addLine("system", "");
      addLine("system", "--- Entrada de Dados ---");
      addLine("prompt", "Digite o primeiro número: ");
      setStep("await_num1");
      setCurrentInput("");
      return;
    }

    if (step === "await_num1") {
      addLine("input", `> ${trimmed}`);
      const parsed = parseFloat(trimmed.replace(",", "."));

      if (isNaN(parsed)) {
        addLine("error", "Entrada inválida! Digite um número válido (ex: 10 ou 3.14).");
        addLine("prompt", "Digite o primeiro número: ");
        setCurrentInput("");
        return;
      }

      setNum1(parsed);
      addLine("prompt", "Digite o segundo número: ");
      setStep("await_num2");
      setCurrentInput("");
      return;
    }

    if (step === "await_num2") {
      addLine("input", `> ${trimmed}`);
      const parsed = parseFloat(trimmed.replace(",", "."));

      if (isNaN(parsed)) {
        addLine("error", "Entrada inválida! Digite um número válido (ex: 10 ou 3.14).");
        addLine("prompt", "Digite o segundo número: ");
        setCurrentInput("");
        return;
      }

      const n2 = parsed;
      addLine("system", "");
      addLine("system", "--- Resultado ---");

      if (selectedOp === "1") {
        const res = num1 + n2;
        addLine("success", `${num1} + ${n2} = ${res}`);
      } else if (selectedOp === "2") {
        const res = num1 - n2;
        addLine("success", `${num1} - ${n2} = ${res}`);
      } else if (selectedOp === "3") {
        const res = num1 * n2;
        addLine("success", `${num1} * ${n2} = ${res}`);
      } else if (selectedOp === "4") {
        if (n2 === 0) {
          addLine("error", "Erro: Não é possível dividir por zero!");
        } else {
          const res = num1 / n2;
          addLine("success", `${num1} / ${n2} = ${res}`);
        }
      }

      addLine("prompt", "\nPressione ENTER para continuar...");
      setStep("await_enter_continue");
      setCurrentInput("");
      return;
    }

    if (step === "await_enter_continue") {
      setLines((prev) => [...prev, ...showMenuLines()]);
      setStep("await_option");
      setCurrentInput("");
      return;
    }

    if (step === "terminated") {
      resetTerminal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(currentInput);
  };

  const resetTerminal = () => {
    setLines(initialLines);
    setStep("await_option");
    setCurrentInput("");
    setSelectedOp("1");
    setNum1(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Preset execution helper
  const runPreset = (op: string, val1: string, val2: string) => {
    resetTerminal();
    setTimeout(() => {
      setLines([
        ...initialLines.slice(0, 12),
        { id: "p1", type: "prompt", text: "Escolha uma opção (1-5): " },
        { id: "p2", type: "input", text: `> ${op}` },
        { id: "p3", type: "system", text: "" },
        { id: "p4", type: "system", text: "--- Entrada de Dados ---" },
        { id: "p5", type: "prompt", text: "Digite o primeiro número: " },
        { id: "p6", type: "input", text: `> ${val1}` },
        { id: "p7", type: "prompt", text: "Digite o segundo número: " },
        { id: "p8", type: "input", text: `> ${val2}` },
        { id: "p9", type: "system", text: "" },
        { id: "p10", type: "system", text: "--- Resultado ---" },
      ]);

      const n1 = parseFloat(val1.replace(",", "."));
      const n2 = parseFloat(val2.replace(",", "."));

      let resLine: TerminalLine;
      if (op === "1") {
        resLine = { id: "res", type: "success", text: `${n1} + ${n2} = ${n1 + n2}` };
      } else if (op === "2") {
        resLine = { id: "res", type: "success", text: `${n1} - ${n2} = ${n1 - n2}` };
      } else if (op === "3") {
        resLine = { id: "res", type: "success", text: `${n1} * ${n2} = ${n1 * n2}` };
      } else {
        if (n2 === 0) {
          resLine = { id: "res", type: "error", text: "Erro: Não é possível dividir por zero!" };
        } else {
          resLine = { id: "res", type: "success", text: `${n1} / ${n2} = ${n1 / n2}` };
        }
      }

      setLines((prev) => [
        ...prev,
        resLine,
        { id: "p11", type: "prompt", text: "\nPressione ENTER para continuar..." },
      ]);
      setStep("await_enter_continue");
    }, 150);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header do Terminal */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-amber-600" />
            Terminal Python Simulado
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Experimente a execução real do script no terminal interativo com entrada via teclado.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Script</span>
          </button>
        </div>
      </div>

      {/* Botões Rápidos de Demonstração */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Testes rápidos automatizados:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => runPreset("1", "45", "55")}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors cursor-pointer"
          >
            Adição (45 + 55)
          </button>
          <button
            type="button"
            onClick={() => runPreset("2", "120", "45")}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors cursor-pointer"
          >
            Subtração (120 − 45)
          </button>
          <button
            type="button"
            onClick={() => runPreset("3", "12.5", "4")}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors cursor-pointer"
          >
            Multiplicação (12.5 × 4)
          </button>
          <button
            type="button"
            onClick={() => runPreset("4", "150", "6")}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors cursor-pointer"
          >
            Divisão (150 ÷ 6)
          </button>
          <button
            type="button"
            onClick={() => runPreset("4", "25", "0")}
            className="px-3 py-1.5 text-xs rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-medium transition-colors cursor-pointer"
          >
            Testar Divisão por Zero (25 ÷ 0)
          </button>
        </div>
      </div>

      {/* Janela do Terminal */}
      <div className="bg-slate-950 rounded-2xl shadow-xl border border-slate-800 overflow-hidden flex flex-col">
        {/* Barra superior estilo macOS/Linux */}
        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400">
            terminal — python3 calculadora.py
          </span>
          <span className="text-[11px] font-mono text-slate-500">UTF-8</span>
        </div>

        {/* Linhas de saída */}
        <div className="p-5 font-mono text-xs sm:text-sm text-slate-200 min-h-[380px] max-h-[500px] overflow-y-auto space-y-1">
          {lines.map((line) => {
            if (line.type === "system") {
              return (
                <div key={line.id} className="text-slate-400">
                  {line.text}
                </div>
              );
            }
            if (line.type === "prompt") {
              return (
                <div key={line.id} className="text-amber-300 font-semibold mt-1">
                  {line.text}
                </div>
              );
            }
            if (line.type === "input") {
              return (
                <div key={line.id} className="text-cyan-300 font-bold pl-2">
                  {line.text}
                </div>
              );
            }
            if (line.type === "error") {
              return (
                <div key={line.id} className="text-rose-400 font-semibold bg-rose-950/40 p-1.5 rounded">
                  {line.text}
                </div>
              );
            }
            if (line.type === "success") {
              return (
                <div key={line.id} className="text-emerald-400 font-bold text-base bg-emerald-950/30 p-2 rounded border border-emerald-900/50">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-200">
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Campo de Entrada de Comandos */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/90 border-t border-slate-800 p-3 sm:p-4 flex items-center gap-3"
        >
          <span className="text-emerald-400 font-mono text-sm font-bold pl-2 select-none">
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            disabled={step === "terminated"}
            placeholder={
              step === "await_option"
                ? "Digite 1, 2, 3, 4 ou 5 e pressione Enter..."
                : step === "await_num1"
                ? "Digite o primeiro número (ex: 20 ou 14.5)..."
                : step === "await_num2"
                ? "Digite o segundo número..."
                : step === "await_enter_continue"
                ? "Pressione Enter para voltar ao menu..."
                : "Programa finalizado. Clique em 'Reiniciar Script'."
            }
            className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none placeholder:text-slate-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={step === "terminated"}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Enviar</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

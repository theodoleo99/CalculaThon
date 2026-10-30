/**
 * Código Python e explicações detalhadas para a Calculadora
 */

export interface CodeSection {
  id: string;
  title: string;
  badge: string;
  lineStart: number;
  lineEnd: number;
  codeSnippet: string;
  shortSummary: string;
  explanation: string;
  keyPoints: string[];
  syntaxTips: string;
}

export const COMPLETE_PYTHON_CODE = `# ==========================================================
# CALCULATHON - CALCULADORA EM PYTHON
# Operações: Adição, Subtração, Multiplicação, Divisão,
#            Porcentagem e Logaritmo
# ==========================================================

import math


def adicionar(a: float, b: float) -> float:
    """Retorna a soma de dois números."""
    return a + b


def subtrair(a: float, b: float) -> float:
    """Retorna a diferença entre dois números."""
    return a - b


def multiplicar(a: float, b: float) -> float:
    """Retorna o produto da multiplicação de dois números."""
    return a * b


def dividir(a: float, b: float) -> float | str:
    """
    Retorna o quociente da divisão de 'a' por 'b'.
    Trata matematicamente a tentativa de divisão por zero.
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b


def porcentagem(valor: float, taxa: float) -> float:
    """
    Calcula a porcentagem de um valor principal.
    Fórmula: (valor * taxa) / 100.0
    Exemplo: 20% de 500 = (500 * 20) / 100 = 100.0
    """
    return (valor * taxa) / 100.0


def logaritmo(x: float, base: float = 10.0) -> float | str:
    """
    Calcula o logaritmo de 'x' na base informada (padrão base 10).
    Trata matematicamente logaritmos com x <= 0 ou bases inválidas.
    """
    if x <= 0:
        return "Erro: Logaritmo indefinido para números menores ou iguais a zero (x <= 0)!"
    if base <= 0 or base == 1:
        return "Erro: A base do logaritmo deve ser estritamente positiva e diferente de 1!"
    return math.log(x, base)


def exibir_menu() -> None:
    """Exibe o menu visual com as opções disponíveis."""
    print("\\n" + "=" * 40)
    print("               CALCULATHON              ")
    print("=" * 40)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("5 - Porcentagem (%)")
    print("6 - Logaritmo (log)")
    print("7 - Sair do programa")
    print("=" * 40)


def obter_numero(mensagem: str) -> float:
    """
    Solicita um número ao usuário e garante que a entrada
    seja convertida para float sem quebrar o programa.
    """
    while True:
        entrada = input(mensagem).strip().replace(",", ".")
        try:
            return float(entrada)
        except ValueError:
            print("Entrada inválida! Digite um número válido (ex: 10 ou 3.14).")


def main() -> None:
    """Função principal que gerencia o fluxo da calculadora."""
    print("Bem-vindo(a) ao CalculaThon - Calculadora em Python!")
    
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-7): ").strip()

        if opcao == "7":
            print("\\nObrigado por usar a calculadora! Encerrando...")
            break

        if opcao not in ("1", "2", "3", "4", "5", "6"):
            print("\\nOpção inválida! Escolha um valor entre 1 e 7.")
            continue

        print("\\n--- Entrada de Dados ---")
        if opcao == "1":
            num1 = obter_numero("Digite o primeiro número: ")
            num2 = obter_numero("Digite o segundo número: ")
            print("\\n--- Resultado ---")
            resultado = adicionar(num1, num2)
            print(f"{num1} + {num2} = {resultado}")

        elif opcao == "2":
            num1 = obter_numero("Digite o primeiro número: ")
            num2 = obter_numero("Digite o segundo número: ")
            print("\\n--- Resultado ---")
            resultado = subtrair(num1, num2)
            print(f"{num1} - {num2} = {resultado}")

        elif opcao == "3":
            num1 = obter_numero("Digite o primeiro número: ")
            num2 = obter_numero("Digite o segundo número: ")
            print("\\n--- Resultado ---")
            resultado = multiplicar(num1, num2)
            print(f"{num1} * {num2} = {resultado}")

        elif opcao == "4":
            num1 = obter_numero("Digite o primeiro número: ")
            num2 = obter_numero("Digite o segundo número: ")
            print("\\n--- Resultado ---")
            resultado = dividir(num1, num2)
            if isinstance(resultado, str):
                print(resultado)
            else:
                print(f"{num1} / {num2} = {resultado}")

        elif opcao == "5":
            valor = obter_numero("Digite o valor principal (base): ")
            taxa = obter_numero("Digite a porcentagem a calcular (%): ")
            print("\\n--- Resultado ---")
            resultado = porcentagem(valor, taxa)
            print(f"{taxa}% de {valor} = {resultado}")

        elif opcao == "6":
            x = obter_numero("Digite o número (logaritmando > 0): ")
            entrada_base = input("Digite a base do logaritmo (ENTER para base 10 padrão): ").strip().replace(",", ".")
            try:
                base = float(entrada_base) if entrada_base else 10.0
            except ValueError:
                print("Base inválida! Usando base 10 padrão.")
                base = 10.0
            print("\\n--- Resultado ---")
            resultado = logaritmo(x, base)
            if isinstance(resultado, str):
                print(resultado)
            else:
                print(f"log de {x} na base {base} = {resultado}")

        input("\\nPressione ENTER para continuar...")


# Ponto de entrada padrão em Python
if __name__ == "__main__":
    main()
`;

export const BASIC_PYTHON_CODE = `# ==========================================================
# CALCULADORA BÁSICA EM PYTHON (Versão Essencial)
# ==========================================================
import math

# 1. Definição das funções matemáticas
def adicionar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b

def porcentagem(valor, taxa):
    return (valor * taxa) / 100

def logaritmo(x, base=10):
    if x <= 0:
        return "Erro: Logaritmo de x <= 0!"
    if base <= 0 or base == 1:
        return "Erro: Base inválida!"
    return math.log(x, base)

# 2. Apresentação das opções
print("1 - Adição (+)")
print("2 - Subtração (-)")
print("3 - Multiplicação (*)")
print("4 - Divisão (/)")
print("5 - Porcentagem (%)")
print("6 - Logaritmo (log)")

opcao = input("Escolha a operação (1-6): ")

# 3. Leitura e execução
if opcao in ("1", "2", "3", "4"):
    num1 = float(input("Digite o 1º número: "))
    num2 = float(input("Digite o 2º número: "))
    if opcao == "1":
        print(f"Resultado: {num1} + {num2} = {adicionar(num1, num2)}")
    elif opcao == "2":
        print(f"Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
    elif opcao == "3":
        print(f"Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
    elif opcao == "4":
        print(f"Resultado: {num1} / {num2} = {dividir(num1, num2)}")
elif opcao == "5":
    valor = float(input("Digite o valor: "))
    taxa = float(input("Digite a taxa (%): "))
    print(f"Resultado: {taxa}% de {valor} = {porcentagem(valor, taxa)}")
elif opcao == "6":
    num = float(input("Digite o número (x > 0): "))
    base_in = input("Digite a base (pressione Enter para base 10): ")
    base = float(base_in) if base_in else 10.0
    print(f"Resultado: log de {num} na base {base} = {logaritmo(num, base)}")
else:
    print("Opção inválida!")
`;

export const CODE_SECTIONS: CodeSection[] = [
  {
    id: "funcao_adicao",
    title: "1. Função de Adição (`adicionar`)",
    badge: "Operador +",
    lineStart: 10,
    lineEnd: 12,
    codeSnippet: `def adicionar(a: float, b: float) -> float:\n    """Retorna a soma de dois números."""\n    return a + b`,
    shortSummary: "Define a função que recebe dois números e entrega a soma deles com o operador '+'.",
    explanation: 
      "A palavra-chave 'def' cria uma função reutilizável em Python. " +
      "Os parâmetros 'a' e 'b' são as duas entradas que a função recebe. " +
      "A anotação ': float' indica que esperamos números reais (inteiros ou decimais). " +
      "O comando 'return' calcula 'a + b' e envia o resultado de volta para quem chamou a função.",
    keyPoints: [
      "`def`: Palavra reservada para definir uma função.",
      "`a + b`: Operador nativo de adição em Python.",
      "`return`: Devolve o valor calculado.",
      "Type hints (`: float -> float`): Boa prática que documenta os tipos esperados.",
    ],
    syntaxTips: "Em Python, o operador '+' também pode concatenar strings (\"Olá \" + \"Mundo\"), mas com números ele realiza a soma aritmética.",
  },
  {
    id: "funcao_subtracao",
    title: "2. Função de Subtração (`subtrair`)",
    badge: "Operador -",
    lineStart: 15,
    lineEnd: 17,
    codeSnippet: `def subtrair(a: float, b: float) -> float:\n    """Retorna a diferença entre dois números."""\n    return a - b`,
    shortSummary: "Calcula a diferença entre o primeiro e o segundo número com o operador '-'.",
    explanation:
      "Diferente da adição, a ordem dos termos importa na subtração (não é comutativa: 5 - 2 = 3, mas 2 - 5 = -3). " +
      "A função recebe 'a' (minuendo) e 'b' (subtraendo) e retorna a diferença exata.",
    keyPoints: [
      "`a - b`: Operador de subtração.",
      "Preserva o sinal: se 'b' for maior que 'a', o retorno será um número negativo.",
      "Docstring (`\"\"\"...\"\"\"`): Descreve a finalidade da função para documentação automática.",
    ],
    syntaxTips: "Python suporta números negativos nativamente sem nenhuma biblioteca externa.",
  },
  {
    id: "funcao_multiplicacao",
    title: "3. Função de Multiplicação (`multiplicar`)",
    badge: "Operador *",
    lineStart: 20,
    lineEnd: 22,
    codeSnippet: `def multiplicar(a: float, b: float) -> float:\n    """Retorna o produto da multiplicação de dois números."""\n    return a * b`,
    shortSummary: "Multiplica dois fatores usando o operador asterisco '*'.",
    explanation:
      "Em programação e na linguagem Python, o símbolo de multiplicação não é 'x' ou '·', mas sim o asterisco '*'. " +
      "A função multiplica 'a' por 'b' e retorna o produto.",
    keyPoints: [
      "`a * b`: Multiplicação em Python.",
      "Atenção ao símbolo: Não use 'x', sempre use '*'.",
      "Lembre-se: `**` com dois asteriscos em Python significa potenciação (ex: 2 ** 3 = 8).",
    ],
    syntaxTips: "Multiplicação por zero sempre resulta em 0.0 em Python.",
  },
  {
    id: "funcao_divisao",
    title: "4. Função de Divisão e Proteção (`dividir`)",
    badge: "Operador / & ZeroDivisionError",
    lineStart: 25,
    lineEnd: 32,
    codeSnippet: `def dividir(a: float, b: float) -> float | str:\n    """\n    Retorna o quociente da divisão de 'a' por 'b'.\n    Trata matematicamente a tentativa de divisão por zero.\n    """\n    if b == 0:\n        return "Erro: Não é possível dividir por zero!"\n    return a / b`,
    shortSummary: "Efetua a divisão e previne o erro crítico de divisão por zero (ZeroDivisionError).",
    explanation:
      "Na matemática, a divisão por zero é indefinida. Se tentarmos executar '10 / 0' diretamente em Python, " +
      "o interpretador interrompe o programa levantando a exceção 'ZeroDivisionError'. " +
      "Para manter o aplicativo robusto e amigável, verificamos primeiro 'if b == 0:'. Se for zero, retornamos uma mensagem explicativa; caso contrário, efetuamos 'a / b'.",
    keyPoints: [
      "`a / b`: Divisão real sempre retorna um float (ex: 4 / 2 = 2.0).",
      "`if b == 0`: Verificação preventiva (guarda) contra divisão por zero.",
      "Evita que o programa trave com erro de sistema.",
      "`//` vs `/`: O operador `//` faz divisão inteira (descarta os decimais), enquanto `/` faz a divisão exata.",
    ],
    syntaxTips: "Em Python 3, a divisão comum `/` sempre gera um número do tipo 'float', mesmo quando a divisão é exata.",
  },
  {
    id: "funcao_porcentagem",
    title: "5. Função de Porcentagem (`porcentagem`)",
    badge: "Cálculo Percentual (%)",
    lineStart: 35,
    lineEnd: 41,
    codeSnippet: `def porcentagem(valor: float, taxa: float) -> float:\n    """\n    Calcula a porcentagem de um valor principal.\n    Fórmula: (valor * taxa) / 100.0\n    Exemplo: 20% de 500 = (500 * 20) / 100 = 100.0\n    """\n    return (valor * taxa) / 100.0`,
    shortSummary: "Calcula a fatia proporcional de um valor base a partir de uma taxa percentual (%).",
    explanation:
      "A porcentagem é uma razão matemática centesimal (base 100). " +
      "Para calcular, por exemplo, 20% de 500, multiplicamos o valor base (500) pela taxa (20) e dividimos o total por 100: (500 * 20) / 100 = 100.0. " +
      "Diferente da maioria das calculadoras tradicionais que aplicam porcentagem apenas como modificador, em Python implementamos uma função clara e previsível com tipagem float.",
    keyPoints: [
      "Fórmula fundamental: `(valor * taxa) / 100.0`.",
      "Distinção crítica do operador `%`: Em Python, o símbolo `%` é o operador de 'módulo' (resto da divisão inteira). Por isso criamos a função dedicada `porcentagem()`.",
      "Precisão com `float`: Suporta taxas decimais fracionadas (ex: 7.25% de R$ 1.500,00).",
    ],
    syntaxTips: "Nunca use `valor % taxa` esperando obter porcentagem em Python! No Python, `10 % 3` resulta em `1` (resto da divisão inteira). Para porcentagem, use `(valor * taxa) / 100`.",
  },
  {
    id: "funcao_logaritmo",
    title: "6. Função de Logaritmo (`logaritmo`)",
    badge: "Módulo math.log & math.log10",
    lineStart: 44,
    lineEnd: 53,
    codeSnippet: `def logaritmo(x: float, base: float = 10.0) -> float | str:\n    """\n    Calcula o logaritmo de 'x' na base informada (padrão base 10).\n    Trata matematicamente logaritmos com x <= 0 ou bases inválidas.\n    """\n    if x <= 0:\n        return "Erro: Logaritmo indefinido para números menores ou iguais a zero (x <= 0)!"\n    if base <= 0 or base == 1:\n        return "Erro: A base do logaritmo deve ser estritamente positiva e diferente de 1!"\n    return math.log(x, base)`,
    shortSummary: "Calcula o expoente ao qual a base deve ser elevada para produzir o valor x, com proteção de domínio.",
    explanation:
      "O logaritmo responde à pergunta matemática: 'a qual expoente devo elevar a base b para obter x?' (exemplo: log₁₀(100) = 2, pois 10² = 100; log₂(8) = 3, pois 2³ = 8). " +
      "Nos números reais, o logaritmo só existe para valores estritamente positivos (x > 0) e bases positivas diferentes de 1 (b > 0 e b ≠ 1). " +
      "Utilizamos a biblioteca padrão `import math` do Python com `math.log(x, base)` e tratamos preventivamente qualquer entrada inválida.",
    keyPoints: [
      "`import math`: Módulo padrão nativo do Python com rotinas matemáticas de alta precisão em C.",
      "`math.log(x, base)`: Retorna o logaritmo de x na base especificada.",
      "Parâmetro padrão (`base: float = 10.0`): Se o usuário não informar a base, calcula automaticamente o logaritmo decimal (base 10).",
      "Proteção de domínio (`if x <= 0`): Evita o erro nativo `ValueError: math domain error`.",
      "Proteção da base (`if base <= 0 or base == 1`): Garante que a base atenda às regras matemáticas da função logarítmica.",
    ],
    syntaxTips: "Sem o argumento de base (`math.log(x)`), o Python calcula o logaritmo natural (base e de Euler ≈ 2.71828). Para base decimal direta, você também pode usar `math.log10(x)`.",
  },
  {
    id: "funcao_menu",
    title: "7. Exibição do Menu (`exibir_menu`)",
    badge: "Interface CLI",
    lineStart: 56,
    lineEnd: 68,
    codeSnippet: `def exibir_menu() -> None:\n    print("\\n" + "=" * 40)\n    print("               CALCULATHON              ")\n    print("=" * 40)\n    print("1 - Adição (+)")\n    print("2 - Subtração (-)")\n    print("3 - Multiplicação (*)")\n    print("4 - Divisão (/)")\n    print("5 - Porcentagem (%)")\n    print("6 - Logaritmo (log)")\n    print("7 - Sair do programa")\n    print("=" * 40)`,
    shortSummary: "Imprime na tela um menu organizado e amigável com as 6 opções matemáticas e opção de saída.",
    explanation:
      "Uma boa experiência de usuário no terminal precisa de clareza visual. " +
      "Usamos a multiplicação de strings ('=' * 40) para criar linhas divisórias elegantes sem precisar digitar dezenas de caracteres manualmente. " +
      "Cada linha do menu tem um número correspondente que o usuário poderá digitar.",
    keyPoints: [
      "`print()`: Função padrão do Python para enviar texto ao terminal.",
      "`'=' * 40`: Recurso inteligente do Python que repete o caractere '=' 40 vezes.",
      "`\\n`: Caractere especial que pula uma linha.",
      "Retorno `None`: A função apenas imprime na tela, não precisa retornar nenhum valor calculado.",
    ],
    syntaxTips: "Multiplicar strings ('-' * 20) é uma técnica muito comum em Python para formatar relatórios e menus.",
  },
  {
    id: "obter_numero",
    title: "8. Leitura e Validação de Números (`obter_numero`)",
    badge: "input() + float() + try/except",
    lineStart: 71,
    lineEnd: 81,
    codeSnippet: `def obter_numero(mensagem: str) -> float:\n    while True:\n        entrada = input(mensagem).strip().replace(",", ".")\n        try:\n            return float(entrada)\n        except ValueError:\n            print("Entrada inválida! Digite um número válido (ex: 10 ou 3.14).")`,
    shortSummary: "Garante que o usuário digite um número válido, aceitando vírgula ou ponto decimal.",
    explanation:
      "A função 'input()' sempre devolve um texto (string). Se o usuário digitar '10', é uma string '10', não o número 10. " +
      "Precisamos converter para 'float(entrada)'. " +
      "Além disso, no Brasil usamos vírgula para decimais (ex: 3,5), enquanto o Python exige ponto (3.5). O método '.replace(\",\", \".\")' resolve isso automaticamente! " +
      "O bloco 'try / except ValueError' protege o programa caso o usuário digite letras ou símbolos por engano.",
    keyPoints: [
      "`input()`: Pausa o programa e espera o usuário digitar e dar ENTER.",
      "`.strip()`: Remove espaços em branco acidentais antes e depois do texto.",
      "`.replace(',', '.')`: Adapta a notação brasileira de vírgula para ponto.",
      "`try...except ValueError`: Captura o erro de conversão se a pessoa digitar palavras.",
      "`while True`: Repete a pergunta até o usuário fornecer um número correto.",
    ],
    syntaxTips: "Sempre converta o retorno de 'input()' se for fazer contas matemáticas!",
  },
  {
    id: "loop_principal",
    title: "9. Loop Principal e Controle de Fluxo (`main`)",
    badge: "while True + if/elif/else",
    lineStart: 84,
    lineEnd: 167,
    codeSnippet: `def main() -> None:\n    while True:\n        exibir_menu()\n        opcao = input("Escolha uma opção (1-7): ").strip()\n        if opcao == "7":\n            break\n        # ... chamadas das funções matemáticas`,
    shortSummary: "Controla a repetição do programa e executa a operação correspondente à opção escolhida (1 a 7).",
    explanation:
      "O loop 'while True' mantém a calculadora aberta após cada conta, em vez de fechar imediatamente. " +
      "O comando 'break' interrompe o loop quando a opção '7' (Sair) é escolhida. " +
      "A estrutura 'if/elif/else' avalia a escolha do usuário e chama a função apropriada com os números coletados.",
    keyPoints: [
      "`while True`: Loop infinito que só para quando encontra 'break'.",
      "`break`: Encerra o loop e finaliza o programa.",
      "`continue`: Pula o restante do loop atual e volta ao início se a opção for inválida.",
      "`f-strings (f\"{num1} + {num2} = {resultado}\")`: Sintaxe moderna e elegante do Python para formatar textos.",
    ],
    syntaxTips: "As f-strings (format strings) introduzidas no Python 3.6 são a forma mais rápida e legível de intercalar variáveis no texto.",
  },
  {
    id: "ponto_entrada",
    title: "10. Ponto de Entrada Padrão (`if __name__ == '__main__':`)",
    badge: "Boas práticas Python",
    lineStart: 170,
    lineEnd: 172,
    codeSnippet: `if __name__ == "__main__":\n    main()`,
    shortSummary: "Garante que o script só execute a função principal se for rodado diretamente.",
    explanation:
      "Em Python, a variável especial '__name__' armazena o contexto em que o arquivo está sendo executado. " +
      "Se você rodar 'python calculadora.py' diretamente no terminal, '__name__' vale '__main__'. " +
      "Se outro arquivo importar este módulo ('import calculadora'), o código não roda sozinho acidentalmente, permitindo reaproveitar as funções em outros projetos.",
    keyPoints: [
      "Padrão ouro em projetos Python profissionais.",
      "Separa código executável de código reutilizável (módulo).",
      "Permite importar funções como 'adicionar' em testes automatizados.",
    ],
    syntaxTips: "Sempre termine seus scripts executáveis com esse bloco condicional.",
  },
];

export interface OperationDetail {
  id: string;
  name: string;
  symbol: string;
  pythonOperator: string;
  example: string;
  description: string;
  mathProperty: string;
  pythonNuance: string;
  codeExample: string;
}

export const OPERATIONS_LIST: OperationDetail[] = [
  {
    id: "adicao",
    name: "Adição",
    symbol: "+",
    pythonOperator: "+",
    example: "15 + 27 = 42",
    description: "Junta duas ou mais quantidades para obter um total.",
    mathProperty: "Comutativa: a + b = b + a (a ordem das parcelas não altera a soma). Elemento neutro é 0.",
    pythonNuance: "O operador '+' em números inteiros e reais realiza a soma matemática. Em listas ou strings, faz concatenação.",
    codeExample: `def adicionar(a, b):\n    return a + b\n\nprint(adicionar(15, 27)) # 42`,
  },
  {
    id: "subtracao",
    name: "Subtração",
    symbol: "−",
    pythonOperator: "-",
    example: "50 - 18 = 32",
    description: "Diminui uma quantidade de outra para encontrar a diferença.",
    mathProperty: "Não-comutativa: a - b ≠ b - a. A ordem dos números altera o resultado e seu sinal.",
    pythonNuance: "Subtrair um número de outro menor produz automaticamente um valor negativo (ex: 5 - 10 = -5).",
    codeExample: `def subtrair(a, b):\n    return a - b\n\nprint(subtrair(50, 18)) # 32`,
  },
  {
    id: "multiplicacao",
    name: "Multiplicação",
    symbol: "×",
    pythonOperator: "*",
    example: "8 * 7 = 56",
    description: "Operação que representa a soma repetida de um mesmo número várias vezes.",
    mathProperty: "Comutativa: a * b = b * a (a ordem dos fatores não altera o produto). Elemento absorvente é 0.",
    pythonNuance: "Usa o símbolo de asterisco '*'. Cuidado: '**' em Python calcula potência (ex: 2**3 = 8).",
    codeExample: `def multiplicar(a, b):\n    return a * b\n\nprint(multiplicar(8, 7)) # 56`,
  },
  {
    id: "divisao",
    name: "Divisão",
    symbol: "÷",
    pythonOperator: "/",
    example: "84 / 4 = 21.0",
    description: "Reparte uma quantidade em partes iguais.",
    mathProperty: "Não-comutativa. Divisão por zero é estritamente indefinida na matemática.",
    pythonNuance: "Em Python 3, o operador '/' sempre retorna um número decimal ('float'). Para divisão inteira, usa-se '//'.",
    codeExample: `def dividir(a, b):\n    if b == 0:\n        return "Erro: Divisão por zero!"\n    return a / b\n\nprint(dividir(84, 4)) # 21.0`,
  },
  {
    id: "porcentagem",
    name: "Porcentagem",
    symbol: "%",
    pythonOperator: "(valor * taxa) / 100",
    example: "20% de 500 = 100.0",
    description: "Calcula uma fração proporcional sobre a base 100 (razão centesimal).",
    mathProperty: "Linear e proporcional: p% de V = (V × p) / 100. Exemplo: 15% de 200 = 30.",
    pythonNuance: "Em Python nativo, '%' é o operador de resto da divisão (módulo). Para cálculo de porcentagem comercial, usamos a fórmula explícita `(valor * taxa) / 100`.",
    codeExample: `def porcentagem(valor, taxa):\n    return (valor * taxa) / 100.0\n\nprint(porcentagem(500, 20)) # 100.0`,
  },
  {
    id: "logaritmo",
    name: "Logaritmo",
    symbol: "log",
    pythonOperator: "math.log(x, base)",
    example: "log₁₀(100) = 2.0",
    description: "Determina o expoente necessário para que uma base elevada resulte no número informado (log_b(x) = y ⇔ b^y = x).",
    mathProperty: "Definido apenas no domínio dos reais para x > 0, base > 0 e base ≠ 1. Propriedades: log(a·b) = log(a) + log(b); log(a/b) = log(a) - log(b).",
    pythonNuance: "Requer 'import math'. O padrão `math.log(x)` usa base e (log natural). Com `math.log10(x)` ou `math.log(x, 10)`, calcula o logaritmo decimal.",
    codeExample: `import math\n\ndef logaritmo(x, base=10):\n    if x <= 0:\n        return "Erro: x <= 0!"\n    return math.log(x, base)\n\nprint(logaritmo(100, 10)) # 2.0`,
  },
];

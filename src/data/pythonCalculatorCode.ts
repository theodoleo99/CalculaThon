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
# Operações: Adição, Subtração, Multiplicação e Divisão
# ==========================================================

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


def exibir_menu() -> None:
    """Exibe o menu visual com as opções disponíveis."""
    print("\\n" + "=" * 36)
    print("           CALCULATHON              ")
    print("=" * 36)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("5 - Sair do programa")
    print("=" * 36)


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
        opcao = input("Escolha uma opção (1-5): ").strip()

        if opcao == "5":
            print("\\nObrigado por usar a calculadora! Encerrando...")
            break

        if opcao not in ("1", "2", "3", "4"):
            print("\\nOpção inválida! Escolha um valor entre 1 e 5.")
            continue

        print("\\n--- Entrada de Dados ---")
        num1 = obter_numero("Digite o primeiro número: ")
        num2 = obter_numero("Digite o segundo número: ")

        print("\\n--- Resultado ---")
        if opcao == "1":
            resultado = adicionar(num1, num2)
            print(f"{num1} + {num2} = {resultado}")

        elif opcao == "2":
            resultado = subtrair(num1, num2)
            print(f"{num1} - {num2} = {resultado}")

        elif opcao == "3":
            resultado = multiplicar(num1, num2)
            print(f"{num1} * {num2} = {resultado}")

        elif opcao == "4":
            resultado = dividir(num1, num2)
            if isinstance(resultado, str):
                print(resultado)
            else:
                print(f"{num1} / {num2} = {resultado}")

        input("\\nPressione ENTER para continuar...")


# Ponto de entrada padrão em Python
if __name__ == "__main__":
    main()
`;

export const BASIC_PYTHON_CODE = `# ==========================================================
# CALCULADORA BÁSICA EM PYTHON (Versão Essencial)
# ==========================================================

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

# 2. Apresentação das opções
print("1 - Adição (+)")
print("2 - Subtração (-)")
print("3 - Multiplicação (*)")
print("4 - Divisão (/)")

opcao = input("Escolha a operação (1/2/3/4): ")

# 3. Leitura dos números
num1 = float(input("Digite o 1º número: "))
num2 = float(input("Digite o 2º número: "))

# 4. Cálculo e exibição do resultado
if opcao == "1":
    print(f"Resultado: {num1} + {num2} = {adicionar(num1, num2)}")
elif opcao == "2":
    print(f"Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
elif opcao == "3":
    print(f"Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
elif opcao == "4":
    print(f"Resultado: {num1} / {num2} = {dividir(num1, num2)}")
else:
    print("Opção inválida!")
`;

export const CODE_SECTIONS: CodeSection[] = [
  {
    id: "funcao_adicao",
    title: "1. Função de Adição (`adicionar`)",
    badge: "Operador +",
    lineStart: 6,
    lineEnd: 8,
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
    lineStart: 11,
    lineEnd: 13,
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
    lineStart: 16,
    lineEnd: 18,
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
    lineStart: 21,
    lineEnd: 28,
    codeSnippet: `def dividir(a: float, b: float) -> float | str:\n    """Retorna o quociente ou mensagem se dividir por zero."""\n    if b == 0:\n        return "Erro: Não é possível dividir por zero!"\n    return a / b`,
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
    id: "funcao_menu",
    title: "5. Exibição do Menu (`exibir_menu`)",
    badge: "Interface CLI",
    lineStart: 31,
    lineEnd: 41,
    codeSnippet: `def exibir_menu() -> None:\n    print("\\n" + "=" * 36)\n    print("       CALCULADORA EM PYTHON")\n    print("=" * 36)\n    print("1 - Adição (+)")\n    print("2 - Subtração (-)")\n    print("3 - Multiplicação (*)")\n    print("4 - Divisão (/)")\n    print("5 - Sair do programa")\n    print("=" * 36)`,
    shortSummary: "Imprime na tela um menu organizado e amigável com as opções disponíveis.",
    explanation:
      "Uma boa experiência de usuário no terminal precisa de clareza visual. " +
      "Usamos a multiplicação de strings ('=' * 36) para criar linhas divisórias elegantes sem precisar digitar dezenas de caracteres manualmente. " +
      "Cada linha do menu tem um número correspondente que o usuário poderá digitar.",
    keyPoints: [
      "`print()`: Função padrão do Python para enviar texto ao terminal.",
      "`'=' * 36`: Recurso inteligente do Python que repete o caractere '=' 36 vezes.",
      "`\\n`: Caractere especial que pula uma linha.",
      "Retorno `None`: A função apenas imprime na tela, não precisa retornar nenhum valor calculado.",
    ],
    syntaxTips: "Multiplicar strings ('-' * 20) é uma técnica muito comum em Python para formatar relatórios e menus.",
  },
  {
    id: "obter_numero",
    title: "6. Leitura e Validação de Números (`obter_numero`)",
    badge: "input() + float() + try/except",
    lineStart: 44,
    lineEnd: 54,
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
    title: "7. Loop Principal e Controle de Fluxo (`main`)",
    badge: "while True + if/elif/else",
    lineStart: 57,
    lineEnd: 100,
    codeSnippet: `def main() -> None:\n    while True:\n        exibir_menu()\n        opcao = input("Escolha uma opção (1-5): ").strip()\n        if opcao == "5":\n            break\n        # ... chamadas das funções matemáticas`,
    shortSummary: "Controla a repetição do programa e executa a operação correspondente à opção escolhida.",
    explanation:
      "O loop 'while True' mantém a calculadora aberta após cada conta, em vez de fechar imediatamente. " +
      "O comando 'break' interrompe o loop quando a opção '5' (Sair) é escolhida. " +
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
    title: "8. Ponto de Entrada Padrão (`if __name__ == '__main__':`)",
    badge: "Boas práticas Python",
    lineStart: 103,
    lineEnd: 105,
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
    mathProperty: "Comutativa: a + b = b + a (a ordem das parcelas não altera a soma).",
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
    mathProperty: "Comutativa: a * b = b * a (a ordem dos fatores não altera o produto).",
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
];

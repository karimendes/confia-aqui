import { useState } from "react"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function FAQ(){
    const [perguntaAtiva, setPerguntaAtiva] = useState(null)
    const iconFAQ = (index) => {
        setPerguntaAtiva(perguntaAtiva === index ? null : index)
    }

    const perguntas = [
        {
            pergunta: "Como o golpe geralmente acontece?",
            resposta: "O golpista chega à casa da vítima se passando por um entregador de flores, cestas ou outros produtos, muitas vezes em datas comemorativas. Ele informa que há um presente, mas que uma pequena taxa (de frete, por exemplo) deve ser paga no cartão. A maquininha de cartão utilizada está adulterada para registrar um valor muito maior ou clonar o cartão no momento da transação. Muitas vezes, o visor está propositalmente danificado para dificultar a visualização do valor real."
        },
        {
            pergunta: "Quais são os sinais de que uma entrega de presente pode ser um golpe?",
            resposta: "Os principais sinais de alerta são: Receber uma entrega que não foi solicitada por você nem confirmada por um familiar ou amigo. O entregador insistir que você pague uma taxa de frete, manuseio ou imposto no ato da entrega. A máquina de cartão apresentar o visor danificado, estar ilegível ou muito suja. O valor mostrado no comprovante (se houver) ser diferente do que você autorizou."
        },
        {
            pergunta: 'Caí no "Golpe do Presente" e meu cartão foi clonado. O que devo fazer?',
            resposta: "Aja rapidamente. Primeiro, entre em contato imediatamente com seu banco, por telefone, para relatar a fraude, contestar a compra não autorizada e pedir o cancelamento urgente do cartão. Segundo, registre um Boletim de Ocorrência (B.O.) na Polícia Civil, fornecendo o máximo de detalhes (data, hora, valor e descrição do ocorrido)."
        },
        {
            pergunta: "Se eu suspeitar que sou vítima de golpe, qual é a primeira providência que devo tomar?",
            resposta: "A primeira ação é parar tudo: interrompa imediatamente a transação, a comunicação ou o pagamento. Em seguida, entre em contato com seu banco ou com a plataforma envolvida por meio dos canais de atendimento oficiais (procure o telefone no site, não use o número que o golpista forneceu) para relatar o ocorrido e pedir orientações sobre o bloqueio de contas e cartões."
        },
        {
            pergunta: "Por que o golpe do presente é mais comum em datas comemorativas e feriados?",
            resposta: "Os criminosos utilizam a vulnerabilidade emocional e a expectativa gerada pelas datas festivas. Nesses períodos, é mais plausível que a vítima receba presentes inesperados, diminuindo a sua desconfiança."
        },
        {
            pergunta: "Qual é a principal medida de segurança para evitar 100% esse golpe?",
            resposta: "Jamais pague por algo que você não comprou ou não esperava, especialmente na porta de casa. Se receber uma entrega surpresa, recuse a cobrança, anote o nome e a loja e ligue para o suposto remetente para confirmar a informação antes de qualquer coisa."
        }
    ]

    return (
        <section className="max-w-5xl mx-auto py-12 px-4 mb-4 text-left bg-white">
            <h2 className="text-lg font-bold text-cinza-600 mb-6">Dúvidas Frequentes (FAQ)</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {perguntas.map((p, index) => (
                    <div key={index} className={`bg-white shadow-sm rounded-xl transition-all duration-300 ${perguntaAtiva === index ? "border border-azul shadow-md" : "border border-gray-200"}`}>
                        <button onClick={() => iconFAQ(index)} className="w-full flex justify-between items-center p-4 font-bold text-lg text-azul text-left focus:outline-none">
                            {p.pergunta}
                            <FontAwesomeIcon icon={perguntaAtiva === index ? faAngleUp : faAngleDown} className="text-azul transition-transform duration-300"/>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${perguntaAtiva === index ? "max-h-45 opacity-100 px-4 pb-4" : "max-h-0 opacity-0 px-4"}`}>
                            <p className="text-cinza-500 font-normal">{p.resposta}</p>
                            </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FAQ
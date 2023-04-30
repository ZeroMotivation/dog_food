import { Accordion } from "../../components/Accordion/accordion"

const dataFAQ = [
	{
		title:"Случайный текст похож на гитарный перебор?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Сплочённость команды профессионалов позволила расправить крылья?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Очевидцы сообщают, что слышали ласковый перезвон вертикали власти?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Консультация с широким активом продолжает удивлять?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Франция намерена исследовать, почему был сорван доклад председателя совхоза?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Франция намерена исследовать, почему был сорван доклад председателя совхоза?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Курс на социально-ориентированный национальный проект попахивает безумием?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Постоянный количественный рост определил дальнейшее развитие?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Мелочь, а приятно: ночь оказалась долгой?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
	{
		title:"Есть над чем задуматься: сознание наших соотечественников не замутнено пропагандой?",
		content: "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами."
	},
]

export const FaqPage = () => {
    return (
    <>
        <h1>Часто спрашивают</h1>
        {
            dataFAQ.map( (data, index) => <Accordion key={index} title={data.title}>{data.content}</Accordion>)
        }
    </>
    );
}
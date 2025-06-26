import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function SettingsCard() {
    return (
        <Card className="rounded-xl border-none">
            <CardHeader>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            Описание и требования
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                <div>
                                    <h1 className="font-bold">Описание переменных:</h1>
                                    <ul className="list-none py-4 space-y-2">
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            %w – любой непрерывный набор букв,
                                            цифр и или спецсимволов.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            %d – любой непрерывный набор цифр и или
                                            спецсимволов.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            %w(1,n) - ограниченная последовательность слов (состоящих из букв, цифр или спецсимволов описанных ниже), разделенных пробелом (или несколькими пробелами), где п - число слов (слов должно быть не менее 1 и не более чем п); Важно: значение п должно быть не более 10. Переменную %w(1,1) использовать нельзя.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            %d(1,n) - ограниченная последовательность чисел (состоящих из цифр или спецсимволов описанных ниже), разделенных пробелом (или несколькими пробелами), где п - число чисел (чисел должно быть не менее 1 и на более чем п): Важно: значение п должно быть не более 10. Переменную %d(1.1) использовать нельзя.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Набор букв или цифр %d и %w может содержать знаки
                                            препинания и спецсимволы: ! № # %..:: ?\/()+-™"—_***&^?()[]
                                            &lt;&gt;/\||®#5%^()+=~*
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h1 className="font-bold">
                                        Требования к оформлению шаблонов:
                                    </h1>
                                    <ul className="list-none space-y-2 py-4">
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Шаблон должен быть записан корректно с применением правил
                                            применения переменных в шаблоне.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Корректность написания шаблона — целиком и полностью в
                                            зоне ответственности клиента.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Операнда %w(1,n) будет гарантировано согласована для
                                            использования: государственными органами, благотворительными
                                            фондами … в остальных случаях её использование не обоснованно.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Для указания даты, телефона, пароля — желательно
                                            использование операнды %d(1,n).
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Не стоит объединять все подряд в групповых переменных
                                            %w, %d, %w(1,n), %d(1,n).
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Простое правило: чем читабельнее шаблон для человека,
                                            тем меньше вопросов он вызывает при согласовании.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Следует избегать дублирования шаблонов, кроме случаев,
                                            когда шаблон используется для нескольких имён отправителей.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            После обозначения каждой переменной в п.2 в шаблоне
                                            необходимо ставить пробел.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Если любая переменная из п.2 используется внутри
                                            шаблона, то перед ней необходимо ставить пробел.
                                        </li>
                                        <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
                                            Отступления от правил возможны при согласовании
                                            модератором, если есть обоснование транзакционного или
                                            сервисного характера шаблона.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid grid-cols-[150px_300px] items-center gap-4">
                    <CardDescription>Тип уведомления</CardDescription>
                    <div className="flex flex-col gap-2">
                        Изменение статуса SMS
                    </div>
                </div>

                <div className="grid grid-cols-[180px_700px] items-center gap-4">
                    <CardDescription>Ссылка для уведомления</CardDescription>
                    <Input placeholder="https://example.uz" className="w-full rounded-2xl"></Input>
                    <CardDescription>Секретная фраза</CardDescription>
                    <Input placeholder="Ваша секретная фраза" className="w-full rounded-2xl"></Input>
                    <CardDescription>Статус</CardDescription>
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="OFF" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Выберите статус</SelectLabel>
                                <SelectItem value="apple">ON</SelectItem>
                                <SelectItem value="banana">OFF</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>


                </div>

                <Separator />

                <div className="flex gap-4">
                    <Button className="rounded-2xl bg-[#2563EB] hover:bg-[#1E40AF]">
                        Сохранить
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

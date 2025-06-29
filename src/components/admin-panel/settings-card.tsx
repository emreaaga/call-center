'use client';

import {
    Card,
    CardContent,
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
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsCard() {
    return (
        <Card className="rounded-xl border-none">
            <CardHeader>
                <CardTitle>Добавить SIP</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4">

                    {[
                        { htmlFor: 'sip-name', label: 'Имя', type: 'text', placeholder: 'Имя SIP' },
                        { htmlFor: 'sip-host', label: 'Хостинг', type: 'text', placeholder: '192.168.0.1' },
                        { htmlFor: 'sip-username', label: 'Логин', type: 'text', placeholder: 'Номер телефона' },
                    ].map(({ htmlFor, label, type, placeholder }) => (
                        <div key={htmlFor} className="flex flex-col gap-1">
                            <Label htmlFor={htmlFor}>{label}</Label>
                            <Input id={htmlFor} type={type} className="w-80 rounded-2xl" placeholder={placeholder} />
                        </div>
                    ))}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="sip-channels">Количество каналов</Label>
                        <Select>
                            <SelectTrigger className="w-80 rounded-2xl">
                                <SelectValue placeholder="Выберите" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Каналы</SelectLabel>
                                    {[...Array(10)].map((_, i) => (
                                        <SelectItem key={i + 1} value={`${i + 1}`}>
                                            {i + 1}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="sip-password">Пароль</Label>
                        <Input
                            id="sip-password"
                            type="password"
                            className="w-80 rounded-2xl"
                            placeholder="Введите пароль"
                        />
                    </div>
                    <Button className="w-[90px] rounded-2xl bg-[#2563EB] hover:bg-[#1E40AF]">
                        Применить
                    </Button>

                </div>
            </CardContent>
        </Card>
    );
}

"use client"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"


interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateOperationDialog({ open, onOpenChange }: Props) {
    const [fromDate, setFromDate] = useState<Date | undefined>()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="md:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Создать запрос</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-[150px_300px] items-center gap-4">
                        <Label htmlFor="name">Название:</Label>
                        <Input id="name" placeholder="Например: Отчёт за ХХХ-ХХ-ХХ" />
                    </div>
                    <div className="grid grid-cols-[150px_300px] items-center gap-4">
                        <Label htmlFor="amount">Выберите ОТ:</Label>
                        <Input id="from-date" type="date" />
                    </div>
                    <div className="grid grid-cols-[150px_300px] items-center gap-4">
                        <Label htmlFor="amount">Выберите ДО:</Label>
                        <Input id="from-date" type="date" />
                    </div>
                    <div className="grid grid-cols-[150px_300px] items-center gap-4">
                        <Label htmlFor="name">Тип отчета:</Label>
                        <Select defaultValue="0">
                            <SelectTrigger className="w-full" id="view-selector">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Пополнение</SelectItem>
                                <SelectItem value="1">Снятие</SelectItem>
                                <SelectItem value="2">Оплата</SelectItem>
                                <SelectItem value="3">Общий</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-[150px_300px] items-center gap-4">
                        <Label htmlFor="amount">Структура орг:</Label>
                        <Select defaultValue="0">
                            <SelectTrigger className="w-full" id="view-selector">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Все</SelectItem>
                                <SelectItem value="1">MVD GUP III Qoraqalpogiston</SelectItem>
                                <SelectItem value="2">MVD GUP III Surxondaryo</SelectItem>
                                <SelectItem value="3">MVD GUP III QASHQADARYO</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="ml-auto rounded-2xl" variant="outline">Отмена</Button>
                    </DialogClose>
                    <Button className="ml-auto bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-2xl" type="submit">Создать</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

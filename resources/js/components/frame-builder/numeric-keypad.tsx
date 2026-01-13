import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { X, Check, Delete } from 'lucide-react';

interface NumericKeypadProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    initialValue?: number;
    onConfirm: (value: number) => void;
    min?: number;
    max?: number;
    unit?: string;
}

export default function NumericKeypad({
    isOpen,
    onClose,
    title,
    initialValue,
    onConfirm,
    min = 100,
    max = 10000,
    unit = 'mm',
}: NumericKeypadProps) {
    const [value, setValue] = useState(initialValue?.toString() || '');

    const handleNumberClick = (num: string) => {
        if (value.length < 5) {
            setValue(value + num);
        }
    };

    const handleBackspace = () => {
        setValue(value.slice(0, -1));
    };

    const handleClear = () => {
        setValue('');
    };

    const handleConfirm = () => {
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue >= min && numValue <= max) {
            onConfirm(numValue);
            onClose();
            setValue('');
        }
    };

    const handleCancel = () => {
        setValue('');
        onClose();
    };

    const isValid =
        value.length > 0 &&
        !isNaN(parseInt(value)) &&
        parseInt(value) >= min &&
        parseInt(value) <= max;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Display */}
                    <div className="flex h-16 items-center justify-center rounded-lg border-2 border-gray-300 bg-white">
                        <span className="text-3xl font-bold text-gray-800">
                            {value || '0'}
                        </span>
                        <span className="ml-2 text-lg text-gray-500">
                            {unit}
                        </span>
                    </div>

                    {/* Validation message */}
                    {value && !isValid && (
                        <p className="text-center text-sm text-red-500">
                            Inserisci un valore tra {min} e {max} {unit}
                        </p>
                    )}

                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-2">
                        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                            <Button
                                key={num}
                                variant="outline"
                                size="lg"
                                onClick={() => handleNumberClick(num.toString())}
                                className="h-14 text-xl font-semibold hover:bg-blue-50"
                            >
                                {num}
                            </Button>
                        ))}

                        {/* Bottom row */}
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleBackspace}
                            className="h-14 hover:bg-red-50"
                        >
                            <Delete className="!size-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleNumberClick('0')}
                            className="h-14 text-xl font-semibold hover:bg-blue-50"
                        >
                            0
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleClear}
                            className="h-14 text-sm hover:bg-gray-100"
                        >
                            C
                        </Button>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleCancel}
                            className="h-12"
                        >
                            <X className="mr-2 !size-5" />
                            Annulla
                        </Button>
                        <Button
                            variant="default"
                            size="lg"
                            onClick={handleConfirm}
                            disabled={!isValid}
                            className="h-12"
                        >
                            <Check className="mr-2 !size-5" />
                            Conferma
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

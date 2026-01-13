import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FramePresetsByCategory } from '@/types';
import { cn } from '@/lib/utils';
import PresetIcon from './preset-icon';

interface FrameSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    framePresets: FramePresetsByCategory;
    onSelectPreset: (code: string) => void;
}

export default function FrameSelectionModal({
    isOpen,
    onClose,
    framePresets,
    onSelectPreset,
}: FrameSelectionModalProps) {
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

    const handleConfirm = () => {
        if (selectedPreset) {
            onSelectPreset(selectedPreset);
            setSelectedPreset(null);
        }
    };

    const handleClose = () => {
        setSelectedPreset(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Seleziona Tipo di Infisso</DialogTitle>
                    <DialogDescription>
                        Scegli il numero di ante del serramento
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {framePresets.imposte && framePresets.imposte.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {framePresets.imposte.map((preset) => (
                                <button
                                    key={preset.id}
                                    onClick={() =>
                                        setSelectedPreset(preset.code)
                                    }
                                    className={cn(
                                        'flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all',
                                        selectedPreset === preset.code
                                            ? 'border-primary bg-primary/10 shadow-md'
                                            : 'border-border hover:border-primary/50 hover:shadow-sm',
                                    )}
                                >
                                    <div className="flex h-24 w-24 items-center justify-center">
                                        <PresetIcon
                                            code={preset.code}
                                            className="h-full w-full"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-base font-semibold">
                                            {preset.name}
                                        </span>
                                        {preset.description && (
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {preset.description}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-muted-foreground">
                            Nessun preset disponibile
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="flex-1"
                    >
                        Annulla
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedPreset}
                        className="flex-1"
                        size="lg"
                    >
                        Conferma Selezione
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

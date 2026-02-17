import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Client } from '@/types';

interface ClientFormData {
    nome: string;
    cognome: string;
    ragione_sociale: string;
    indirizzo_via: string;
    indirizzo_citta: string;
    indirizzo_cap: string;
    indirizzo_provincia: string;
    telefono: string;
    cellulare: string;
    email: string;
    pec: string;
    codice_fiscale: string;
    partita_iva: string;
    note: string;
}

interface ClientFormProps {
    data: ClientFormData;
    onChange: (data: ClientFormData) => void;
    errors?: Record<string, string>;
}

export const emptyClientForm: ClientFormData = {
    nome: '',
    cognome: '',
    ragione_sociale: '',
    indirizzo_via: '',
    indirizzo_citta: '',
    indirizzo_cap: '',
    indirizzo_provincia: '',
    telefono: '',
    cellulare: '',
    email: '',
    pec: '',
    codice_fiscale: '',
    partita_iva: '',
    note: '',
};

export function clientToFormData(client: Client): ClientFormData {
    return {
        nome: client.nome ?? '',
        cognome: client.cognome ?? '',
        ragione_sociale: client.ragione_sociale ?? '',
        indirizzo_via: client.indirizzo_via ?? '',
        indirizzo_citta: client.indirizzo_citta ?? '',
        indirizzo_cap: client.indirizzo_cap ?? '',
        indirizzo_provincia: client.indirizzo_provincia ?? '',
        telefono: client.telefono ?? '',
        cellulare: client.cellulare ?? '',
        email: client.email ?? '',
        pec: client.pec ?? '',
        codice_fiscale: client.codice_fiscale ?? '',
        partita_iva: client.partita_iva ?? '',
        note: client.note ?? '',
    };
}

export function ClientForm({ data, onChange, errors }: ClientFormProps) {
    const update = (field: keyof ClientFormData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* Anagrafica */}
            <div>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                    Anagrafica
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            id="nome"
                            value={data.nome}
                            onChange={(e) => update('nome', e.target.value)}
                            placeholder="Mario"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="cognome">Cognome</Label>
                        <Input
                            id="cognome"
                            value={data.cognome}
                            onChange={(e) => update('cognome', e.target.value)}
                            placeholder="Rossi"
                        />
                    </div>
                </div>
                <div className="mt-3 space-y-1.5">
                    <Label htmlFor="ragione_sociale">Ragione Sociale</Label>
                    <Input
                        id="ragione_sociale"
                        value={data.ragione_sociale}
                        onChange={(e) =>
                            update('ragione_sociale', e.target.value)
                        }
                        placeholder="Rossi S.r.l."
                    />
                </div>
                {errors?.nome && (
                    <p className="mt-2 text-sm text-destructive">
                        {errors.nome}
                    </p>
                )}
            </div>

            {/* Indirizzo */}
            <div>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                    Indirizzo
                </h4>
                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <Label htmlFor="indirizzo_via">Via</Label>
                        <Input
                            id="indirizzo_via"
                            value={data.indirizzo_via}
                            onChange={(e) =>
                                update('indirizzo_via', e.target.value)
                            }
                            placeholder="Via Roma 123"
                        />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="indirizzo_citta">Città</Label>
                            <Input
                                id="indirizzo_citta"
                                value={data.indirizzo_citta}
                                onChange={(e) =>
                                    update('indirizzo_citta', e.target.value)
                                }
                                placeholder="Palermo"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="indirizzo_cap">CAP</Label>
                            <Input
                                id="indirizzo_cap"
                                value={data.indirizzo_cap}
                                onChange={(e) =>
                                    update('indirizzo_cap', e.target.value)
                                }
                                placeholder="90100"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="indirizzo_provincia">Prov.</Label>
                            <Input
                                id="indirizzo_provincia"
                                value={data.indirizzo_provincia}
                                onChange={(e) =>
                                    update(
                                        'indirizzo_provincia',
                                        e.target.value,
                                    )
                                }
                                placeholder="PA"
                                maxLength={5}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contatti */}
            <div>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                    Contatti
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="telefono">Telefono</Label>
                        <Input
                            id="telefono"
                            type="tel"
                            value={data.telefono}
                            onChange={(e) =>
                                update('telefono', e.target.value)
                            }
                            placeholder="091 1234567"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="cellulare">Cellulare</Label>
                        <Input
                            id="cellulare"
                            type="tel"
                            value={data.cellulare}
                            onChange={(e) =>
                                update('cellulare', e.target.value)
                            }
                            placeholder="333 1234567"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => update('email', e.target.value)}
                            placeholder="mario@esempio.it"
                        />
                        {errors?.email && (
                            <p className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="pec">PEC</Label>
                        <Input
                            id="pec"
                            type="email"
                            value={data.pec}
                            onChange={(e) => update('pec', e.target.value)}
                            placeholder="mario@pec.it"
                        />
                        {errors?.pec && (
                            <p className="text-sm text-destructive">
                                {errors.pec}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Dati Fiscali */}
            <div>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                    Dati Fiscali
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="codice_fiscale">Codice Fiscale</Label>
                        <Input
                            id="codice_fiscale"
                            value={data.codice_fiscale}
                            onChange={(e) =>
                                update(
                                    'codice_fiscale',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            placeholder="RSSMRA80A01G273X"
                            maxLength={16}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="partita_iva">Partita IVA</Label>
                        <Input
                            id="partita_iva"
                            value={data.partita_iva}
                            onChange={(e) =>
                                update('partita_iva', e.target.value)
                            }
                            placeholder="01234567890"
                            maxLength={13}
                        />
                    </div>
                </div>
            </div>

            {/* Note */}
            <div>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                    Note
                </h4>
                <div className="space-y-1.5">
                    <Textarea
                        id="note"
                        value={data.note}
                        onChange={(e) => update('note', e.target.value)}
                        placeholder="Note aggiuntive..."
                        rows={3}
                    />
                </div>
            </div>
        </div>
    );
}

export type { ClientFormData };

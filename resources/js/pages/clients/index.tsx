import { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Plus,
    BookUser,
    Phone,
    Mail,
    MapPin,
    FolderKanban,
    Trash2,
    Edit,
    MoreVertical,
    Search,
} from 'lucide-react';
import { Client } from '@/types';
import {
    ClientForm,
    emptyClientForm,
    clientToFormData,
    type ClientFormData,
} from '@/components/client-form';

interface ClientsIndexProps {
    clients: {
        data: Client[];
        links: any[];
        meta: any;
    };
}

export default function ClientsIndex({ clients }: ClientsIndexProps) {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [formData, setFormData] = useState<ClientFormData>(emptyClientForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const filteredClients = useMemo(() => {
        if (!searchQuery.trim()) {
            return clients.data;
        }
        const query = searchQuery.toLowerCase();
        return clients.data.filter((client) => {
            return (
                client.display_name?.toLowerCase().includes(query) ||
                client.email?.toLowerCase().includes(query) ||
                client.telefono?.includes(query) ||
                client.cellulare?.includes(query) ||
                client.indirizzo_citta?.toLowerCase().includes(query)
            );
        });
    }, [clients.data, searchQuery]);

    const handleCreateClient = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post('/clients', formData, {
            onSuccess: () => {
                setCreateDialogOpen(false);
                setFormData(emptyClientForm);
            },
            onError: (errs) => setErrors(errs),
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleUpdateClient = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingClient) return;
        setIsSubmitting(true);
        setErrors({});

        router.patch(`/clients/${editingClient.id}`, formData, {
            onSuccess: () => {
                setEditingClient(null);
                setFormData(emptyClientForm);
            },
            onError: (errs) => setErrors(errs),
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleDeleteClient = (clientId: number) => {
        if (confirm('Sei sicuro di voler eliminare questo cliente?')) {
            router.delete(`/clients/${clientId}`);
        }
    };

    const openEditDialog = (client: Client) => {
        setFormData(clientToFormData(client));
        setErrors({});
        setEditingClient(client);
    };

    const openCreateDialog = () => {
        setFormData(emptyClientForm);
        setErrors({});
        setCreateDialogOpen(true);
    };

    return (
        <AppLayout>
            <Head title="Rubrica Clienti" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Rubrica Clienti
                        </h2>
                        <p className="text-muted-foreground">
                            Gestisci l'anagrafica dei tuoi clienti
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-2 !size-4" />
                        Nuovo Cliente
                    </Button>
                </div>

                {clients.data.length > 0 && (
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 !size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cerca clienti..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                )}

                {clients.data.length === 0 ? (
                    <Card className="flex flex-1 items-center justify-center border-dashed">
                        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                                <BookUser className="!size-10 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">
                                    Nessun cliente trovato
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Aggiungi il tuo primo cliente alla rubrica
                                </p>
                            </div>
                            <Button onClick={openCreateDialog} size="lg">
                                <Plus className="mr-2 !size-4" />
                                Aggiungi il tuo primo cliente
                            </Button>
                        </CardContent>
                    </Card>
                ) : filteredClients.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center py-16 text-center">
                        <div className="space-y-2">
                            <p className="text-muted-foreground">
                                Nessun risultato per "{searchQuery}"
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredClients.map((client) => (
                            <Card
                                key={client.id}
                                className="group transition-all hover:border-primary hover:shadow-md"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="line-clamp-1">
                                                {client.display_name}
                                            </CardTitle>
                                            {client.ragione_sociale &&
                                                (client.nome ||
                                                    client.cognome) && (
                                                    <CardDescription className="mt-1">
                                                        {client.nome}{' '}
                                                        {client.cognome}
                                                    </CardDescription>
                                                )}
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                >
                                                    <MoreVertical className="!size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openEditDialog(client)
                                                    }
                                                >
                                                    <Edit className="mr-2 !size-4" />
                                                    Modifica
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDeleteClient(
                                                            client.id,
                                                        )
                                                    }
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="mr-2 !size-4" />
                                                    Elimina
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {client.full_address && (
                                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <MapPin className="mt-0.5 !size-3.5 shrink-0" />
                                            <span className="line-clamp-2">
                                                {client.full_address}
                                            </span>
                                        </div>
                                    )}
                                    {(client.telefono || client.cellulare) && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Phone className="!size-3.5 shrink-0" />
                                            <span>
                                                {client.cellulare ||
                                                    client.telefono}
                                            </span>
                                        </div>
                                    )}
                                    {client.email && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="!size-3.5 shrink-0" />
                                            <span className="truncate">
                                                {client.email}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                                        <FolderKanban className="!size-3" />
                                        <span>
                                            {client.projects_count || 0}{' '}
                                            {(client.projects_count || 0) === 1
                                                ? 'progetto'
                                                : 'progetti'}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Client Dialog */}
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Nuovo Cliente</DialogTitle>
                        <DialogDescription>
                            Inserisci i dati del nuovo cliente
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateClient} className="space-y-4">
                        <ClientForm
                            data={formData}
                            onChange={setFormData}
                            errors={errors}
                        />
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCreateDialogOpen(false)}
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                Annulla
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Salvataggio...' : 'Salva'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Client Dialog */}
            <Dialog
                open={editingClient !== null}
                onOpenChange={(open) => {
                    if (!open) setEditingClient(null);
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Modifica Cliente</DialogTitle>
                        <DialogDescription>
                            Aggiorna i dati del cliente
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdateClient} className="space-y-4">
                        <ClientForm
                            data={formData}
                            onChange={setFormData}
                            errors={errors}
                        />
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingClient(null)}
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                Annulla
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? 'Salvataggio...'
                                    : 'Salva Modifiche'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

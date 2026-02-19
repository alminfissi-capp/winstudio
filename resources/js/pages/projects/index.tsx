import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, FolderKanban, Calendar, Layers, Trash2, MoreVertical, UserPlus, ArrowLeft, Check } from 'lucide-react';
import { Client, Project } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ClientForm, emptyClientForm, type ClientFormData } from '@/components/client-form';

interface ProjectsIndexProps {
    projects: {
        data: Project[];
        links: { url: string | null; label: string; active: boolean }[];
        meta: Record<string, unknown>;
    };
    clients: Client[];
}

type DialogView = 'project-form' | 'new-client';

export default function ProjectsIndex({ projects, clients }: ProjectsIndexProps) {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [dialogView, setDialogView] = useState<DialogView>('project-form');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        client_id: '' as string,
    });
    const [clientFormData, setClientFormData] = useState<ClientFormData>(emptyClientForm);
    const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedClient = clients.find((c) => String(c.id) === formData.client_id);

    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.client_id) return;
        setIsSubmitting(true);

        router.post('/projects', {
            ...formData,
            client_id: Number(formData.client_id),
        }, {
            onSuccess: () => {
                closeDialog();
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleCreateClientInline = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setClientErrors({});

        router.post('/clients', clientFormData, {
            preserveScroll: true,
            onSuccess: (page) => {
                // After creating the client, go back to the project form
                // The new client will be in the refreshed clients list
                const updatedClients = (page.props as Record<string, unknown>).clients as Client[] | undefined;
                if (updatedClients && updatedClients.length > 0) {
                    // Select the most recently created client (last one by id)
                    const newestClient = updatedClients.reduce((a, b) => a.id > b.id ? a : b);
                    setFormData((prev) => ({ ...prev, client_id: String(newestClient.id) }));
                }
                setClientFormData(emptyClientForm);
                setDialogView('project-form');
            },
            onError: (errs) => setClientErrors(errs),
            onFinish: () => setIsSubmitting(false),
        });
    };

    const closeDialog = () => {
        setCreateDialogOpen(false);
        setDialogView('project-form');
        setFormData({ name: '', description: '', client_id: '' });
        setClientFormData(emptyClientForm);
        setClientErrors({});
    };

    const handleDeleteProject = (projectId: number) => {
        if (confirm('Sei sicuro di voler eliminare questo progetto?')) {
            router.delete(`/projects/${projectId}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AppLayout>
            <Head title="Progetti" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            I Miei Progetti
                        </h2>
                        <p className="text-muted-foreground">
                            Gestisci i tuoi progetti di rilievo misure
                        </p>
                    </div>
                    <Button onClick={() => setCreateDialogOpen(true)}>
                        <Plus className="mr-2 !size-4" />
                        Nuovo Progetto
                    </Button>
                </div>

                {projects.data.length === 0 ? (
                    <Card className="flex flex-1 items-center justify-center border-dashed">
                        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                                <FolderKanban className="!size-10 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">
                                    Nessun progetto trovato
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Crea il tuo primo progetto per iniziare il rilievo misure
                                </p>
                            </div>
                            <Button onClick={() => setCreateDialogOpen(true)} size="lg">
                                <Plus className="mr-2 !size-4" />
                                Crea il tuo primo progetto
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {projects.data.map((project) => (
                            <Card
                                key={project.id}
                                className="group transition-all hover:border-primary hover:shadow-md"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="line-clamp-1">
                                                {project.name}
                                            </CardTitle>
                                            {(project.client?.display_name || project.client_name) && (
                                                <CardDescription className="mt-1">
                                                    {project.client?.display_name || project.client_name}
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
                                                        handleDeleteProject(project.id)
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
                                <CardContent className="space-y-4">
                                    {project.description && (
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {project.description}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Layers className="!size-3" />
                                            <span>
                                                {project.frames_count || 0} frame
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="!size-3" />
                                            <span>{formatDate(project.created_at)}</span>
                                        </div>
                                    </div>

                                    <Link href={`/frame-builder/${project.id}`}>
                                        <Button className="w-full" variant="default">
                                            Apri Progetto
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Project Dialog */}
            <Dialog open={createDialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    {dialogView === 'project-form' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Crea Nuovo Progetto</DialogTitle>
                                <DialogDescription>
                                    Seleziona il cliente e inserisci i dettagli del progetto
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleCreateProject} className="space-y-4">
                                {/* Client Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="client_id">
                                        Cliente <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <Select
                                                value={formData.client_id}
                                                onValueChange={(value) =>
                                                    setFormData({ ...formData, client_id: value })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleziona un cliente..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {clients.map((client) => (
                                                        <SelectItem
                                                            key={client.id}
                                                            value={String(client.id)}
                                                        >
                                                            {client.display_name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setDialogView('new-client')}
                                            title="Crea nuovo cliente"
                                        >
                                            <UserPlus className="!size-4" />
                                        </Button>
                                    </div>
                                    {clients.length === 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            Nessun cliente in rubrica. Creane uno per continuare.
                                        </p>
                                    )}
                                    {selectedClient?.full_address && (
                                        <p className="text-xs text-muted-foreground">
                                            {selectedClient.full_address}
                                        </p>
                                    )}
                                </div>

                                {/* Project Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Nome Progetto <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder="Es: Appartamento Via Roma"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descrizione</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Note aggiuntive sul progetto..."
                                        rows={3}
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={closeDialog}
                                        className="flex-1"
                                        disabled={isSubmitting}
                                    >
                                        Annulla
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        disabled={isSubmitting || !formData.client_id}
                                    >
                                        {isSubmitting ? 'Creazione...' : 'Crea Progetto'}
                                    </Button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>Nuovo Cliente</DialogTitle>
                                <DialogDescription>
                                    Crea un nuovo cliente per associarlo al progetto
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleCreateClientInline} className="space-y-4">
                                <ClientForm
                                    data={clientFormData}
                                    onChange={setClientFormData}
                                    errors={clientErrors}
                                />
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setDialogView('project-form');
                                            setClientFormData(emptyClientForm);
                                            setClientErrors({});
                                        }}
                                        className="flex-1"
                                        disabled={isSubmitting}
                                    >
                                        <ArrowLeft className="mr-2 !size-4" />
                                        Indietro
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Salvataggio...' : 'Crea e Seleziona'}
                                        {!isSubmitting && <Check className="ml-2 !size-4" />}
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

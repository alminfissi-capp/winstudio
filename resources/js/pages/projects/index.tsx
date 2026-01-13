import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, FolderKanban, Calendar, Layers, Trash2, Edit } from 'lucide-react';
import { Project } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface ProjectsIndexProps {
    projects: {
        data: Project[];
        links: any[];
        meta: any;
    };
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        client_name: '',
        client_address: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/projects', formData, {
            onSuccess: () => {
                setCreateDialogOpen(false);
                setFormData({
                    name: '',
                    description: '',
                    client_name: '',
                    client_address: '',
                });
            },
            onFinish: () => setIsSubmitting(false),
        });
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
                                            {project.client_name && (
                                                <CardDescription className="mt-1">
                                                    {project.client_name}
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
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crea Nuovo Progetto</DialogTitle>
                        <DialogDescription>
                            Inserisci le informazioni del progetto per iniziare il rilievo
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateProject} className="space-y-4">
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
                            <Label htmlFor="client_name">Nome Cliente</Label>
                            <Input
                                id="client_name"
                                value={formData.client_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        client_name: e.target.value,
                                    })
                                }
                                placeholder="Es: Mario Rossi"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="client_address">Indirizzo</Label>
                            <Input
                                id="client_address"
                                value={formData.client_address}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        client_address: e.target.value,
                                    })
                                }
                                placeholder="Es: Via Roma 123, Palermo"
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
                                {isSubmitting ? 'Creazione...' : 'Crea Progetto'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

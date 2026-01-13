import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderKanban, Plus, ArrowRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Benvenuto in ALM RMI
                    </h2>
                    <p className="text-muted-foreground">
                        Gestisci i tuoi progetti di rilievo misure infissi
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:border-primary transition-colors">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                    <FolderKanban className="!size-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>I Miei Progetti</CardTitle>
                                </div>
                            </div>
                            <CardDescription>
                                Visualizza e gestisci tutti i progetti di rilievo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/projects">
                                <Button className="w-full" variant="default">
                                    Vai ai Progetti
                                    <ArrowRight className="ml-2 !size-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-primary transition-colors">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
                                    <Plus className="!size-5 text-green-600 dark:text-green-500" />
                                </div>
                                <div>
                                    <CardTitle>Nuovo Progetto</CardTitle>
                                </div>
                            </div>
                            <CardDescription>
                                Crea un nuovo progetto e inizia il rilievo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/projects?create=true">
                                <Button className="w-full" variant="outline">
                                    Crea Progetto
                                    <Plus className="ml-2 !size-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-dashed">
                        <CardHeader>
                            <CardTitle className="text-muted-foreground">
                                Funzionalità Future
                            </CardTitle>
                            <CardDescription>
                                Report, statistiche, e molto altro in arrivo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="ghost" disabled>
                                Prossimamente
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Come Iniziare</CardTitle>
                            <CardDescription>
                                Segui questi semplici passi per creare il tuo primo rilievo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ol className="space-y-3 text-sm">
                                <li className="flex gap-3">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        1
                                    </span>
                                    <span>
                                        <strong>Crea un progetto</strong> - Inserisci nome, cliente e dettagli
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        2
                                    </span>
                                    <span>
                                        <strong>Aggiungi frame</strong> - Scegli il tipo di serramento (1/2/3 ante)
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        3
                                    </span>
                                    <span>
                                        <strong>Configura misure</strong> - Usa il drag o il tastierino per impostare larghezza e altezza
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        4
                                    </span>
                                    <span>
                                        <strong>Salva e condividi</strong> - Il progetto viene salvato automaticamente
                                    </span>
                                </li>
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

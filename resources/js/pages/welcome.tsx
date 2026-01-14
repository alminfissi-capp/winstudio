import { dashboard, login, register } from '@/routes/index';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FolderKanban, Plus, Check } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="ALM-RMI - Gestione Finestre e Infissi" />

            <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
                {/* Header/Navbar */}
                <header className="border-b border-slate-200 bg-white/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <AppLogoIcon className="h-10 w-auto fill-slate-900 dark:fill-slate-100" />
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    ALM-RMI
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Gestione Infissi
                                </p>
                            </div>
                        </div>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Button asChild>
                                    <Link href={dashboard()}>Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link href={login()}>Accedi</Link>
                                    </Button>
                                    {canRegister && (
                                        <Button asChild>
                                            <Link href={register()}>Registrati</Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
                            Configura i tuoi infissi
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                in modo semplice
                            </span>
                        </h2>

                        <p className="mb-10 text-lg text-slate-600 dark:text-slate-400">
                            Gestisci progetti, crea preventivi e configura finestre e porte
                            con un builder visuale intuitivo e potente.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {auth.user ? (
                                <Button size="lg" asChild>
                                    <Link href={dashboard()}>
                                        Vai alla Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button size="lg" asChild>
                                        <Link href={register()}>
                                            <Plus className="mr-2 h-5 w-5" />
                                            Inizia Gratis
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href={login()}>Accedi</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-24 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <FolderKanban className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Gestione Progetti
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Organizza i tuoi progetti e clienti in un unico posto.
                                Tieni traccia di ogni dettaglio.
                            </p>
                        </Card>

                        <Card className="border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                                <svg
                                    className="h-6 w-6 text-violet-600 dark:text-violet-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Frame Builder
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Configura finestre e porte con dimensioni personalizzate
                                e visualizzazione in tempo reale.
                            </p>
                        </Card>

                        <Card className="border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Preventivi Rapidi
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Genera preventivi professionali in pochi click.
                                Risparmia tempo e migliora la precisione.
                            </p>
                        </Card>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        <p>
                            © {new Date().getFullYear()} ALM-RMI. Powered by{' '}
                            <a
                                href="https://laravel.com"
                                className="font-medium hover:text-slate-900 dark:hover:text-slate-100"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Laravel {import.meta.env.VITE_LARAVEL_VERSION || '12'}
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

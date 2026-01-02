export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-border border-t-transparent" />
            <p className="text-sm opacity-70">Caricamento…</p>
        </div>
    )
}

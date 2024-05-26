export default function Empty() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="space-y-4 text-center">
                <h2 className="text-2xl font-bold">Oops, it looks like this page is empty.</h2>
                <p className="text-muted-foreground">
                    {"Don't worry, we have plenty of other great content for you to explore."}
                </p>
            </div>
        </div>
    )
}
import { FileText } from "lucide-react";

export function RecentFiles({ docs }) {

    const formatFirestoreDate = (timestamp) => {
        if (!timestamp) return "Unknown Date";
        return timestamp.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-8">
            {
                docs.map((file, idx) => (
                    <article key={idx} className="flex items-center">
                        <FileText className="h-9 w-9" />
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {formatFirestoreDate(file.uploaded_at)}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">{file.size} MB</div>
                    </article>
                ))
            }
        </div>
    )
}
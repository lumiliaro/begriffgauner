import { title } from "@/components/primitives";

export default function RoundEndLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <h1 className={title()}>Select the imposter</h1>
            {children}
        </section>
    );
}

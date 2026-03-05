import ClientWrapper from "./client-wrapper";

export default function LPLayout({
    children
}: React.PropsWithChildren) {
    return (
        <ClientWrapper>
            {children}
        </ClientWrapper>
    );
}

import ProvidersWrapper from '@/provider/providers-wrapper';
import LayoutWrapper from '@/components/layout-wrapper';

export default function AppLayout({
    children
}: React.PropsWithChildren) {
    return (
        <ProvidersWrapper>
            <LayoutWrapper>{children}</LayoutWrapper>
        </ProvidersWrapper>
    );
}

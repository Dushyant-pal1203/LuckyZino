import Linkify from 'linkify-react';

/**
 * Returns Linkify options with custom link renderer
 */
export function createLinkifyOptions() {
  return {
    target: '_blank',
    rel: 'noopener noreferrer',
    formatHref: (href: string) => href,
    render: ({ attributes, content }: any) => (
      <a
        {...attributes}
        style={{
          color: '#3B82F6',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#2563eb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#3B82F6';
        }}
      >
        {content}
      </a>
    ),
  };
}

/**
 * Renders text with clickable links
 */
export function LinkifiedText({ children }: { children: string }) {
  return (
    <Linkify options={createLinkifyOptions()}>{children}</Linkify>
  );
}

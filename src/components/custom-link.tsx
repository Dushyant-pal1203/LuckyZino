import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import WrappedLink from "./ui/wrapped-link"

interface CustomLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  href: string;
	name?:string;
	featureName?: string;
}

const CustomLink = ({
  href,
  children,
  className,
  ...rest
}: CustomLinkProps) => {
  const isInternalLink = href.startsWith("/")
  const isAnchorLink = href.startsWith("#")

  if (isInternalLink || isAnchorLink) {
    return (
      <WrappedLink name={href.replace('/', '')} href={href} className={className} {...rest}>
        {children}
      </WrappedLink>
    )
  }

  return (
    <WrappedLink
      href={href}
			name={href.replace('/', '')}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 align-baseline underline underline-offset-4",
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      <ExternalLink className="ml-0.5 inline-block h-4 w-4" />
    </WrappedLink>
  )
}

export default CustomLink

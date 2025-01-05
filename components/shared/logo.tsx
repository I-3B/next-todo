import { Link } from "../ui/link";

export type LogoProps = {};
export function Logo({}: LogoProps) {
  return (
    <Link href="/" className="text-xl text-primary-foreground no-underline">
      Next Todo
    </Link>
  );
}

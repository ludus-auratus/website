import Image from "next/image";
import Link from "next/link";

export function NavbarBrand() {
  return (
    <Link
      href="/"
      aria-label="Página inicial"
      className="focus-visible:ring-primary focus-visible:ring-offset-background cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <Image src="/images/ludus/logo-texto.svg" width={132} height={41} alt="Logo da Ludus" />
    </Link>
  );
}

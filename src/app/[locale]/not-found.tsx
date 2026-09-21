import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { localePath } from "@/lib/utils";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-display text-sm tracking-[0.3em] text-accent-400">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-fg-muted">{dict.notFound.description}</p>
      <Link
        href={localePath(locale)}
        className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-fg hover:bg-white/5"
      >
        {dict.notFound.backHome}
      </Link>
    </Container>
  );
}

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs uppercase tracking-wide text-fg-faint">404</p>
      <h1 className="mt-4 font-display text-4xl font-medium md:text-5xl">Page not found.</h1>
      <p className="mt-4 max-w-md text-fg-muted">
        Whatever you were looking for isn&apos;t here. Let&apos;s get you back.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </Container>
  );
}

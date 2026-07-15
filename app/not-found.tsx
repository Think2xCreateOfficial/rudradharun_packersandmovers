import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Container>
        <h1 className="text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
          404 - Page Not Found
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Go back home
          </Link>
        </div>
      </Container>
    </div>
  );
}

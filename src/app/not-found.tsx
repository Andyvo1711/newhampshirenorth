import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-night px-4">
      <div className="max-w-md text-center">
        <p className="font-serif text-8xl text-copper">404</p>
        <h1 className="mt-4 font-serif text-3xl text-frost">Off the Line</h1>
        <p className="mt-3 font-sans text-sm leading-relaxed text-frost/70">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or the story may have moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block border border-copper px-6 py-3 font-sans text-sm font-semibold text-frost transition hover:bg-copper"
        >
          Back to New Hampshire North
        </Link>
      </div>
    </div>
  );
}

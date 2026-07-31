export default function WeatherStatement() {
  return (
    <section className="bg-snow" aria-labelledby="weather-statement-heading">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <h2 id="weather-statement-heading" className="font-serif text-3xl leading-[1.15] text-ink sm:text-5xl">
          THE WEATHER CHANGES FAST.
          <br />
          THE FACTS SHOULD NOT.
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-copper" aria-hidden="true" />
        <p className="mx-auto mt-8 max-w-xl font-sans text-base leading-relaxed text-ink-soft">
          From city halls and mountain towns to the Seacoast and North Country, New Hampshire North reports
          with clarity, context, and local perspective.
        </p>
      </div>
    </section>
  );
}

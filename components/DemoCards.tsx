type Props = { count?: number; prefix: string };

export default function DemoCards({ count = 10, prefix }: Props) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900"
        >
          <h3 className="font-semibold text-stone-900 dark:text-stone-50">
            {prefix} {i + 1}
          </h3>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ceci est un
            contenu d&apos;exemple pour tester le défilement.
          </p>
        </div>
      ))}
    </div>
  );
}
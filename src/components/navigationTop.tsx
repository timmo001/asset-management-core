import Link from "next/link";

export default function NavigationTop() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-start gap-4 p-4 text-lg font-light">
      <div>
        <Link href="/">Asset Management</Link>
      </div>
      <div>/</div>
      <div>
        <Link href="/">Lorem ipsum</Link>
      </div>
    </nav>
  );
}

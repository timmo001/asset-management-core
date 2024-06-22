import Link from "next/link";

export default function NavigationTop() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-start gap-4 p-2 text-lg font-light">
      <div>
        <Link href="/">Asset Management</Link>
      </div>
      <div>/</div>
      <div>
        <Link href="/">Lorem ipsum</Link>
      </div>
      <div className="flex-1" />
      <button className="transform rounded-md bg-violet-900 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105">
        <Link href="/login">Login</Link>
      </button>
    </nav>
  );
}

import { create } from "zustand";

type Path = Array<string>;

type Paths = { [key: string]: Path };

type BreadcrumbStore = {
  href: string | null;
  path: Path | null;
  name: string | null;
  updatePathname: (pathname: string) => void;
  updateName: (name: string) => void;
};

const paths: Paths = {
  "/": [],
  "/assets/new": ["Assets", "New"],
  "/assets/[id]/edit": ["Assets", "[name]", "Edit"],
  "/assets/[id]": ["Assets", "[name]"],
  "/assets": ["Assets"],
  "/posts/new": ["Posts", "New"],
  "/posts/[id]/edit": ["Posts", "[name]", "Edit"],
  "/posts/[id]": ["Posts", "[name]"],
  "/posts": ["Posts"],
};

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  href: null,
  path: null,
  name: null,
  updatePathname: (pathname: string) => {
    const path = Object.entries(paths).find(([r, t]) =>
      new RegExp(`^${r.replace(/\[.*?\]/g, ".*")}$`).test(pathname),
    )?.[1];
    if (!path) set({ href: null, path: [], name: null });

    set({ href: pathname, path });
  },
  updateName: (name: string) => {
    set((state: BreadcrumbStore) => {
      if (!state.path) return { name };

      const path = state.path.map((t) => {
        if (t.startsWith("[")) {
          return name;
        }
        return t;
      });

      return { path, name };
    });
  },
}));

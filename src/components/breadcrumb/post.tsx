"use client";
import { useEffect } from "react";

import { SelectPost } from "~/server/db/schema";
import { useBreadcrumbStore } from "~/stores/breadcrumb";

export function BreadcrumbPost({ post }: { post: SelectPost }) {
  const breadcrumbs = useBreadcrumbStore();

  useEffect(() => {
    breadcrumbs.updateName(post.title);
  }, [post.title]);

  return null;
}

"use client";
import { useEffect } from "react";

import { SelectAsset } from "~/server/db/schema";
import { useBreadcrumbStore } from "~/stores/breadcrumb";

export function BreadcrumbAsset({ asset }: { asset: SelectAsset }) {
  const breadcrumbs = useBreadcrumbStore();

  useEffect(() => {
    breadcrumbs.updateName(asset.name);
  }, [asset.name]);

  return null;
}

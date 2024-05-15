"use client";

import { useMediaQuery } from "./use-media-query";

export function useIsDesktop(minWidth: string) {
  return useMediaQuery(`(min-width: ${minWidth})`);
}

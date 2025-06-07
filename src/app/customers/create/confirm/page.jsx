'use client';

import { Suspense } from "react";
import ConfirmContent from "./ConfirmContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
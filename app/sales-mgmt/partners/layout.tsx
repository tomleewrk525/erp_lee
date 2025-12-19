"use client";

import React, { Suspense } from 'react';

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>페이지 로딩 중...</div>}>
      {children}
    </Suspense>
  );
}

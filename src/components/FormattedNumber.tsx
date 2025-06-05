// components/FormattedNumber.tsx
"use client";
import { useEffect, useState } from "react";

export default function FormattedNumber({ value }: { value: number }) {
  const [formatted, setFormatted] = useState(value.toString());

  useEffect(() => {
    setFormatted(new Intl.NumberFormat().format(value));
  }, [value]);

  return <>{formatted}</>;
}

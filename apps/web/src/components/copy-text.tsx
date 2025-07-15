"use client";

import { Icons } from "@v1/ui/icons";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export function CopyText({ value }: { value: string }) {
  const [_, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(value);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="font-mono text-gray-400 text-xs md:text-sm p-4 rounded-full border border-gray-700 transition-colors flex items-center gap-2 bg-gray-900 hover:bg-gray-800 hover:border-gray-600"
    >
      <span>{value}</span>
      {copied ? (
        <Icons.Check className="size-3.5 text-green-400" />
      ) : (
        <Icons.Copy className="size-3.5" />
      )}
    </button>
  );
}

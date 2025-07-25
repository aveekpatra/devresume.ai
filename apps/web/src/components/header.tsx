"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@v1/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { SubscribeForm } from "./subscribe-form";

export function Header() {
  return (
    <header className="absolute top-0 w-full flex items-center justify-between p-4 z-10">
      <span className="hidden md:block text-sm font-medium text-gray-300">convex-v1.run</span>

      <Link href="/">
        <Image
          src="/logo.png"
          alt="V1 logo"
          width={60}
          quality={100}
          height={60}
          className="md:absolute md:left-1/2 md:top-5 md:-translate-x-1/2"
        />
      </Link>

      <nav className="md:mt-2">
        <ul className="flex items-center gap-4">
          <li>
            <a
              href={process.env.NEXT_PUBLIC_APP_URL}
              className="text-sm px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Sign in
            </a>
          </li>
          <li>
            <a
              href="https://github.com/get-convex/v1"
              className="text-sm px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Github
            </a>
          </li>
          <li>
            <Dialog>
              <DialogTrigger
                className="text-sm px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-full font-medium cursor-pointer hover:bg-gray-700 transition-colors"
                asChild
              >
                <span>Get updates</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Stay updated</DialogTitle>
                  <DialogDescription>
                    Subscribe to our newsletter to get the latest news and
                    updates.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  <SubscribeForm
                    group="v1-newsletter"
                    placeholder="Email address"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </nav>
    </header>
  );
}

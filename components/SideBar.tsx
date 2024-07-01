"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { sidebarLinks } from "../constants";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { SiderbarProps } from "../types";
import PlaidLink from "./PlaidLink";

const SideBar = ({ user }: SiderbarProps) => {
  const pathName = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Next Bank logo"
            className="size=[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map((link) => {
          const isActiveLink =
            pathName === link.route || pathName.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn("sidebar-link", {
                "bg-bank-gradient": isActiveLink,
              })}
            >
              <div className="relative size-6">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={
                    cn({ "brightness-[3] invert-0": isActiveLink }) +
                    " flex flex-row items-center gap-2"
                  }
                />
              </div>
              <p
                className={cn("sidebar-label", {
                  "!text-white": isActiveLink,
                })}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} />
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default SideBar;

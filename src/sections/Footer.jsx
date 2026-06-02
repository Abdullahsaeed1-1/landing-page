"use client";

import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-black/18 backdrop-blur-md">
      <div className="mx-auto max-w-360 px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#home" className="inline-flex items-center gap-3 text-[#ECE9E9]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3F82A3]/20 bg-white/5 text-[0.7rem] font-medium text-[#ECE9E9]/80">
                TB
              </span>
              <span className="text-sm uppercase tracking-[0.34em] text-[#ECE9E9]/75">
                {site.brand}
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#6B6B6B]">
              Premium software, product, and automation systems for companies that want a sharper digital presence.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#6B6B6B]">Links</p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-[#6B6B6B]">
                {site.footerLinks.map((link) => (
                  <a key={link.label} href={link.href} className="transition-colors hover:text-[#3198DA]">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#6B6B6B]">Social</p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-[#6B6B6B]">
                {site.socials.map((social) => (
                  <a key={social.label} href={social.href} className="transition-colors hover:text-[#3198DA]">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#6B6B6B]">Contact</p>
              <a href="mailto:hello@tenbitsolutions.com" className="mt-4 block text-sm text-[#6B6B6B] transition-colors hover:text-[#3198DA]">
                hello@tenbitsolutions.com
              </a>
              <p className="mt-2 text-sm text-[#6B6B6B]">© 2026 TenBit Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

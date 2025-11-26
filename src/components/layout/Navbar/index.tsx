"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Code2, Gamepad2, Globe2Icon, Home, LayoutDashboard, LogOut, Mail, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";

import LanguageSelector from "../LanguageSelector/LanguageSelector";

import { NavbarActions } from "./NavbarActions";
import { NavbarAuthButtons } from "./NavbarAuthButtons";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarCartAction } from "./NavbarCartAction";
import { NavbarIcon } from "./NavbarIcon";
import { NavbarMenu } from "./NavbarMenu";
import { NavbarMenuButtonAction } from "./NavbarMenuButtonAction";
import { NavbarMenuItem } from "./NavbarMenuItem";
import { NavbarRoot } from "./NavbarRoot";
import { NavbarUserAction } from "./NavbarUserAction";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const t = useTranslations("Navbar");

  const navigationLinks = [
    { label: t("navigation.home"), path: "/", icon: Home },
    { label: t("navigation.catalog"), path: "/catalog", icon: Gamepad2 },
    { label: t("navigation.developers"), path: "/developers", icon: Code2 },
    { label: t("navigation.contact"), path: "/contact", icon: Mail },
  ];

  return (
    <NavbarRoot>
      <div className="flex h-16 items-center justify-between">
        <NavbarBrand />

        <NavbarMenu variant="desktop">
          {navigationLinks.map((link) => (
            <NavbarMenuItem variant="desktop" key={link.path} href={link.path}>
              <NavbarIcon icon={link.icon} />

              {link.label}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarActions>
          <LanguageSelector>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-foreground hover:bg-accent/20 active:bg-accent/30 p-2"
            >
              <Globe2Icon className="size-5" />
            </Button>
          </LanguageSelector>

          <NavbarCartAction />

          {isLoggedIn ? <NavbarUserAction setIsLoggedIn={setIsLoggedIn} /> : <NavbarAuthButtons variant="desktop" />}

          <NavbarMenuButtonAction isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </NavbarActions>
      </div>

      {isMobileMenuOpen && (
        <NavbarMenu variant="mobile" open={isMobileMenuOpen} id="mobile-menu">
          {navigationLinks.map((link) => (
            <NavbarMenuItem
              variant="mobile"
              onClick={() => setIsMobileMenuOpen(false)}
              key={link.path}
              href={link.path}
            >
              <NavbarIcon className="mr-2" icon={link.icon} />

              {link.label}
            </NavbarMenuItem>
          ))}

          <div className="border-border border-t" />

          {isLoggedIn ? (
            <>
              <NavbarMenuItem variant="mobile" href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarIcon className="mr-2" icon={User} />
                {t("user_menu.my_profile")}
              </NavbarMenuItem>

              <NavbarMenuItem variant="mobile" href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarIcon className="mr-2" icon={LayoutDashboard} />
                {t("user_menu.dev_portal")}
              </NavbarMenuItem>

              <NavbarMenuItem variant="mobile" href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarIcon className="mr-2" icon={Settings} />
                {t("user_menu.settings")}
              </NavbarMenuItem>

              <Button
                variant={"destructive"}
                className="flex w-full items-center"
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="hover:text-primary-foreground mr-2 h-4 w-4" aria-hidden="true" />{" "}
                {t("user_menu.logout")}
              </Button>
            </>
          ) : (
            <NavbarAuthButtons variant="mobile" />
          )}
        </NavbarMenu>
      )}
    </NavbarRoot>
  );
}

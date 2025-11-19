"use client";

import { useState } from "react";
import { Code2, Gamepad2, Home, LayoutDashboard, LogOut, Mail, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";

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

  const navigationLinks = [
    { label: "Início", path: "/", icon: Home },
    { label: "Catálogo", path: "/catalog", icon: Gamepad2 },
    { label: "Desenvolvedores", path: "/developers", icon: Code2 },
    { label: "Contato", path: "/contact", icon: Mail },
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
              <NavbarMenuItem variant="mobile" href="/perfil" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarIcon className="mr-2" icon={User} />
                Meu Perfil
              </NavbarMenuItem>

              <NavbarMenuItem variant="mobile" href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarIcon className="mr-2" icon={LayoutDashboard} />
                Portal Dev
              </NavbarMenuItem>

              <NavbarMenuItem variant="mobile" href="/configuracoes" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarIcon className="mr-2" icon={Settings} />
                Configurações
              </NavbarMenuItem>

              <Button
                variant={"destructive"}
                className="flex w-full items-center"
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="hover:text-primary-foreground mr-2 h-4 w-4" aria-hidden="true" /> Sair
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

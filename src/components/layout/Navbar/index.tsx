"use client";

import { useState } from "react";
import { LuLayoutDashboard, LuLogOut, LuSettings, LuUser } from "react-icons/lu";

import { Button } from "@/components/ui/button";

import { NavbarActions } from "./NavbarActions";
import { NavbarAuthButtons } from "./NavbarAuthButtons";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarCartAction } from "./NavbarCartAction";
import { NavbarMenu } from "./NavbarMenu";
import { NavbarMenuButtonAction } from "./NavbarMenuButtonAction";
import { NavbarMenuItem } from "./NavbarMenuItem";
import { NavbarRoot } from "./NavbarRoot";
import { NavbarUserAction } from "./NavbarUserAction";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigationLinks = [
    { label: "Início", path: "/" },
    { label: "Catálogo", path: "/catalogo" },
    { label: "Desenvolvedores", path: "/desenvolvedores" },
    { label: "Contato", path: "/contato" },
  ];

  return (
    <NavbarRoot>
      <div className="flex h-16 items-center justify-between">
        <NavbarBrand />

        <NavbarMenu variant="desktop">
          {navigationLinks.map((link) => (
            <NavbarMenuItem variant="desktop" key={link.path} href={link.path}>
              {link.label}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarActions>
          <NavbarCartAction cartItemsCount={5} />

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
              {link.label}
            </NavbarMenuItem>
          ))}

          <div className="border-border border-t" />

          {isLoggedIn ? (
            <>
              <NavbarMenuItem variant="mobile" href="/perfil" onClick={() => setIsMobileMenuOpen(false)}>
                <LuUser className="hover:text-primary-foreground mr-2 h-4 w-4" aria-hidden="true" />
                Meu Perfil
              </NavbarMenuItem>

              <NavbarMenuItem variant="mobile" href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <LuLayoutDashboard className="hover:text-primary-foreground mr-2 h-4 w-4" aria-hidden="true" />
                Portal Dev
              </NavbarMenuItem>

              <NavbarMenuItem variant="mobile" href="/configuracoes" onClick={() => setIsMobileMenuOpen(false)}>
                <LuSettings className="hover:text-primary-foreground mr-2 h-4 w-4" aria-hidden="true" />
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
                <LuLogOut className="hover:text-primary-foreground mr-2 h-4 w-4" aria-hidden="true" /> Sair
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

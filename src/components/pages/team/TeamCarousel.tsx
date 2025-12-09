"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTeam } from "@/context/TeamContext";
import { cn } from "@/lib/utils/shadcn";
import { MemberData } from "@/lib/utils/team.utils";

export function TeamCarousel({ team }: { team: MemberData[] }) {
  const t = useTranslations("Team");
  const scrollReference = useRef<HTMLDivElement>(null);
  const { selected, setSelected } = useTeam();

  useEffect(() => {
    if (scrollReference.current) scrollReference.current.scrollIntoView({ behavior: "smooth" });
    console.log(scrollReference.current);
  }, [selected]);

  const handleInputSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(parseInt(event.target.value));
  };

  return (
    <div className="rounded-lg bg-black/20 px-16 inset-shadow-sm inset-shadow-black/50">
      <div className="hidden">
        {team.map((member, index) => (
          <input
            key={index}
            type="radio"
            id={`checkbox-${member.name}`}
            name="checkbox-tab"
            value={index}
            onChange={handleInputSelection}
          />
        ))}
      </div>
      <Carousel>
        <CarouselContent className="px-0 pb-10 md:px-10">
          {team.map((member, index) => (
            <CarouselItem key={index} className="w-48 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <label
                htmlFor={`checkbox-${member.name}`}
                className={cn(
                  "hover:drop-shadow-accent/50 flex scale-85 drop-shadow-lg drop-shadow-transparent grayscale-25 transition-all hover:scale-80 hover:cursor-pointer",
                  selected === index &&
                    "drop-shadow-accent hover:drop-shadow-accent scale-95 grayscale-0 hover:scale-95",
                )}
              >
                <div className="relative z-0 mx-auto">
                  <Image
                    src={`/images/ludus/team/member/${member.src}.png`}
                    alt={member.alt}
                    width={295}
                    height={497}
                    className="px-6 pt-6"
                  />
                  <div className="absolute top-0 left-0 z-5">
                    <div className="relative">
                      <div className="absolute top-0 right-0 bottom-0 left-0 -z-1 mx-4 my-12 bg-linear-to-t from-black via-black via-45% to-transparent to-60%"></div>
                      <Image src={"/images/ludus/team/portrait.png"} alt={member.alt} width={295} height={497} />
                      <div className="absolute bottom-1/7 left-1/2 z-10 -translate-x-1/2 -translate-y-full text-center text-nowrap md:bottom-1/5">
                        <h3 className="text-lg font-bold">{member.name}</h3>
                        <p className="text-accent text-sm">
                          {member.roles.map((role, index) => (
                            <>
                              {index > 0 && (
                                <>
                                  <br className="md:hidden" />

                                  <span className="hidden md:inline"> / </span>
                                </>
                              )}
                              <span key={`roles-${index}`}>{t(`roles.${role}`)}</span>
                            </>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
      <div ref={scrollReference} />
    </div>
  );
}

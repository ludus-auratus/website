"use client";
import { useState } from "react";

import { JSONEditor } from "@/components/editor/json/JSONEditor";
import { Game } from "@/lib/game";
import { uploadGameData } from "@/lib/game/game.upload";

export default function Page() {
  const [dto, setDto] = useState<Game>({
    id: 0,
    name: "",
    price: 0,
    tags: {
      genders: [],
      features: [],
      accessibility: [],
      platforms: [],
    },
    classification: {
      key: "c0",
      value: 0,
      src: "",
      alt: "",
      title: "",
      description: "",
    },
    studio: "",
    publisher: "",
    supportedLanguages: [{ name: "Português (Brasil)", interface: true, audio: true, subtitles: true }],
    icon: "",
    banner: "",
    gallery: [],
    description: "",
    releaseDate: new Date(),
    publishingDate: new Date(),
    rating: 0,
    version: "1.0.0",
    developerId: 0,
    socialMedia: [],
    additionalInfo: "",
    statistics: {
      revenue: 0,
      downloads: 0,
      views: 0,
    },
  });

  return (
    <JSONEditor
      object={dto}
      update={setDto}
      extension="json"
      exporter={(filename, object) => {
        uploadGameData(filename.replace(".json", ""), object);
        alert("Game uploaded!");
      }}
    />
  );
}

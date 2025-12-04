"use client";
import { useState } from "react";

import { JSONEditor } from "@/components/editor/json/JSONEditor";
import { GameDTO, uploadGameData } from "@/lib/game";

export default function Page() {
  const [dto, setDto] = useState<GameDTO>({
    id: 0,
    name: "",
    price: 0,
    tags: [],
    classification: 0,
    studio: {
      name: "",
    },
    publisher: {
      name: "",
    },
    supportedLanguages: [{ name: "Português (Brasil)", level: 3 }],
    icon: "",
    banner: "",
    gallery: [],
    description: "",
    releaseDate: new Date(),
    publishingDate: new Date(),
    rating: 0,
    additional: [],
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

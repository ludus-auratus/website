import { forwardRef, useImperativeHandle, useRef } from "react";
import { Video } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TrailerUploadProps {
  url: string;
  title: string;
  onUrlChange: (url: string) => void;
  onTitleChange: (title: string) => void;
  urlError?: string;
  titleError?: string;
}

export interface TrailerUploadHandle {
  focus: () => void;
}

export const TrailerUpload = forwardRef<TrailerUploadHandle, TrailerUploadProps>(
  ({ url, title, onUrlChange, onTitleChange, urlError, titleError }: TrailerUploadProps, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    // Extrair ID do YouTube da URL
    const getYouTubeId = (url: string): string | null => {
      if (!url) return null;

      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }

      return null;
    };

    const youtubeId = getYouTubeId(url);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Video className="text-primary h-5 w-5" />
          <Label>Trailer do Jogo</Label>
        </div>

        <div className={`grid grid-cols-1 gap-4 ${youtubeId ? "md:grid-cols-2" : ""}`}>
          <div className="space-y-2">
            <Label htmlFor="trailerUrl">URL do YouTube</Label>

            <Input
              ref={inputRef}
              id="trailerUrl"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              aria-invalid={!!urlError}
              onChange={(e) => onUrlChange(e.target.value)}
            />

            {urlError && <p className="text-destructive text-sm">{urlError}</p>}
          </div>

          {youtubeId && (
            <div className="space-y-2">
              <Label htmlFor="trailerTitle">Título do Trailer</Label>

              <Input
                id="trailerTitle"
                placeholder="Ex: Trailer Oficial"
                value={title}
                aria-invalid={!!titleError}
                onChange={(e) => onTitleChange(e.target.value)}
              />

              {titleError && <p className="text-destructive text-sm">{titleError}</p>}
            </div>
          )}
        </div>

        {youtubeId ? (
          <Card className="bg-muted/30 border-border rounded-2xl p-4">
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            {title && <p className="text-muted-foreground mt-2 text-center text-sm">{title}</p>}
          </Card>
        ) : url ? (
          <Card className="bg-muted/30 border-border rounded-2xl p-4">
            <div className="bg-muted flex aspect-video items-center justify-center overflow-hidden rounded-xl">
              <div className="text-center">
                <Video className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
                <p className="text-muted-foreground text-sm">URL inválida. Use um link do YouTube.</p>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    );
  },
);

TrailerUpload.displayName = "TrailerUpload";

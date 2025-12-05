import { getTranslations } from "next-intl/server";
import { TrendingUp } from "lucide-react";

import { QuickGameDashboard } from "@/lib/dev/dashboard";

import { DevModalButton } from "./DevModalButton";
import { DevModalHeader } from "./DevModalHeader";
import { DevModalItem } from "./DevModalItem";
import { DevModalSection } from "./DevModalSection";
import { DevModalSectionContent } from "./DevModalSectionContent";
import { DevModalSectionTitle } from "./DevModalSectionTitle";

export async function DevDetailsModal({ game }: { game: QuickGameDashboard }) {
  const t = await getTranslations({ locale: "pt-BR", namespace: "DevDashboard" });

  // @TODO: Trocar para quantidade de vendas
  const sales = game.downloads;

  return (
    <DevModalButton icon={TrendingUp} text="Detalhes">
      <DevModalHeader title={"Detalhes de Publicação"} />

      <div className="space-y-4">
        <DevModalSection>
          <DevModalSectionTitle text="Publicação" />

          <DevModalSectionContent>
            <DevModalItem title="Estado" content={t(`game_status.${game.status}`)} className="col-span-2" />

            {/* @TODO: Mudar de publishedDate para releaseDate */}
            <DevModalItem
              title="Data de Postagem"
              content={game.publishedDate?.toISOString().split("T")[0] ?? "-"}
              tooltip="Dia em que o jogo foi colocado na plataforma, não disponibilizado na loja"
            />

            <DevModalItem
              title="Data de Lançamento"
              content={game.publishedDate?.toISOString().split("T")[0] ?? "-"}
              tooltip="Dia em que o jogo foi disponibilizado para o público através da página na loja"
            />
          </DevModalSectionContent>
        </DevModalSection>

        <DevModalSection>
          <DevModalSectionTitle text="Última Atualização" />

          <DevModalSectionContent>
            <DevModalItem title="Versão" content={game.version ?? "0.0.0"} />

            <DevModalItem title="Data" content={game.lastUpdate?.toISOString().split("T")[0]} />
          </DevModalSectionContent>
        </DevModalSection>

        <DevModalSection>
          <DevModalSectionTitle text="Receita" />

          <DevModalSectionContent>
            <DevModalItem
              title="Total Bruto"
              content={game.revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            />

            <DevModalItem
              title="Total Líquido"
              content={(game.revenue * 0.82).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              tooltip="É liquidado a comissão de 8% da plataforma"
            />

            <DevModalItem
              title="Preço Unitário"
              content={(game.revenue / sales).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              className="col-span-2"
            />

            <DevModalItem title="Total de Vendas" content={sales ?? 0} />

            <DevModalItem title="Total de Downloads" content={game.downloads ?? 0} />
          </DevModalSectionContent>
        </DevModalSection>

        <DevModalSection>
          <DevModalSectionTitle text="Avaliação" />

          <DevModalSectionContent>
            <DevModalItem title="Visualizações" content={game.views ?? 0} />

            <DevModalItem title="Comentários" content={game.reviews ?? 0} />

            <DevModalItem title="Nota" content={game.rating ?? "-"} />
          </DevModalSectionContent>
        </DevModalSection>
      </div>
    </DevModalButton>
  );
}

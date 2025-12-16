import { TrendingUp } from "lucide-react";

import { DevDashboardGame } from "@/lib/dev/dashboard";

import { DevModalButton } from "./DevModalButton";
import { DevModalHeader } from "./DevModalHeader";
import { DevModalItem } from "./DevModalItem";
import { DevModalSection } from "./DevModalSection";
import { DevModalSectionContent } from "./DevModalSectionContent";
import { DevModalSectionTitle } from "./DevModalSectionTitle";

export function DevDetailsModal({ game }: { game: DevDashboardGame }) {
  const status = game.dataPublicacao ? "published" : "draft";
  const publishedDate = game.dataPublicacao ? new Date(game.dataPublicacao) : null;
  // Using dataLancamento as lastUpdate proxy or just generic date if available, else null
  const lastUpdate = game.dataLancamento ? new Date(game.dataLancamento) : null;

  // @TODO: Trocar para quantidade de vendas se houver campo especifico
  const sales = game.estatistica.quantidadeDownload;

  return (
    <DevModalButton icon={TrendingUp} text="Detalhes">
      <DevModalHeader title={"Detalhes de Publicação"} />

      <div className="space-y-4">
        <DevModalSection>
          <DevModalSectionTitle text="Publicação" />

          <DevModalSectionContent>
            <DevModalItem
              title="Estado"
              content={status === "published" ? "Publicado" : "Rascunho"}
              className="col-span-2"
            />

            {/* @TODO: Mudar de publishedDate para releaseDate */}
            <DevModalItem
              title="Data de Postagem"
              content={publishedDate?.toISOString().split("T")[0] ?? "-"}
              tooltip="Dia em que o jogo foi colocado na plataforma, não disponibilizado na loja"
            />

            <DevModalItem
              title="Data de Lançamento"
              content={publishedDate?.toISOString().split("T")[0] ?? "-"}
              tooltip="Dia em que o jogo foi disponibilizado para o público através da página na loja"
            />
          </DevModalSectionContent>
        </DevModalSection>

        <DevModalSection>
          <DevModalSectionTitle text="Última Atualização" />

          <DevModalSectionContent>
            <DevModalItem title="Versão" content={game.versao ?? "0.0.0"} />

            <DevModalItem title="Data" content={lastUpdate?.toISOString().split("T")[0]} />
          </DevModalSectionContent>
        </DevModalSection>

        <DevModalSection>
          <DevModalSectionTitle text="Receita" />

          <DevModalSectionContent>
            <DevModalItem
              title="Total Bruto"
              content={game.estatistica.receitaPublicacao.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            />

            <DevModalItem
              title="Total Líquido"
              content={(game.estatistica.receitaPublicacao * 0.82).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              tooltip="É liquidado a comissão de 8% da plataforma"
            />

            <DevModalItem
              title="Preço Unitário"
              content={(sales > 0 ? game.estatistica.receitaPublicacao / sales : 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              className="col-span-2"
            />

            <DevModalItem title="Total de Vendas" content={sales ?? 0} />

            <DevModalItem title="Total de Downloads" content={game.estatistica.quantidadeDownload ?? 0} />
          </DevModalSectionContent>
        </DevModalSection>

        <DevModalSection>
          <DevModalSectionTitle text="Avaliação" />

          <DevModalSectionContent>
            <DevModalItem title="Visualizações" content={game.estatistica.quantidadeVisualizacao ?? 0} />

            <DevModalItem title="Comentários" content={0} />

            <DevModalItem title="Nota" content={game.percentualAprovacao ?? "-"} />
          </DevModalSectionContent>
        </DevModalSection>
      </div>
    </DevModalButton>
  );
}

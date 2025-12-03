import { ArrowDown, ArrowUp, Calendar, DollarSign, Download, Eye, Users } from "lucide-react";

import { DevComponents } from "@/components/pages/dev";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DevAnalyticsPage() {
  // Mock data
  const revenueData = [
    { month: "Jul", revenue: 3200, downloads: 450 },
    { month: "Ago", revenue: 4100, downloads: 580 },
    { month: "Set", revenue: 5800, downloads: 720 },
    { month: "Out", revenue: 7200, downloads: 890 },
    { month: "Nov", revenue: 9500, downloads: 1150 },
    { month: "Dez", revenue: 12450, downloads: 1420 },
  ];

  const gamePerformance = [
    { name: "Folclore: A Lenda do Curupira", value: 8250, percentage: 66 },
    { name: "Cangaço Legends", value: 4200, percentage: 34 },
  ];

  const trafficSources = [
    { source: "Busca Orgânica", visits: 8500, color: "#71E256" },
    { source: "Redes Sociais", visits: 6200, color: "#E8B739" },
    { source: "Direto", visits: 4800, color: "#F07D2C" },
    { source: "Referências", visits: 3200, color: "#548443" },
    { source: "Outros", visits: 1831, color: "#1D3728" },
  ];

  const demographicsData = [
    { age: "13-17", players: 450 },
    { age: "18-24", players: 1200 },
    { age: "25-34", players: 890 },
    { age: "35-44", players: 320 },
    { age: "45+", players: 180 },
  ];

  const stats = [
    {
      icon: DollarSign,
      label: "Receita Total",
      value: "R$ 42.200,00",
      change: "+156%",
      trend: "up",
      period: "Últimos 6 meses",
    },
    {
      icon: Download,
      label: "Total de Downloads",
      value: "5.210",
      change: "+215%",
      trend: "up",
      period: "Últimos 6 meses",
    },
    {
      icon: Eye,
      label: "Visualizações",
      value: "98.450",
      change: "+89%",
      trend: "up",
      period: "Últimos 30 dias",
    },
    {
      icon: Users,
      label: "Taxa de Conversão",
      value: "5.3%",
      change: "+0.8%",
      trend: "up",
      period: "Últimos 30 dias",
    },
  ];

  const topCountries = [
    { country: "🇧🇷 Brasil", players: 2100, percentage: 82 },
    { country: "🇵🇹 Portugal", players: 280, percentage: 11 },
    { country: "🇦🇷 Argentina", players: 95, percentage: 4 },
    { country: "🇺🇸 Estados Unidos", players: 48, percentage: 2 },
    { country: "🌍 Outros", players: 33, percentage: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-foreground font-ludus-pixelify-sans mb-2 text-3xl">Analytics & Métricas</h1>
        <p className="text-muted-foreground">Acompanhe o desempenho dos seus jogos em tempo real</p>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <Tabs defaultValue="30d">
          <TabsList>
            <TabsTrigger value="7d">7 dias</TabsTrigger>
            <TabsTrigger value="30d">30 dias</TabsTrigger>
            <TabsTrigger value="90d">90 dias</TabsTrigger>
            <TabsTrigger value="1y">1 ano</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por jogo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Jogos</SelectItem>
            <SelectItem value="folclore">Folclore: A Lenda do Curupira</SelectItem>
            <SelectItem value="cangaco">Cangaço Legends</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-border border-2 p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-accent h-6 w-6" />
                </div>
                <Badge
                  variant="secondary"
                  className={`${
                    stat.trend === "up"
                      ? "border-green-500/20 bg-green-500/10 text-green-500"
                      : "border-red-500/20 bg-red-500/10 text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 text-sm">{stat.label}</p>
                <p className="text-foreground font-ludus-pixelify-sans mb-1 text-2xl">{stat.value}</p>
                <p className="text-muted-foreground text-xs">{stat.period}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Revenue & Downloads Chart */}
      <Card className="border-border border-2 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-foreground font-ludus-pixelify-sans mb-1 text-xl">Receita & Downloads</h3>
            <p className="text-muted-foreground text-sm">Evolução nos últimos 6 meses</p>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        {/* <ResponsiveContainer width="100%" height={350}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(113, 226, 86, 0.1)" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
            <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#71E256"
              strokeWidth={3}
              name="Receita (R$)"
              dot={{ fill: "#71E256", r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="downloads"
              stroke="#E8B739"
              strokeWidth={3}
              name="Downloads"
              dot={{ fill: "#E8B739", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer> */}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Game Performance */}
        <Card className="border-border border-2 p-6">
          <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Performance por Jogo</h3>

          <div className="space-y-4">
            {gamePerformance.map((game, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-sm">{game.name}</span>
                  <span className="text-accent font-medium">R$ {game.value.toLocaleString("pt-BR")}</span>
                </div>
                <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-accent h-full rounded-full transition-all duration-500"
                    style={{ width: `${game.percentage}%` }}
                  />
                </div>
                <p className="text-muted-foreground text-xs">{game.percentage}% do total</p>
              </div>
            ))}
          </div>

          <div className="border-border mt-6 border-t pt-6">
            <div className="flex items-center justify-between">
              <span className="text-foreground font-medium">Total</span>
              <span className="text-accent font-ludus-pixelify-sans text-xl">
                R$ {gamePerformance.reduce((sum, game) => sum + game.value, 0).toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card className="border-border border-2 p-6">
          <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Fontes de Tráfego</h3>

          {/* <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="visits"
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer> */}

          <div className="mt-4 space-y-3">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-foreground text-sm">{source.source}</span>
                </div>
                <span className="text-muted-foreground text-sm font-medium">
                  {source.visits.toLocaleString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Demographics */}
        <Card className="border-border border-2 p-6">
          <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Demografia de Jogadores</h3>

          {/* <ResponsiveContainer width="100%" height={250}>
            <BarChart data={demographicsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(113, 226, 86, 0.1)" />
              <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="players" fill="#71E256" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer> */}
        </Card>

        {/* Top Countries */}
        <Card className="border-border border-2 p-6">
          <h3 className="text-foreground font-ludus-pixelify-sans mb-6 text-xl">Principais Países</h3>

          <div className="space-y-4">
            {topCountries.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-sm">{item.country}</span>
                  <span className="text-accent font-medium">{item.players.toLocaleString("pt-BR")}</span>
                </div>
                <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-accent h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-border mt-6 border-t pt-6">
            <div className="flex items-center justify-between">
              <span className="text-foreground font-medium">Total de Jogadores</span>
              <span className="text-accent font-ludus-pixelify-sans text-xl">
                {topCountries.reduce((sum, item) => sum + item.players, 0).toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="border-accent from-accent/5 to-primary/5 border-2 bg-gradient-to-br p-6">
        <h3 className="text-foreground font-ludus-pixelify-sans mb-4 text-xl">💡 Principais Insights</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-background border-border rounded-xl border p-4">
            <p className="text-foreground mb-2 text-sm">
              <strong>Melhor dia para lançamento:</strong> Sexta-feira
            </p>
            <p className="text-muted-foreground text-xs">65% mais downloads quando lançado às sextas-feiras</p>
          </div>
          <div className="bg-background border-border rounded-xl border p-4">
            <p className="text-foreground mb-2 text-sm">
              <strong>Horário de pico:</strong> 20h - 23h
            </p>
            <p className="text-muted-foreground text-xs">Maior engajamento de jogadores nesse período</p>
          </div>
          <div className="bg-background border-border rounded-xl border p-4">
            <p className="text-foreground mb-2 text-sm">
              <strong>Taxa de retenção:</strong> 68% (7 dias)
            </p>
            <p className="text-muted-foreground text-xs">Acima da média de 45% da plataforma</p>
          </div>
          <div className="bg-background border-border rounded-xl border p-4">
            <p className="text-foreground mb-2 text-sm">
              <strong>Tempo médio de jogo:</strong> 2h 45min
            </p>
            <p className="text-muted-foreground text-xs">Indicador de alto engajamento</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

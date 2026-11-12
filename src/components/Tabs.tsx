import type { ReactNode } from "react";
import { TabItem, Tabs as TabsFlowbite } from "flowbite-react";
import { Check } from "./Check";
import { View } from "./View";
import { Phishing } from "./Phishing";

const pestañas = ["Generar", "Check", "Phishing"] as const;

type Pestaña = (typeof pestañas)[number];

// Contenido de cada pestaña, mapeado por su título.
const contenido: Record<Pestaña, ReactNode> = {
  Generar: <View />,
  Check: <Check />,
  Phishing: <Phishing />,
};

export default function Tabs() {
  return (
    <TabsFlowbite>
      {pestañas.map((titulo) => (
        <TabItem key={titulo} title={titulo}>
          {contenido[titulo]}
        </TabItem>
      ))}
    </TabsFlowbite>
  );
}

import { useState, type FormEvent } from "react";
import { Button, Card, Label, TextInput, Badge } from "flowbite-react";
import { apiUrl } from "../api.ts";

// Este endpoint está en la raíz de la API, no bajo el prefijo del router.
const URL = apiUrl("phishing/check", { router: false });

type DetallePhishing = {
  posicion: number;
  caracter: string;
  nombre: string;
  categoria: string;
  riesgo: string;
};

type PhishingResult = {
  nivel: string;
  sospechosos: number;
  total: number;
  detalles: DetallePhishing[];
};

// Verificamos la forma de la respuesta antes de guardarla en el estado,
// así un JSON inesperado nunca rompe el render.
function esPhishingResult(datos: unknown): datos is PhishingResult {
  if (typeof datos !== "object" || datos === null) return false;
  const d = datos as Partial<PhishingResult>;
  return (
    typeof d.nivel === "string" &&
    typeof d.sospechosos === "number" &&
    typeof d.total === "number" &&
    Array.isArray(d.detalles) &&
    d.detalles.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as DetallePhishing).posicion === "number" &&
        typeof (item as DetallePhishing).caracter === "string",
    )
  );
}

export default function Phishing() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<PhishingResult | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (resultado == "seguro") {
      return <Badge color="default">Seguro</Badge>;
    } else {
    }

    if (texto.trim() === "") {
      setError("Introduce una url para analizar");
      return;
    }

    setCargando(true);
    setError(null);

    try {
      // Configuramos la petición POST con fetch
      const respuesta = await fetch(URL, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json", // Indicamos que enviamos JSON
        },
        body: JSON.stringify({ text: texto }),
      });

      if (!respuesta.ok) {
        throw new Error(`La API respondió con status ${respuesta.status}`);
      }

      const datos: unknown = await respuesta.json();

      if (!esPhishingResult(datos)) {
        throw new Error("La API devolvió una respuesta con formato inesperado");
      }

      // Guardamos la respuesta de la API en el estado
      setResultado(datos);
    } catch (err) {
      console.error("Error en la petición POST de phishing:", err);
      setError(err instanceof Error ? err.message : "Error en la petición");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Card className="max-w-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="phishing-url">Chequeador de Phishing</Label>
          <TextInput
            id="phishing-url"
            type="text"
            value={texto}
            name="url"
            onChange={(event) => setTexto(event.target.value)}
            placeholder="Introduce la url"
            disabled={cargando}
          />
        </div>
        <Button type="submit" disabled={cargando}>
          {cargando ? "Analizando..." : "Analizar"}
        </Button>
      </form>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {resultado !== null ? (
        <div className="flex flex-col gap-2 text-sm text-gray-900 dark:text-white">
          <p>
            Caracteres analizados: {resultado.total} · sospechosos:{" "}
            {resultado.sospechosos}
          </p>
          {resultado.detalles.length > 0 ? (
            <ul className="list-disc pl-5">
              {resultado.detalles.map((detalle) => (
                <li key={`${detalle.posicion}-${detalle.caracter}`}>
                  <span className="font-mono">{detalle.caracter}</span>{" "}
                  (posición {detalle.posicion}) — {detalle.nombre} · riesgo{" "}
                  {detalle.riesgo}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}

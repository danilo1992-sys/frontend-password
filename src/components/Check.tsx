import { useState, type FormEvent } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { Tables, type CheckResult } from "./Table";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/router/check`;

// Verificamos la forma de la respuesta antes de guardarla en el estado,
// así un JSON inesperado nunca rompe el render.
function esCheckResult(datos: unknown): datos is CheckResult {
  if (typeof datos !== "object" || datos === null) return false;
  const d = datos as Partial<CheckResult>;
  return (
    typeof d.nivel === "string" &&
    typeof d.punctuation === "number" &&
    typeof d.detalles === "object" &&
    d.detalles !== null
  );
}
export const Check = () => {
  const [password, setPassword] = useState("");
  const [resultado, setResultado] = useState<CheckResult | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        body: JSON.stringify({
          password,
        }),
      });

      if (!respuesta.ok) {
        throw new Error(`La API respondió con status ${respuesta.status}`);
      }

      const datos: unknown = await respuesta.json();

      if (!esCheckResult(datos)) {
        throw new Error("La API devolvió una respuesta con formato inesperado");
      }

      // Guardamos la respuesta de la API en el estado
      setResultado(datos);
    } catch (err) {
      console.error("Error en la petición POST:", err);
      setError(err instanceof Error ? err.message : "Error en la petición");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Card className="max-w-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="check-password">Comprobar contraseña</Label>
          <TextInput
            id="check-password"
            type="text"
            value={password}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Introduce una contraseña"
            disabled={cargando}
          />
        </div>
        <Button type="submit" disabled={cargando}>
          {cargando ? "Comprobando..." : "Comprobar"}
        </Button>
      </form>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {resultado !== null ? (
        <>
          <Tables resultado={resultado} />
        </>
      ) : null}
    </Card>
  );
};

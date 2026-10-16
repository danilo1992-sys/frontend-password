import { Button, Card, Spinner } from "flowbite-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { usePassword } from "../store";

const MIN_LENGTH = 8;
const MAX_LENGTH = 256;

export function View() {
  const { password, loading, error, fetchPassword } = usePassword();
  const [length, setLength] = useState("8");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = Math.min(
      MAX_LENGTH,
      Math.max(MIN_LENGTH, Number(length) || MIN_LENGTH),
    );
    void fetchPassword(target);
  };

  return (
    <Card className="max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-xs flex-col items-center justify-center gap-4"
      >
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Longitud
          <input
            type="number"
            value={length}
            onChange={handleChange}
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            disabled={loading}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <Button type="submit" disabled={loading} fullSized>
          {loading ? <Spinner size="sm" aria-label="Generando" /> : null}
          {loading ? "Generando..." : "Generar password"}
        </Button>
      </form>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      <div>
        <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Password
        </p>
        <p className="rounded-lg bg-gray-50 p-3 font-mono break-all text-gray-900 dark:bg-gray-800 dark:text-white">
          {password || "—"}
        </p>
      </div>
    </Card>
  );
}

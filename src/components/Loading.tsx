import { Button, Spinner } from "flowbite-react";

export function Loading() {
  return (
    <div className="flex flex-row gap-3">
      <Button color="alternative">
        <Spinner size="sm" />
        <span className="pl-3">Cargando...</span>
      </Button>
    </div>
  );
}

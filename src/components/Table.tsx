import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export type CheckResult = {
  nivel: string;
  punctuation: number;
  detalles: {
    longitud_minima: boolean;
    mayuscula: boolean;
    minuscula: boolean;
    numero: boolean;
    especial: boolean;
  };
};

const FILAS: Array<{ etiqueta: string; valor: keyof CheckResult["detalles"] }> =
  [
    { etiqueta: "Longitud mínima", valor: "longitud_minima" },
    { etiqueta: "Mayúsculas", valor: "mayuscula" },
    { etiqueta: "Minúsculas", valor: "minuscula" },
    { etiqueta: "Números", valor: "numero" },
    { etiqueta: "Caracteres especiales", valor: "especial" },
  ];

export function Tables({ resultado }: { resultado: CheckResult }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Detalles</TableHeadCell>
            <TableHeadCell>Valor</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow>
            <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
              Nivel
            </TableCell>
            <TableCell>{resultado.nivel}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
              Puntuación
            </TableCell>
            <TableCell>{resultado.punctuation}</TableCell>
          </TableRow>
          {FILAS.map(({ etiqueta, valor }) => (
            <TableRow key={valor}>
              <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                {etiqueta}
              </TableCell>
              <TableCell>{resultado.detalles[valor] ? "Sí" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

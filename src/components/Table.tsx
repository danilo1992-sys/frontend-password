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

export type DetallePhishing = {
  posicion: number;
  caracter: string;
  nombre: string;
  categoria: string;
  riesgo: string;
};

export type PhishingResult = {
  nivel: string;
  sospechosos: number;
  total: number;
  detalles: DetallePhishing[];
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

export function PhishingTable({ resultado }: { resultado: PhishingResult }) {
  return (
    <div className="flex flex-col gap-3">
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
                Caracteres analizados
              </TableCell>
              <TableCell>{resultado.total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                Sospechosos
              </TableCell>
              <TableCell>{resultado.sospechosos}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {resultado.detalles.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Posición</TableHeadCell>
                <TableHeadCell>Carácter</TableHeadCell>
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Categoría</TableHeadCell>
                <TableHeadCell>Riesgo</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {resultado.detalles.map((detalle) => (
                <TableRow key={`${detalle.posicion}-${detalle.caracter}`}>
                  <TableCell>{detalle.posicion}</TableCell>
                  <TableCell className="font-mono">
                    {detalle.caracter}
                  </TableCell>
                  <TableCell>{detalle.nombre}</TableCell>
                  <TableCell>{detalle.categoria}</TableCell>
                  <TableCell>{detalle.riesgo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}

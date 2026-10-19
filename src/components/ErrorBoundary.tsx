import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error renderizando la UI:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="max-w-sm rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300 py-12">
          <p className="font-medium">Algo falló al mostrar los resultados</p>
          <p className="mt-1 text-sm break-words">{this.state.error.message}</p>
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="mt-3 rounded-lg border border-red-300 px-3 py-1 text-sm hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

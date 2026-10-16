import { DarkThemeToggle } from "flowbite-react";
import { View } from "./components/View.tsx";
import { Check } from "./components/Check.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import Footers from "./components/Footer.tsx";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>
      <ErrorBoundary>
        <View />
        <div className="pt-6">
          <Check />
        </div>
      </ErrorBoundary>
      <div className="mt-12">
        <Footers />
      </div>
    </main>
  );
}

import { DarkThemeToggle } from "flowbite-react";
import { View } from "./components/View.tsx";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>
      <View />
    </main>
  );
}

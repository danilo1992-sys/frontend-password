import { DarkThemeToggle } from "flowbite-react";
import Footers from "./components/Footer.tsx";
import Tabs from "./components/Tabs.tsx";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>
      <Tabs />
      <div className="w-full pt-12">
        <Footers />
      </div>
    </main>
  );
}

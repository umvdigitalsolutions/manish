// Backup of the original app/page.js before isolation test
// If needed, restore this file by renaming back to page.js

import Hero from "./components/Hero";
import SectionHeading from "./components/SectionHeading";
import Card from "./components/Card";
import Badge from "./components/Badge";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="relative flex flex-1 flex-col">
        <Hero />
      </main>
    </div>
  );
}

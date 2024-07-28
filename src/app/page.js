import { getHomePageData } from "@/data/loaders";
import { FeatureSection } from "@/components/custom/FeaturesSection";
import { HeroSection } from "@/components/custom/HeroSection";

function blockRenderer(block) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function Home() {
  //try {
  const strapiData = await getHomePageData();

  // Log the data to inspect its structure
  console.log("Fetched Data:", strapiData);

  // if (!strapiData || !strapiData.blocks || strapiData.blocks.length === 0) {
  //   return (
  //     <main className="container mx-auto py-6">
  //       <h1 className="text-5xl font-bold">Error loading data</h1>
  //     </main>
  //   );
  // }

  const { blocks } = strapiData;

  return (
    <main>
      {blocks.map(blockRenderer)}
    </main>
  );
  // } catch (error) {
  //   console.error("Error in Home component:", error);
  //   return (
  //     <main className="container mx-auto py-6">
  //       <h1 className="text-5xl font-bold">Error loading data</h1>
  //     </main>
  //   );
  // }
}

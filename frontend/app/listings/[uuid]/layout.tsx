import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { Metadata } from "next";

type Params = Promise<{ uuid: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { uuid } = await params;
  try {
    if (!uuid) {
      return {
        title: "Property Listing - PropertyVista",
        description: "View property details on PropertyVista",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/listings/${uuid}`,
      {
        next: { revalidate: 3600 },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        title: "Listing Not Found - PropertyVista",
        description: "The requested property listing could not be found.",
      };
    }

    const listing = await response.json();
    const price = new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
    }).format(listing.price);

    const title = `${capitalizeFirstLetter(
      listing.constructionType as string
    )} for ${
      listing.type === "buy" ? "Sale" : "Rent"
    } - ${price} - PropertyVista`;
    const description = `${listing.numberOfBedrooms} bed, ${
      listing.numberOfBathrooms
    } bath ${listing.constructionType} in ${listing.address}. ${
      listing.surfaceArea
    }m² - ${listing.description.slice(0, 100)}...`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: listing.images.map((img: string) => ({ url: img })),
      },
      twitter: {
        title,
        description,
        card: "summary_large_image",
        images: listing.images[0],
      },
    };
  } catch {
    return {
      title: "Property Listing - PropertyVista",
      description: "View property details on PropertyVista",
    };
  }
}

export default async function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

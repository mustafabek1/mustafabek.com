import { Slide } from "../animation/Slide";
import Image from "next/image";
import { Metadata } from "next";
import PageHeading from "@/app/components/shared/PageHeading";

const images = [
  {
    id: "1",
    src: "https://res.cloudinary.com/diqwbliye/image/upload/v1740989975/mustafa/istanbul_k.jpg",
  },
  {
    id: "2",
    src: "https://res.cloudinary.com/diqwbliye/image/upload/v1740989974/mustafa/galata.avif",
  },
  {
    id: "3",
    src: "https://res.cloudinary.com/diqwbliye/image/upload/v1740989630/mustafa/waterfall.jpg",
  },
];

export const metadata: Metadata = {
  title: "Photos | Mustafa Bek",
  metadataBase: new URL("https://mustafabek.com/photos"),
  description: "Explore photos taken by Mustafa Bek",
  openGraph: {
    title: "Photos | Mustafa Bek",
    url: "https://mustafabek.com/photos",
    description: "Explore photos taken by Mustafa Bek",
    images:
      "https://res.cloudinary.com/diqwbliye/image/upload/v1740988665/mustafa/photos.png",
  },
};

export default function Photos() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <PageHeading
        title="Photos"
        description="This page is still under construction..."
      />
      <figure className="my-6">
        <Slide delay={0.12} className="flex flex-wrap gap-2">
          {images.map((image) => (
            <Image
              key={image.id}
              src={image.src}
              alt="playing guitar"
              width={350}
              height={800}
              className="dark:bg-primary-bg bg-secondary-bg"
            />
          ))}
        </Slide>
      </figure>
    </main>
  );
}

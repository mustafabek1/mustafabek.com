import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getProjects } from "@/lib/sanity.query";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import PageHeading from "../components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Project | Mastafa Bek",
  metadataBase: new URL("https://mustafabek.com/projects"),
  description: "Explore projects built by Mastafa Bek",
  openGraph: {
    title: "Projects | Mastafa Bek",
    url: "https://mustafabek.com/projects",
    description: "Explore projects built by Mastafa Bek",
    images:
      "https://res.cloudinary.com/diqwbliye/image/upload/v1740988775/mustafa/projects.png",
  },
};

export default async function Project() {
  const projects= await getProjects();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Projects"
        description="a few of the projects I'm working on ."
      />

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
            {projects.map((project) => (
              <Link
              href={project.projectUrl ? project.projectUrl : `/projects/${project.slug}`}
              key={project._id}
              target={project.projectUrl ? "_blank" : "_self"} // Eğer harici link varsa yeni sekmede aç
              rel={project.projectUrl ? "noopener noreferrer" : undefined} // Güvenlik için rel ekle
              className="flex items-center gap-x-4 dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-4 rounded-lg"
            >
                {project.logo ? (
                  <Image
                    src={project.logo}
                    width={60}
                    height={60}
                    alt={project.name}
                    className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-2"
                  />
                ) : (
                  <div className="dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-2 rounded-lg text-3xl">
                    🪴
                  </div>
                )}
                <div>
                  <h2 className="text-lg tracking-wide mb-1">{project.name}</h2>
                  <div className="text-sm dark:text-zinc-400 text-zinc-600">
                    {project.tagline}
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
    </main>
  );
}

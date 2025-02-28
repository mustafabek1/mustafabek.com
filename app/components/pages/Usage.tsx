import { PortableText } from "@portabletext/react";
import { getProfile } from "@/lib/sanity.query";
import { CustomPortableTextFavicon } from "../shared/CustomPortableTextFavicon";

export default async function Usage() {
  const profile = await getProfile();

  return (
    <section className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Usage</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Tools, technologies, and gadgets I use on a daily basis but not limited to.
        </p>

        <div className="mt-8">
          <h1 className="text-2xl mb-4 font-bold tracking-tight">Technologies:</h1>
          <ul>
              <li>React</li>
              <li>Next.js</li>
              <li>Angular</li>
              <li>Vue.js</li>
              <li>TypeScript</li>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>Css</li>
              <li>Scss</li>
              <li>Node.js</li>
              <li>Nest.js</li>
              <li>C#</li>
              <li>.Net</li>
              <li>postgresql</li>
              <li>mongodb</li>
              <li>docker</li>
            </ul>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl mb-4 font-bold tracking-tight">Tools:</h1>
          <ul>
              <li>Visual Studio Code</li>
              <li>Postman</li>
              <li>Firefox</li>
              <li>Google Chrome</li>
              <li>Figma</li>
              <li>Git Bash</li>
              <li>Rider</li>
            </ul>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl mb-4 font-bold tracking-tight">Platform:</h1>
          <ul>
              <li>Github</li>
              <li>Gitlab</li>
              <li>vercel</li>
              <li>AWS</li>
            </ul>
        </div>
      </div>
    </section>
  );
}

import { groq } from "next-sanity";
import { sanityFetch } from "./sanity.client";
import { JobType } from "@/types";

// Reusable post fields
const postField = groq`
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  description,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  featured,
  isPublished
`;

export const profileQuery = groq`*[_type == "profile"]{
  _id,
  fullName,
  headline,
  profileImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  shortBio,
  location,
  fullBio,
  email,
  "resumeURL": resumeURL.asset->url,
  socialLinks,
  usage
}`;

const mockProfile = {
  _id: "mock-profile",
  fullName: "MUSTAFA Bek",
  headline: "Software Engineer & Frontend Developer",
  profileImage: {
    image: "https://res.cloudinary.com/diqwbliye/image/upload/v1740732826/mustafa/xlfxgluj6txbdxfyfmnd.jpg",
    lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    alt: "Profile picture placeholder"
  },
  shortBio: "I'm Mastafa Bek, an experienced Software Engineer passionate about learning and building open-source software that is beneficial to developers and the world at large.",
  location: "istanbul, Turkey",
  fullBio: [
    {
      _type: "block",
      _key: "1", 
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "1-1",
          text: "After graduating from the Computer Engineering department of Sakarya University, I reinforced my theoretical knowledge through practical " +
                "application in my role as a Software Engineer at KAVAK TR. I focused on developing innovative solutions by working with current " +
                "technologies such as Angular, React, Next.js, Vue.js, Node.js, Jest, AWS, and Docker. " +
                "My aptitude for teamwork and my desire for continuous learning have always been the " +
                "fundamental elements that motivate me throughout my professional journey. By prioritizing the reusability and " +
                "efficiency of my applications and focusing on commercial objectives, I have made significant contributions to " +
                "software development processes.",
          marks: []
        }
      ]
    }
  ],

  email: "mustafa.bek1995@gmail.com",
  resumeURL: "https://drive.google.com/file/d/1wcrbWCvCZ1STC217jNHjwc8hus0UXUWS/view?usp=sharing",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/mustafabek1" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/mustafa-bek-97b453173/" },
  ],
  usage: [
    {
      
    }
  ]
};


export const getProfile = async () => {
  try {
    const profile = await sanityFetch({ query: profileQuery, tags: ["profile"] }) as typeof mockProfile[];
    return profile.length > 0 ? profile[0] : mockProfile; // Eğer boşsa mock datayı döndür
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return mockProfile;
  }
};

export const jobQuery = groq`*[_type == "job"] | order(_createdAt desc){
  _id,
  name,
  jobTitle,
  "logo": logo.asset->url,
  url,
  description,
  startDate,
  endDate,
}`;

export const mockJobQuery = [
  {
    _id: "1",
    name: "Kavak.com",
    jobTitle: "Software Engineer",
    logo: "https://res.cloudinary.com/diqwbliye/image/upload/v1740993513/mustafa/kavak_logo.png",
    url: "https://kavak.com/tr",
    description: "Developing AI models and applications. the technologies I use: Angular, React, Next.js, React Native, Argo, Npm, Nest.js, JavaScript, Jest, PostgreSQL, Agile, Node.js, Aws, Docker, OOP, Git,",
    startDate: "2021-06-10",
    endDate: "2025-02-01",
  },
  {
    _id: "2",
    name: "casemice Digital",
    jobTitle: "Frontend Developer",
    logo: "https://res.cloudinary.com/diqwbliye/image/upload/v1740993513/mustafa/caesemice_logo.jpg",
    url: "https://casemice.com/",
    description: "Building and optimizing web applications. the technologies I use: React, Next.js, React Native, Tailwind CSS, and TypeScript.",
    startDate: "2020-10-01",
    endDate: "2021-06-02",
  },
];

export const getJob = async () => {
  try {
    const profile = await sanityFetch({ query: jobQuery, tags: ["profile"] }) as JobType[];

    return profile.length > 0 ? profile : mockJobQuery; // Eğer boşsa mock datayı döndür
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return mockJobQuery; // Hata olursa mock datayı döndür
  }
};


export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc){
  _id, 
  name,
  "slug": slug.current,
  tagline,
  "logo": logo.asset->url,
}`;

export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  name,
  projectUrl,
  repository,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  tagline,
  description
}`;

export const postsQuery = groq`*[_type == "Post"] | order(_createdAt desc){
  ${postField},
  date,
  "author": author-> {
    name, 
    photo, 
    twitterUrl
  },
  body,
}`;

export const featuredPostsQuery = groq`*[_type == "Post" && featured == true] | order(_createdAt desc) {
  ${postField}
}`;

export const singlePostQuery = groq`*[_type == "Post" && slug.current == $slug][0]{
  ${postField},
  _updatedAt,
  canonicalLink,
  date,
  tags,
  "author": author-> {
    name, 
    photo {
      "image": asset->url,
      alt
    }, 
    twitterUrl
  },
  body,
}`;

export const heroesQuery = groq`*[_type == "heroe"] | order(_createdAt asc) { _id, _createdAt, name, url, met }`;

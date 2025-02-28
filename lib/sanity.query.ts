import { groq } from "next-sanity";
import { sanityFetch } from "./sanity.client";

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
  headline: "Software Developer",
  profileImage: {
    image: "https://via.placeholder.com/150",
    lqip: "",
    alt: "Profile picture placeholder"
  },
  shortBio: "A passionate developer who loves to build amazing apps.",
  location: "San Francisco, CA",
  fullBio: "Experienced in Next.js, TypeScript, and Sanity.io. Always exploring new technologies.",
  email: "johndoe@example.com",
  resumeURL: "https://example.com/resume.pdf",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/mustafabek1" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/mustafa-bek-97b453173/" },
  ],
  usage: "Personal Portfolio"
};

export const getProfile = async () => {
  try {
    const profile = await sanityFetch({ query: profileQuery, tags: ["profile"] }) as typeof mockProfile[];
    return profile.length > 0 ? profile[0] : mockProfile; // Eğer boşsa mock datayı döndür
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return mockProfile; // Hata olursa yine mock datayı döndür
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

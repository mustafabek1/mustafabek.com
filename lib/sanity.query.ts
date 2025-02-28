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
    image: "https://res.cloudinary.com/diqwbliye/image/upload/v1740732826/mustafa/xlfxgluj6txbdxfyfmnd.jpg",
    lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    alt: "Profile picture placeholder"
  },
  shortBio: "A passionate developer who loves to build amazing apps.",
  location: "istanbul, Turkey",
  
  // ✅ Portable Text formatına uygun hale getirildi!
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
      technologies: [
        { name: 'React', description: 'UI Library' },
        { name: 'Next.js', description: 'React Framework' },
        { name: 'Redux', description: 'Production-grade State Management' },
        { name: 'Zustand', description: 'State Management (personal projects)' },
        { name: 'Sanity', description: 'Headless CMS' },
        { name: 'Tailwind CSS', description: 'Styling Library' },
        { name: 'TypeScript', description: 'Typed Superset of JavaScript' },
        { name: 'Sass', description: 'CSS Preprocessor' },
        { name: 'VitePress', description: 'Static Site Generator' },
        { name: 'Python', description: 'Programming Language' }
      ],
      tools: [
        { name: 'Visual Studio Code', description: 'Text Editor' },
        { name: 'PyCharm', description: 'Python IDE' },
        { name: 'IntelliJ Idea', description: 'Java IDE' },
        { name: 'Postman', description: 'API Testing' },
        { name: 'Hoppscotch', description: 'API Testing/Development' },
        { name: 'Firefox', description: 'Web Browser' },
        { name: 'Google Chrome', description: 'Web Browser' },
        { name: 'Figma', description: 'Design Tool' },
        { name: 'Microsoft Todo', description: 'Todo / Task Management' },
        { name: 'Git Bash', description: 'Git Terminal' },
        { name: 'Notion', description: 'Note taking and organization' }
      ],
      platforms: [
        { name: 'GitHub', description: 'Version control/hosting service' },
        { name: 'Spotify', description: 'Music Streaming' },
        { name: 'GitLab', description: 'Version control/hosting service' },
        { name: 'Steam', description: 'Gaming' },
        { name: 'Vercel', description: 'Hosting and Database' },
        { name: 'Netlify', description: 'Static JamStack hosting' }
      ],
      hardware: [
        { name: 'Asus Zephyrus M15', description: 'Work Laptop' },
        { name: 'Xiaomi G34WQi', description: '32" Curved Gaming Monitor' },
        { name: 'Samsung S22D300HY', description: '22" Business Monitor' },
        { name: 'Logitech MX Keys', description: 'Wireless Keyboard' },
        { name: 'Logitech MX Master 2S', description: 'Mouse' },
        { name: 'Bose Headphone 700', description: 'Bluetooth headphones (cheap version)' },
        { name: 'Fifne H9 Wired Headset', description: 'Gaming headset' },
        { name: 'Edifier R1200TII', description: 'Bookshelf Speakers' }
      ]
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

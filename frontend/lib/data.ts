export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  area: number;
  mainImage: string;
  galleryImages: string[];
  status: "For Sale" | "For Rent";
  type: "Villa" | "Penthouse" | "Apartment" | "Townhouse" | "Duplex";
  description: string;
  amenities: { icon: string; label: string }[];
  agent: { name: string; title: string; image: string };
  videoPreview: string;
}

const defaultGallery = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBXa5U74D-2B9KcQLYPE7gILqB5EJsAJ_HfDU3liK9CFj8myM416M4Lwpbto3Cm2IE3_6J9mKthndMfNL6jg72PeR7QE1oQ41MLjOAYu_OlmCy-6H00EYnFaqS0HsIHFlE5YyO8snhZ5ZVPGlWMNsuuDvEK7QUvs8oToV7U_7dgCRFsfdwQJXWrDiWtAfG2nzkgZ-TeUYR8qwGOWbBxBC9tlgeckTbOXFpwYSWXI5QXE2IBDxui_r6FGa4lJPbFxicM0tp72unjnc0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIZC6Cf6CdUlv_tuUF2ZKl2fMC_mKgvggdcNjBx8UkDAwaEe3-Y7Roxzsi5qaT3jG22_BwdJeVMGlxtkVlHNMI5q0D1FgkHnT0HFwTgQEeeigIobzovLykWPBPpQH5QwcgGihNcPsPgzQOip_Og0V3q65w2G9X6zFN5TjiR8s1sPWwqIJ2uevaZUpYZw1nRt5X5VskHssw2A2RdA_XJ1qABfQJqmOm_-5dVLkU84bMoZRTzys5joCQVRJDOySY-MmNDKv25dhRp9E",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCoxBdvhKFv5Bvb9o6WmAhPu-OPJ0QvG-GqS1F5JXsS3dpyuLpkxmQM1Gzy2maKIvR1iB9hV-J9LO5RQUPpKDjtYgjN1QqSWiOxHG5ZZJjXZ0kBxXPD3xjVrjHqdHs5f51DQvomgBdq5B0ot4svYmNeCC1zUL5vV7LEvs5MlCQgCLEhn3cKRYcqFP7ATausCaHLT0WRCY_xJdZmsWCVP9OV1rqbRzV4DyfBrenx9VubrNNHfntolfyYhvlAko00YyHA9Vpq1YCfwqA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAT8bV-CIAdoqs19CKNsIUqjcc7bEMJfOhW-pckmJ0kZlAcbnAEYnWSI3bjsg8H-ntQ3efp7HkR312rlDnszL0wv7cvZYQvLt8WDiWLL_5pPpohH0Mw5eGYgOjcm4FkAs1uu7_oxSaDHIITDtBqnwgDiQLFcNite_fXVqqBcxaI5cws3KpsyADR0bihl7RWAXJXJXmCj_haUSuBlt-a2f8xVAkj_dORzQeyEA9k4huKcVIMx96h0q4DONxoJ3aRmXGxti3YtOmCQ38"
];

const videoPreviewImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDXxL8oXRj2aqeriCJ6DeKXPPUzi5MWEjXZ_q422mEuJBt7P8RJBOCIaNioxQqyc1pqvSY7xOySARTdhZpTCva74u_iu3-VAM3EiYQ_DJoSRivw5mVpuNfzmZ1E1EYmDQay30ieN42K-3UuPMVdEsKhKvO5e2TZ6ZYqvDzrK0KdejQvCH2B7VefRfB31-wzKm4ieM1eFaU5yaBqccY7qOzeZTsKpBkYExT81A73eQScFyUF6m8Bt38xsITt854IZlpMWQACkiIV9pg";

const defaultAgent = {
  name: "Ahmed Al-Sayed",
  title: "Senior Luxury Specialist",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiuBuqAgqqEBf9R7JgvwkyYjK_y_9W79AiOWUpl9R1umIbTBF9W3Le10j7LITJmfDq2AH1SnoQCGLEHtnFRuIFkTp2bInNw0ZAeHehE1JJaL0ofDWapkkPZSw14OLFlhpmqCE4m3tZvnlnE_iIJQ2wuz5quT4Y4cUc1TF0-6FEu2wQsrYeCr5PX_zFa-Z2X0vPfPEKH0qC_42oyIMdd3TEmwev-yqeL9uGBVdUA8K8_20AUx8nDi8d6ZnLGX9ljzN1BAqGP3IO_ek"
};

const defaultAmenities = [
  { icon: "ac_unit", label: "Central AC" },
  { icon: "pool", label: "Infinity Pool" },
  { icon: "fitness_center", label: "Private Gym" },
  { icon: "local_parking", label: "Covered Parking" },
  { icon: "security", label: "24/7 Security" },
  { icon: "kitchen", label: "Smart Home" },
];

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Majestic Waterfront Villa",
    price: 12500000,
    location: "The Pearl-Qatar",
    beds: 6,
    baths: 7,
    area: 850,
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPvE1rx3-nl7VIFi8qQhwSu4CSNC5SYReJIkTPQrlH-FUhjBr5w312iIxHs-T7U0Dof6a-gfaijWvo-aXD1ca3UfrvYycq7wXQzwIgsGx9-PC8IwVS2uTpo3Gijb7TTFTAdB9Bq346BSAlDkos8Msh9yj2AorT4nWA5cNgD4mGi3mbOcSXNxGcyQ0_rcAA8eG8W6M503d09GG0YyPKyrkznBCHpoC1RkUCLozGIJWSbpGg674B9ClJJ6-t7nzFSG6iCNGcWzB9XV4",
    galleryImages: defaultGallery,
    status: "For Sale",
    type: "Villa",
    description: "Experience unparalleled luxury in this stunning contemporary villa located in the heart of The Pearl-Qatar. This property features an open-concept living area with floor-to-ceiling windows, a gourmet chef's kitchen, and a private infinity pool overlooking the Arabian Gulf. Designed with premium materials including Italian marble and artisanal wood finishes.",
    amenities: [...defaultAmenities, { icon: "deck", label: "Waterfront View" }, { icon: "theater_comedy", label: "Home Cinema" }],
    agent: defaultAgent,
    videoPreview: videoPreviewImg
  },
  {
    id: "2",
    title: "Luxury Sky Penthouse",
    price: 8200000,
    location: "West Bay, Doha",
    beds: 4,
    baths: 5,
    area: 420,
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL0tPeA96aP9ePSoiBsapc8xxDXj84dEujTa2GZl_d9nDg3SDNJTEp9hH5-F8N5yqn-BIOVbSjL9c4BhHerSH-wDum3FfZ_p5IEeNasCmgqEA4Ahmb6ucCyYd3D_LTpAc9-JPUmT_qwnC-0B4Kn8EStTpHz1oDMyE9BNkCCT2tKbORJxiljfXpTxsNr7IEbg3dfQ-jRqoJ9rZWNf8aJ-Ix-a_Tp9GGiahnswRwQZNN09kvpvDa07kgJ2RgG97W4WlWP9iUPzuYuJc",
    galleryImages: defaultGallery,
    status: "For Sale",
    type: "Penthouse",
    description: "High above the clouds in West Bay, this exquisite penthouse offers panoramic city and sea views. Features a private elevator, grand terrace, and bespoke interior design tailored for executive living.",
    amenities: [...defaultAmenities, { icon: "elevator", label: "Private Elevator" }, { icon: "hot_tub", label: "Jacuzzi" }],
    agent: { ...defaultAgent, name: "Fatima Hassan", title: "Penthouse Specialist" },
    videoPreview: videoPreviewImg
  },
  {
    id: "3",
    title: "Modern Lusail Villa",
    price: 5750000,
    location: "Lusail City",
    beds: 5,
    baths: 4,
    area: 380,
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLUXgO7Teht0CNEuQQJh9QkCQtDAClMp-25rhtt4QF65LexRUBygKO7B25jjkwNP2OkXeF-8CsG9jg7nNgL487nG93unSQw3z0hz1SA-ouG6GXg4x2PBoe229dXb6S_-RLbBpOlla_-6xZENbRsU4P_2Q2sz69zvsLHEAbqKAETP2_moAjnJIazdHts--nTt8U6hiLLTxFPOcvudS8eqJQQxaKnxvOm9xY8TRWgxp3vONaeXNC-wpoXcP0zykGKvHXJxW3JykfJE",
    galleryImages: defaultGallery,
    status: "For Rent",
    type: "Villa",
    description: "Located in the smart city of Lusail, this architectural marvel blends modern aesthetics with functional family living. Includes a private garden, smart climate control, and easy access to the marina.",
    amenities: [...defaultAmenities, { icon: "yard", label: "Private Garden" }],
    agent: defaultAgent,
    videoPreview: videoPreviewImg
  },
  {
    id: "4",
    title: "Executive Marina Apartment",
    price: 3100000,
    location: "Marina District, Lusail",
    beds: 3,
    baths: 3,
    area: 210,
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0zu5dn2uekbJH28e2_50UILw8dd3Eud_Q-LVsISysRLvYa11IrtS4Y0ADPjwQ8K0UGmHIj3MT1IJCzUSKASNEcS8DXlkE8XGzHdGIifbubwkeFAMFG9a5-UOWsboQfNaPMReIZwvBr_5NtXWjQaiGAXUTrQqXglI6KNBWM9fVf9_Gwp1IOgZg6m2fgCPvfqChEZrueKmjCl7TydWWsbzFoaS8OPwHre5Ulf39_XQhuDUOSwWMNzLDOu2vNy9ogzJy5xnitF_uXCk",
    galleryImages: defaultGallery,
    status: "For Sale",
    type: "Apartment",
    description: "A spacious and sophisticated apartment offering direct marina access and stunning water views. The building provides 5-star concierge services, an infinity pool, and a fully equipped wellness center.",
    amenities: [...defaultAmenities, { icon: "room_service", label: "Concierge" }],
    agent: { ...defaultAgent, name: "Tariq Ali", title: "Marina Property Expert" },
    videoPreview: videoPreviewImg
  },
  {
    id: "5",
    title: "Pearl Island Grand Villa",
    price: 9800000,
    location: "Costa Malaz, The Pearl",
    beds: 7,
    baths: 8,
    area: 620,
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwWI0KlldaDFgX5D0hhf46_YA2smrrANKi29_iLriiO1v30o21Ff73lZhKLolsA62E6xDCA8Kg6NZkFy51nkRWCf_7f_8pJCp7QRp_e5aLZi1y6bSwxIit9E_zw0eWgb_pvVSm2SbepVduaATTsAwMsQ04wbh5_nEmrF1BDNfLZxyd5sOwowQlp1T_L2yZ9z0euy9rpWWWMek2pAUjLofOJm5KGRfezIx6xf-k5Wp-2d-FeQVxgX0SjD3un2CXNSDY8x86OcRJWDk",
    galleryImages: defaultGallery,
    status: "For Sale",
    type: "Villa",
    description: "A masterpiece of classical architecture located in Costa Malaz. This grand villa features sprawling entertaining spaces, a private beach entrance, and lush manicured gardens fit for royalty.",
    amenities: [...defaultAmenities, { icon: "beach_access", label: "Private Beach" }, { icon: "deck", label: "Waterfront View" }],
    agent: defaultAgent,
    videoPreview: videoPreviewImg
  },
  {
    id: "6",
    title: "Luxury West Bay Duplex",
    price: 4200000,
    location: "West Bay Lagoon",
    beds: 4,
    baths: 4,
    area: 280,
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZNSpEW_4ie27jfK7TkG6Pg_koZavy63WWR_MzfG3yGOnudeffJqLW2Jn-qTIY2KzYdVzN1lLGjvt3qxX4PadSoURihHP89C-kW6PiE7aXGWGfLMFvcdApi8kV4ZH5jR8WA-Zi1XJMnNMjrdfuwwTsKbeb8dQ7kscg6ma5JtdicBr4_xYX4_XAIWa1SEg779dhK2WJvovKBgQAhB9efm9hU7tVX1MHjql0WhwBd0ZOE6-1wThJ3cUP390DhW4vv7Xs0kNK_jWm7DQ",
    galleryImages: defaultGallery,
    status: "For Rent",
    type: "Duplex",
    description: "A contemporary duplex in the prestigious West Bay Lagoon. Dual-level living with double-height ceilings, a private plunge pool, and lush surrounds offering tranquility in the city center.",
    amenities: [...defaultAmenities, { icon: "pool", label: "Plunge Pool" }],
    agent: defaultAgent,
    videoPreview: videoPreviewImg
  }
];

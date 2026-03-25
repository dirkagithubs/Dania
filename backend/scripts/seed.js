import { supabase } from "../lib/supabase.js";

const seedProperties = [
  {
    title: "Majestic Waterfront Villa",
    price: 12500000,
    location: "The Pearl-Qatar",
    beds: 6, baths: 7, area: 850,
    status: "For Sale", type: "Villa",
    description: "Experience unparalleled luxury in this stunning contemporary villa located in the heart of The Pearl-Qatar. This property features an open-concept living area with floor-to-ceiling windows, a gourmet chef's kitchen, and a private infinity pool overlooking the Arabian Gulf.",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPvE1rx3-nl7VIFi8qQhwSu4CSNC5SYReJIkTPQrlH-FUhjBr5w312iIxHs-T7U0Dof6a-gfaijWvo-aXD1ca3UfrvYycq7wXQzwIgsGx9-PC8IwVS2uTpo3Gijb7TTFTAdB9Bq346BSAlDkos8Msh9yj2AorT4nWA5cNgD4mGi3mbOcSXNxGcyQ0_rcAA8eG8W6M503d09GG0YyPKyrkznBCHpoC1RkUCLozGIJWSbpGg674B9ClJJ6-t7nzFSG6iCNGcWzB9XV4",
    amenities: [{ icon: "ac_unit", label: "Central AC" }, { icon: "pool", label: "Infinity Pool" }, { icon: "fitness_center", label: "Private Gym" }, { icon: "local_parking", label: "Covered Parking" }, { icon: "security", label: "24/7 Security" }, { icon: "kitchen", label: "Smart Home" }],
  },
  {
    title: "Luxury Sky Penthouse",
    price: 8200000,
    location: "West Bay, Doha",
    beds: 4, baths: 5, area: 420,
    status: "For Sale", type: "Penthouse",
    description: "High above the clouds in West Bay, this exquisite penthouse offers panoramic city and sea views. Features a private elevator, grand terrace, and bespoke interior design tailored for executive living.",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL0tPeA96aP9ePSoiBsapc8xxDXj84dEujTa2GZl_d9nDg3SDNJTEp9hH5-F8N5yqn-BIOVbSjL9c4BhHerSH-wDum3FfZ_p5IEeNasCmgqEA4Ahmb6ucCyYd3D_LTpAc9-JPUmT_qwnC-0B4Kn8EStTpHz1oDMyE9BNkCCT2tKbORJxiljfXpTxsNr7IEbg3dfQ-jRqoJ9rZWNf8aJ-Ix-a_Tp9GGiahnswRwQZNN09kvpvDa07kgJ2RgG97W4WlWP9iUPzuYuJc",
    amenities: [{ icon: "ac_unit", label: "Central AC" }, { icon: "pool", label: "Pool" }, { icon: "elevator", label: "Private Elevator" }, { icon: "hot_tub", label: "Jacuzzi" }],
  },
  {
    title: "Modern Lusail Villa",
    price: 5750000,
    location: "Lusail City",
    beds: 5, baths: 4, area: 380,
    status: "For Rent", type: "Villa",
    description: "Located in the smart city of Lusail, this architectural marvel blends modern aesthetics with functional family living. Includes a private garden, smart climate control, and easy access to the marina.",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLUXgO7Teht0CNEuQQJh9QkCQtDAClMp-25rhtt4QF65LexRUBygKO7B25jjkwNP2OkXeF-8CsG9jg7nNgL487nG93unSQw3z0hz1SA-ouG6GXg4x2PBoe229dXb6S_-RLbBpOlla_-6xZENbRsU4P_2Q2sz69zvsLHEAbqKAETP2_moAjnJIazdHts--nTt8U6hiLLTxFPOcvudS8eqJQQxaKnxvOm9xY8TRWgxp3vONaeXNC-wpoXcP0zykGKvHXJxW3JykfJE",
    amenities: [{ icon: "ac_unit", label: "Central AC" }, { icon: "pool", label: "Pool" }, { icon: "yard", label: "Private Garden" }, { icon: "security", label: "24/7 Security" }],
  },
  {
    title: "Executive Marina Apartment",
    price: 3100000,
    location: "Marina District, Lusail",
    beds: 3, baths: 3, area: 210,
    status: "For Sale", type: "Apartment",
    description: "A spacious and sophisticated apartment offering direct marina access and stunning water views. The building provides 5-star concierge services, an infinity pool, and a fully equipped wellness center.",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0zu5dn2uekbJH28e2_50UILw8dd3Eud_Q-LVsISysRLvYa11IrtS4Y0ADPjwQ8K0UGmHIj3MT1IJCzUSKASNEcS8DXlkE8XGzHdGIifbubwkeFAMFG9a5-UOWsboQfNaPMReIZwvBr_5NtXWjQaiGAXUTrQqXglI6KNBWM9fVf9_Gwp1IOgZg6m2fgCPvfqChEZrueKmjCl7TydWWsbzFoaS8OPwHre5Ulf39_XQhuDUOSwWMNzLDOu2vNy9ogzJy5xnitF_uXCk",
    amenities: [{ icon: "ac_unit", label: "Central AC" }, { icon: "pool", label: "Pool" }, { icon: "room_service", label: "Concierge" }],
  },
  {
    title: "Pearl Island Grand Villa",
    price: 9800000,
    location: "Costa Malaz, The Pearl",
    beds: 7, baths: 8, area: 620,
    status: "For Sale", type: "Villa",
    description: "A masterpiece of classical architecture located in Costa Malaz. This grand villa features sprawling entertaining spaces, a private beach entrance, and lush manicured gardens fit for royalty.",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwWI0KlldaDFgX5D0hhf46_YA2smrrANKi29_iLriiO1v30o21Ff73lZhKLolsA62E6xDCA8Kg6NZkFy51nkRWCf_7f_8pJCp7QRp_e5aLZi1y6bSwxIit9E_zw0eWgb_pvVSm2SbepVduaATTsAwMsQ04wbh5_nEmrF1BDNfLZxyd5sOwowQlp1T_L2yZ9z0euy9rpWWWMek2pAUjLofOJm5KGRfezIx6xf-k5Wp-2d-FeQVxgX0SjD3un2CXNSDY8x86OcRJWDk",
    amenities: [{ icon: "ac_unit", label: "Central AC" }, { icon: "pool", label: "Pool" }, { icon: "beach_access", label: "Private Beach" }],
  },
  {
    title: "Luxury West Bay Duplex",
    price: 4200000,
    location: "West Bay Lagoon",
    beds: 4, baths: 4, area: 280,
    status: "For Rent", type: "Duplex",
    description: "A contemporary duplex in the prestigious West Bay Lagoon. Dual-level living with double-height ceilings, a private plunge pool, and lush surrounds offering tranquility in the city center.",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZNSpEW_4ie27jfK7TkG6Pg_koZavy63WWR_MzfG3yGOnudeffJqLW2Jn-qTIY2KzYdVzN1lLGjvt3qxX4PadSoURihHP89C-kW6PiE7aXGWGfLMFvcdApi8kV4ZH5jR8WA-Zi1XJMnNMjrdfuwwTsKbeb8dQ7kscg6ma5JtdicBr4_xYX4_XAIWa1SEg779dhK2WJvovKBgQAhB9efm9hU7tVX1MHjql0WhwBd0ZOE6-1wThJ3cUP390DhW4vv7Xs0kNK_jWm7DQ",
    amenities: [{ icon: "ac_unit", label: "Central AC" }, { icon: "pool", label: "Plunge Pool" }],
  }
];

async function seed() {
  console.log("🌱 Seeding properties to Supabase...\n");

  for (const prop of seedProperties) {
    const { data, error } = await supabase
      .from("properties")
      .insert(prop)
      .select();

    if (error) {
      console.error(`  ❌ Failed to insert "${prop.title}":`, error.message);
    } else {
      console.log(`  ✅ ${prop.title} (${data[0].id})`);
    }
  }

  console.log("\n🎉 Seeding complete!");
}

seed();

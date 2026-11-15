export type ClientSocialPlatform = "Instagram" | "Facebook" | "TikTok";

export type ClientSocialLink = {
  platform: ClientSocialPlatform;
  href: string;
};

export type SocialMediaClient = {
  name: string;
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  description?: string;
  socialLinks: ClientSocialLink[];
};

export const socialMediaClients: SocialMediaClient[] = [
  {
    name: "Artistry by Shamaila",
    image: "/portfolio/clients/artistry-by-shamaila.png",
    imageAlt: "Artistry by Shamaila watercolor and gold logo",
    imageFit: "contain",
    socialLinks: [
      { platform: "Instagram", href: "https://www.instagram.com/artistryby_shumaila" },
      { platform: "TikTok", href: "https://www.tiktok.com/@artistryby_shumaila?lang=en" },
      { platform: "Facebook", href: "https://www.facebook.com/profile.php?id=61595774193025" },
    ],
  },
  {
    name: "9T9 Furniture & Interior Designing",
    image: "/portfolio/clients/9t9-furniture-interior.png",
    imageAlt: "Gold 9T9 Furniture logo on a black background",
    imageFit: "contain",
    socialLinks: [
      { platform: "Instagram", href: "https://www.instagram.com/9t9furniture.interiordesigning" },
      { platform: "TikTok", href: "https://www.tiktok.com/@9t9furniture.interior" },
      { platform: "Facebook", href: "https://www.facebook.com/profile.php?id=100064142400617" },
    ],
  },
  {
    name: "Chef Gulzar",
    socialLinks: [
      { platform: "Instagram", href: "https://www.instagram.com/chefgulzar?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw==" },
      { platform: "Facebook", href: "https://www.facebook.com/971507166046300?ref=PROFILE_EDIT_xav_ig_profile_page_web" },
    ],
  },
  {
    name: "demure.by.dr.naureen",
    socialLinks: [
      { platform: "Instagram", href: "https://www.instagram.com/demure.by.dr.naureen?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==" },
    ],
  },
  {
    name: "Optics",
    socialLinks: [
      { platform: "Instagram", href: "https://www.instagram.com/star_optical.co/?hl=en" },
      { platform: "Facebook", href: "https://www.facebook.com/profile.php?id=61592803474292" },
    ],
  },
  {
    name: "Karachi Hub",
    socialLinks: [],
  },
];




export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Course {
  name: string;
  duration: string;
  fees: string;
  eligibility: string;
  examsAccepted: string[];
}

export interface Institution {
  id: string;
  name: string;
  type: 'School' | 'Junior College' | 'Engineering College' | 'University';
  establishmentYear: number;
  location: {
    city: string;
    state: string;
    address: string;
    mapUrl: string;
  };
  affiliations: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
  courses: Course[];
  placements: {
    averagePackage: string;
    highestPackage: string;
    topRecruiters: string[];
  } | null;
  infrastructure: {
    library: boolean;
    hostel: boolean;
    labs: boolean;
    sportsComplex: boolean;
    cafeteria: boolean;
    wifi: boolean;
  };
  campusLife: string[];
  images: string[];
  rating: number;
  description: string;
  reviews?: Review[];
  naacGrade?: string;
  nirfRank?: string;
}

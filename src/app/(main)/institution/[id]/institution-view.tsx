
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  Library,
  University,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Briefcase,
  BookOpen,
  Building2,
  Users,
  Star,
  CheckCircle2,
  DollarSign,
  Clock,
  Heart,
  Navigation,
  GraduationCap,
  Award,
  BadgeCheck,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  GitCompareArrows,
  ChevronRight,
  Info,
  BookCopy,
  UserCheck,
  BarChart,
  Target,
  Trophy,
  GalleryHorizontal,
  ScrollText,
  Users2,
  Newspaper,
  Home,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import type { Institution, Course, Review } from '@/lib/types';
import { useHistory } from '@/hooks/use-history';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/use-favorites';
import { useComparison } from '@/hooks/use-comparison';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReviewsSection } from './reviews-section';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useInstitutions } from '@/hooks/use-institutions';


interface FeatureItemProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}

function FeatureItem({ icon: Icon, label, value }: FeatureItemProps) {
  if (!value) return null;
  return (
    <div className="flex items-start">
      <Icon className="mr-3 mt-1 h-5 w-5 shrink-0 text-primary" />
      <div>
        <p className="font-semibold">{label}</p>
        <div className="text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{course.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>Duration: {course.duration}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <DollarSign className="mr-2 h-4 w-4" />
          <span>Fees: {course.fees}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <GraduationCap className="mr-2 h-4 w-4" />
          <span>Eligibility: {course.eligibility}</span>
        </div>
        <div className="flex items-start text-muted-foreground">
          <BadgeCheck className="mr-2 mt-1 h-4 w-4 shrink-0" />
          <div>
            <span>Exams Accepted:</span>
            <div className="mt-1 flex flex-wrap gap-2">
                {course.examsAccepted.map(exam => <Badge key={exam} variant="secondary">{exam}</Badge>)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const tabItems = [
    { value: 'info', label: 'Info', icon: Info },
    { value: 'courses', label: 'Courses & Fees', icon: BookCopy },
    { value: 'reviews', label: 'Reviews', icon: MessageSquare },
    { value: 'placements', label: 'Placements', icon: Briefcase },
    { value: 'ranking', label: 'Ranking', icon: Trophy },
    { value: 'gallery', label: 'Gallery', icon: GalleryHorizontal },
    { value: 'scholarship', label: 'Scholarship', icon: GraduationCap },
    { value: 'faculty', label: 'Faculty', icon: Users2 },
    { value: 'news', label: 'News & Articles', icon: Newspaper },
    { value: 'hostel', label: 'Hostel', icon: Home },
    { value: 'compare', label: 'Compare', icon: GitCompareArrows },
];


export default function InstitutionView({ institutionId }: { institutionId: string }) {
  const { institutions, updateInstitution } = useInstitutions();
  const institution = useMemo(() => institutions.find(inst => inst.id === institutionId), [institutions, institutionId]);

  const { addToHistory } = useHistory();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInComparison, toggleComparison } = useComparison();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (institution) {
      addToHistory(institution.id);
    }
  }, [addToHistory, institution]);

  const handleAddReview = useCallback((newReview: Review) => {
    if (!institution) return;
    const updatedReviews = [newReview, ...(institution.reviews || [])];
    updateInstitution(institution.id, { reviews: updatedReviews });
  }, [institution, updateInstitution]);
  
  if (!institution) {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
            <AlertCircle className="w-16 h-16 text-destructive" />
            <h1 className="mt-4 text-2xl font-bold">Institution Not Found</h1>
            <p className="mt-2 text-muted-foreground">The institution you are looking for does not exist or may have been removed.</p>
            <Button asChild className="mt-6">
                <Link href="/search">Back to Search</Link>
            </Button>
        </div>
    );
  }

  const isFav = isFavorite(institution.id);
  const isComparing = isInComparison(institution.id);

  const socialMediaLinks = institution.socialMedia ? Object.entries(institution.socialMedia).filter(([_, url]) => url) : [];

  const socialIcons: { [key: string]: React.ElementType } = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    linkedin: Linkedin,
    youtube: Youtube,
  };


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
        {/* New Header Section */}
        <div className="w-full rounded-lg bg-card p-6 text-card-foreground shadow-md dark:bg-gray-800">
            <div className="flex flex-col items-start gap-6 md:flex-row">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border bg-background p-2">
                    <University className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold md:text-3xl">
                        {institution.name}: Fees, Admission, Courses, Cutoff, Ranking, Placement
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <MapPin className="mr-1.5 h-4 w-4" /> {institution.location.city}, {institution.location.state}
                        </div>
                        <div className="flex items-center">
                            <University className="mr-1.5 h-4 w-4" /> Autonomous University
                        </div>
                        <div className="flex items-center">
                            <Calendar className="mr-1.5 h-4 w-4" /> Estd {institution.establishmentYear}
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col items-start gap-3 md:w-auto md:items-end">
                    <div className="flex items-center gap-2">
                        <p className="text-3xl font-bold">{institution.rating.toFixed(1)}</p>
                        <div className="flex flex-col">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={cn("h-5 w-5", i < Math.round(institution.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground")} />
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">({institution.reviews?.length || 0} Reviews)</p>
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <Button variant="outline" className="w-full">Will You Get In</Button>
                        <Button variant="default" className="w-full">Get Contact Details</Button>
                    </div>
                </div>
            </div>
        </div>

        <Tabs defaultValue="info">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <TabsList className="inline-flex h-auto w-max p-2">
                    {tabItems.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                            <tab.icon className="h-4 w-4" /> {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                 <ScrollBar orientation="horizontal" />
            </ScrollArea>
           
            <TabsContent value="info" className="mt-4">
                 <Card>
                    <CardHeader><CardTitle>About {institution.name}</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-lg text-muted-foreground">{institution.description}</p>
                         <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                          <FeatureItem icon={MapPin} label="Location" value={`${institution.location.city}, ${institution.location.state}`} />
                          <FeatureItem icon={University} label="Affiliations" value={institution.affiliations.join(', ')} />
                          <FeatureItem icon={Phone} label="Phone" value={<a href={`tel:${institution.contact.phone}`} className="text-primary hover:underline">{institution.contact.phone}</a>} />
                          <FeatureItem icon={Mail} label="Email" value={<a href={`mailto:${institution.contact.email}`} className="text-primary hover:underline">{institution.contact.email}</a>} />
                          <FeatureItem icon={Globe} label="Website" value={<a href={institution.contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visit Website</a>} />
                          <FeatureItem icon={Award} label="NIRF Ranking" value={institution.nirfRank} />
                          <FeatureItem icon={BadgeCheck} label="NAAC Grade" value={institution.naacGrade} />
                        </div>
                    </CardContent>
                 </Card>

                 <Card className="mt-6">
                    <CardHeader><CardTitle>Campus Life & Events</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                            {institution.campusLife.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                 <Card className="mt-6">
                    <CardHeader><CardTitle>Facilities</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {Object.entries(institution.infrastructure).map(([key, value]) => value && (
                            <div key={key} className="flex items-center">
                                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                                <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="courses" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Programs & Courses</CardTitle></CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {institution.courses.map(course => (
                    <CourseCard key={course.name} course={course} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

             <TabsContent value="reviews" className="mt-4">
                <ReviewsSection 
                    reviews={institution.reviews || []} 
                    onAddReview={handleAddReview} 
                />
             </TabsContent>

            <TabsContent value="placements" className="mt-4">
              {institution.placements ? (
                <Card>
                  <CardHeader><CardTitle>Placement Details</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                     <FeatureItem icon={Briefcase} label="Average Package" value={institution.placements.averagePackage} />
                     <FeatureItem icon={Star} label="Highest Package" value={institution.placements.highestPackage} />
                     <FeatureItem icon={Building2} label="Top Recruiters" value={institution.placements.topRecruiters.join(', ')} />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                        No placement data available for this institution.
                    </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="gallery" className="mt-4">
                <Card>
                    <CardHeader><CardTitle>Gallery</CardTitle></CardHeader>
                    <CardContent>
                        <Carousel className="w-full">
                            <CarouselContent>
                            {institution.images.map((src, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="relative h-64 w-full">
                                    <Image
                                    src={src}
                                    alt={`${institution.name} campus image ${index + 1}`}
                                    fill
                                    className="rounded-lg object-cover"
                                    data-ai-hint="campus building"
                                    />
                                </div>
                                </CarouselItem>
                            ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </Carousel>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="hostel" className="mt-4">
                <Card>
                    <CardHeader><CardTitle>Hostel & Location</CardTitle></CardHeader>
                    <CardContent className='flex flex-col items-center justify-center text-center'>
                        <MapPin className="h-16 w-16 text-primary" />
                        <p className="mt-4 max-w-md text-muted-foreground">
                            {institution.location.address}
                        </p>
                        <Button asChild className="mt-6">
                            <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(institution.location.address)}`} target="_blank" rel="noopener noreferrer">
                                <Navigation className="mr-2 h-4 w-4" />
                                Open in Google Maps
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
            
             <TabsContent value="compare" className="mt-4">
                <Card>
                    <CardHeader><CardTitle>Compare {institution.name}</CardTitle></CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground">Add this institution to the comparison list to see how it stacks up against another.</p>
                         <Button
                            variant="outline"
                            size="lg"
                            className="mt-4"
                            onClick={() => toggleComparison(institution)}
                          >
                            <GitCompareArrows className={cn('mr-2 h-5 w-5', isComparing ? 'text-primary' : '')} />
                            {isComparing ? 'Remove from Compare' : 'Add to Compare'}
                        </Button>
                    </CardContent>
                </Card>
             </TabsContent>

            {socialMediaLinks.length > 0 && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Follow Us on Social Media</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                    {socialMediaLinks.map(([platform, url]) => {
                        const Icon = socialIcons[platform];
                        return (
                        <Button key={platform} asChild variant="outline">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            <span className="capitalize">{platform}</span>
                            </a>
                        </Button>
                        );
                    })}
                    </CardContent>
                </Card>
            )}

        </Tabs>
    </motion.div>
  );
}

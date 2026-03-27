
'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mic, School, Building, FlaskConical, University as UniversityIcon, Sparkles, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { TopInstitutionsSection } from '@/components/top-institutions-section';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useInstitutions } from '@/hooks/use-institutions';

const institutionTypes = [
  {
    icon: School,
    title: 'Primary Schools',
    description: 'Kindergarten, Primary, and Secondary schools.',
    href: '/institutions/school',
    buttonText: 'Browse Primary Schools'
  },
  {
    icon: Building,
    title: 'Junior Colleges',
    description: 'Intermediate education, typically classes XI-XII.',
    href: '/institutions/junior-college',
    buttonText: 'Browse Junior Colleges'
  },
  {
    icon: FlaskConical,
    title: 'Engineering Colleges',
    description: 'Institutions offering technical degrees in engineering.',
    href: '/institutions/engineering-college',
    buttonText: 'Browse Engineering Colleges'
  },
  {
    icon: UniversityIcon,
    title: 'Universities',
    description: 'Higher education institutions offering a wide range of degrees.',
    href: '/institutions/university',
    buttonText: 'Browse Universities'
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const { institutions } = useInstitutions();

  const topSchools = institutions.filter(i => i.type === 'School').slice(0, 5);
  const topJuniorColleges = institutions.filter(i => i.type === 'Junior College').slice(0, 5);
  const topColleges = institutions.filter(i => i.type === 'Engineering College').slice(0, 5);
  const topUniversities = institutions.filter(i => i.type === 'University').slice(0, 5);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast({ title: 'Listening...', description: 'Please speak into your microphone.' });
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error === 'no-speech') {
          toast({ title: 'No speech detected', description: 'Please try again and speak clearly into the microphone.'});
        } else {
          toast({ title: 'Voice search error', description: `Could not recognize speech. Please try again. Error: ${event.error}`, variant: 'destructive' });
        }
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

    }
  }, [toast]);

  const handleSearch = (query: string) => {
     if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };
  
  const handleMicClick = () => {
    if (!recognitionRef.current) {
        toast({ title: 'Voice search not supported', description: 'Your browser does not support voice search.', variant: 'destructive' });
        return;
    }
    if (isListening) {
        recognitionRef.current.stop();
    } else {
        recognitionRef.current.start();
    }
  }

  return (
    <div className="w-full bg-background text-foreground">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-gray-900 text-white px-4 md:hidden">
        <div className="flex h-14 items-center">
            <Link href="/home" className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6" />
                <span className="font-bold">Campus Finder</span>
            </Link>
        </div>
      </header>

      {/* Main grid for desktop */}
      <div className="container grid min-h-screen w-full grid-cols-1 md:grid-cols-2 items-center gap-8">
        
        {/* Left column / Mobile top part */}
        <div className="flex flex-col items-start space-y-8 pt-12 text-left md:pt-0">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            <form onSubmit={handleSubmit} className="relative rounded-lg bg-card p-2 shadow-lg">
              <div className="flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for colleges, exams, courses and more..."
                  className="w-full border-0 bg-transparent pl-10 pr-20 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-2 flex items-center gap-2">
                  {isClient && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" type="button" onClick={handleMicClick} disabled={isListening}>
                        <Mic className={isListening ? "h-4 w-4 text-primary animate-pulse" : "h-4 w-4"} />
                    </Button>
                  )}
                  <Button type="submit">Search</Button>
                </div>
              </div>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Explore India's Educational Landscape
            </h1>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Find detailed information on government, private, polytechnic, and
              skill-based institutions across India. Your journey to the right
              institution starts here.
            </p>
          </motion.div>
        </div>

        {/* Right column / Mobile bottom part */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative flex h-[300px] w-full items-center justify-center md:h-full"
        >
          <div className="relative grid w-full max-w-sm grid-cols-2 items-center justify-center gap-4 h-full md:max-w-sm">
              <motion.div
                animate={{ y: [-8, 8] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="group relative h-48 w-full md:h-64 md:w-64"
              >
                <Image
                  src="https://img.freepik.com/premium-photo/child-girl-schoolgirl-elementary-school-student_656932-685.jpg"
                  alt="School Child"
                  layout="fill"
                  className="rounded-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-110"
                  data-ai-hint="school child"
                />
              </motion.div>
              <motion.div
                animate={{ y: [8, -8] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="group relative h-56 w-full md:h-72 md:w-72"
              >
                <Image
                  src="https://img.freepik.com/premium-photo/confident-pleasantly-smiling-asian-college-student-boy-carrying-his-schoolbag-radiating-assuran_939678-869.jpg"
                  alt="College Student"
                  layout="fill"
                  className="rounded-full object-cover shadow-2xl transition-transform duration-300 group-hover:scale-110"
                  data-ai-hint="college student"
                />
              </motion.div>
          </div>
        </motion.div>
      </div>

       <section className="w-full bg-muted py-16 md:py-24 lg:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">Explore by Institution Type</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Find the perfect fit for your educational aspirations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {institutionTypes.map((type) => (
              <Card key={type.title} className="flex flex-col items-center text-center">
                <CardHeader className="items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <type.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="text-sm text-muted-foreground flex-1">{type.description}</p>
                   <Button asChild variant="outline" className="mt-6">
                     <Link href={type.href}>{type.buttonText}</Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Find Your Perfect Institution?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Start your search today and unlock a world of educational opportunities.
            </p>
            <Button asChild size="lg" className="mt-4">
                <Link href="/search">Begin Your Search</Link>
            </Button>
        </div>
      </section>
      
      <TopInstitutionsSection
        title="Top Primary Schools in India"
        institutions={topSchools}
        icon={School}
        viewAllLink="/institutions/school"
      />

      <TopInstitutionsSection
        title="Top Junior Colleges in India"
        institutions={topJuniorColleges}
        icon={Building}
        viewAllLink="/institutions/junior-college"
      />

      <TopInstitutionsSection
        title="Top Engineering Colleges in India"
        institutions={topColleges}
        icon={FlaskConical}
        viewAllLink="/institutions/engineering-college"
      />

      <TopInstitutionsSection
        title="Top Universities in India"
        institutions={topUniversities}
        icon={UniversityIcon}
        viewAllLink="/institutions/university"
      />

      <section className="w-full bg-background py-16 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Need Personalized Guidance?
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Overwhelmed by choices? Our intelligent AI assistant will help you discover institutions perfectly tailored to your unique preferences. This feature is currently under maintenance, but check back soon!
          </p>
          <Button asChild size="lg" className="mt-4" variant="secondary">
            <Link href="/ai-recommendations">
              <Sparkles className="mr-2 h-5 w-5" />
              Get AI Recommendations
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}



'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InstitutionCard } from '@/components/institution-card';
import { Search, Map, BookOpen, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { states, cities } from '@/lib/cities';
import { useInstitutions } from '@/hooks/use-institutions';
import { Card, CardContent } from '@/components/ui/card';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { institutions: allInstitutions } = useInstitutions();

  const institutionTypes = useMemo(() => [...new Set(allInstitutions.map(i => i.type === 'School' ? 'Primary School' : i.type))].sort(), [allInstitutions]);
  const allCourses = useMemo(() => [...new Set(allInstitutions.flatMap(inst => inst.courses.map(c => c.name)))].sort(), [allInstitutions]);
  const nirfRankings = useMemo(() => ['Top 10', 'Top 50', 'Top 100'], []);
  const naacGrades = useMemo(() => ['A++', 'A+', 'A', 'B++', 'B+'], []);

  // Universal Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Filter State
  const [filter_nirfRank, setFilter_nirfRank] = useState('all');
  const [filter_naacGrade, setFilter_naacGrade] = useState('all');

  // Location Search State
  const [loc_institutionType, setLoc_institutionType] = useState('all');
  const [loc_state, setLoc_state] = useState('all');
  const [loc_city, setLoc_city] = useState('all');

  // Course Search State
  const [course_institutionType, setCourse_institutionType] = useState('all');
  const [course_name, setCourse_name] = useState('all');

  // General Filter State
  const [activeTab, setActiveTab] = useState('universal');
  const [results, setResults] = useState<typeof allInstitutions>([]);
  const [isClient, setIsClient] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const availableCities = useMemo(() => {
    if (loc_state === 'all') return [];
    const selectedState = states.find(s => s.name === loc_state);
    if (!selectedState) return [];
    const stateCities = cities[selectedState.state_code] || [];
    return [...stateCities].sort();
  }, [loc_state]);
  
  const availableCourses = useMemo(() => {
    const currentType = course_institutionType === 'Primary School' ? 'School' : course_institutionType;
    if (currentType === 'all') return allCourses;
    return [...new Set(allInstitutions.filter(inst => inst.type === currentType).flatMap(inst => inst.courses.map(c => c.name)))].sort();
  }, [course_institutionType, allInstitutions, allCourses]);

  const applyAdvancedFilters = (institutions: typeof allInstitutions) => {
    let filtered = [...institutions];

    if (filter_nirfRank !== 'all') {
      const rankThreshold = parseInt(filter_nirfRank.replace('Top ', ''));
      filtered = filtered.filter(inst => {
        if (!inst.nirfRank) return false;
        const rank = parseInt(inst.nirfRank);
        return !isNaN(rank) && rank <= rankThreshold;
      });
    }

    if (filter_naacGrade !== 'all') {
      const gradeOrder = naacGrades;
      const selectedGradeIndex = gradeOrder.indexOf(filter_naacGrade);
      filtered = filtered.filter(inst => {
        if (!inst.naacGrade) return false;
        const instGradeIndex = gradeOrder.indexOf(inst.naacGrade);
        return instGradeIndex !== -1 && instGradeIndex <= selectedGradeIndex;
      });
    }
    return filtered;
  };

  const performSearch = (filterFn: (inst: any) => boolean, params: URLSearchParams) => {
    let filtered = allInstitutions.filter(filterFn);
    filtered = applyAdvancedFilters(filtered);
    setResults(filtered);
    setHasSearched(true);
    if (filter_nirfRank !== 'all') params.set('nirf', filter_nirfRank);
    if (filter_naacGrade !== 'all') params.set('naac', filter_naacGrade);
    router.push(`/search?${params.toString()}`);
  };
  
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onresult = (event: any) => handleUniversalSearch(event.results[0][0].transcript);
      recognitionRef.current.onerror = (event: any) => {
        toast({ title: 'Voice search error', description: `Could not recognize speech. Error: ${event.error}`, variant: 'destructive' });
        setIsListening(false);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }

    const q = searchParams.get('q');
    let type = searchParams.get('type');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const course = searchParams.get('course');
    const nirf = searchParams.get('nirf');
    const naac = searchParams.get('naac');
    
    if (type === 'Primary School') type = 'School';

    if (q || type || state || city || course || nirf || naac) {
        if(q) setSearchQuery(q);
        if(type) {
            const displayType = type === 'School' ? 'Primary School' : type;
            setLoc_institutionType(displayType);
            setCourse_institutionType(displayType);
        }
        if(state) setLoc_state(state);
        if(city) setLoc_city(city);
        if(course) setCourse_name(course);
        if(nirf) setFilter_nirfRank(nirf);
        if(naac) setFilter_naacGrade(naac);
        
        let filtered = allInstitutions.filter(inst => {
          if (q) return inst.name.toLowerCase().includes(q.toLowerCase()) || inst.location.city.toLowerCase().includes(q.toLowerCase()) || inst.courses.some(c => c.name.toLowerCase().includes(q.toLowerCase()));
          const typeMatch = type ? inst.type === type : true;
          const stateMatch = state ? inst.location.state === state : true;
          const cityMatch = city ? inst.location.city === city : true;
          const courseMatch = course ? inst.courses.some(c => c.name === course) : true;
          return typeMatch && stateMatch && cityMatch && courseMatch;
        });

        filtered = applyAdvancedFilters(filtered);

        setResults(filtered);
        setHasSearched(true);
    } else {
        setResults([]);
        setHasSearched(false);
    }
  }, [searchParams, allInstitutions]);

  const handleUniversalSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams();
    if (!query.trim()) {
        setResults([]);
        setHasSearched(false);
        router.push('/search');
        return;
    }
    params.set('q', query);
    performSearch(inst => 
        inst.name.toLowerCase().includes(query.toLowerCase()) ||
        inst.location.city.toLowerCase().includes(query.toLowerCase()) ||
        inst.courses.some(c => c.name.toLowerCase().includes(query.toLowerCase()))
    , params);
  }

  const handleLocationSearch = () => {
    const typeToSearch = loc_institutionType === 'Primary School' ? 'School' : loc_institutionType;
    const params = new URLSearchParams();
    if(loc_institutionType !== 'all') params.set('type', loc_institutionType);
    if(loc_state !== 'all') params.set('state', loc_state);
    if(loc_city !== 'all') params.set('city', loc_city);
    
    performSearch(inst => {
      const typeMatch = typeToSearch === 'all' || inst.type === typeToSearch;
      const stateMatch = loc_state === 'all' || inst.location.state === loc_state;
      const cityMatch = loc_city === 'all' || inst.location.city === loc_city;
      return typeMatch && stateMatch && cityMatch;
    }, params);
  }

  const handleCourseSearch = () => {
    const typeToSearch = course_institutionType === 'Primary School' ? 'School' : course_institutionType;
    const params = new URLSearchParams();
    if(course_institutionType !== 'all') params.set('type', course_institutionType);
    if(course_name !== 'all') params.set('course', course_name);

    performSearch(inst => {
      const typeMatch = typeToSearch === 'all' || inst.type === typeToSearch;
      const courseMatch = course_name === 'all' || inst.courses.some(c => c.name === course_name);
      return typeMatch && courseMatch;
    }, params);
  }

  const handleMicClick = () => {
    if (!recognitionRef.current) {
        toast({ title: 'Voice search not supported', variant: 'destructive' });
        return;
    }
    if (isListening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  }

  const handleResetFilters = () => {
    setFilter_nirfRank('all');
    setFilter_naacGrade('all');
    
    // Re-run the active search with reset filters
    if (activeTab === 'universal') handleUniversalSearch(searchQuery);
    if (activeTab === 'location') handleLocationSearch();
    if (activeTab === 'course') handleCourseSearch();
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-center text-4xl font-headline font-bold text-primary md:text-5xl">Find Your Future</h1>
        <p className="mt-2 text-center text-lg text-muted-foreground">Explore thousands of institutions across India.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="sticky top-[57px] z-10 space-y-4 rounded-lg bg-background/80 p-4 backdrop-blur-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="universal"><Search className="mr-2 h-4 w-4"/>Universal</TabsTrigger>
                <TabsTrigger value="location"><Map className="mr-2 h-4 w-4"/>Location</TabsTrigger>
                <TabsTrigger value="course"><BookOpen className="mr-2 h-4 w-4"/>Course</TabsTrigger>
            </TabsList>
            <TabsContent value="universal" className="mt-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search by name, location, or course..." className="pl-10 pr-20 text-base" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleUniversalSearch(searchQuery) }} />
                     <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center">
                        {isClient && (<Button variant="ghost" size="icon" className="h-8 w-8" type="button" onClick={handleMicClick} disabled={isListening}><Mic className={isListening ? "h-4 w-4 text-primary animate-pulse" : "h-4 w-4"} /></Button>)}
                        <Button type="button" onClick={() => handleUniversalSearch(searchQuery)} size="sm" className="h-8">Search</Button>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="location" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Select value={loc_institutionType} onValueChange={setLoc_institutionType}><SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                        <SelectContent><SelectItem value="all">All Types</SelectItem>{institutionTypes.map(type => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent>
                    </Select>
                    <Select value={loc_state} onValueChange={(value) => { setLoc_state(value); setLoc_city('all'); }}><SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                        <SelectContent><SelectItem value="all">All States</SelectItem>{states.map(state => (<SelectItem key={state.state_code} value={state.name}>{state.name}</SelectItem>))}</SelectContent>
                    </Select>
                     <Select value={loc_city} onValueChange={setLoc_city} disabled={loc_state === 'all'}><SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
                        <SelectContent><SelectItem value="all">All Cities</SelectItem>{availableCities.map(city => (<SelectItem key={city} value={city}>{city}</SelectItem>))}</SelectContent>
                    </Select>
                </div>
                <Button onClick={handleLocationSearch} className="w-full"><Search className="mr-2 h-4 w-4"/>Search by Location</Button>
            </TabsContent>
            <TabsContent value="course" className="mt-4 space-y-4">
                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Select value={course_institutionType} onValueChange={setCourse_institutionType}><SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                        <SelectContent><SelectItem value="all">All Types</SelectItem>{institutionTypes.map(type => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent>
                    </Select>
                    <Select value={course_name} onValueChange={setCourse_name} disabled={course_institutionType === 'all'}><SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
                        <SelectContent><SelectItem value="all">All Courses</SelectItem>{availableCourses.map(course => (<SelectItem key={course} value={course}>{course}</SelectItem>))}</SelectContent>
                    </Select>
                </div>
                <Button onClick={handleCourseSearch} className="w-full"><Search className="mr-2 h-4 w-4"/>Search by Course</Button>
            </TabsContent>
        </Tabs>
        <Card className="mt-4">
            <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>NIRF Rank</label>
                        <Select value={filter_nirfRank} onValueChange={setFilter_nirfRank}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent><SelectItem value="all">Any Rank</SelectItem>{nirfRankings.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                     <div className='space-y-2'>
                        <label className='text-sm font-medium'>NAAC Grade</label>
                        <Select value={filter_naacGrade} onValueChange={setFilter_naacGrade}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent><SelectItem value="all">Any Grade</SelectItem>{naacGrades.map(g => <SelectItem key={g} value={g}>Up to {g}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => {if(activeTab==='universal') handleUniversalSearch(searchQuery); else if(activeTab==='location') handleLocationSearch(); else handleCourseSearch();}} className="w-full">Apply Filters</Button>
                      <Button onClick={handleResetFilters} variant="outline" className="w-full">Reset</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
      </motion.div>
      
      {hasSearched && <p className="text-sm text-muted-foreground">{results.length} institution(s) found.</p>}

      {hasSearched && results.length > 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((inst, index) => (
             <motion.div key={inst.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}>
                <InstitutionCard institution={inst} />
            </motion.div>
          ))}
        </motion.div>
      ) : hasSearched ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center">
          <p className="text-xl font-semibold">No institutions found</p>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center">
            <p className="text-xl font-semibold">Please enter search criteria</p>
            <p className="mt-2 text-muted-foreground">Use the search bars and filters above to find institutions.</p>
        </div>
      )
    }
    </div>
  );
}
